import * as types from '../mutation-types'
import orderApi from '@/utils/api/order'

const initialState = {
  preOrder: {}
}

export default {
  state: initialState,
  actions: {
    [types.PREORDER_POST_ADDRESS] ({
      commit,
      rootState
    }, {
      address
    }) {
      commit(types.PREORDER_POST_ADDRESS, address)
    },
    [types.PREORDER_POST] ({
      commit,
      rootState
    }, {
      preOrderData
    }) {
      orderApi.preOrder(preOrderData).then(res => {
        if (res.code === 0) {
          commit(types.PREORDER_POST, res.data)
          wx.navigateTo({
            url: `/pages/preorder`
          })
        } else {
          wx.showToast({
            title: res.message,
            image: '/static/image/icon/warn.png',
            duration: 2000
          })
        }
      })
    }
  },
  mutations: {
    [types.PREORDER_POST] (state, data) {
      Object.assign(state, {
        preOrder: data
      })
    },
    [types.PREORDER_POST_ADDRESS] (state, data) {
      Object.assign(state.preOrder, {
        pre_orders: {
          ...state.preOrder.pre_orders,
          default_address: {
            ...data
          }
        }
      })
    }
  }
}
