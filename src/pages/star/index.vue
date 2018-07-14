<template>
  <div
    class="c-star">
    <c-home-navbar></c-home-navbar>
    <div
      class="c-star__content__none"
      v-if="productCollectionList.items.length === 0">
      <img src="/static/image/star/noStar.png">
      <span>还没有收藏的商品</span>
    </div>
    <div
      class="c-star-recommend"
      v-if="productCollectionList.items.length === 0">
      <section>正在拼团的商品</section>
      <c-recommend-cards :items="onGrouponList"></c-recommend-cards>
    </div>
    <scroll-view
      :scroll-y="true"
      @scrolltolower="getStarProducts"
      :style="{ height: windowHeight + 'px'}"
      v-else>
      <div
        class="c-star__content"
        :class="{
          'c-star-content__is-iphonex': device.isMiniProgramIsIPhoneX
        }">
        <c-star-cards
          v-if="productCollectionList && productCollectionList.items.length > 0"
          :items="productCollectionList.items">
        </c-star-cards>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import cHomeNavbar from '@/components/c-home-navbar'
import cRecommendCards from '@/components/c-recommend-cards'
import cStarCards from '@/components/c-star-cards'
import * as types from '@/store/mutation-types'
import { device } from '@/utils'
import { mapState } from 'vuex'

export default {
  components: {
    cRecommendCards,
    cStarCards,
    cHomeNavbar
  },
  computed: {
    ...mapState({
      productCollectionList: state => state.productCollection.gets.data,
      onGrouponList: state => state.groupon.onGroupon.srcData
    })
  },
  data () {
    return {
      device,
      windowHeight: 0
    }
  },
  onLoad () {
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight
      }
    })
  },
  onShow () {
    this.$store.dispatch(types.NAV_SET_INDEX, { navIndex: 2 })
    this.getStarProducts()
  },
  methods: {
    getStarProducts () {
      this.$store.dispatch(types.PRODUCTCEOLLECTION_POST_LOADMORE)
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>
