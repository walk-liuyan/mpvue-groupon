<template>
    <div class="c-order-cards">
        <div
            v-if="items && items.length > 0"
            class="order-item__full"
            v-for="(item, index) in items"
             @click="goToOrderDetail(item)"
            :key="index">
            <div class="order-item-title">
                <span>订单编号: {{ item.order_id }}</span>
                <span>{{ item.order_center_status_hint }}</span>
            </div>
            <c-order-card-item :items="item.order_items"></c-order-card-item>
            <div class="order-item-opt">
                <p>
                    <span>共 {{ item.product_exclude_refund_quantity }} 件商品 合计(含运费)：</span>
                    <span>AUD {{ item.default_actually_should_pay_amount }}</span>
                </p>
                <div>
                    <c-order-opt-item
                      :orderItem="item"
                      :items="item.customer_order_operations"
                      @refreshOrder="refreshOrder">
                    </c-order-opt-item>
                </div>
            </div>
        </div>
        <div class="order-item__empty" v-if="items && items.length === 0">
            <img src="/static/image/icon/order-empty.png">
            <span>还没有相关的订单</span>
        </div>
    </div>
</template>
<script>
import cOrderCardItem from '@/components/c-order-card-item'
import cOrderOptItem from '@/components/c-order-opt-item'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  components: {
    cOrderCardItem,
    cOrderOptItem
  },
  data () {
    return {}
  },
  methods: {
    refreshOrder () {
      this.$emit('refreshOrder')
    },
    goToOrderDetail (item) {
      wx.navigateTo({
        url: `/pages/order-detail?id=${item.order_id}`
      })
    }
  },
  created () {
    // this.getItems()
  }
}
</script>
<style lang="scss">
@import './style';
</style>

