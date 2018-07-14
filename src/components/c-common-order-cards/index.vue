<template>
    <div class="c-common-order-cards">
        <div class="order-item">
            <div class="order-item-content" v-for="(item, index) in items.pre_order_product_items" :key="index">
                <div class="order-item__avatar">
                    <img :src="item.product.product_main_image_url" mode="aspectFit">
                </div>
                <div class="order-item__info">
                    <p>{{ item.product.product_full_name }}</p>
                    <!-- <p>重量: {{ item.product.product_weight_kg }} kg</p> -->
                    <p>{{ item.product_subtypes_display }}</p>
                    <p>AUD {{ item.product.default_shop_price }}</p>
                </div>
                <div class="order-item__num">
                    <span>x {{ item.product_quantity }}</span>
                </div>
            </div>
            <p class="order-item-postage">
                <span>直邮运费</span>
                <span>AUD {{ items.default_shipping_fee }}</span>
            </p>
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
  }
}
</script>
<style lang="scss">
@import './style';
</style>

