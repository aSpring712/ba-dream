<template>
    <div class="contents_container">
        <div class="section1">
            <span>컨텐츠 목록</span>
            <span><button class="uploadBtn" @click="file_upload">이미지, 영상 업로드</button></span>
        </div>

        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px;">
            <!-- 좌측 최근 재생 된 컨텐츠 / 전체 컨텐츠 -->
            <div style="display: flex; background-color: black; width: 80%; height: calc(100vh - 100px); margin-right: 40px; flex-direction: column; padding: 8px;">
                <div style="height: 50%; background-color: white; width: 100%;">
                    최근 재생 된 컨텐츠(Carousel)
                    <!-- Carousel -->
                    <div>
                        
                    </div>
                </div>
                <br/>
                <div style="height: 50%; background-color: white; width: 100%;">
                    전체 컨텐츠
                    <div style="display: flex; flex-flow: wrap; flex-direction: row;">
                        <div v-for="file in all_files">
                            <img v-if="file.type.startsWith('image')" :src="file.url" style="width: 300px; height: 300px;"/>
                            <img v-else src="static/vedio_temp.jpg" style="width: 300px; height: 300px;"/>
                            <div>TYPE {{ file.type.split('/')[0] }}</div>
                            <div>SIZE {{ file.size | fileSize }}</div>
                            <!-- TODO 재생 시간 -->
                            <div>TIME {{ file.type.startsWith('vedio') ? file.reg_date : "NONE" }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 우측 플레이 리스트 -->
            <div style="display: flex; background-color: green; width: 20%; height: 500px; flex-direction: column; overflow-y: scroll;">
                <div style="display: flex; height: 20px; width: 100%; justify-content: space-between; padding: 12px;">플레이 리스트 <button>재생</button></div>
                <template v-for="item in recent_play">
                    <div style="width: 100%; height: 80px; background-color: gray; margin-top: 20px;">{{ item.id }}</div>
                </template>
            </div>
        </div>

        <input type="file" ref="fileInput" @change="change_file" single hidden accept="image/jpeg,image/gif,image/png,video/mp4,video/mkv,video/x-m4v,video/*">
    </div>
</template>
<script>
    export default {
        data() {
            return {
                recent_play: [{id: 1}, {id: 2}],
                files: [],

                all_files: [],
            }
        },
        mounted() {
            // 전체 파일 조회
            this.getAllFiles();
        },
        methods: {
            async getAllFiles() {
                let result = await this.$axios.get('/file/all')
                if(result.data.type == "SUCCESS") {
                    this.all_files = result.data.files;
                } else {
                    // 파일 조회 실패
                    this.all_files = [];
                }
            },
            file_upload() {
                this.$refs.fileInput.value = '';
                this.$refs.fileInput.click();
            },
            change_file(e) {
                console.log('CHANGE FILE', e.target.files);

                // 파일 용량 제한(10MB)
                let maxSize = 10 * 1024 * 1024 // 10MB 사이즈 제한                
                let new_file = e.target.files[0];
                let new_file_size = new_file.size;

                console.log('파일 사이즈 ===>', new_file_size);

                if(new_file_size > maxSize) {
                    alert('파일첨부 사이즈는 10MB 이내로 가능합니다.')
                    return this.$refs.fileInput.value = '';
                } else {
                    this.submit(new_file);
                }
            },
            async submit(new_file) {
                try {
                    const formData = new FormData();

                    formData.append('upload', new_file);

                    let result = await this.$axios.post('/file/uploadFiles', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    console.log(result)

                    if(result.data.type == "SUCCESS") {
                        alert('업로드 되었습니다.');

                        this.all_files.push({
                            url: URL.createObjectURL(new_file),
                            type: new_file.type,
                            size: new_file.size,
                            reg_date: new Date(),
                        })
                        return this.$refs.fileInput.value = '';
                    } else {
                        alert('업로드에 실패했습니다.')
                    }
                } catch(err) {
                    console.log(err);
                    alert('이미지/영상 업로드에 실패했습니다.')
                }
            }
        }
    }
</script>

<style>
    .contents_container {
        display: absolute; 
        padding-top: 90px; 
        width: 100%; 
        height: 100%;
    }
    .section1 {
        display: flex; width: 100%; 
        justify-content: space-between; 
        padding: 10px;
    }
</style>
