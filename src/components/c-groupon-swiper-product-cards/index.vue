<template>
  <div class="c-groupon-swiper-product-cards">
    <div
      class="c-groupon-swiper-product-cards__item"
      v-for="(item, index) in items"
      :key="index"
      @click="goToProductDetail(item)">
      <div class="img">
        <img :src="item.product_main_image_url" mode="aspectFit">
      </div>
      <div class="info">
        <div class="title">{{ item.product_short_name }}</div>
        <div class="price">
          <span>还差 {{ item.still_need_people_amount }} 人成团</span>
          <span>AUD {{ item.default_shop_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-groupon-swiper-product-cards',
  data () {
    return {

    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  created () {

  },
  methods: {
    goToProductDetail (item) {
      /*
      view = groupon 说明视角是要拼团
      view = normal 说明正常显示拼团和立即购买
      */
      wx.navigateTo({
        url: `/pages/product?id=${item.group_buying_record_id}&view=groupon`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
