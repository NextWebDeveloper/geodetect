import Vue from 'vue'
import Vuex from 'vuex'

import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
		mainID: localStorage.getItem('mainID') ? localStorage.getItem('mainID') : null
	},
	getters: {
		getTokenState(state) {
			return state.token !== null
		}
	},
	mutations: {
		setToken(state, token) {
			localStorage.setItem('token', token);
			state.token = token;
		},
		setMainID(state, id) {
			localStorage.setItem('mainID', id);
			state.mainID = id;
		},
		removeToken(state) {
			localStorage.removeItem('token');
			state.token = null;
			window.axios.defaults.headers.common['Authorization'] = null;
			router.push({ name: 'signin' })
		}
	},
	actions: {

	},
})