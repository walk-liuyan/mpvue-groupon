<template>
  <div class="c-address-cards">
    <div
      class="c-address-cards__item"
      v-for="(item, index) in items"
      :key="index"
      @click="chooseCurAddress(item)">
      <p>
        <span>{{ item.receiver_name }}</span>
        <span>{{ item.mobile }}</span>
      </p>
      <p>
        {{item.country}}
        {{item.state_province}}
        {{item.city}}
        {{item.district}}
        {{item.address}}
      </p>
      <p>
        <img src="/static/image/icon/edit.png" @click.stop="editAddress(item)">
      </p>
      <span
        class="default-icon"
        v-if="item.is_set_as_default">默认地址
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
    chooseCurAddress (item) {
      this.$emit('chooseCurAddress', item)
    },
    editAddress (item) {
      this.$emit('itemCardClick', item)
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>
