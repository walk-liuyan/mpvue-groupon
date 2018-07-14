import request from '../../plugins/fly'
import { baseURL } from '@/config'

const api = {
  getAddressList: () => request.get('/address/list?v=4', null, {
    baseURL: baseURL.API
  }),
  createAddress: (params) => request.post(`/address/create?v=4`, params, {
    baseURL: baseURL.API
  }),
  delAddress: (id) => request.delete(`/address/delete/${id}?v=4`, null, {
    baseURL: baseURL.API
  }),
  updateAddress: (id, address) => request.post(`/address/update/${id}?v=4`, address, {
    baseURL: baseURL.API
  })
}

export default api
