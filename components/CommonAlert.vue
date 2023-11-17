<template>
    <v-dialog
        v-model="alert.state"
        persistent
        max-width="350"
    >
        <div id="alert">
            <div class="titles">{{alert.title}}</div>
            <slot></slot>
            
            <div v-if="alert.type == 'confirm'" class="double_btn">
                <button class="close_btn" @click="$emit('close')">{{!!$store.state.englishMode ? 'Close' : '닫기'}}</button>
                <button class="ok_btn" @click="()=>{!!alert.method ? alert.method() : $emit('close')}">{{alert.confirm_text ? alert.confirm_text : !!$store.state.englishMode ? 'Confirm' : '확인'}}</button>
            </div>
            
            <button v-else class="one_btn" @click="() => {alert.okMethod ? alert.okMethod() : $emit('close')}">{{alert.alert_text ? alert.alert_text : !$store.state.englishMode ? '확인' : 'Confirm'}}</button>
        </div>
    </v-dialog>
</template>
<script>
    export default {
        props: {
            alert: Object,
        },
        data() {
            return {
                
            }
        },
        mounted() {
            
        }
    }
</script>
<style lang="scss" scoped>
#alert {
    background-color: #fff;
    max-width :350;
    padding: 36px;
    text-align: center;
    button{
        margin-top: 24px;
        width: 100%;
        height: 50px;
        color: #fff;
        background-color: #fff;
        border-radius: 4px;
    }
    .double_btn{
        padding: 0;
        display: flex;
        button{
            padding: 0;
            height: 50px;
        }
        .close_btn{
            margin-right: 12px;
            background-color: #fff;
            color: #fff;
            border: 1px solid #fff;
        }
    }
}
</style>