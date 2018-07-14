<template>
  <div class="p-check-shipping">

  </div>
</template>

<script>
import shippingApi from '@/utils/api/shipping'

export default {
  name: 'p-check-shipping',
  data () {
    return {

    }
  },
  created () {

  },
  onLoad (options) {
    shippingApi.checkShipping(options.id).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
