import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  listReadyForGroupingBuyingProducts: (params) => request.post(`/groupBuying/listReadyForGroupingBuyingProducts/0/10`, null, {
    baseURL: baseURL.API
  })
}

export default api
