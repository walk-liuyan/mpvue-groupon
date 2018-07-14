<script>
import * as types from '@/store/mutation-types'

export default {
  onLaunch () {
    const accessToken = wx.getStorageSync('accessToken')
    this.$store.dispatch(types.USER_SET, { accessToken, wxUserInfo: {} })
  }
}
</script>
