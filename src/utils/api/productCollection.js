import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  addProductCollection: (id) => request.post(`/customerCenter/productCollection/add/${id}`, null, {
    baseURL: baseURL.API
  }),
  removeProductCollection: (id) => request.delete(`/customerCenter/productCollection/remove/${id}`, null, {
    baseURL: baseURL.API
  }),
  listProductCollection: (data, params) => request.post(`/customerCenter/productCollection/list/${data.page}/${data.per_page}`, params, {
    baseURL: baseURL.API
  }),
  clearAllProductCollection: (data) => request.delete(`/customerCenter/productCollection/clearAll`, data, {
    baseURL: baseURL.API
  })
}

export default api
