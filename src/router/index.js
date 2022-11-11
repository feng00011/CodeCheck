import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/components/MainContainer.vue'
import Edit from '@/components/EditPart.vue'
const routers = new VueRouter({
  routes:[
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      component: Home
    },
    {
      path:'/edit',
      component:Edit
    }
  ]
})
export default routers