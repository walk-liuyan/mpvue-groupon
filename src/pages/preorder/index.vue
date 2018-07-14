<template>
  <div
    class="c-preorder"
    :class="{
      'c-preorder__is-iphonex': device.isMiniProgramIsIPhoneX
    }"
    :style="{ minHeight: windowHeight + 'px'}">
    <div class="c-preorder-address-navbar">
      <c-preorder-navbar
        :selfPickInfo="createOrderData.self_pick_info"
        @chooseDelivery="chooseDelivery"
        @transferSelfPickInfo="transferSelfPickInfo"
        @reverseModalPickUp="reverseModalPickUp">
      </c-preorder-navbar>
    </div>
    <div class="c-product-order">
      <c-common-order-cards v-for="(item, index) in preOrders.pre_orders.pre_order_sections" :key="index" :items="item">
      </c-common-order-cards>
    </div>
    <c-preorder-pay @choosePayMethod="choosePayMethod" :preOrders="preOrders.pre_orders"></c-preorder-pay>
    <c-modal-preorder-actionsheet
      v-if="modalPayActionSheet"
      :pickSelf="createOrderData.if_self_pick"
      @chooseAction="chooseAction">
    </c-modal-preorder-actionsheet>
    <c-modal-pickup
      v-if="modalPick"
      :selfPickInfo="createOrderData.self_pick_info"
      @reverseModalPickUp="reverseModalPickUp"
      @choosePickAddress="choosePickAddress">
    </c-modal-pickup>
  </div>
</template>
<script>
import cModalPreorderActionsheet from '@/components/c-modal-preorder-actionsheet'
import cCommonOrderCards from '@/components/c-common-order-cards'
import cPreorderPay from '@/components/c-preorder-pay'
import cPreorderNavbar from '@/components/c-preorder-navbar'
import cModalPickup from '@/components/c-modal-pickup'
import { device } from '@/utils'
import { mapState } from 'vuex'
import orderApi from '@/utils/api/order'

export default {
  components: {
    cCommonOrderCards,
    cPreorderPay,
    cModalPreorderActionsheet,
    cPreorderNavbar,
    cModalPickup
  },
  computed: {
    ...mapState({
      preOrders: state => state.preorder.preOrder
    })
  },
  data () {
    return {
      device,
      windowHeight: 0,
      modalPayActionSheet: false,
      modalPick: false,
      createOrderData: {
        discount_value_promotion_selection: '',
        customer_discount_method: 'no-promotion',
        address_id: '',
        order_sections: [],
        is_group_buying: true,
        payment_method: 'ONSITE_PAYMENT',
        if_self_pick: true,
        self_pick_info: {
          picker_name: '',
          picker_mobile: '',
          picker_address: ''
        }
      }
    }
  },
  onLoad () {
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight
      }
    })
  },
  methods: {
    choosePickAddress (option) {
      const pickUpAddress = {
        picker_name: this.createOrderData.self_pick_info.picker_name,
        picker_mobile: this.createOrderData.self_pick_info.picker_mobile,
        picker_address: option.display_address
      }
      console.log('pickUpAddress', pickUpAddress)
      console.log('choosePickAddress', option.display_address)
      this.createOrderData.self_pick_info = pickUpAddress
      console.log('this.createOrderData', this.createOrderData, this.createOrderData.self_pick_info)
      this.reverseModalPickUp()
    },
    chooseDelivery (value) {
      /*
      value
      自提 = true
      邮寄 = false
      */
      this.createOrderData.if_self_pick = value
      console.log('this.createOrderData.if_self_pick ', this.createOrderData.if_self_pick)
    },
    transferSelfPickInfo (option) {
      console.log(option)
      this.createOrderData.self_pick_info = option
    },
    reverseModalPickUp () {
      this.modalPick = !this.modalPick
    },
    chooseAction (option) {
      console.log(option)
      this.createOrderData.is_group_buying = this.preOrders.is_group_buying
      switch (option) {
        case 'cancel':
          this.choosePayMethod()
          break
        case 'wx':
          this.chooseWXPay()
          break
        case 'merchant':
          this.chooseMerchantPay()
          break
      }
    },
    addNewAddress () {
      // 后期优化: 如果是新增，默认弹出新增框
      wx.navigateTo({
        url: `/pages/shipping-address`
      })
    },
    createOrder () {
      this.createOrderData.order_sections = []
      this.preOrders.pre_orders.pre_order_sections.forEach(section => {
        let itemOrderSections = {
          shopping_cart_item_ids: '',
          buyer_id: '',
          customer_note: ''
        }
        if (
          section.pre_order_product_items &&
          section.pre_order_product_items.length > 0
        ) {
          let itemOrderSectionsIdsArr = []
          section.pre_order_product_items.forEach(itemSection => {
            itemOrderSectionsIdsArr.push(itemSection.shopping_cart_item_id)
          })
          itemOrderSections.shopping_cart_item_ids = itemOrderSectionsIdsArr.join(
            ','
          )
        }
        this.createOrderData.order_sections.push(itemOrderSections)
      })
      this.createOrderData.address_id = this.preOrders.pre_orders.default_address.address_id
      // createOrder
      orderApi.createOrder(this.createOrderData).then(res => {
        console.log('createOrder', res)
        // 线下支付 && 立即购买 => pay success
        if (this.createOrderData.payment_method === 'ONSITE_PAYMENT' && this.preOrders.is_group_buying === false) {
          wx.redirectTo({
            url: `/pages/pay-res?id=${res.data.orders[0].order_id}`
          })
        }
        if (res.code === 0) {
          let tempArr = []
          res.data.orders.forEach(itemOrder => {
            tempArr.push(itemOrder.order_id)
          })
          const data = {
            order_ids: tempArr.join(',')
          }
          orderApi.multiOrdersPay(data).then(payRes => {
            if (payRes.code === 0) {
              const requestPaymentRes = payRes.data.public_wechat_pay_request_data
              wx.requestPayment({
                timeStamp: requestPaymentRes.timeStamp.toString(),
                nonceStr: requestPaymentRes.nonceStr,
                package: requestPaymentRes.package,
                signType: 'MD5',
                paySign: requestPaymentRes.paySign,
                success: res => {
                  // {errMsg: "requestPayment:ok"}
                  console.log(res)
                },
                fail: res => {
                  console.log(res)
                  wx.redirectTo({
                    url: `/pages/order-detail?id=${res.data.orders[0].order_id}`
                  })
                }
              })
            } else {
              wx.redirectTo({
                url: `/pages/order-detail?id=${res.data.orders[0].order_id}`
              })
            }
          })
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    },
    chooseMerchantPay () {
      this.createOrderData.payment_method = 'ONSITE_PAYMENT'
      console.log(this.preOrders)
      this.createOrder()
    },
    chooseWXPay () {
      this.createOrderData.payment_method = 'ONLINE_PAYMENT'
      this.createOrder()
    },
    choosePayMethod () {
      this.modalPayActionSheet = !this.modalPayActionSheet
    },
    closeClick () {
      this.$emit('closeClick')
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>