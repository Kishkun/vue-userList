import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UIkit  from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../node_modules/uikit/dist/css/uikit.min.css';


Vue.config.productionTip = false;
UIkit.use(Icons);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
