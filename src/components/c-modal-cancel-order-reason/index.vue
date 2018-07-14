<template>
  <div class="c-modal-cancel-order-reason">
    <div class="content">
      <p>请选择取消原因</p>
      <div v-for="(item, index) in cancelOrderReason" @click="chooseReason(item)">
        <span>{{item}}</span>
        <img src="/static/image/icon/choose.png" v-if="reason === item">
        <img src="/static/image/icon/unChoose.png" v-else>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-modal-cancel-order-reason',
  data () {
    return {
      reason: '',
      cancelOrderReason: [
        '34u23iu4oi23u4oi23u4',
        '34u23iu4oi23u4oi23u4',
        '34u23iu4oi23u4oi23u4'
      ]
    }
  },
  methods: {
    chooseReason (txt) {
      this.reason = txt
      this.$emit('chooseReason', txt)
    }
  },
  props: {},
  created () {}
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
