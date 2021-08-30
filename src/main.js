import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import './assets/base.css'
import axios from 'axios'
import './assets/api/Global.js'
import store from './store'

Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://172.16.10.16:8089/api/'
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
