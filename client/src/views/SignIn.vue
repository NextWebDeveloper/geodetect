<template>
  <v-container class="fill-height" fluid>
	<v-row align="center" justify="center">
	  <v-col cols="12" sm="8" md="4">
		<v-card class="elevation-12">
		  <v-toolbar color="primary" dark flat>
			<v-toolbar-title>Sign In</v-toolbar-title>
		  </v-toolbar>
		  <v-card-text>
			<div 
			class="error--text subtitle-2" 
			v-if="errorMessage">{{ errorMessage }}</div>
			<v-form ref="form">
			  <v-text-field 
			  	v-model="email" 
				@keyup.enter="submit" 
			  	:rules="emailRules" 
				prepend-inner-icon="email" 
			  	label="E-mail" 
			  	required></v-text-field>
			  <v-text-field 
			  	:append-icon="passwordVisibilityState.pass ? 'visibility' : 'visibility_off'" 
				@click:append="() => passwordVisibilityState.pass = !passwordVisibilityState.pass" 
		  		:type="passwordVisibilityState.pass ? 'text' : 'password'" 
			  	v-model="password" 
				@keyup.enter="submit"
				:rules="passwordRules" 
				prepend-inner-icon="lock" 
			  	label="Password" 
			  	required></v-text-field>
			</v-form>
		  </v-card-text>
		  <v-card-actions>
			<div class="flex-grow-1"></div>
			<v-btn @click.prevent="submit" :disabled="!valid" color="secondary" class="px-10">Submit</v-btn>
		  </v-card-actions>
		</v-card>
	  </v-col>
	</v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
	valid: true,
	email: "",
	emailRules: [
	  v => !!v || "E-mail is required",
	  v =>
		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
		"E-mail must be valid"
	],
	password: "",
	passwordRules: [
		v => !!v || "Password is required",
	],
	passwordVisibilityState: {
		pass: false
	},
	errorMessage: null
  }),

  methods: {
	submit() {
		this.errorMessage = null;
		if (this.$refs.form.validate()) {
			axios.post("signin", {
			  email: this.email,
			  password: this.password
			})
			.then(res=>{
				if (res.status === 200) {
					this.$store.commit('setToken', res.data.token)
					// редирект в лк + token
				}
			})
			.catch(err=>{
				this.errorMessage = err.response.data.message
			})
		}
	}
  }
};
</script>
