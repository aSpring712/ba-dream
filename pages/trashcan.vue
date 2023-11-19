<template>
    <div style="display: flex; padding-top: 90px; width: 100%; height: 100%; flex-direction: column;">
        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px">
            <span>휴지통</span>
            <!-- <span><button>영구 삭제</button></span> -->
        </div>

        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px;">
            <div style="display: flex; background-color: black; width: 100%; height: calc(100vh - 100px); margin-right: 40px; flex-direction: column; padding: 8px;">
                <div style="height: 100%; background-color: white; width: 100%;">
                    <div style="display: flex; flex-flow: wrap; flex-direction: row;">
                        <!--  || '@/assets/' + file.name -->
                        <div v-for="(file, index) in tmp_del_files">
                            <template v-if="!file.url.startsWith('blob')">
                                <img v-if="file.type.startsWith('image')" :src="require('@/assets/' + file.url)" style="width: 300px; height: 300px;"/>
                                <video v-else id="video" :src="require('@/assets/' + file.url)" style="width: 300px; height: 300px;"></video>
                            </template>
                            <template v-else>
                                <img v-if="file.type.startsWith('image')" :src="file.url" style="width: 300px; height: 300px;"/>
                                <video v-else id="video" :src="file.url" style="width: 300px; height: 300px;"></video>
                            </template>
                            <div>TYPE {{ file.type.split('/')[0] }} <span style="color: red; cursor: pointer; float: right;" @click="delConfirm(index)">X</span></div>
                            <div>SIZE {{ file.size | fileSize }}</div>
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
        async mounted() {
            // 휴지통 내용 불러오기 기능 
            // 해당 function으로 불러오기 시 컨텐츠 목록에서 삭제한 내용 reset 되어버려서 기능 구현 후 주석 처리 함
            // this.getAllTraash();
        },
        methods: {
            /* async getAllTraash() {
                let result = await this.$axios.get('/file/trash');
                if(result.data.type == 'SUCCESS') {
                    // this.tmp_del_files = result.data.data;
                    this.$store.dispatch('getAllTrash', result.data.data);
                } else {
                    // this.tmp_del_files = result.data.data;
                    this.$store.dispatch('getAllTrash', []);
                }
            }, */
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
