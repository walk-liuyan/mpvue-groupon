<template>
  <div class="c-groupon-cards">
    <div class="groupon-item" v-for="(item, index) in items" :key="index">
      <div class="groupon-item__avatar"><img :src="item.host_profile_image_url" mode="aspectFit"></div>
      <div class="groupon-item__info">
        <p>{{ item.host_display_name }}</p>
        <p>还差{{ item.still_need_people_amount }}人成团</p>
        <p>剩余 {{ item.countDownTimeObj.day }} : {{ item.countDownTimeObj.hou }} : {{ item.countDownTimeObj.min }} : {{ item.countDownTimeObj.sec }}</p>
      </div>
      <div class="groupon-item__btn" @click.stop="intoGrouponProduct(item)">
        <span>拼团</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    intoGrouponProduct (item) {
      this.$emit('intoGrouponProduct', item)
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>