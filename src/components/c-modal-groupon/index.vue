<template>
  <div
    class="c-modal-groupon"
    catchtouchmove="move">
    <div class="content">
       <div class="c-product-detail-groupon__swiper">
        <div class="c-product-detail-groupon__swiper__head">
          <span>{{ count }}人正在拼团，直接拼团</span>
          <img
            src="/static/image/icon/close.png"
            mode="aspectFit"
            @click="reverseModal">
        </div>
        <div class="c-product-detail-groupon__swiper__content">
          <swiper style="height:320px;" :indicator-dots="false" :vertical="true" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
            <div v-for="item in items" :key="index">
              <swiper-item>
                <c-groupon-cards
                  :items="item"
                  @intoGrouponProduct="intoGrouponProduct">
                </c-groupon-cards>
              </swiper-item>
            </div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cGrouponCards from '@/components/c-groupon-cards'

export default {
  name: 'c-modal-groupon',
  components: {
    cGrouponCards
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
  },
  methods: {
    intoGrouponProduct (item) {
      this.$emit('intoGrouponProduct', item)
    },
    reverseModal () {
      this.$emit('reverseModal')
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: []
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
