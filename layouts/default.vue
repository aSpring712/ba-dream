<template>
    <div>
        <div class="header">
            <span>Ba-Dream</span>
            <div>
                <div>{{ user_id }}님 반갑습니다.<button style="right: 10px; position: absolute;" @click="logout">로그아웃</button></div>
            </div>
            <div><button @click="$router.push('/storageList')">컨텐츠 목록</button> | <button @click="$router.push('/trashcan')">휴지통</button></div>
        </div>
        <nuxt />
    </div>
</template>
<script>
    export default {
        name: 'defaultLayout',
        data() {
            return {
                user_id: null,
            }
        },
        async mounted() {
            try {
                let result = await this.$axios.get('/user/userInfo');
                let { type, user_id } = result.data;

                if(type == 'SUCCESS' && !!user_id) {
                    this.user_id = result.data.user_id;
                } else {
                    alert('로그인이 필요합니다.')
                    this.$router.push('/login');
                }
                console.log('get people ==> ', result);
            } catch(err) {
                console.log(err);
            }
        },
        methods: {
            async logout() {
                if(confirm('로그아웃 하시겠습니까?')) {
                    let result = await this.$axios.get('/user/logout');
                    console.log('REQ result ==>', result);
                    this.$router.push('/login')
                }
            }
        }
    }
</script>

<style scss>
    .header {
        position: absolute;
        height: 90px;
        width: 100%;
        background-color: black;
        color: white;
        padding: 10px;
    }
</style>
