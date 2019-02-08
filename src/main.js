import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFormGenerator)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
