<template>
    <v-container class="fill-height pa-0" fluid>
        <v-content class="fill-height pa-0" >
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <right-panel></right-panel>
    </v-container>
</template>

<script>
    import RightPanel from "@/components/RightPanel.vue"

    export default {
        data: () => ({}),

        methods: {

        },
        components: {
            RightPanel,
        },
        created() {
            window.axios.defaults.headers.common['Authorization'] = this.$store.state.token;
        }
    };
</script>
