<template>
  <div class="c-authorize-cover">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
    </button>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types'

export default {
  name: 'c-authorize-cover',
  data () {
    return {}
  },
  props: {},
  methods: {
    bindGetUserInfo (e) {
      console.log(e)
      let wxUserInfo = e.target
      if (wxUserInfo.userInfo) {
        wxUserInfo = e.target.userInfo
        const accessToken = wx.getStorageSync('accessToken')
        if (!accessToken) {
          wx.login({
            success: res => {
              const params = {
                code: res.code,
                device_id: 'mobile app',
                nickname: wxUserInfo.nickName,
                user_gender: wxUserInfo.gender,
                default_user_profile_image_url: wxUserInfo.avatarUrl
              }
              this.$store.dispatch(types.USER_GET, { params, wxUserInfo })
            }
          })
        } else {
          this.$store.dispatch(types.USER_SET, { accessToken, wxUserInfo })
        }
      } else {
        wx.showToast({
          title: '请同意授权哟',
          image: '/static/image/icon/warn.png',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
