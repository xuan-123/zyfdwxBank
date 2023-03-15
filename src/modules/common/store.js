import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bank: {},
    payee: {},
    outlets: {},
  },
  mutations: {
    setBank(state, data) {
      state.bank = data;
    },
    setPayee(state, data) {
      state.payee = data;
    },
    setOutlets(state, data) {
      state.outlets = data;
    },
  },
  actions: {
    setBank({ commit }, data) {
      commit('setBank', data);
    },
    setPayee({ commit }, data) {
      commit('setPayee', data);
    },
    setOutlets({ commit }, data) {
      commit('setOutlets', data);
    },
  },
});
