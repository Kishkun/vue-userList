import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta : {auth: true},
    component: () => import('@/views/Home')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/Auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Auth/Register')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if(requireAuth && !currentUser) {
    next("/")
  } else {
    next()
  }
});

export default router
