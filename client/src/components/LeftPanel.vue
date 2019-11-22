<template>
  <v-navigation-drawer absolute permanent right>
    <v-list dense>
      <v-list-item @click="generateScript">
        <!-- <v-list-item-icon>
		  <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>-->

        <v-list-item-content>
          <v-list-item-title>Сгенерировать скрипт</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
	data: () => ({}),

	methods: {
		generateScript() {
			axios.post('check')
			.then(res=>console.log(res))
			.catch(err=>console.log(err))
		}
	}
};
</script>