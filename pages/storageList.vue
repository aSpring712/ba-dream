<template>
    <div>
        file storage for login user
        <v-input v-model="user_id"></v-input>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user_id: null,
            }
        },
        async mounted() {
            try {
                let result = await this.$axios.get('/user/userInfo');
                console.log('get people ==> ', result);
            } catch(err) {
                console.log(err);
            }
        }
    }
</script>

<style>

</style>
