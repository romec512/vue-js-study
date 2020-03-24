import Vuex from 'vuex'
import Vue from "vue";
import AxiosWrapper from "./data/AxiosWrapper";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        map: null,
        object: null,
        layers: [],
        select: null
    },
    actions: {
        SET_MAP: (injectee, payload) => {
            injectee.commit('SET_MAP', payload);
        },
        SET_OBJECT: async (injectee, payload) => {
            let data = null;
            await new AxiosWrapper().getObject(payload).then(function (response) {
                data = response.data;
            });
            injectee.commit('SET_OBJECT', data);
        },
        UNSET_OBJECT: (injectee) => {
            injectee.commit('UNSET_OBJECT');
        },
        ADD_LAYER: (injectee, payload) => {
            injectee.commit('ADD_LAYER', payload);
        },
        SET_SELECT: (injectee, payload) => {
            injectee.commit('SET_SELECT', payload);
        }
    },
    getters: {
        map: state => {
            return state.map;
        },
        object: state => {
            return state.object;
        },
        layer: state => guid => {
            return state.layers[guid];
        },
        select: state => {
            return state.select;
        }
    },
    mutations: {
        SET_MAP: (state, payload) => {
            state.map = payload;
        },
        SET_OBJECT: (state, payload) => {
            state.object = payload;
        },
        UNSET_OBJECT: state => {
            state.object = null;
        },
        ADD_LAYER: (state, payload) => {
            state.layers[payload.id] = payload;
        },
        SET_SELECT: (state, payload) => {
            state.select = payload;
        }
    }
});
