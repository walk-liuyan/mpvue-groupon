import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  receiveOrder: (id) => request.post(`/customerCenter/order/confirmReceiving/${id}`, null, {
    baseURL: baseURL.API
  }),
  remindOrder: (id) => request.post(`/customerCenter/order/remind/${id}/to_deliver`, null, {
    baseURL: baseURL.API
  }),
  delOrder: (id) => request.delete(`/customerCenter/order/delete/${id}`, null, {
    baseURL: baseURL.API
  }),
  cancelOrder: (id, data) => request.post(`/customerCenter/order/cancel/${id}`, data, {
    baseURL: baseURL.API
  }),
  getOrderDetail: (id) => request.get(`/customer/orderCenter/viewOrderDetail/${id}`, null, {
    baseURL: baseURL.API
  }),
  getOrderList: (page, perPage, data) => request.post(`/customerCenter/order/list/${page}/${perPage}`, data, {
    baseURL: baseURL.API
  }),
  preOrder: (data) => request.post(`/order/preOrder/buyNow?v=4`, data, {
    baseURL: baseURL.API
  }),
  createOrder: (data) => request.post(`/order/create?v=4`, data, {
    baseURL: baseURL.API
  }),
  multiOrdersPay: (data) => request.post(`/payment/multiOrdersPay/wechat?sub_payment_type=wechat_mini_program`, data, {
    baseURL: baseURL.API
  })
}

export default api
