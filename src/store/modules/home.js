import * as types from '../mutation-types'
import api from '@/utils/api/home'

const initialState = {
  readyForGroupon: {
    data: []
  }
}
const PRODUCT_GETS_GROUPBUYINGEND = 'PRODUCT_GETS_GROUPBUYINGEND'

export default {
  state: initialState,
  actions: {
    [types.GROUPBUYING_POST_HOME] ({
      commit,
      rootState
    }) {
      let state = rootState.home.readyForGroupon
      if (state.data.length > 0) return
      api.listReadyForGroupingBuyingProducts().then((res) => {
        if (res.code === 0) {
          if (state.data) res.data.products = (state.data || []).concat(res.data.products)
          commit(PRODUCT_GETS_GROUPBUYINGEND, {
            data: res.data.products
          })
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    [PRODUCT_GETS_GROUPBUYINGEND] (state, data) {
      Object.assign(state, {
        readyForGroupon: {
          ...data
        }
      })
    }
  }
}
