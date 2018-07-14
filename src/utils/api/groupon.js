import request from '../../plugins/fly'
import {
  baseURL
} from '@/config'

const api = {
  getGrouponList: () => request.get(`/groupBuying/listOnGroupingBuyingProducts/0/6`, null, {
    baseURL: baseURL.API
  }),
  getItemProductGroupon: (id) => request.get(`/groupBuying/listOnGroupingBuyingViaProductId/${id}/0/10`, null)
}
export default api
