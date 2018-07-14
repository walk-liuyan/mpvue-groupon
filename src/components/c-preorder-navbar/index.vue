<template>
  <div class="c-preorder-navbar">
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
        <div class="weui-tab__content" :hidden="activeIndex !== 0">
          <div class="c-preorder-address__pick-up-self">
            <div class="item">
              <span>姓名</span>
              <input placeholder="请输入姓名" v-model="selfPickInfo.picker_name" @change="transferSelfPickInfo">
            </div>
            <div class="item">
              <span>手机</span>
              <input placeholder="请输入手机" v-model="selfPickInfo.picker_mobile" @change="transferSelfPickInfo">
            </div>
            <div class="item">
              <span>自提点</span>
              <p>{{ selfPickInfo.picker_address }}</p>
              <img src="/static/image/icon/edit.png" @click="reverseModalPickUp">
            </div>
          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex !== 1">
          <div class="c-preorder-address__default" v-if="preOrders && preOrders.pre_orders.default_address!==null">
            <div class="c-preorder-address__icon">
              <img src="/static/image/icon/local.png" mode="widthFix">
            </div>
            <div class="c-preorder-address__content" @click="chooseAddress">
              <p class="user-info">
                <span>收货人：{{ preOrders.pre_orders.default_address.receiver_name }}</span>
                <span>{{ preOrders.pre_orders.default_address.mobile }}</span>
              </p>
              <p class="user-address">
                收货地址： {{preOrders.pre_orders.default_address.country}} {{preOrders.pre_orders.default_address.state_province}} {{preOrders.pre_orders.default_address.city}} {{preOrders.pre_orders.default_address.district}} {{preOrders.pre_orders.default_address.address}}
              </p>
            </div>
            <div class="c-preorder-address__more">
              <img src="/static/image/icon/more.png" mode="widthFix">
            </div>
          </div>
          <div class="c-preorder-address__empty" @click="addNewAddress" v-else>
            <span>+ 添加新地址</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'c-preorder-navbar',
  data () {
    return {
      tabs: ['自提', '邮寄'],
      activeIndex: 0
    }
  },
  props: {
    selfPickInfo: {
      type: Object,
      default: {}
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
    },
    ...mapState({
      preOrders: state => state.preorder.preOrder
    })
  },
  methods: {
    chooseAddress () {
      wx.navigateTo({
        url: `/pages/shipping-address`
      })
    },
    reverseModalPickUp () {
      this.$emit('reverseModalPickUp')
    },
    transferSelfPickInfo () {
      this.$emit('transferSelfPickInfo', this.selfPickInfo)
    },
    tabClick (e) {
      this.activeIndex = parseInt(e.currentTarget.id)
      if (this.activeIndex === 0) {
        this.$emit('chooseDelivery', true)
      } else {
        this.$emit('chooseDelivery', false)
      }
    }
  },
  created () {
    this.$emit('chooseDelivery', true)
    if (this.preOrders.group_buying_info.self_pick_available_status === 'SELF_PICK_AVAILABLE') {
      this.activeIndex = 0
      this.tabs = ['自提', '邮寄']
    } else if (this.preOrders.group_buying_info.self_pick_available_status === 'SELF_PICK_ONLY') {
      this.activeIndex = 0
      this.tabs = ['自提']
    } else if (this.preOrders.group_buying_info.self_pick_available_status === 'SELF_PICK_NOT_AVAILABLE') {
      this.activeIndex = 1
      this.tabs = ['邮寄']
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
