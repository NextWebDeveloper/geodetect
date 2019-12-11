

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import vuetify from './plugins/vuetify';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:3030/api/'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
