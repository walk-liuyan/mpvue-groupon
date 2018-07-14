import Vue from 'vue'
import App from '@/app'
import store from '@/store'
import fly from '@/plugins/fly'

Vue.prototype.$http = fly
Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['pages/home'],
    window: {
      navigationBarBackgroundColor: '#f0f0f0',
      navigationBarTitleText: '环球伙拼',
      navigationBarTextStyle: 'black',
      backgroundColor: '#f0f0f0',
      backgroundTextStyle: 'light'
    }
  }
}
