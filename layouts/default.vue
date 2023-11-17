<template>
    <div>
        <!-- 공통 alert, confirm 모달 -->
        <!-- <CommonAlert :alert="alert_pop" @close="$event => alert_pop.state = false" @go_back="goBack">
            <div v-html="alert_pop.content" style="text-alin: center; line-height: 24px;"></div>
        </CommonAlert> -->

        <Nuxt />
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
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
        //     if (!props.type)
        //         props.type = "alert";
        //     this.alert_pop = props;
        // },
        // goBack() {
        //     this.alert_pop.state = false;
        // },
    }
}
</script>
