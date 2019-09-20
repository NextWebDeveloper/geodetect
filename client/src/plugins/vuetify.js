import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
	theme: {
		themes: {
			light: {
				primary: "#FFC400",
				secondary: "#2196f3",
				accent: "#42A5F5",
				error: "#f44336",
				warning: "#ffeb3b",
				info: "#AED581",
				success: "#4caf50"
			}
		}
	}
});