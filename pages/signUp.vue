<template>
    <v-sheet width="300" class="mx-auto">

        <div>회원가입</div>

        <v-form ref="form">

            <!-- :rules="idRules" -->
            <v-text-field
                v-model="user_id"
                :counter="10"
                label="아이디"
                required
            ></v-text-field>

            <!-- :rules="telNumRules" -->
            <v-text-field
                v-model="phone_num"
                label="휴대폰 번호"
                required
            ></v-text-field>

            <!-- :rules="passwordRules" -->
            <v-text-field
                v-model="password"
                type="password"
                label="비밀번호"
                required
            ></v-text-field>

            <!-- :rules="passwordCheckRules" -->
            <v-text-field
                v-model="passwordCheck"
                type="password"
                label="비밀번호 확인"
                required
            ></v-text-field>

            <div>
                필수 약관 동의
            </div>

            <!-- :rules="agreeRules" -->
            <v-checkbox
                v-model="agree_1"
                label="이용약관 동의"
                required
            ></v-checkbox>

            <!-- :rules="agreeRules" -->
            <v-checkbox
                v-model="agree_2"
                label="개인정보취급방침 동의"
                required
            ></v-checkbox>

            <!-- :rules="agreeRules" -->
            <v-checkbox
                v-model="agree_3"
                label="위치기반 서비스 이용약관 동의"
                required
            ></v-checkbox>

            <v-checkbox
                v-model="agree_4"
                label="이메일, SMS, 알림수신동의 (선택)"
            ></v-checkbox>

            <br/>
            <div class="d-flex flex-column">
                <v-btn
                    class="mt-4"
                    block
                    @click="validate"
                >
                회원가입
                </v-btn>
            </div>
        </v-form>

        <a href="/login">로그인 페이지로 이동</a>
    </v-sheet>
</template>
<script>
    export default{
        layout: 'empty',
        name: 'SignUpPage',
        data() {
            return {
                user_id: '',
                password: '',
                passwordCheck: '',
                phone_num: '',
                agree_1: false,
                agree_2: false,
                agree_3: false,
                agree_4: false, // 선택사항
                // idRules: [
                //     v => !!v || '아이디를 입력해주세요.',
                //     v => (v && v.length <= 10) || '아이디는 10자 이내로 입력해주세요.',
                // ],
                // passwordRules: [
                //     v => !!v || '비밀번호를 입력해주세요.',
                // ],
                // passwordCheckRules: [
                //     v => !!v || '비밀번호 확인을 입력해주세요.',
                // ],
                // telNumRules: [
                //     v => !!v || '휴대폰 번호를 입력해주세요.',
                // ],
                // agreeRules: [
                //     v => !!v || '필수 동의 항목입니다.',
                // ]
            }
        },
        methods: {
            async validate () {
                try {                    
                    let result = await this.$axios.post('/user/signUp', { user_id: this.user_id})
                    console.log('result ===>', result)
                } catch(err) {
                    console.log('sign up ERROR', err);
                }
                
                // const { valid } = await this.$refs.form.validate()

                // if (valid) this.open_confirm('가입하시겠습니까?');
                // this.open_confirm('가입하시겠습니까?')

                // this.$nuxt.$emit('alert', {
                //     state: true,
                //     title: '가입하시겠습니까?',
                //     content: 'aaaaaaaaaa',
                //     type: 'confirm',
                //     confirm_text: '확인',
                //     method: () => {
                //         this.$nuxt.$emit("alert:close");
                //     }
                // })
            },
            // open_alert(title, type = null) {
            //     this.$nuxt.$emit('alert', {
            //         state: true,
            //         title,
            //         alert_text: '확인',
            //         okMethod: () => {
            //             this.$nuxt.$emit("alert:close");
            //         }
            //     })
            // },
            // open_confirm(title, type = null) {
            //     this.$nuxt.$emit('alert', {
            //         state: true,
            //         title,
            //         content: '',
            //         type: 'confirm',
            //         confirm_text: '확인',
            //         method: () => {
            //             this.$nuxt.$emit("alert:close");
            //         }
            //     })
            // },
        }
    }
</script>
<style>
</style>