<template>
  <div class="c-modal-pickup">
    <div class="content">
      <p class="title">自提点选择
        <img src="/static/image/icon/close.png" @click="reverseModalPickUp()">
      </p>
      <div class="c-modal-pickup__item" v-for="item in preOrders.group_buying_info.pick_up_location" @click="choosePickAddress(item)">
        <div class="address">
          <p>{{ item.display_address }}</p>
        </div>
        <div class="choose">
          <img src="/static/image/icon/choose.png" v-if="item.display_address === selfPickInfo.picker_address">
          <img src="/static/image/icon/unChoose.png" v-else>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'c-modal-pickup',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      preOrders: state => state.preorder.preOrder
    })
  },
  props: {
    selfPickInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    choosePickAddress (item) {
      this.$emit('choosePickAddress', item)
    },
    reverseModalPickUp () {
      this.$emit('reverseModalPickUp')
    }
  },
  created () {
    if (this.selfPickInfo.picker_address === '') {

    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
