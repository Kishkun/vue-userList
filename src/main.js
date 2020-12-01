import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from 'axios'

import UIkit  from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../node_modules/uikit/dist/css/uikit.min.css';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
UIkit.use(Icons);

const apiKey = process.env.VUE_APP_FIREBASE_KEY;
const authDomain = process.env.VUE_APP_FIREBASE_DOMAIN;
const databaseURL = process.env.VUE_APP_FIREBASE_URL;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: 'userlist-d803a',
  storageBucket: 'userlist-d803a.appspot.com',
  messagingSenderId: '490855954031',
  appId: '1:490855954031:web:06ddbac6856bb97cbf3f9a'
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
