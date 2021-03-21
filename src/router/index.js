import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistic.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
