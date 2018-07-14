<template>
  <div
    class="c-home"
    :class="{
      'c-home__is-iphonex': device.isMiniProgramIsIPhoneX
    }">
    <c-authorize-cover v-if="userInfo.accessToken === ''"></c-authorize-cover>
    <c-today-title></c-today-title>
    <c-home-navbar></c-home-navbar>
    <c-product-cards
      :items="readyForGrouponProducts.data"
      @starItemProduct="starItemProduct"
      @get-items="getProducts">
    </c-product-cards>
    <c-groupon-swiper-cards></c-groupon-swiper-cards>
  </div>
</template>

<script>
import cTodayTitle from '@/components/c-today-title'
import cHomeNavbar from '@/components/c-home-navbar'
import cProductCards from '@/components/c-product-cards'
import cGrouponSwiperCards from '@/components/c-groupon-swiper-cards'
import cAuthorizeCover from '@/components/c-authorize-cover'
import * as types from '@/store/mutation-types'
import { mapState } from 'vuex'
import { device } from '@/utils'

export default {
  components: {
    cProductCards,
    cGrouponSwiperCards,
    cAuthorizeCover,
    cHomeNavbar,
    cTodayTitle
  },
  data () {
    return {
      device
    }
  },
  onShow () {
    this.$store.dispatch(types.NAV_SET_INDEX, { navIndex: 0 })
  },
  onLoad () {
    this.getProducts()
  },
  onShareAppMessage () {
    return {
      title: '环球伙拼',
      path: `/pages/home`,
      success: () => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 500
        })
      }
    }
  },
  computed: {
    ...mapState({
      readyForGrouponProducts: state => state.home.readyForGroupon,
      userInfo: state => state.user
    })
  },
  methods: {
    getProducts () {
      this.$store.dispatch(types.GROUPBUYING_POST_HOME)
      this.$store.dispatch(types.ONGROUPON_POST_HOME)
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>
