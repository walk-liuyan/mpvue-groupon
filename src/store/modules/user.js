import * as types from '../mutation-types'
import userApi from '@/utils/api/user'

const initialState = {
  accessToken: '',
  wxUserInfo: {}
}

export default {
  state: initialState,
  actions: {
    [types.USER_SET] ({
      commit
    }, {
      accessToken,
      wxUserInfo
    }) {
      commit(types.USER_SET, {
        accessToken: accessToken,
        wxUserInfo: wxUserInfo
      })
    },
    [types.USER_GET] ({
      commit
    }, {
      params,
      wxUserInfo
    }) {
      userApi.miniProgramSign(params).then((res) => {
        if (res.code === 0) {
          commit(types.USER_SET, {
            accessToken: res.data.access_token,
            wxUserInfo: wxUserInfo
          })
          wx.setStorageSync('accessToken', res.data.access_token)
        } else {}
      })
    }
  },
  mutations: {
    [types.USER_SET] (state, data) {
      Object.assign(state, {
        accessToken: data.accessToken,
        wxUserInfo: data.wxUserInfo
      })
      console.log(state)
    }
  }
}
