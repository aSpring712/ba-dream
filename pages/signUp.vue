<template>
    <v-sheet width="300" class="mx-auto">

        <v-form ref="form" class="signUpForm">

            <div>회원가입</div>

            <!-- :rules="idRules" -->
            <v-text-field
                v-model="user_id"
                :counter="10"
                label="아이디"
                required
                oninput="javascript: this.value = this.value.replace(/\s/g,'');"
            ></v-text-field>

            <!-- :rules="telNumRules" -->
            <v-text-field
                v-model="phone_num"
                label="휴대폰 번호"
                type="tel"
                placeholder="010-1234-5678"
                oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,'$1-$2-$3').replace('--', '-')"
                required
            ></v-text-field>

            <!-- :rules="passwordRules" -->
            <v-text-field
                v-model="password"
                type="password"
                label="비밀번호"
                oninput="javascript: this.value = this.value.replace(/\s/g,'');"
                required
            ></v-text-field>

            <!-- :rules="passwordCheckRules" -->
            <v-text-field
                v-model="passwordCheck"
                type="password"
                label="비밀번호 확인"
                oninput="javascript: this.value = this.value.replace(/\s/g,'');"
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
            <a href="/login">로그인 페이지로 이동</a>
        </v-form>
    </v-sheet>
</template>
<script>
    import crypto from 'crypto';
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
            }
        },
        methods: {
            validate () {
                const phoneCheck = /[0-9]{10,11}$/;

                if(!this.user_id) {
                    return alert('아이디를 입력해주세요.');
                }

                if(this.user_id.length < 5 || this.user_id.length > 10) {
                    return alert('아이디는 5자 이상, 10자 이하로 입력해주세요.');
                }

                if(!this.phone_num) {
                    return alert('휴대폰 번호를 입력해주세요.');
                }

                if(!this.phone_num || !phoneCheck.test(this.phone_num.replace(/\-/g, ''))) {
                    return alert('올바른 휴대전화번호를 입력해주세요.');
                }

                if(!this.password) {
                    return alert('비밀번호를 입력해주세요.');
                }

                if(this.password.length < 8) {
                    return alert('비밀번호는 8자 이상 입력해주세요.')
                }

                if(!this.passwordCheck) {
                    return alert('비밀번호 확인을 입력해주세요.');
                }

                if(this.password != this.passwordCheck) {
                    return alert('입력하신 비밀번호가 서로 다릅니다.');
                }

                if(!this.agree_1 || !this.agree_2 || !this.agree_3) {
                    return alert('필수 동의 항목에 체크해주세요.');
                }

                this.submit();
            },
            async submit() {
                try {                    
                    if(confirm('회원가입 하시겠습니까?')) {

                        let pwd = this.encrypt(this.password);

                        let result = await this.$axios.post('/user/signUp', { user_id: this.user_id, password: pwd, phone_num: this.phone_num, notice_agree: this.agree_4 })
                        console.log('result ===>', result)
                        if(result.data.type == 'SUCCESS') {
                            alert('회원가입되었습니다.')
                            this.$router.push('/login');
                        } else {
                            alert('회원가입에 실패했습니다.')
                        }
                    }
                } catch(err) {
                    console.log('sign up ERROR', err);
                }
            },
            encrypt(pwd) { // 비밀번호 암호화해서 back단으로 넘기기
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
<style scss>
    .signUpForm {
        transform: trnaslate(-50%, -50%);
        position: absolute;
        top: 10%;
        left: 45%;
    }
</style>