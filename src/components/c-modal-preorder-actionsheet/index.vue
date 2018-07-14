<template>
  <div class="c-modal-preorder-actionsheet">
    <div class="content">
      <div @click="chooseAction('wx')">
        <span>微信支付</span>
        <span>{{ preOrders.currency_exchange_display }}</span>
      </div>
      <div
        v-if="pickSelf === true"
        @click="chooseAction('merchant')">
        到店付款
      </div>
      <div @click="chooseAction('cancel')">取消</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'c-modal-preorder-actionsheet',
  props: {
    /*
    自提 = true
    邮寄 = false
    */
    pickSelf: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      preOrders: state => state.preorder.preOrder
    })
  },
  methods: {
    chooseAction (option) {
      this.$emit('chooseAction', option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
