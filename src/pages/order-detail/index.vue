<template>
  <div class="p-order-detail" :style="{ minHeight: windowHeight + 'px'}">
    <div class="p-order-detail__status-title">
      <span>{{ orderDetail.status_title }}</span>
      <span v-if="orderDetail.next_status_time!==-1">
        {{ itemCountDownTime.day }}天 {{ itemCountDownTime.hou }}时 {{ itemCountDownTime.min }}分 {{ itemCountDownTime.sec }}秒
        </view>
        {{ orderDetail.status_sub_title }}
      </span>
    </div>
    <div class="p-order-detail__address__pickup" v-if="orderDetail.if_self_pick === true">
      <div class="c-preorder-address__icon">
        <img src="/static/image/icon/local.png" mode="widthFix">
      </div>
      <div class="c-preorder-address__content">
        <p class="user-info">
          <span>{{ orderDetail.self_pick_info.picker_name }}</span>
          <span>{{ orderDetail.self_pick_info.picker_mobile }}</span>
        </p>
        <p class="user-address">
          {{orderDetail.self_pick_info.picker_address}}
        </p>
      </div>
      <div class="c-preorder-address__qrcode" v-if="orderDetail.payment_method==='ONSITE_PAYMENT'">
<!--         <image bindtap="previewImg" mode="scaleToFill" :src="imagePath"></image>
 -->
        <div class="canvas-box">
          <canvas style="width: 82px;height: 82px;background:#f1f1f1;" canvas-id="mycanvas" />
        </div>
      </div>
    </div>
    <div class="p-order-detail__address__mail" v-else>
      <div class="c-preorder-address__icon">
        <img src="/static/image/icon/local.png" mode="widthFix">
      </div>
      <div class="c-preorder-address__content" v-if="orderDetail.address">
        <p class="user-info">
          <span>收货人：{{ orderDetail.address.receiver_name }}</span>
          <span>{{ orderDetail.address.mobile }}</span>
        </p>
        <p class="user-address">
          收货地址： {{orderDetail.address.address_display}}
        </p>
      </div>
    </div>
    <div class="p-order-detail__products">
      <c-order-card-item :items="orderDetail.order_items"></c-order-card-item>
    </div>
    <div class="p-order-detail__price">
      <p v-for="(item, index) in orderDetail.price_detail_summary" :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </p>
    </div>
    <div class="p-order-detail__price-end">
      <span>实付款</span>
      <span>AUD {{ orderDetail.default_customer_pay_amount_exclude_refund_amount }}</span>
    </div>
    <div class="p-order-detail__order-info">
      <p>订单编号：{{ orderDetail.order_id }}</p>
      <p v-for="(item, index) in orderDetail.order_key_time_summary" :key="index">
        {{ item.name }}{{ item.value }}
      </p>
    </div>
    <div class="p-order-detail__opt-bar">
      <c-order-opt-item :orderItem="orderDetail" :items="orderDetail.customer_order_operations"></c-order-opt-item>
    </div>
    <view class='tui-countdown-content' v-for="(item, index) in countDownList" :key="index">
      剩余
      <text class='tui-conutdown-box'>{{item.day}}</text>天
      <text class='tui-conutdown-box'>{{item.hou}}</text>时
      <text class='tui-conutdown-box'>{{item.min}}</text>分
      <text class='tui-conutdown-box tui-countdown-bg'>{{item.sec}}</text>秒
    </view>
  </div>
</template>

<script>
/* eslint-disable */
import orderApi from '@/utils/api/order'
import cOrderCardItem from '@/components/c-order-card-item'
import cOrderOptItem from '@/components/c-order-opt-item'
const QR = require('@/plugins/qrcode.js')

export default {
  name: 'p-order-detail',
  data() {
    return {
      windowHeight: 0,
      orderDetail: {},
      imagePath: '',
      canvasHidden: false,
      countDownList: [],
      actEndTimeList: [],
      itemCountDownTime: {},
      setTimeoutTimer: null
    }
  },
  components: {
    cOrderCardItem,
    cOrderOptItem
  },
  onUnload() {
    clearTimeout(this.setTimeoutTimer)
  },
  onHide() {
    clearTimeout(this.setTimeoutTimer)
  },
  methods: {
    getDate() {
      let now = new Date()
      let y = now.getFullYear()
      let m = now.getMonth() + 1
      let d = now.getDate()
      return (
        y +
        '-' +
        (m < 10 ? '0' + m : m) +
        '-' +
        (d < 10 ? '0' + d : d) +
        ' ' +
        now.toTimeString().substr(0, 8)
      )
    },
    itemCountDown() {
      let newTime = new Date().getTime()
      let endTime = this.orderDetail.next_status_time * 1000
      let obj = null
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24))
        let hou = parseInt((time % (60 * 60 * 24)) / 3600)
        let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
        let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      this.itemCountDownTime = obj
      this.setTimeoutTimer = setTimeout(this.itemCountDown, 1000)
    },
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    canvasToTempImage() {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: res => {
          var tempFilePath = res.tempFilePath
          this.imagePath = tempFilePath
        },
        fail: res => {
          console.log(res)
        }
      })
    },
    createQrCode(url, canvasId, cavW, cavH) {
      QR.api.draw(url, canvasId, cavW, cavH)
      setTimeout(() => {
        this.canvasToTempImage()
      }, 1000)
    }
  },
  previewImg: e => {
    var img = this.imagePath
    console.log(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  onLoad(options) {
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight
      }
    })
    orderApi.getOrderDetail(options.id).then(res => {
      if (res.code === 0) {
        this.orderDetail = res.data.order
        if (
          this.orderDetail.order_key_time_summary &&
          this.orderDetail.order_key_time_summary.length > 0
        ) {
          this.orderDetail.order_key_time_summary.forEach(item => {
            if (item.name.indexOf('时间') > -1) {
              item.value = this.getDate(item.value)
            }
          })
        }
        if (this.orderDetail.payment_method) {
          this.createQrCode(this.orderDetail.order_id, 'mycanvas', 82, 82)
        }
        if (this.orderDetail.next_status_time > 0) {
          this.itemCountDown()
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
