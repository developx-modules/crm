import axios from "axios";
import api from "@/store/api";

export default {
    namespaced: true,
    actions: {
        async fetchOrder({ commit }, data) {
            const response = await axios.get(api.getUrl('GetOasisOrderById', {id: data['oasisId']}));
            commit('updateOrder', {orderKey: data['orderKey'], data: response.data});
        },
        async setOrderId({ rootState, dispatch }, data) {
            const response = await axios.get(api.getUrl('SetOasisOrder', {id: data['oasisId'], orderId: rootState.orders['orders'][data['orderKey']]['ID']}));
            if (response.data['SUCCESS']) {
                dispatch('fetchOrder', {orderKey: data['orderKey'], oasisId: data['oasisId']});
            }
            return response.data;
        },
        async createOrderId({ rootState, dispatch }, data) {
            const response = await axios.get(api.getUrl('CreateOasisOrder', {orderId: rootState.orders['orders'][data['orderKey']]['ID']}));
            if (response.data['SUCCESS']) {
                dispatch('fetchOrder', {orderKey: data['orderKey'], oasisId: data['oasisId']});
            }
            return response.data;
        },
        async removeOrderId({ rootState, commit }, data) {
            let url = process.env.VUE_APP_SERVER;
            url += '/api/?action=RemoveOasisOrder&orderId=' + rootState.orders['orders'][data['orderKey']]['ID']
            url += '&apiKey=' + process.env.VUE_APP_API_KEY;
            const response = await axios.get(url);
            if (response.data['SUCCESS']) {
                commit('updateOrder', {orderKey: data['orderKey'], data: false});
            }
            return response.data;
        }
    },
    mutations: {
        updateOrder(state, data)
        {
            state.orders[data['orderKey']] = data['data'];
        },
    },
    state: {
        orders: {},
    },
    getters: {
        getOrder: (state) => (orderId) => {
            return state.orders[orderId];
        },
        getOrders(state) {
            return state.orders;
        }
    }
}