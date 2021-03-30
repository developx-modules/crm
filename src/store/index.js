import Vue from 'vue'
import Vuex from 'vuex'
import filters from './modules/filters'
import orders from './modules/orders'
import oasisOrders from './modules/oasisOrders'
import yandexOrders from './modules/yandexOrders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders,
    filters,
    oasisOrders,
    yandexOrders
  }
})