<template>
    <v-sheet width="300" class="mx-auto">
        <v-form ref="form" class="loginForm">
            <div>로그인</div>
            <v-text-field
                v-model="user_id"
                :rules="idRules"
                :counter="10"
                label="아이디"
                oninput="javascript: this.value = this.value.replace(/\s/g,'');"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                type="password"
                label="비밀번호"
                oninput="javascript: this.value = this.value.replace(/\s/g,'');"
                required
            ></v-text-field>

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
    import crypto from 'crypto';
    export default{
        layout: 'empty',
        name: 'LogInPage',
        data() {
            return {
                user_id: '',
                password: '',
                idRules: [
                    v => !!v || '아이디를 입력해주세요.',
                    v => (v && v.length <= 10) || '아이디는 10자 이내로 입력해주세요.',
                ],
                passwordRules: [
                    v => !!v || '비밀번호를 입력해주세요.',
                ],
            }
        },
        async mounted() {
            try {
                // 로그인 확인
                let result = await this.$axios.get('/user/userInfo');
                
                // 로그인 된 상태면 storageList 페이지로 이동 처리
                if(result.data.type == 'SUCCESS') {
                    this.$router.push('/storageList');
                }
            } catch(err) {
                console.log(err);
            }
        },
        methods: {
            async validate () {
                if(!this.user_id) {
                    return alert('아이디를 입력해주세요.');
                }

                if(this.user_id.length < 5 || this.user_id.length > 10) {
                    return alert('아이디는 5자 이상, 10자 이하로 입력해주세요.');
                }

                if(!this.password) {
                    return alert('비밀번호를 입력해주세요.');
                }

                let pwd = this.encrypt(this.password);

                let result = await this.$axios.post('/user/login', {user_id : this.user_id, password: pwd});
                console.log(' result = ',result)
                let { type, login_id } = result.data
                if(type == 'SUCCESS' && !!login_id) {
                    this.$router.push('/storageList');
                } else {
                    alert('아이디 또는 비밀번호를 다시 확인해주세요.');
                }
            },
            signUp() {
                this.$router.push('/signUp');
            },
            // 비밀번호 암호화해서 back단으로 넘기기
            encrypt(pwd) {                 
                const iv = crypto.randomBytes(16);
                const key = this.$config.encKey;
                const cipher = crypto.createCipheriv(
                    'aes-256-cbc',
                    Buffer.from(key),
                    iv,
                )
                const encrypted = cipher.update(pwd)

                return (
                    iv.toString('hex') +
                    ':' +
                    Buffer.concat([encrypted, cipher.final()]).toString('hex')
                )
            }
        }
    }
</script>
<style>
    .loginForm {
        transform: trnaslate(-50%, -50%);
        position: absolute;
        top: 35%;
        left: 45%;
    }   
</style>