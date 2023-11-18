<template>
    <div style="display: flex; padding-top: 90px; width: 100%; height: 100%; flex-direction: column;">
        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px">
            <span>휴지통</span>
            <!-- <span><button>영구 삭제</button></span> -->
        </div>

        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px;">
            <!-- 좌측 최근 재생 된 컨텐츠 / 전체 컨텐츠 -->
            <div style="display: flex; background-color: black; width: 100%; height: calc(100vh - 100px); margin-right: 40px; flex-direction: column; padding: 8px;">
                <div style="height: 100%; background-color: white; width: 100%;">
                    <div style="display: flex; flex-flow: wrap; flex-direction: row;">
                        <div v-for="(file, index) in tmp_del_files">
                            <img v-if="file.type.startsWith('image')" :src="file.url" style="width: 300px; height: 300px;"/>
                            <video v-else id="video" :src="file.url" style="width: 300px; height: 300px;"></video>
                            <div>TYPE {{ file.type.split('/')[0] }} <span style="color: red; cursor: pointer; float: right;" @click="delConfirm(index)">X</span></div>
                            <div>SIZE {{ file.size | fileSize }}</div>
                            <!-- TODO 재생 시간 -->
                            <div>TIME {{ file.type.startsWith('vedio') ? file.reg_date : "NONE" }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            tmp_del_files() {
                return this.$store.state.trash
            }
        },
        mounted() {
            
        },
        methods: {
            delConfirm(index) {
                if(confirm('해당 파일을 영구삭제하시겠습니까?')) {
                    this.$store.dispatch('delContent', index);
                }
            }
        }
    }
</script>

<style>
    
</style>
