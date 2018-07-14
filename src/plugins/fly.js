import wx from 'wx'
import Fly from 'flyio'
import {
  baseURL
} from '@/config'

let instance = new Fly()
var tokenFly = new Fly()
instance.config.baseURL = baseURL.API
tokenFly.config.baseURL = baseURL.API

instance.interceptors.request.use((request) => {
  let accessToken = wx.getStorageSync('accessToken')

  wx.showLoading({
    title: 'Loading'
  })
  // instance.config.headers['Authorization'] = 'Brear eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc190bXAiOmZhbHNlLCJ1c2VyX2lkIjoiR09ENDAyMDUiLCJleHAiOjE2MTc0OTU2MzQsImVuY3J5cHRlZF9wYXNzd29yZCI6IjEiLCJkZXZpY2VfaWQiOiJtb2JpbGUgYXBwIn0.bFbUbtv9ATC1a5Bjf1HQucpt26M_QE0CPmcHWPuj6Ao'
  if (!accessToken) {
    const userBaseInfo = wx.getStorageSync('userBaseInfo')
    instance.lock()
    return tokenFly.post('/user/signIn/wechatMiniProgram', userBaseInfo).then((res) => {
      if (res.data.code === 0) {
        accessToken = res.data.data.access_token
        wx.setStorageSync('accessToken', accessToken)
        request.headers['Authorization'] = 'Brear ' + accessToken
      }
      return request
    }).then(() => {
      instance.unlock()
      return request
    })
  } else {
    request.headers['Authorization'] = 'Brear ' + accessToken
    return request
  }
})

instance.interceptors.response.use(
  (response, promise) => {
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
    return promise.resolve(response.data)
  },
  (error, promise) => {
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
    if (process.env.NODE_ENV === 'development') {
      let err = '未知错误'
      let status = '000'
      if (error.response) {
        status = error.response.status
        if (status === 400) { // 没有授权令牌
          err = '没有授权令牌'
        } else if (status === 401) { // 授权令牌过期
          err = '授权令牌过期'
        } else if (status === 422) { // 业务逻辑错误
          err = error.response.data.error
        } else if (status >= 500) { // 服务异常
          err = error.response.data.error || '服务异常'
        }
      }
      console.error(`[${status}] ${err}`)
    }
    wx.showToast({
      title: error.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default instance
