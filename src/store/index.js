// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import product from './modules/product'
import preorder from './modules/preorder'
import productCollection from './modules/productCollection'
import order from './modules/order'
import groupon from './modules/groupon'
import nav from './modules/nav'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    home,
    product,
    preorder,
    productCollection,
    order,
    groupon,
    nav,
    user
  }
})

export default store
