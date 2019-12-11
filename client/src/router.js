import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',   
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/About.vue')
		},
		{
			path: '/join',
			name: 'join',
			component: () => import('./views/Join.vue')
		},
		{
			path: '/signin',
			name: 'signin',
			component: () => import('./views/SignIn.vue')
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('./views/Dashboard.vue'),
			children: [
				{
					path: 'script-create',
					name: 'script-create',
					component: () => import('./views/Scripts.vue')
				}
			]
		}
	]
})