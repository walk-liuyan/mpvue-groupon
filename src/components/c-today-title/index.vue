<template>
  <div class="c-today-title">
    {{ time }} 星期{{ week }}
  </div>
</template>

<script>
import { formatTime, formatWeek } from '@/utils/utils'

export default {
  name: 'c-today-title',
  data () {
    return {
      time: '',
      week: ''
    }
  },
  props: {

  },
  created () {

  },
  onLoad () {
    this.time = formatTime(new Date())
    this.week = formatWeek(new Date())
  }
}
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
