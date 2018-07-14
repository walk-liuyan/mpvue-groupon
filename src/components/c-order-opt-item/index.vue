<template>
  <div class="c-order-opt-item">
    <span :class="{
        'toComplaint': itemOpt.operation_type === 'to_complaint',
        'toDel': itemOpt.operation_type === 'to_delete_by_customer',
        'toRemind': itemOpt.operation_type === 'to_remind_deliver',
        'toPay': itemOpt.operation_type === 'to_pay',
        'toCancel': itemOpt.operation_type === 'to_cancel',
        'toUploadId': itemOpt.operation_type === 'to_upload_id',
        'toGroup': itemOpt.operation_type === 'to_invite_people_to_group'
      }"
      v-for="(itemOpt, indexOpt) in items"
      v-if="itemOpt.operation_type !== 'to_upload_id'"
      :key="indexOpt" @click.stop="optOrder(itemOpt)">
      {{ itemOpt.operation_text_zh || itemOpt.operation_text }}
      <button
        open-type="contact"
        v-if="itemOpt.operation_type === 'to_complaint'">
        联系理事
      </button>
    </span>
  </div>
</template>

<script>
import orderApi from '@/utils/api/order'

export default {
  name: 'c-order-opt-item',
  props: {
    orderItem: {
      type: Object,
      default: {}
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    optOrder (option) {
      console.log('option', option.operation_type)
      switch (option.operation_type) {
        case 'to_check_shipping':
          this.checkShipping()
          break
        case 'to_delete_by_customer':
          this.delOrder()
          break
        case 'to_remind_deliver':
          this.remindDeliver()
          break
        case 'to_pay':
          this.payOrder()
          break
        case 'to_cancel':
          this.cancelOrder()
          break
        case 'to_invite_people_to_group':
          break
        case 'to_confirm_receiving':
          this.receiveOrder()
          break
      }
    },
    receiveOrder () {
      orderApi.receiveOrder(this.orderItem.order_id).then(res => {
        console.log(res)
        if (res.code === 0) {
          wx.showModal({
            content: '收货成功！',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    },
    checkShipping () {
      wx.navigateTo({
        url: `/pages/check-shipping?id=${this.orderItem.order_id}`
      })
    },
    delOrder () {
      wx.showModal({
        title: '友情提示',
        content: '确定删除订单吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: res => {
          console.log(res)
          if (res.confirm) {
            orderApi.delOrder(this.orderItem.order_id).then(res => {
              console.log(res)
              this.$emit('refreshOrder')
            })
          } else {
            console.log('取消')
          }
        }
      })
    },
    cancelOrder () {
      wx.showModal({
        title: '友情提示',
        content: '订单还未付款，确定要取消吗？',
        confirmText: '在考虑下',
        cancelText: '取消订单',
        success: res => {
          console.log(res)
          if (res.confirm) {
            console.log('用户点击了在考虑下')
          } else {
            const data = {
              order_cancel_reason: ''
            }
            orderApi.cancelOrder(this.orderItem.order_id, data).then(res => {
              console.log(res)
              this.$emit('refreshOrder')
            })
          }
        }
      })
      console.log('cancelOrder', this.orderItem)
    },
    payOrder () {},
    remindDeliver () {
      orderApi.remindOrder(this.orderItem.order_id).then(res => {
        console.log(res)
        if (res.code === 0) {
          wx.showModal({
            content: '提醒成功',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      })
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
