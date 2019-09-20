import Vue from 'vue'
import Vuex from 'vuex'

import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null
	},
	getters: {
		getTokenState(state) {
			return state.token === null
		}
	},
	mutations: {
		setToken(state, token) {
			localStorage.setItem('token', token);
			state.token = token;
		},
		removeToken(state) {
			localStorage.removeItem('token');
			state.token = null;
			router.push({ name: 'join' })
		}
	},
	actions: {

	},
})