<template>
    <div class="contents_container">
        <div class="section1">
            <span>컨텐츠 목록</span>
            <span><button class="uploadBtn" @click="file_upload">이미지, 영상 업로드</button></span>
        </div>

        <div style="display: flex; width: 100%; justify-content: space-between; padding: 10px;">
            <!-- 좌측 최근 재생 된 컨텐츠 / 전체 컨텐츠 -->
            <div style="display: flex; background-color: aqua; width: 80%; height: calc(100vh - 100px); margin-right: 40px; flex-direction: column; padding: 10px;">
                <div style="height: 50%; background-color: gray; width: 100%;">
                    최근 재생 된 컨텐츠(Carousel)
                    <!-- Carousel -->
                    <div>
                        
                    </div>
                </div>
                <br/>
                <div style="height: 50%; background-color: yellow; width: 100%;">
                    전체 컨텐츠
                    <template v-for="file in all_files">
                        <div>{{ file }}</div>
                    </template>
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

        <input type="file" ref="fileInput" @change="change_file" hidden multiple accept="image/jpeg,image/gif,image/png,video/mp4,video/mkv, video/x-m4v,video/*">
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
                const new_files = e.target.files;
                for(let i = 0; i < new_files.length; i++) {
                    this.files.push({
                        file: new_files[i]
                    })
                }

                this.submit();
            },
            async submit() {
                try {
                    const formData = new FormData();

                    this.files.forEach(x => {
                        formData.append('upload', x.file)
                    })

                    let result = await this.$axios.post('/file/uploadFiles', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    console.log(result)

                    if(result.data.type == "SUCCESS") {
                        alert('업로드 되었습니다.');
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
