<template>
  <div class="c-order-card-item">
    <div class="content__item" v-for="(itemOrder, indexOrder) in items" :key="indexOrder">
      <div class="order-item__avatar">
        <img :src="itemOrder.product.product_main_image_url" mode="aspectFit">
      </div>
      <div class="order-item__info">
        <p>{{ itemOrder.product.product_full_name }}</p>
        <p>{{ itemOrder.product_subtypes_display }}</p>
        <p>AUD {{ itemOrder.product.default_shop_price }}</p>
      </div>
      <div class="order-item__num">
        <span>x {{ itemOrder.product_quantity }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-order-card-item',
  data () {
    return {}
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
