<template>
  <div class="c-pay-res-status">
    <div class="pay-res__pay-success" v-if="status==='paySuccess'">
      <img src="/static/image/icon/local.png" mode="widthFix">
      <span>付款成功！</span>
    </div>
    <div class="pay-res__pay-error" v-if="status==='payError'"></div>
    <div class="pay-res__group-success" v-if="status==='groupSuccess'">
      <img src="/static/image/icon/local.png" mode="widthFix">
      <span>拼团成功！</span>
    </div>
    <div class="pay-res__group-error" v-if="status==='groupSuccess'">
      <img src="/static/image/icon/local.png" mode="widthFix">
      <span>很遗憾，拼团结束!</span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'c-pay-res-status',
  props: {
    status: {
      type: String,
      default: 'paySuccess'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
