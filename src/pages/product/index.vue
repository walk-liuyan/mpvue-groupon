<template>
  <div class="c-product">
    <c-authorize-cover v-if="userInfo.accessToken === ''"></c-authorize-cover>
    <c-modal-groupon
      v-if="showModalGroupon"
      :items="itemProductGroupon"
      :count="productGrouponList.length"
      @intoGrouponProduct="intoGrouponProduct"
      @reverseModal="reverseShowModalGroupon">
    </c-modal-groupon>
    <c-product-attr v-if="showChooseAtrr" :view="viewOption" :productData="productData" @closeClick="closeClick" @chooseGroupon="chooseGroupon">
    </c-product-attr>
    <div class="c-product-detail" v-if="productData.product">
      <div class="c-product-detail__swiper">
        <div class="c-product-detail__menu">
          <img src="/static/image/icon/star.png" mode="aspectFit" v-if="productData.is_collected" @click="removeProductCollection">
          <img src="/static/image/icon/userUnStar.png" mode="aspectFit" v-else @click="addProductCollection">
          <img src="/static/image/icon/groupon.png" mode="aspectFit" @click="chooseGroupon">
        </div>
        <swiper style="height:494px;" :indicator-dots="swiperConfig.indicatorDots" :vertical="swiperConfig.vertical" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration" :circular="swiperConfig.circular" @change="swiperChange" @animationfinish="animationfinish">
          <div v-if="productData.product.product_gallery_image_urls && productData.product.product_gallery_image_urls.length > 0" v-for="item in productData.product.product_gallery_image_urls" :key="index">
            <swiper-item>
              <img :src="item" class="slide-image" />
            </swiper-item>
          </div>
        </swiper>
      </div>
      <dl class="c-product-detail__baseinfo">
        <dt>{{ productData.product.product_full_name }}</dt>
      </dl>
      <div class="c-product-detail-groupon" v-if="itemProductGroupon && itemProductGroupon.length > 0">
        <span>
          <img :src="itemProductGroupon[0][0].host_profile_image_url" v-if="itemProductGroupon && itemProductGroupon[0] && itemProductGroupon[0][0]">
          <img :src="itemProductGroupon[0][1].host_profile_image_url" v-if="itemProductGroupon && itemProductGroupon[0] && itemProductGroupon[0][1]">
          <img :src="itemProductGroupon[0][2].host_profile_image_url" v-if="itemProductGroupon && itemProductGroupon[0] && itemProductGroupon[0][2]">
          <a>正在拼团</a>
        </span>
        <span @click="reverseShowModalGroupon">查看全部</span>
      </div>
      <div
        class="c-product-detail-picList"
        :class="{
        'c-product-detail-picList__is-iphonex': device.isMiniProgramIsIPhoneX
        }">
        <img v-for="(item, index) in productData.product.product_desc_image_urls" :key="index" :src="item" mode="widthFix">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import cProductAttr from '@/components/c-product-attr'
import cModalGroupon from '@/components/c-modal-groupon'
import cAuthorizeCover from '@/components/c-authorize-cover'
import grouponApi from '@/utils/api/groupon'
import productApi from '@/utils/api/product'
import { device } from '@/utils'
import * as types from '@/store/mutation-types'
import { mapState } from 'vuex'

export default {
  components: {
    cProductAttr,
    cModalGroupon,
    cAuthorizeCover
  },
  data() {
    return {
      device,
      swiperConfig: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 900,
        circular: true,
        vertical: false
      },
      productId: '',
      viewOption: '',
      productData: {},
      showChooseAtrr: false,
      showModalGroupon: false,
      itemProductGroupon: [],
      productGrouponList: [],
      setTimeoutTimer: null
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user
    })
  },
  onShareAppMessage() {
    return {
      title: this.productData.product.product_full_name,
      path: `/pages/product?id=${this.productId}&view=${this.viewOption}`,
      success: () => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 500
        })
      }
    }
  },
  onUnload() {
    this.showChooseAtrr = false
    this.showModalGroupon = false
    clearTimeout(this.setTimeoutTimer)
  },
  onHide() {
    this.showChooseAtrr = false
    this.showModalGroupon = false
    clearTimeout(this.setTimeoutTimer)
  },
  methods: {
    intoGrouponProduct (item) {
      this.viewOption = 'groupon'
      this.productId = item.group_buying_record_id
      this.getGrouponProductDetail(this.productId)
      this.showChooseAtrr = true
      this.showModalGroupon = false
    },
    timeFormat(param) {
      //小于10的格式化函数
      return param < 10 ? '0' + param : param
    },
    countDown() {
      let countDownArr = []
      let newTime = new Date().getTime()
      this.productGrouponListTemp.forEach(item => {
        item.endTime = 1531559122
        let endTime = item.endTime * 1000
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt((time % (60 * 60 * 24)) / 3600)
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else {
          //活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        item.countDownTimeObj = obj
        countDownArr.push(item)
      })
      this.productGrouponList = countDownArr
      this.setTimeoutTimer = setTimeout(this.countDown, 1000)
    },
    removeProductCollection() {
      this.productData.is_collected = !this.productData.is_collected
      this.$store.dispatch(types.PRODUCTCEOLLECTION_DEL_REMOVE, {
        id: this.productData.product.product_id
      })
    },
    addProductCollection() {
      this.productData.is_collected = !this.productData.is_collected
      this.$store.dispatch(types.PRODUCTCEOLLECTION_POST_ADD, {
        id: this.productData.product.product_id
      })
    },
    reverseShowModalGroupon() {
      this.showModalGroupon = !this.showModalGroupon
    },
    closeClick() {
      this.showChooseAtrr = !this.showChooseAtrr
    },
    chooseGroupon(type, productQuantity, productSubTypeIds) {
      if (this.showChooseAtrr) {
        this.startGroupon(type, productQuantity, productSubTypeIds)
      } else {
        this.closeClick()
      }
    },
    startGroupon(
      type = 'startGroup',
      productQuantity = 1,
      productSubTypeIds = ''
    ) {
      let preOrderData
      if (type === 'startGroup') {
        preOrderData = {
          quantity: productQuantity,
          product_id: this.productData.product.product_id,
          is_group_buying: true,
          target_people_amount:
            this.productData.product.group_buying_info.group_scheme[0]
              .target_people_amount || 8,
          subtype_item_ids: productSubTypeIds
        }
      } else if (type ==='partakeGroup') {
        preOrderData = {
          group_buying_record_id: this.productId,
          quantity: productQuantity,
          product_id: this.productData.product.product_id,
          is_group_buying: true,
          target_people_amount:
            this.productData.product.group_buying_info.group_scheme[0]
              .target_people_amount || 8,
          subtype_item_ids: productSubTypeIds
        }
      } else {
        preOrderData = {
          quantity: productQuantity,
          product_id: this.productData.product.product_id,
          subtype_item_ids: productSubTypeIds,
          is_group_buying: false
        }
      }
      this.$store.dispatch(types.PREORDER_POST, { preOrderData })
    },
    getNoramlProductDetail(id) {
      productApi.getNormalProduct(id).then(res => {
        if (res.code === 0) {
          this.productData = res.data
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    },
    getGrouponProductDetail(id) {
      productApi.getGrouponProduct(id).then(res => {
        if (res.code === 0) {
          this.productData = res.data
          this.showChooseAtrr = true
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
  onShow () {
    // 获取当前商品正在拼团的组团情况
    grouponApi.getItemProductGroupon(this.productId).then(res => {
      if (res.code === 0) {
        this.productGrouponListTemp = res.data.groups
        this.countDown()
        let result = []
        for (let i = 0, len = this.productGrouponList.length; i < len; i += 3) {
          result.push(res.data.groups.slice(i, i + 3))
        }
        this.itemProductGroupon = result
      }
    })
  },
  onLoad(options) {
    // getProduct params => options.id, options.view
    this.viewOption = options.view
    this.productId = options.id
    if (this.viewOption === 'normal') {
      this.getNoramlProductDetail(this.productId)
    } else {
      this.getGrouponProductDetail(this.productId)
    }
  }
}
</script>

<style lang="scss">
@import './style';
</style>
