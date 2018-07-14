
import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  miniProgramSign: (params) => request.post(`/user/signIn/wechatMiniProgram`, params, {
    baseURL: baseURL.API
  })
}

export default api
