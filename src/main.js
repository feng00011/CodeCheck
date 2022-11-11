import Vue from 'vue'
import App from './App.vue'
// 引入elementUI
import './plugins/element.js'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// Vue.use(codemirror)

import router from './router/index'

import store from '@/store'

// lodash库引入
 
import lodash from 'lodash'
 
Vue.prototype.$lodash = lodash


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  
}).$mount('#app')
