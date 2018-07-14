import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  checkShipping: (id) => request.get(`/shipping/tracking/order/${id}`, null, {
    baseURL: baseURL.API
  })
}

export default api
