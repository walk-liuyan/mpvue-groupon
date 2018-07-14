<template>
  <div>
    <button @click="callPhone">打电话</button>
    <button @click="chooseImg">chooseImg</button>
    <button open-type="openSetting">打开授权设置页</button>
    <button open-type="contact">联系客服</button>
    <button open-type="share">分享</button>
    <button @click="getUserAddress">address</button>
    <open-data type="userAvatarUrl"></open-data>
    <open-data type="userNickName"></open-data>
    <!-- 需要使用 button 来授权登录 -->
    <button v-if="canIUse"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="bindGetUserInfo">授权登录
    </button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  onLoad () {
    console.log('onload')
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('success getUserInfo')
              console.log(res)
            }
          })
        }
      }
    })
  },
  methods: {
    callPhone () {
      wx.hideTabBar()
      wx.makePhoneCall({
        phoneNumber: '13775131802'
      })
    },
    chooseImg () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          console.log('tempFilePaths', res.tempFilePaths)
        }
      })
    },
    bindGetUserInfo (e) {
      console.log(e.target.userInfo)
    },
    getUserAddress () {
      wx.authorize({
        scope: 'scope.address',
        success: () => {
          console.log('success')
          wx.chooseAddress({
            success: (res) => {
              console.log(res)
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
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
@import "./style";
</style>
