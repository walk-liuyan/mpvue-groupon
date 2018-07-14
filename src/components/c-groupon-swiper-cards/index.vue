<template>
    <div
      class="c-groupon-swiper-cards"
      v-if="onGrouponList && onGrouponList.length > 0">
        <p>今日拼团</p>
        <swiper style="height:487.5px;" :indicator-dots="indicatorDots" :vertical="vertical" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
            <div v-for="item in onGrouponList" :key="index">
                <swiper-item>
                    <c-groupon-swiper-product-cards :items="item"></c-groupon-swiper-product-cards>
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
import cGrouponSwiperProductCards from '@/components/c-groupon-swiper-product-cards'
import { mapState } from 'vuex'

export default {
  components: {
    cGrouponSwiperProductCards
  },
  computed: {
    ...mapState({
      onGrouponList: state => state.groupon.onGroupon.data
    })
  },
  data () {
    return {
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      vertical: true
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>