<template>
  <div class="c-modal-address">
    <div class="content">
      <span class="close-icon" @click="closeModal">
        <img src="/static/image/icon/close.png" mode="aspectFit">
      </span>
      <p class="title">
        <span v-if="optType==='add'">添加收货新地址</span>
        <span v-if="optType==='edit'">编辑收货地址</span>
      </p>
      <section class="user-info">
        <div>
          <span>联系人：</span>
          <input placeholder="请输入姓名..." v-model="curAddressInfo.receiver_name">
        </div>
        <div>
          <span>手机号码：</span>
          <input placeholder="请输入电话..." v-model="curAddressInfo.mobile">
        </div>
        <div>
          <span>选择地区：</span>
          <p @click.stop="showPickerView">
            {{ curAddressInfo.city }} {{ curAddressInfo.district }}
          </p>
        </div>
        <div>
          <span>详细地址：</span>
          <input placeholder="输入地址或点击地图选择 -->" v-model="curAddressInfo.address">
          <img src="/static/image/icon/local.png" mode="widthFix" @click.stop="getUserLocation">
        </div>
        <div>
          <span>邮编：</span>
          <input placeholder="请输入邮编..." v-model="curAddressInfo.zipcode">
        </div>
        <div class="switch">
          <span>设为默认：</span>
          <switch @change="switchChange" v-model="curAddressInfo.zipcode" />
        </div>
        <div class="del" @click.stop="delAddress()" v-if="optType==='edit'">删除</div>
        <div class="btn" @click.stop="saveAddress">保存</div>
      </section>
    </div>
    <div class="c-picker">
      <div :class="{'pickerMask':isShowMask}" @click="maskClick" catchtouchmove="true"></div>
      <div class="weui-picker" :class="{'weui_picker_view_show':pickerShow}">
        <div class="weui-picker__hd">
          <div href="javascript:;" class="weui-picker__action" @click="pickerCancel">取消</div>
          <div href="javascript:;" class="weui-picker__action" @click="pickerConfirm">确定</div>
        </div>
        <picker-view indicator-style="height: 40px;" :value="pickerValue" class="weui_picker_view" @change="pickerChange">
          <picker-view-column>
            <div class="picker-item" v-for="item in columuOne" :key="index">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="item in columnTwo" :key="index">{{item}}</div>
          </picker-view-column>
        </picker-view>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import australiaAreaList from './australiaAreaList'
import { device } from '@/utils'
export default {
  data() {
    return {
      device,
      pickerShow: false,
      isShowMask: false,
      pickerValue: [0, 0],
      australiaAreaList: australiaAreaList.value,
      columuOne: [],
      columnTwo: []
    }
  },
  props: {
    optType: {
      type: String,
      default: 'add'
    },
    curAddressInfo: {
      type: Object,
      default: {
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
    }
  },
  mounted() {
    this._initPicker()
  },
  methods: {
    switchChange(e) {
      this.curAddressInfo.is_set_as_default = e.mp.detail.value
    },
    closeModal() {
      this.$emit('reverseModal')
    },
    delAddress() {
      this.$emit('delAddressItem', this.curAddressInfo.address_id)
    },
    saveAddress() {
      const judgeVal = this._judgeEmptyValue()
      if (!judgeVal) {
        wx.showToast({
          title: '请完整填写地址',
          image: '/static/image/icon/warn.png',
          duration: 3000,
          mask: true
        })
      } else {
        this.$emit('editAddress', this.curAddressInfo, this.optType)
      }
    },
    pickerChange(e) {
      let _this = this
      let value = e.mp.detail.value
      // 如果是第一列滚动
      if (value[0] !== _this.pickerValue[0]) {
        let columnTwoNew = _this.australiaAreaList[value[0]].children
        _this.columnTwo = []
        for (let i = 0; i < columnTwoNew.length; i++) {
          _this.columnTwo.push(columnTwoNew[i].label)
        }
        _this.pickerValue = value
        _this.pickerValue[1] = 0
      }
      // 如果第二列滚动
      if (value[1] !== this.pickerValue[1]) {
        _this.pickerValue[1] = e.mp.detail.value[1]
      }
    },
    pickerConfirm() {
      this.curAddressInfo.city = this.australiaAreaList[this.pickerValue[0]].label
      this.curAddressInfo.district = this.australiaAreaList[this.pickerValue[0]].children[this.pickerValue[1]].label
      this.isShowMask = false
      this.pickerShow = false
    },
    pickerCancel() {
      this.isShowMask = false
      this.pickerShow = false
    },
    showPickerView() {
      this.isShowMask = true
      this.pickerShow = true
    },
    _initPicker() {
      let _this = this
      let australiaAreaList = this.australiaAreaList
      for (let i = 0; i < australiaAreaList.length; i++) {
        _this.columuOne.push(australiaAreaList[i].label)
      }
      // 渲染第二列
      let columnTwoArray = australiaAreaList[_this.pickerValue[0]].children
      for (let i = 0; i < columnTwoArray.length; i++) {
        _this.columnTwo.push(columnTwoArray[i].label)
      }
    },
    _judgeEmptyValue() {
      let val = false
      for ( let item in this.curAddressInfo ) {
        if (this.curAddressInfo[item] === '') {
          val = false
        } else {
          val = true
        }
      }
      return val
    },
    getUserLocation() {
      wx.authorize({
        scope: 'scope.userLocation',
        success: () => {
          wx.chooseLocation({
            success: res => {
              this.curAddressInfo.address = res.name
            }
          })
        },
        fail: e => wx.showToast({ title: e })
      })
    }
  }
}
</script>

<style lang="scss">
@import './style';
.c-picker {
  position: relative;
}
.weui-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.weui_picker_view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
.weui-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.weui-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
  cursor: pointer;
}
.weui-picker__action:first-child {
  text-align: left;
  color: #888;
}
.weui-picker__action:last-child {
  text-align: right;
}
.weui-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.weui_picker_view_show {
  transform: translateY(0);
}
.picker-item {
  text-align: center;
  line-height: 40px;
}
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>

