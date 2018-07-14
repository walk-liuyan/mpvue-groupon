<template>
    <div class="c-product-counter">
        <span @click.stop="subtractionNum">-</span>
        <input v-model="number" type="number" @input="changeNum" @change="changeNum" maxlength="99">
        <span @click.stop="addNum">+</span>
    </div>
</template>
<script>
export default {
  data () {
    return {
      number: 1
    }
  },
  props: {
    productData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    changeNum () {
      if (parseInt(this.number) <= 1) {
        this.number = 1
      }
      if (parseInt(this.number) >= 99) {
        this.number = 99
      }
      if (this.number === '') {
        this.number = 1
      }
      this.transNum()
    },
    subtractionNum () {
      if (parseInt(this.number) <= 1) {
        this.number = 1
      } else {
        this.number--
      }
      this.transNum()
    },
    addNum () {
      if (parseInt(this.number) >= 99) {
        this.number = 99
      } else {
        this.number++
      }
      this.transNum()
    },
    transNum () {
      this.$emit('transNum', this.number)
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>