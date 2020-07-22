import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { TokenService } from '../services/storage.service'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/login',
      name:'Login',
      component: function() {
        return import('../views/Login.vue')
  
      },
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path:'/register',
      name:'Register',
      component: function() {
        return import('../views/Register.vue')
  
      },
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    if(to.fullPath == "/register"){
      return next({
        path:'/register'
      });
    }else{
      return next({
        path:'/login',
        query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
      });
    }
    //console.log(to.fullPath)
    
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next();
})


export default router
