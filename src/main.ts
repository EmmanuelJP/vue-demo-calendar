import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'


import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);



import "./assets/app.scss";
import "./assets/css/materialdesignicons.min.css";
import "bulma-badge/dist/css/bulma-badge.min.css";
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
