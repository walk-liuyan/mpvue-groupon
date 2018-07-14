import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  getNormalProduct: (id) => request.get(`/product/customerView/detail/${id}`, null, {
    baseURL: baseURL.API
  }),
  getGrouponProduct: (id) => request.get(`/product/customerView/detailViaGroupId/${id}`, null, {
    baseURL: baseURL.API
  })
}

export default api
