<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		testGet() {
			return axios.get('https://jsonplaceholder.typicode.com/todos/1')
		}
	},
	created() {
		this.testGet()
		.then(res=>console.log(res));
	}
};
</script>