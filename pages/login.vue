<template>
    <v-sheet width="300" class="mx-auto">

        <div>로그인</div>

        <v-form ref="form">
            <v-text-field
                v-model="user_id"
                :rules="idRules"
                label="아이디"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                type="password"
                label="비밀번호"
                required
            ></v-text-field>

            <!-- <v-checkbox
                v-model="remember_id"
                label="아이디 저장"
                required
            ></v-checkbox> -->

            <div class="d-flex flex-column">
                <v-btn
                class="mt-4"
                block
                @click="validate"
                >
                로그인
                </v-btn>
            </div>
            <br/>
            <div class="d-flex flex-column">
                <v-btn
                    class="mt-4"
                    block
                    @click="signUp"
                >
                회원가입
                </v-btn>
            </div>
        </v-form>
    </v-sheet>
</template>
<script>
    export default{
        layout: 'empty',
        name: 'LogInPage',
        data() {
            return {
                user_id: '',
                password: '',
                pwdShow: false,
                // remember_id: false,
                idRules: [
                    v => !!v || '아이디를 입력해주세요.',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                passwordRules: [
                    v => !!v || '비밀번호를 입력해주세요.',
                ],
            }
        },
        async mounted() {
            try {
                let result = await this.$axios.get('/user/userInfo');
                console.log('get people ==> ', result);
                if(result.data.type == 'SUCCESS') {
                    this.$router.push('/storageList');
                }
            } catch(err) {
                console.log(err);
            }
        },
        methods: {
            async validate () {
                let result = await this.$axios.post('/user/login', {user_id : this.user_id});
                console.log(' result = ',result)
            },
            signUp() {
                console.log('GO TO THE SIGN UP PAGE');
                this.$router.push('/signUp');
            },
        }
    }
</script>
<style>
</style>