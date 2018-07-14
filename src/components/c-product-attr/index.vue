<template>
  <div catchtouchmove="move" class="c-product-attr" :class="{
      'c-product-attr__is-iphonex': device.isMiniProgramIsIPhoneX
    }">
    <div class="content">
      <img class="close" src="/static/image/icon/close.png" mode="widthFix" @click.stop="closeClick">
      <div class="product-info">
        <div class="product-info__img">
          <img :src="productData.product.product_main_image_url" mode="aspectFill" >
        </div>
        <div class="product-info__price">
          <span>AUD {{ productData.product.group_buying_price }}</span>
          <span>已选择数量：{{ productQuantity }}</span>
        </div>
      </div>
      <p class="grouponTips">发起<span>{{ productData.product.group_buying_info.group_scheme[0].target_people_amount || 8 }}</span>人拼团，成团有奖</p>
      <div class="product-subtype" v-if="productData.product.product_subtypes && productData.product.product_subtypes.length>0">
        <div class="product-subtype__item" v-for="(item, index) in productData.product.product_subtypes" :key="index">
          <p>{{ item.default_subtype_name }}</p>
          <div class="item-checker">
            <span :class="{
               'checked': curChooseSubtypeData[index].totalData.default_subtype_item_name === i.default_subtype_item_name
              }" v-for="(i, key) in item.product_subtype_items" @click.stop="chooseCurSubtype(index, i)" :key="key">
              {{ i.default_subtype_item_name }}
            </span>
          </div>
        </div>
      </div>
      <div class="product-attr">
        <p>数量</p>
        <c-product-counter @transNum="transNum"></c-product-counter>
      </div>
      <div class="c-product-detail-tabbar">
        <button open-type="contact">联系理事</button>
        <div class="tabbar__option">
          <span>
            <img src="/static/image/tabbar/chat.png" >
            <a>理事</a>
          </span>
        </div>
        <div class="tabbar__buy" v-if="view === 'normal'">
          <span
            @click.stop="chooseGroupon('startGroup')">
            <a>发起拼团</a>
            <a>AUD {{ productData.product.group_buying_price }}</a>
          </span>
          <span @click.stop="chooseGroupon('buynow')">
            <a>立即购买</a>
            <a>AUD {{ productData.product.default_shop_price }}</a>
          </span>
        </div>
        <div class="tabbar__buy" v-else>
          <span
            @click.stop="chooseGroupon('partakeGroup')">
            <a>参与拼团</a>
            <a>AUD {{ productData.product.group_buying_price }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { device } from '@/utils'
import cProductCounter from '@/components/c-product-counter'

export default {
  components: {
    cProductCounter
  },
  data () {
    return {
      device,
      productQuantity: 1,
      productSubTypeIds: [],
      curChooseSubtypeData: []
    }
  },
  props: {
    view: {
      type: String,
      default: 'normal'
    },
    productData: {
      type: Object,
      default: () => {}
    }
  },
  onLoad () {
    this._progressCurSubTypeItem()
  },
  methods: {
    chooseGroupon (type) {
      const judgeAttrVal = this._judgeEmptyAttrValue()
      if (!judgeAttrVal) {
        wx.showToast({
          title: '请选择属性',
          image: '/static/image/icon/warn.png',
          duration: 3000,
          mask: true
        })
      } else {
        this.$emit('chooseGroupon', type, this.productQuantity, this.productSubTypeIds.join(','))
      }
    },
    transNum (num) {
      this.productQuantity = parseInt(num)
    },
    chooseCurSubtype (index, item) {
      this.curChooseSubtypeData[index].selectedVal = []
      this.curChooseSubtypeData[index].selectedVal[0] = item.subtype_item_id
      this.curChooseSubtypeData[index].totalData = item
    },
    closeClick () {
      this.$emit('closeClick')
    },
    _judgeEmptyAttrValue () {
      this.productSubTypeIds = []
      let val = false
      for (let item in this.curChooseSubtypeData) {
        if (this.curChooseSubtypeData[item].selectedVal === '') {
          val = false
        } else {
          this.productSubTypeIds.push(this.curChooseSubtypeData[item].selectedVal[0])
          val = true
        }
      }
      if (this.productData.product.product_subtypes && this.productData.product.product_subtypes.length === 0) {
        val = true
      }
      return val
    },
    _progressCurSubTypeItem () {
      for (
        let i = 0;
        i < this.productData.product.product_subtypes.length;
        i++
      ) {
        const itemData = {
          selectedVal: '',
          totalData: {
            default_subtype_item_name: ''
          }
        }
        this.curChooseSubtypeData.push(itemData)
      }
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>