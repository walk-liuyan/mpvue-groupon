<template>
  <div class="p-pay-res">
    <c-pay-res-status :status="payRes"></c-pay-res-status>
    <div class="c-pay__success">
      <div class="c-pay__success__startGroup">
        <div class="c-pay__success__title">
          <div class="text">
            <span>正在开团</span>
            <span>还差1人开团</span>
          </div>
          <div class="avatar">
            <img src="/static/image/icon/star.png" mode="aspectFit">
            <img src="/static/image/icon/star.png" mode="aspectFit">
            <img src="/static/image/icon/more.png" mode="aspectFit">
          </div>
        </div>
        <div class="c-pay__success__content">
          <img src="/static/image/icon/star.png" mode="aspectFill">
          <div class="info">
            <p>格力高PRETZ百力滋泰式玉米味/冬荫功风味酥性饼干36g</p>
            <p>AUD 10.00</p>
            <p>AUD 9.00</p>
          </div>
        </div>
      </div>
      <div class="c-pay__success__partakeGroup">
      </div>
      <div class="c-pay__success__countDown">
        马上参团 23:00:19 后结束
      </div>
      <div class="c-pay__success__opt">
        <span @click="navTo('/pages/home')">返回首页</span>
        <span @click="navTo(`pages/order-detail?id=${orderId}`)">查看订单</span>
      </div>
    </div>

    <div class="c-recommend">
      <section>正在拼团的商品</section>
      <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import cPayResStatus from '@/components/c-pay-res-status'
import cRecommendCards from '@/components/c-recommend-cards'

export default {
  name: 'p-pay-res',
  components: {
    cPayResStatus,
    cRecommendCards
  },
  data() {
    return {
      payRes: 'paySuccess',
      orderId: '3213123213'
    }
  },
  methods: {
    navTo(path) {
      wx.navigateTo({
        url: path
      })
    }
  },
  created() {},
  onLoad(options) {
    console.log(options.id)
    // options.status
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
