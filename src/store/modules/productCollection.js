import * as types from '../mutation-types'
import api from '@/utils/api/productCollection'

const initialState = {
  gets: {
    page: null,
    perPage: 10,
    isPosting: false,
    data: {
      items: []
    }
  }
}
const PRODUCTCEOLLECTION_POST_START = 'PRODUCTCEOLLECTION_POST_START'
const PRODUCTCEOLLECTION_POST_END = 'PRODUCTCEOLLECTION_POST_END'
const PRODUCTCEOLLECTION_POST_END_POSTING = 'PRODUCTCEOLLECTION_POST_END_POSTING'
const PRODUCTCEOLLECTION_CLEAR_STORE = 'PRODUCTCEOLLECTION_CLEAR_STORE'

export default {
  state: initialState,
  actions: {
    [types.PRODUCTCEOLLECTION_POST_LOADMORE] ({
      commit,
      rootState
    }) {
      const state = rootState.productCollection.gets
      if (state.isPosting) return
      if (state.data.items && state.data.items.length === state.data.total_count) return
      let page = state.page === null ? 0 : state.page + 1
      commit(PRODUCTCEOLLECTION_POST_START)
      api.listProductCollection({
        page,
        per_page: state.perPage
      }, {
        data_type: 'COLLECTED_PRODUCTS'
      }).then(res => {
        if (state.data) res.data.products = (state.data.items || []).concat(res.data.products)
        const data = {
          items: res.data.products,
          total_count: res.data.count_collected_products
        }
        commit(PRODUCTCEOLLECTION_POST_END, {
          page,
          data: data
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    [types.PRODUCTCEOLLECTION_DEL_REMOVE] ({
      commit,
      rootState
    }, {
      id
    }) {
      const state = rootState.productCollection.gets
      if (state.isPosting) return
      commit(PRODUCTCEOLLECTION_POST_START)
      return api.removeProductCollection(id).then(res => {
        commit(PRODUCTCEOLLECTION_CLEAR_STORE)
      })
    },
    [types.PRODUCTCEOLLECTION_POST_ADD] ({
      commit,
      rootState
    }, {
      id
    }) {
      const state = rootState.productCollection.gets
      if (state.isPosting) return
      commit(PRODUCTCEOLLECTION_POST_START)
      return api.addProductCollection(id).then(res => {
        commit(PRODUCTCEOLLECTION_CLEAR_STORE)
      })
    }
  },
  mutations: {
    [PRODUCTCEOLLECTION_POST_END_POSTING] (state) {
      Object.assign(state, {
        gets: {
          ...state.gets,
          isPosting: false
        }
      })
    },
    [PRODUCTCEOLLECTION_POST_START] (state) {
      Object.assign(state, {
        gets: {
          ...state.gets,
          isPosting: true
        }
      })
    },
    [PRODUCTCEOLLECTION_POST_END] (state, data) {
      Object.assign(state, {
        gets: {
          ...state.gets,
          data: {
            items: []
          },
          isPosting: false
        }
      })
      Object.assign(state, {
        gets: {
          ...state.gets,
          ...data,
          isPosting: false
        }
      })
    },
    [PRODUCTCEOLLECTION_CLEAR_STORE] (state) {
      Object.assign(state, {
        gets: {
          page: null,
          perPage: 10,
          isPosting: false,
          data: {
            items: []
          }
        }
      })
    }
  }
}

/*

export const PRODUCTCEOLLECTION_POST_LOADMORE = 'PRODUCTCEOLLECTION_POST_LOADMORE'
export const PRODUCTCEOLLECTION_DEL_CLEARALL = 'PRODUCTCEOLLECTION_DEL_CLEARALL'

  listProductCollection: (page) => request.post(`/customerCenter/productCollection/list/${page}/10`, null, {
    baseURL: baseURL.API
  }),
  clearAllProductCollection: (data) => request.delete(`/customerCenter/productCollection/clearAll`, data, {
    baseURL: baseURL.API
  })
*/
