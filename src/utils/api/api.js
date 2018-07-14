import request from '../plugins/fly'
import { baseURL } from '@/config'

const api = {
  getUserProducts: (params) => request.get('/products?', params, {
    baseURL: baseURL.API
  }),
  getPosterProducts: (params) => request.get(`/poster?`, params, {
    baseURL: baseURL.CAPI
  })
}

export default api
