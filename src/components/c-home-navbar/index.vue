<template>
  <div
    class="c-home-navbar"
    :class="{
      'c-home-navbar__is-iphonex': device.isMiniProgramIsIPhoneX
    }">
    <div class="c-home-navbar__item" :class="{'active': index === navIndex}" v-for="(item, index) in navList" :key="index" @click="navTo(item, index)">
      <img :src="item.selectedIconPath" v-if="index === navIndex">
      <img :src="item.iconPath" v-else>
      <span>{{ item.text }}</span>
    </div>
    <div class="c-home-navbar__item">
      <button open-type="contact">联系理事</button>
      <img :src="chatItem.iconPath">
      <span>{{ chatItem.text }}</span>
    </div>
  </div>
</template>

<script>
import { device } from '@/utils'
import * as types from '@/store/mutation-types'
import { mapState } from 'vuex'

export default {
  name: 'c-home-navbar',
  data () {
    return {
      device,
      chatItem: {
        pagePath: '/pages/chat',
        text: '理事',
        iconPath: '/static/image/tabbar/unChat.png',
        selectedIconPath: '/static/image/tabbar/chat.png'
      },
      navList: [
        {
          pagePath: '/pages/home',
          text: '主页',
          iconPath: '/static/image/tabbar/unHome.png',
          selectedIconPath: '/static/image/tabbar/home.png'
        },
        {
          pagePath: '/pages/order',
          text: '订单中心',
          iconPath: '/static/image/tabbar/unOrder.png',
          selectedIconPath: '/static/image/tabbar/order.png'
        },
        {
          pagePath: '/pages/star',
          text: '收藏',
          iconPath: '/static/image/tabbar/unStar.png',
          selectedIconPath: '/static/image/tabbar/star.png'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      navIndex: state => state.nav.get.navIndex
    })
  },
  methods: {
    navTo (item, index) {
      this.$store.dispatch(types.NAV_SET_INDEX, { navIndex: index })
      this.navIndex = index
      wx.redirectTo({
        url: item.pagePath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
