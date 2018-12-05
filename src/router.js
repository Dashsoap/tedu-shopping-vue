import VueRouter from 'vue-router';
import Vue from 'vue';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';


export default new VueRouter({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/login',
      name:'login',
      component: Login

    },
    {
      path:'/login/hello',
      name:'cart',
      component:Index
    }
  ]
})