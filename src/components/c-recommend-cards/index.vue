<template>
    <div class="c-recommend-cards">
        <div class="c-recommend-cards__item" v-for="(item, index) in items" :key="index" @click="goToProductDetail(item)">
            <div class="product-img">
                <img :src="item.product_main_image_url">
            </div>
            <div class="product-info" >
                <p>{{ item.product_short_name }}</p>
                <p>AUD {{ item.default_shop_price }}</p>
                <p>
                    <span>参与拼团</span>
                </p>
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
      wx.navigateTo({
        url: `/pages/product?id=${item.group_buying_record_id}&view=groupon`
      })
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>
