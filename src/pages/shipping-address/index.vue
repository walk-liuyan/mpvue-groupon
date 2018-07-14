<template>
  <div class="c-address"
    :class="{
      'c-address__is-iphonex': device.isMiniProgramIsIPhoneX
    }"
    :style="{ minHeight: windowHeight + 'px'}">
    <c-address-cards
      @chooseCurAddress="chooseCurAddress"
      @itemCardClick="itemCardClick"
      :items="addressCardsData">
    </c-address-cards>
    <c-modal-address
      v-if="modalAddress"
      :optType="optType"
      :curAddressInfo="curAddressInfo"
      @reverseModal="reverseModal"
      @delAddressItem="delAddressItem"
      @editAddress="editAddress">
    </c-modal-address>
    <div class="c-address__add" @click="addNewAddress">新增收货地址</div>
  </div>
</template>

<script>
import cAddressCards from '@/components/c-address-cards'
import cModalAddress from '@/components/c-modal-address'
import * as types from '@/store/mutation-types'
import { mapState } from 'vuex'
import { device } from '@/utils'
import addressApi from '@/utils/api/address'

export default {
  components: {
    cAddressCards,
    cModalAddress
  },
  data () {
    return {
      device,
      windowHeight: 0,
      modalAddress: false,
      optType: '',
      addressCardsData: [],
      curAddressInfo: {}
    }
  },
  onLoad () {
    this.initAddressList()
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight
      }
    })
  },
  computed: {
    ...mapState({
      readyForGrouponProducts: state => state.home.readyForGroupon
    })
  },
  methods: {
    chooseCurAddress (addressItem) {
      this.$store.dispatch(types.PREORDER_POST_ADDRESS, { address: addressItem })
      wx.navigateTo({
        url: `/pages/preorder`
      })
    },
    itemCardClick (addressItem) {
      this.optType = 'edit'
      this.curAddressInfo = addressItem
      this.reverseModal()
    },
    addNewAddress () {
      this.optType = 'add'
      this.curAddressInfo = {
        country: 'Australia',
        state_province: '',
        city: '',
        district: '',
        address: '',
        zipcode: '',
        mobile: '',
        tel: '',
        receiver_name: '',
        is_set_as_default: false
      }
      this.reverseModal()
    },
    delAddressItem (id) {
      addressApi.delAddress(id).then((res) => {
        if (res.code === 0) {
          this.reverseModal()
          this.initAddressList()
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    },
    editAddress (addressItem, optTypeVal) {
      /* 编辑地址 */
      if (optTypeVal === 'add') {
        addressApi.createAddress(addressItem).then(res => {
          if (res.code === 0) {
            this.reverseModal()
            this.initAddressList()
          } else {
            wx.showToast({
              title: res.message,
              image: '/static/image/icon/warn.png',
              duration: 2000
            })
          }
        })
      } else {
        addressApi.updateAddress(addressItem.address_id, addressItem).then(res => {
          if (res.code === 0) {
            this.reverseModal()
            this.initAddressList()
          } else {
            wx.showToast({
              title: res.message,
              image: '/static/image/icon/warn.png',
              duration: 2000
            })
          }
        })
      }
    },
    initAddressList () {
      addressApi.getAddressList().then(res => {
        if (res.code === 0) {
          this.addressCardsData = res.data.addresses
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    },
    reverseModal () {
      this.modalAddress = !this.modalAddress
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>
