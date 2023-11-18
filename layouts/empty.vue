<template>
    <v-app>
        <!-- 공통 alert, confirm 모달 -->
        <!-- <CommonAlert :alert="alert_pop" @close="alert_pop.state = false">
            <div v-html="alert_pop.content"></div>
        </CommonAlert> -->
        <div style="padding-top: 10%;">
            <Nuxt/>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'emptyLayout',
    data () {
        return {
            // alert_pop: {},
        }
    },
    mounted() {
        // this.$nuxt.$on("alert", this.handleAlert);
        // this.$nuxt.$on("alert:close", this.handleAlertClose);
    },
    beforeDestroy() {
        // this.$nuxt.$off("alert", this.handleAlert);
        // this.$nuxt.$off("alert:close", this.handleAlertClose);
    },
    methods: {
        // handleAlertClose(){
        //     this.alert_pop.state = false;
        // },
        // handleAlert(props) {
        //     if (!props.type) props.type = "alert";
        //     this.alert_pop = props;
        // },
    }
}
</script>

<style>
</style>