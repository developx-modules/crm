import axios from "axios";
import api from "@/store/api";

export default {
    namespaced: true,
    actions: {
        async fetchStatuses({ commit }) {
            const response = await axios.get(api.getUrl('GetStatuses'));
            const status = response.data;

            var statusesResult = {};
            for (var i in status){
                let statusVal = status[i];
                statusesResult[i] = {
                    name: statusVal['NAME'],
                    value: statusVal['ID']
                }
            }
            commit('updateStatuses', statusesResult);
        }
    },
    mutations: {
        updateStatuses(state, status) {
            state.status.values = status;
        }
    },
    state: {
        size: {
            name: 'Заказов',
            values: [
                {
                    name: '20',
                    value: 20,
                },
                {
                    name: '40',
                    value: 40
                },
                {
                    name: '80',
                    value: 80
                }
            ]
        },
        days: {
            name: 'Дата',
            values: [
                {
                    name: 'Все',
                    value: 999
                },
                {
                    name: 'Сегодня',
                    value: 1,
                },
                {
                    name: 'Вчера',
                    value: 2
                },
                {
                    name: 'Позавчера',
                    value: 3
                },
                {
                    name: 'За 7 дней',
                    value: 7
                },
                {
                    name: 'За эту неделю',
                    value: (new Date()).getDay(),
                },
                {
                    name: 'За 30 дней',
                    value: 30
                },
                {
                    name: 'За этот месяц',
                    value: (new Date()).getDate()
                }
            ]
        },
        status: {
            name: 'Статус',
            values: [],
            selected: 0
        }
    },
    getters: {
        getFilters(state) {
            return state;
        },
        getTopFilters(state) {
            let filters = JSON.parse(JSON.stringify(state))
            filters['status']['values'][filters['status']['values'].length] = {
                name: 'Все, кроме выполенных и отмененных',
                value: 0
            }
            return filters;
        },
        getStatuses(state) {
            return state['status']['values']
        }
    }
}