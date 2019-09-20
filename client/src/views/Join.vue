<template>
  <v-container class="fill-height" fluid>
	<v-row align="center" justify="center">
	  <v-col cols="12" sm="8" md="4">
		<template v-if="afterSubmit.status">
			<v-progress-linear 
			  v-if="afterSubmit.loading"
    		  color="teal"
    		  buffer-value="0"
    		  value="0"
    		  stream>
			</v-progress-linear>
			<v-card v-if="afterSubmit.success" class="elevation-6 pa-3">
				<v-card-text>
					<div class="title mb-5 success--text">Your account was successfully created!</div>
					<div class="subtitle-1 mb-8">Redirecting to login page..</div>
					<v-progress-linear 
    				  color="info"
    				  buffer-value="0"
    				  :value="afterSubmit.redirectProgress"
    				  stream>
					</v-progress-linear>
				</v-card-text>
			</v-card>
		</template>
		<v-card v-if="!afterSubmit.status" class="elevation-12">
		  <v-toolbar color="primary" dark flat>
			<v-toolbar-title>Create Account</v-toolbar-title>
		  </v-toolbar>
		  <v-card-text>
			<ul v-if="errors.length > 0" class="errors-list">
				<li 
				v-for="(error,i) in errors" 
				:key="i" 
				class="error--text subtitle-2">{{ error }}</li>
			</ul>
			<v-form ref="form" v-model="valid" lazy-validation>
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
				prepend-inner-icon="lock" 
			  	:rules="passwordRules" 
			  	label="Password" 
			  	required></v-text-field>
			  <v-text-field 
			  	:append-icon="passwordVisibilityState.passRepeat ? 'visibility' : 'visibility_off'" 
				@click:append="() => passwordVisibilityState.passRepeat = !passwordVisibilityState.passRepeat"
		  		:type="passwordVisibilityState.passRepeat ? 'text' : 'password'"
			  	v-model="passwordRepeat" 
				@keyup.enter="submit" 
				prepend-inner-icon="lock" 
			  	:rules="[passwordConfirmationRule]" 
				:value="password"
			  	label="Password one more time" 
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
	afterSubmit: {
		status: false,
		loading: false,
		success: false,
		redirectProgress: 0
	},
	valid: true,
	email: "",
	emailRules: [
	  v => !!v || "E-mail is required",
	  v =>
		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
		"E-mail must be valid"
	],
	passwordVisibilityState: {
		pass: false,
		passRepeat: false
	},
	password: "",
	passwordRepeat: "",
	passwordRules: [
		v => !!v || "Password is required",
		v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || 'Password should contain at least one digit, one lower case, one upper case and be at least 8 characters'
	],
	errors: []
  }),

  methods: {
	submit() {
		this.errors = [];
		if (this.$refs.form.validate()) {
			// Native form submission is not yet supported
			this.afterSubmit.status = true;
			this.afterSubmit.loading = true;
			axios.post("join", {
			  email: this.email,
			  password: this.password
			})
			.then(res=>{
				if (res.status === 201) {
					this.afterSubmit.loading = false;
					this.afterSubmit.success = true;
					const intv = setInterval(()=>{
						if (this.afterSubmit.redirectProgress === 100) {
							clearInterval(intv);
						} else {
							this.afterSubmit.redirectProgress += 0.5;
						}
					}, 8)
				}
			})
			.catch(err=>{
				if (err.response.status === 422) {
					this.afterSubmit.status = false;
					this.afterSubmit.loading = false;
					this.errors = [...err.response.data.errors]
				}
			})
		}
	}
  },
  computed: {
	passwordConfirmationRule() {
	  return () => (this.password === this.passwordRepeat) || 'Passwords must match'
	},
  }
};
</script>

<style scoped>
.errors-list {
	list-style-type: none;
}
</style>
