import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VueFormGenerator from 'vue-form-generator/dist/vfg.js'
//import 'vue-form-generator/dist/vfg-core.css'
import fieldInputDropdown from "./CustomFields/fieldInputDropdown.vue";
import Cleave from 'vue-cleave-component';
import BootstrapVueTreeview from 'bootstrap-vue-treeview';
import pdf from 'pdfvuer'

Vue.component("fieldInputDropdown", fieldInputDropdown);

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(Cleave)
Vue.use(VueFormGenerator,{
  validators: {
    firstCustomValidator: (value, field, model) => {
      if (value === "") {
        if (field.required) {
          return ["This field is required!"];
        } else {
          return [];
        }
      }
      return null;
    }
  }
})
Vue.use(BootstrapVueTreeview)
Vue.use(pdf)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
