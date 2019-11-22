<template>
    <v-container class="fill-height" fluid>
        <left-panel></left-panel>
    </v-container>
</template>

<script>
    import LeftPanel from "@/components/LeftPanel.vue"

    export default {
        data: () => ({}),

        methods: {

        },
        components: {
            LeftPanel,
        },
        created() {
            window.axios.defaults.headers.common['Authorization'] = this.$store.state.token;
        }
    };
</script>
