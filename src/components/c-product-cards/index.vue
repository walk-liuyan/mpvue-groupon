<template>
  <div class="c-product-cards">
    <a
      v-if="items"
      v-for="(item, index) in items"
      :key="index"
      @click="goToProductDetail(item)">
      <figure>
        <img :src="item.product_main_image_url" mode="aspectFill">
      </figure>
    </a>
  </div>
</template>

<script>
import { device } from '@/utils'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      device
    }
  },
  methods: {
    getItems () {
      this.$emit('get-items')
    },
    goToProductDetail (item) {
      /*
      view = groupon 说明视角是要拼团
      view = normal 说明正常显示拼团和立即购买
      */
      wx.navigateTo({
        url: `/pages/product?id=${item.product_id}&view=normal`
      })
    },
    starItemProduct (index) {
      this.$emit('starItemProduct', index)
    }
  },
  created () {
    this.getItems()
  }
}
</script>
<style lang="scss">
@import './style';
</style>
