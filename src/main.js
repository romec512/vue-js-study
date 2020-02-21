import Vue from 'vue'
import App from './App.vue'
import './quasar'
import {store} from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
