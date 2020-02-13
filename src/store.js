import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        map: null
    },
    actions: {
        SET_MAP: (injectee, payload) => {
            injectee.commit('SET_MAP', payload);
        }
    },
    getters: {
        map: state => {
            return state.map;
        }
    },
    mutations: {
        SET_MAP: (state, payload) => {
            state.map = payload;
        }
    }
});
