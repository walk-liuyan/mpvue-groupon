<template>
    <div class="c-preorder-pay">
        <div
          class="c-preorder-pay__tips"
          v-if="preOrders.is_group_buying===true">规定时间内，拼团不成功，钱原路返回。
        </div>
        <div class="c-preorder-pay__money">
            <span>合计：AUD {{ preOrders.pre_orders.pre_orders_options[preOrders.pre_orders.default_options_index].discount_amount }}</span>
            <span @click="choosePayMethod">立即支付</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      preOrders: state => state.preorder.preOrder
    })
  },
  methods: {
    choosePayMethod () {
      this.$emit('choosePayMethod')
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>