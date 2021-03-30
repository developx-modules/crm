import axios from "axios";
import api from "@/store/api";

export default {
    namespaced: true,
    actions: {
        async fetchOrders({ commit }, params) {
            const response = await axios.get(api.getUrl('GetOrders', params));
            const orders = response.data;
            commit('updateOrders', orders.orders);
            commit('updateRecords', orders.records);
            commit('updatePages', orders.pages);
            commit('updateTotalPrice', orders.total);
        },
        async setStatus({ commit, state }, data) {
            const response = await axios.get(api.getUrl('SetStatus', {id: data['id'], orderId: state.orders[data['orderKey']]['ID']}));
            if (response.data['SUCCESS']) {
                commit('setStatus', {
                    orderKey: data['orderKey'],
                    statusId: data['id']
                });
            }
        },
        setUrlParams: function ({ commit }){
            commit('urlParams', window
                .location
                .search
                .replace('?','')
                .split('&')
                .reduce(
                    function(p,e){
                        var a = e.split('=');
                        p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                        return p;
                    },
                    {}
                )
            );
        },
        setOasisId: function ({ commit }, data) {
            commit('setOasisId', {
                orderKey: data['orderKey'],
                oasisId: data['oasisId']
            });
        },
        setYandexId: function ({ commit }, data) {
            commit('setYandexId', {
                orderKey: data['orderKey'],
                yandexId: data['yandexId']
            });
        }
    },
    mutations: {
        updateOrders(state, data)
        {
            state.orders = data;
        },
        updateRecords(state, data)
        {
            state.records = data;
        },
        updatePages(state, data)
        {
            state.pages = data;
        },
        updateTotalPrice(state, data)
        {
            state.totalPrice = data;
        },
        setStatus(state, data)
        {
            state.orders[data['orderKey']]['STATUS_ID'] = data['statusId'];
        },
        setOasisId(state, data)
        {
            state.orders[data['orderKey']]['PROPS']['OASIS_ID']['VALUE'] = data['oasisId'];
        },
        setYandexId(state, data)
        {
            state.orders[data['orderKey']]['PROPS']['YANDEX_ID']['VALUE'] = data['yandexId'];
        }
    },
    state: {
        orders: [],
        records: 0,
        allOrders: 0,
        pages: 0,
        totalPrice: 0,
        filters: [],
        pageNav: 1
    },
    getters: {
        getOrders(state) {
            return state.orders;
        },
        getOrderStatus: (state) => (orderKey) => {
            return state.orders[orderKey]['STATUS_ID']
        },
        getDeliveryType: (state) => (orderKey) => {
            return state.orders[orderKey]['DELIVERY_TYPE']
        },
        getUserId: (state) => (orderKey) => {
            return state.orders[orderKey]['USER_ID']
        },
        getProps: (state) => (orderKey) => {
            return state.orders[orderKey]['PROPS']
        },
        getProds: (state) => (orderKey) => {
            return state.orders[orderKey]['PRODS']
        },
        getOasisId: (state) => (orderKey) => {
            return state.orders[orderKey]['PROPS']['OASIS_ID']['VALUE']
        },
        getYandexId: (state) => (orderKey) => {
            return state.orders[orderKey]['PROPS']['YANDEX_ID']['VALUE']
        },
        getComments: (state) => (orderKey) => {
            return state.orders[orderKey]['COMMENTS']
        },
        getTotalPrice(state) {
            return state.totalPrice;
        },
        getPages(state) {
            return state.pages;
        },
        getRecords(state) {
            return state.records;
        },
        getAllRecords(state) {
            return state.orders ? state.orders.length : 0;
        },
    }
}