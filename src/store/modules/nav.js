import * as types from '../mutation-types'

const initialState = {
  get: {
    navIndex: 0
  }
}

export default {
  state: initialState,
  actions: {
    [types.NAV_SET_INDEX] ({
      commit,
      rootState
    }, {
      navIndex
    }) {
      commit(types.NAV_SET_INDEX, navIndex)
    }
  },
  mutations: {
    [types.NAV_SET_INDEX] (state, navIndex) {
      Object.assign(state, {
        get: {
          navIndex
        }
      })
    }
  }
}
