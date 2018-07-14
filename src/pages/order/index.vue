<template>
  <div class="c-order">
    <c-home-navbar></c-home-navbar>
    <div class="weui-tab">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <scroll-view :scroll-y="true" @scrolltolower="getOrderList" :style="{ height: windowHeight + 'px'}">
          <div
            class="weui-tab__content"
            :class="{
              'weui-tab__content__is-iphonex': device.isMiniProgramIsIPhoneX
            }"
            :hidden="activeIndex != 0">
            <c-order-cards :items="userOrders.statusAll.data" @refreshOrder="refreshOrder"></c-order-cards>
            <div class="c-star-recommend" v-if="userOrders && userOrders.statusAll.data.length === 0">
              <section>正在拼团的商品</section>
              <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
            </div>
          </div>
           <div
            class="weui-tab__content"
            :class="{
              'weui-tab__content__is-iphonex': device.isMiniProgramIsIPhoneX
            }"
            :hidden="activeIndex != 1">
            <c-order-cards :items="userOrders.statusPayment.data" ></c-order-cards>
            <div class="c-star-recommend" v-if="userOrders && userOrders.statusPayment.data.length === 0">
              <section>正在拼团的商品</section>
              <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
            </div>
          </div>
           <div
            class="weui-tab__content"
            :hidden="activeIndex != 2"
            :class="{
              'weui-tab__content__is-iphonex': device.isMiniProgramIsIPhoneX
            }">
            <c-order-cards :items="userOrders.statusGrouping.data" ></c-order-cards>
            <div class="c-star-recommend"v-if="userOrders && userOrders.statusGrouping.data.length === 0">
              <section>正在拼团的商品</section>
              <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
            </div>
          </div>
          <div
            class="weui-tab__content"
            :hidden="activeIndex != 3"
            :class="{
              'weui-tab__content__is-iphonex': device.isMiniProgramIsIPhoneX
            }">
            <c-order-cards :items="userOrders.statusDeliver.data" ></c-order-cards>
            <div class="c-star-recommend" v-if="userOrders && userOrders.statusDeliver.data.length === 0">
              <section>正在拼团的商品</section>
              <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
            </div>
          </div>
           <div
            class="weui-tab__content"
            :class="{
              'weui-tab__content__is-iphonex': device.isMiniProgramIsIPhoneX
            }"
            :hidden="activeIndex != 4">
            <c-order-cards :items="userOrders.statusReceiving.data"></c-order-cards>
            <div class="c-star-recommend" v-if="userOrders && userOrders.statusReceiving.data.length === 0">
              <section>正在拼团的商品</section>
              <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import cHomeNavbar from '@/components/c-home-navbar'
import cRecommendCards from '@/components/c-recommend-cards'
import cOrderCards from '@/components/c-order-cards'
import cModalCancelOrderReason from '@/components/c-modal-cancel-order-reason'
import * as types from '@/store/mutation-types'
import { mapState } from 'vuex'
import { device } from '@/utils'

export default {
  components: {
    cOrderCards,
    cRecommendCards,
    cHomeNavbar,
    cModalCancelOrderReason
  },
  data () {
    return {
      device,
      tabs: ['全部', '待付款', '待成团', '待发货', '待收货'],
      activeIndex: 0,
      apiData: {
        keywords: '',
        order_type: 'all',
        view_type: 'CUSTOMER_ORDER_CENTER'
      },
      orderList: [],
      windowHeight: 0,
      modalCancelReason: true
    }
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex === 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex === 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex === 2) {
        return 'weui-navbar__slider_2'
      }
    },
    ...mapState({
      userOrders: state => state.order.gets,
      onGrouponList: state => state.groupon.onGroupon.srcData
    })
  },
  mounted () {
    this.getOrderList().then(result => {
      this.orderList = this.userOrders.statusAll.data
    })
  },
  methods: {
    refreshOrder () {
      this.$store.dispatch(types.USER__ORDER_POST_CLEARITEMTAB, {
        orderType: this.apiData.order_type
      }).then(() => {
        this.getOrderList()
      })
    },
    getOrderList () {
      return this.$store.dispatch(types.USER__ORDER_GETS, {
        apiData: this.apiData
      })
    },
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
      console.log('e.currentTarget.id', e.currentTarget.id)
      switch (parseInt(e.currentTarget.id)) {
        case 0:
          this.apiData.order_type = 'all'
          break
        case 1:
          this.apiData.order_type = 'wait-for-payment'
          break
        case 2:
          this.apiData.order_type = 'wait-for-grouping'
          break
        case 3:
          this.apiData.order_type = 'wait-for-deliver'
          break
        case 4:
          this.apiData.order_type = 'wait-for-confirm-receiving'
          break
      }
      this.getOrderList()
    }
  },
  onShow () {
    this.$store.dispatch(types.NAV_SET_INDEX, { navIndex: 1 })
  },
  onLoad () {
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight
      }
    })
  }
}
</script>

<style lang="scss">
@import './style';
</style>
