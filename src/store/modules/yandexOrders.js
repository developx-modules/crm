import axios from "axios";
import api from "@/store/api";

export default {
    namespaced: true,
    actions: {
        async fetchOrder({ commit }, data) {
            const response = await axios.get(api.getUrl('GetOrdersStatus', {ids: data['yandexId']}));
            commit('updateOrder', {orderKey: data['orderKey'], data: response.data[0]});
        },
        async setOrderId({ rootState, dispatch }, data) {
            const response = await axios.get(api.getUrl('SetYandexOrder', {id: data['yandexId'], orderId: rootState.orders['orders'][data['orderKey']]['ID']}));
            if (response.data['SUCCESS']) {
                dispatch('fetchOrder', {orderKey: data['orderKey'], yandexId: data['yandexId']});
            }
            return response.data;
        },
        async createOrderId({ rootState, dispatch }, data) {
            const response = await axios.get(api.getUrl('CreateYandexOrder', {orderId: rootState.orders['orders'][data['orderKey']]['ID']}));
            if (response.data['SUCCESS']) {
                dispatch('fetchOrder', {orderKey: data['orderKey'], yandexId: data['yandexId']});
            }
            return response.data;
        },
        async removeOrderId({ rootState, commit }, data) {
            const response = await axios.get(api.getUrl('RemoveYandexOrder', {orderId: rootState.orders['orders'][data['orderKey']]['ID']}));
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