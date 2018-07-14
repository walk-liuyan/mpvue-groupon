<template>
    <div class="c-star-cards">
        <div
            class="c-star__item"
            v-for="(item, index) in items"
            :key="index"
            @click="goToProductDetail(item)">
            <div class="product-img">
                <img :src="item.product_main_image_url" mode="aspectFill">
            </div>
            <div class="product-info">
                <p>{{ item.product_short_name }}</p>
                <p>AUD {{ item.default_shop_price }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goToProductDetail (item) {
      /*
      view = groupon 说明视角是要拼团
      view = normal 说明正常显示拼团和立即购买
      */
      wx.navigateTo({
        url: `/pages/product?id=${item.product_id}&view=normal`
      })
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>
