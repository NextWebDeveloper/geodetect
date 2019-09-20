<template>
	<v-app>
		<v-app-bar app color="primary">
			<v-toolbar-title class="headline text-uppercase">
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<template v-if="userIn">
					<v-btn :to="{ name: 'dashboard' }" text depressed dark class="font-weight-bold">
						<span>Dashboard</span>
					</v-btn>
					<v-btn :to="{ name: 'signin' }" text depressed dark class="font-weight-bold">
						<span>Sign in</span>
					</v-btn>
					<v-btn :to="{ name: 'join' }" text depressed dark class="font-weight-bold">
						<span>Join</span>
					</v-btn>
				</template>
				<template v-else>
					<v-btn @click="signOut" text depressed dark class="font-weight-bold">
						<span>Sign out</span>
					</v-btn>
				</template>

			</v-toolbar-items>
		</v-app-bar>

		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
	name: "App",
	components: {
		HelloWorld
	},
	data: () => ({
		//
	}),
	computed: {
		userIn() {
			return this.$store.getters.getTokenState
		}
	},
	methods: {
		signOut() {
			this.$store.commit('removeToken');
		}
	}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,600,700,800&display=swap');

.v-application {
	font-family: 'Nunito', sans-serif;
}

</style>
