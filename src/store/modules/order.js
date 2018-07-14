import * as types from '../mutation-types'
import orderApi from '@/utils/api/order'

const initialState = {
  gets: {
    isPosting: false,
    statusAll: {
      page: null,
      perPage: 10,
      data: []
    },
    statusPayment: {
      page: null,
      perPage: 10,
      data: []
    },
    statusGrouping: {
      page: null,
      perPage: 10,
      data: []
    },
    statusDeliver: {
      page: null,
      perPage: 10,
      data: []
    },
    statusReceiving: {
      page: null,
      perPage: 10,
      data: []
    }
  }
}
const USER__ORDER_GETS_START = 'USER__ORDER_GETS_START'
const USER__ORDER_GETS_END = 'USER__ORDER_GETS_END'

export default {
  state: initialState,
  actions: {
    [types.USER__ORDER_POST_CLEARITEMTAB] ({
      commit,
      rootState
    }, {
      orderType
    }) {
      commit(types.USER__ORDER_POST_CLEARITEMTAB, {
        orderType,
        page: null,
        data: []
      })
    },
    [types.USER__ORDER_GETS] ({
      commit,
      rootState
    }, {
      apiData
    }) {
      let state = null
      const orderType = apiData.order_type
      switch (orderType) {
        case 'all':
          state = rootState.order.gets.statusAll
          break
        case 'wait-for-payment':
          state = rootState.order.gets.statusPayment
          break
        case 'wait-for-grouping':
          state = rootState.order.gets.statusGrouping
          break
        case 'wait-for-deliver':
          state = rootState.order.gets.statusDeliver
          break
        case 'wait-for-confirm-receiving':
          state = rootState.order.gets.statusReceiving
          break
      }
      if (state.isPosting) return
      let page = state.page === null ? 0 : state.page + 1
      commit(USER__ORDER_GETS_START)
      orderApi.getOrderList(page, state.perPage, apiData).then(res => {
        if (res.code === 0) {
          res.data.orders = (state.data || []).concat(res.data.orders)
          commit(USER__ORDER_GETS_END, {
            orderType,
            page,
            data: res.data.orders
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
    [USER__ORDER_GETS_START] (state) {
      Object.assign(state, {
        gets: {
          ...state.gets,
          isPosting: true
        }
      })
    },
    [USER__ORDER_GETS_END] (state, data) {
      switch (data.orderType) {
        case 'all':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusAll: {
                ...state.gets.statusAll,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-payment':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusPayment: {
                ...state.gets.statusPayment,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-grouping':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusGrouping: {
                ...state.gets.statusGrouping,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-deliver':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusDeliver: {
                ...state.gets.statusDeliver,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-confirm-receiving':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusReceiving: {
                ...state.gets.statusReceiving,
                page: data.page,
                data: data.data
              }
            }
          })
          break
      }
    },
    [types.USER__ORDER_POST_CLEARITEMTAB] (state, data) {
      switch (data.orderType) {
        case 'all':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusAll: {
                ...state.gets.statusAll,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-payment':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusPayment: {
                ...state.gets.statusPayment,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-grouping':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusGrouping: {
                ...state.gets.statusGrouping,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-deliver':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusDeliver: {
                ...state.gets.statusDeliver,
                page: data.page,
                data: data.data
              }
            }
          })
          break
        case 'wait-for-confirm-receiving':
          Object.assign(state, {
            gets: {
              isPosting: false,
              ...state.gets,
              statusReceiving: {
                ...state.gets.statusReceiving,
                page: data.page,
                data: data.data
              }
            }
          })
          break
      }
    }
  }
}
