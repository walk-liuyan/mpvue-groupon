import * as types from '../mutation-types'
import grouponApi from '@/utils/api/groupon'

const initialState = {
  onGroupon: {
    isPosting: false,
    data: [],
    srcData: []
  }
}
const PRODUCT_GETS_ONGROUPONSTART = 'PRODUCT_GETS_ONGROUPONSTART'
const PRODUCT_GETS_ONGROUPONEND = 'PRODUCT_GETS_ONGROUPONEND'
const ONGROUPONEND_CLEAR_STORE = 'ONGROUPONEND_CLEAR_STORE'

export default {
  state: initialState,
  actions: {
    [types.ONGROUPON_POST_HOME] ({
      commit,
      rootState
    }) {
      commit(ONGROUPONEND_CLEAR_STORE)
      let state = rootState.groupon.onGroupon
      if (state.isPosting) return // 不允许重复访问
      commit(PRODUCT_GETS_ONGROUPONSTART)
      grouponApi.getGrouponList().then((res) => {
        if (res.code === 0) {
          if (state.data) res.data.products = (state.data || []).concat(res.data.products)
          commit(PRODUCT_GETS_ONGROUPONEND, {
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
    ONGROUPONEND_CLEAR_STORE (state) {
      Object.assign(state, {
        onGroupon: {
          isPosting: false,
          data: [],
          srcData: []
        }
      })
    },
    [PRODUCT_GETS_ONGROUPONSTART] (state) {
      Object.assign(state, {
        onGroupon: {
          ...state.onGroupon,
          isPosting: true
        }
      })
    },
    [PRODUCT_GETS_ONGROUPONEND] (state, data) {
      let result = []
      for (let i = 0, len = data.data.length; i < len; i += 5) {
        result.push(data.data.slice(i, i + 5))
      }
      Object.assign(state, {
        onGroupon: {
          isPosting: false,
          data: result,
          srcData: data.data
        }
      })
    }
  }
}
