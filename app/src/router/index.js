import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { TokenService } from '../services/storage.service'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requireAuth: true },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/account',
    name: 'Account',
    meta: { requireAuth: true },
    component: () => import('../views/Account.vue')
  },
  {
    path: '/allusersadmin',
    name: 'All Users',
    meta: { requireAuth: true },
    component: () => import('../views/AllUsersAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!TokenService.getToken()) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
