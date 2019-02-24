import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VueFormGenerator from 'vue-form-generator'
//import 'vue-form-generator/dist/vfg-core.css'
import fieldInputDropdown from "./CustomFields/fieldInputDropdown.vue";
Vue.component("fieldInputDropdown", fieldInputDropdown);

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(BootstrapVue)
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
      alert(value)
      return null;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
