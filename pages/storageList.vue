<template>
    <div class="contents_container">
        <div class="section1">
            <span>컨텐츠 목록</span>
            <span><button class="uploadBtn" @click="file_upload">이미지, 영상 업로드</button></span>
        </div>

        <div class="section2">
            <div class="s2_div">
                <div class="recent_div">
                    최근 재생 된 컨텐츠(Carousel)
                    <div style="height: 100%; width: 100%;">
                        <!-- Carousel -->
                        <v-carousel 
                            style="height: 95%; width: 100%;"
                            :continuous="true"
                            :show-arrows="false"
                            delimiter-icon="mdi-square">
                            <template v-for="item in recent_views">
                                <v-carousel-item v-if="item.url"
                                    :src="require('@/assets/' + item.url)"
                                    cover
                                ></v-carousel-item>
                            </template>
                        </v-carousel>
                    </div>
                </div>
                <br/>
                <div style="height: 50%; min-height: fit-content; background-color: white; width: 100%;">
                    전체 컨텐츠(이미지/영상 클릭 시 전체 화면으로 재생됩니다)
                    <div style="display: flex; flex-flow: wrap; flex-direction: row;">
                        <div v-for="(file, index) in all_files">
                            <template v-if="!file.url.startsWith('blob')">
                                <img v-if="file.type.startsWith('image')" :src="require('@/assets/' + file.url)" style="width: 300px; height: 300px;" :id="`content${index}`" @click="fullScreen(`content${index}`)" />
                                <video controls v-else id="video" :src="require('@/assets/' + file.url)" style="width: 300px; height: 300px;" :id="`content${index}`" @click="fullScreen(`content${index}`)"></video>
                            </template>
                            <template v-else>
                                <img v-if="file.type.startsWith('image')" :src="file.url" style="width: 300px; height: 300px;" :id="`content${index}`" @click="fullScreen(`content${index}`)"/>
                                <video controls v-else id="video" :src="file.url" style="width: 300px; height: 300px;" :id="`content${index}`" @click="fullScreen(`content${index}`)"></video>
                            </template>
                            <div>TYPE {{ file.type.split('/')[0] }} <span style="color: red; cursor: pointer; float: right;" @click="tmpDelConfirm(file, index)">X</span></div>
                            <div>SIZE {{ file.size | fileSize }}</div>
                            <div>TIME {{ file.type.startsWith('video') ? $options.filters.convertDuration(file.duration) : "NONE" }}</div>
                            <button v-if="!file.list" style="color: blue; float: left;" @click="addListConfirm(file, index)">추가</button>
                            <div v-else style="color: black; float: left;">추가됨</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 우측 플레이 리스트 -->
            <div style="display: flex; background-color: green; width: 20%; height: 500px; overflow-y: scroll;">
                <div style="display: flex; height: 30px; width: 100%; flex-direction: column; justify-content: space-between; padding: 12px;">플레이 리스트 <button style="display: contents; color: blue;" @click="playFullScreen">재생</button>
                    (full screen 상태에서 컨텐츠를 클릭하면 다음 컨텐츠로 넘어갑니다.)

                    <div v-for="(item, index) in play_list" style="display: flex; flex-direction: column;">
                        <div style="width: 100%; height: 80px; background-color: gray; top: 30px;">
                            <div style="color: white; position: absolute;">{{ index+1 }}</div>
                            <div style="display: flex;">
                                    <div v-if="!item.url.startsWith('blob')">
                                        <img v-if="item.type.startsWith('image')" :id="`myContent${index}`" :src="require('@/assets/' + item.url)" style="width: 100px; height: 80px;" @click="nextScreen(index)"/>
                                        <video v-else :id="`myContent${index}`" :src="require('@/assets/' + item.url)" style="width: 100px; height: 80px;" @click="nextScreen(index)"></video>
                                    </div>
                                    <div v-else>
                                        <img v-if="item.type.startsWith('image')" :id="`myContent${index}`" :src="item.url" style="width: 100px; height: 80px;" @click="nextScreen(index)"/>
                                        <video v-else :id="`myContent${index}`" :src="item.url" style="width: 100px; height: 80px;" @click="nextScreen(index)"></video>
                                    </div>
                                    <div>
                                        <div>{{ item.type.split('/')[0] }}</div>
                                        <div>{{ item.size | fileSize }}</div>
                                        <div>{{ item.type.startsWith('video') ? $options.filters.convertDuration(item.duration) : "NONE" }}</div>
                                        <button style="position: sticky; float: right;" @click="removePlayList(index)">X</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" ref="fileInput" @change="change_file" single hidden accept="image/jpeg,image/gif,image/png,video/mp4,video/mkv,video/x-m4v,video/*">
        </div>
    </div>
</template>
<script>
    import getBlobDuration from 'get-blob-duration';
    export default {
        data() {
            return {
                // files: [],

                // all_files: [],

                recent_views: [],
            }
        },
        computed: {
            all_files() {
                return this.$store.state.imgAndVedio
            },
            play_list() {
                return this.$store.state.playList
            }
        },
        mounted() {
            // 최근 재생 된 컨텐츠 조회
            this.getRecentFiles();
            // 전체 컨텐츠 조회
            this.getAllFiles();
            // 플레이 리스트 조회
            this.getPlayList();
        },
        methods: {
            // 최근 재생 된 컨텐츠 조회
            async getRecentFiles() {
                try {
                    let result = await this.$axios.get('/file/recentView')
                    if(result.data.type == "SUCCESS") {
                        // back단에서 데이터 받아 바인딩 하는 경우
                        this.recent_views = result.data.data;
                        console.log(this.recent_views);
                    }
                } catch(err) {
                    console.log(err);
                }
            },
            // 전체 컨텐츠 조회
            async getAllFiles() {
                try {
                    let result = await this.$axios.get('/file/all');
                    if(result.data.type == "SUCCESS") {
                        // this.all_files = result.data.files;
                        this.$store.dispatch('getAllContents', result.data.data);
                    } else {
                        // 파일 조회 실패
                        // this.all_files = [];
                        this.$store.dispatch('getAllContents', []);
                    }
                } catch(err) {
                    console.log(err);
                }
            },
            // 플레이 리스트 조회
            async getPlayList() {
                let result = await this.$axios.get('/file/playList');
                if(result.data.type == "SUCCESS") {
                    // back단에서 데이터 받아 바인딩 하는 경우
                    this.$store.dispatch('getPlayList', result.data.data);
                } else {
                    this.$store.dispatch('getPlayList', []);
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

                        let blob = URL.createObjectURL(new_file)
                        let duration = "NONE";
                        if(new_file.type.startsWith("video")) {
                            duration = await getBlobDuration(blob)
                        }
                        

                        console.log('BLOB DURATION', duration);

                        this.$store.dispatch('addContent', {
                            url: blob,
                            type: new_file.type,
                            size: new_file.size,
                            duration,
                        })

                        // this.all_files.push({
                        //     url: URL.createObjectURL(new_file),
                        //     type: new_file.type,
                        //     size: new_file.size,
                        //     reg_date: new Date(),
                        // })

                        return this.$refs.fileInput.value = '';
                    } else {
                        alert('업로드에 실패했습니다.')
                    }
                } catch(err) {
                    console.log(err);
                    alert('이미지/영상 업로드에 실패했습니다.')
                }
            },
            // 휴지통으로 이동
            tmpDelConfirm(file, index) {
                if(confirm('삭제하시겠습니까?')) {
                    this.$store.dispatch('tmpDelContent', {file, index});
                }
            },
            // 재생목록에 추가
            async addListConfirm(file, index) {
                try {
                    const formData = new FormData();

                    formData.append('upload', file);

                    // 실제로는 이미지/영상 db에 저장된 고유 idx만 넘기기
                    let result = await this.$axios.post('/file/addPlayList', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    if(result.data.type == "SUCCESS") {
                        this.$store.dispatch('addPlaylist', {file, index});
                    }
                } catch(err) {
                    alert('재생목록 추가에 실패했습니다.')
                }
            },
            // 재생
            playFullScreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                }

                let playLength = this.play_list.length;
                console.log('LENGTH ==> ', playLength);

                if(playLength > 0) {
                    this.fullScreen('myContent0')                
                } else {
                    alert('재생할 컨텐츠가 없습니다.')
                }

                // ! 10초 마다 실행하려고 했으나, 사용자의 조작 없이 script로 실행하는 것을 브라우저가 막는다고 함
                // let self = this;
                // for(let i=0; i < playLength; i++){
                //     (function(x){
                //         setTimeout(function(){
                //             self.fullScreen(`myContent${x}`);
                //         }, 10000*x);
                //     })(i);
                // }
            },
            // fullScreen 상태에서 이미지 클릭 시 다음 이미지로 전환됨
            nextScreen(index) {

                let playLength = this.play_list.length;
                console.log('CLICK IMAGE ==>', index);
                console.log('full screen인지 check하기')

                if(document.fullscreenElement) {
                    if(index == playLength-1) {
                        // const el = document.getElementById(`mycontent${index}`);
                        alert('마지막 컨텐츠입니다.')
                        if(document.exitFullscreen) {
                            document.exitFullscreen();
                        }
                    } else {
                        this.fullScreen(`myContent${index+1}`)
                    }
                }
            },
            fullScreen(event) {
                console.log('===', event);
                const el = document.getElementById(event);

                if(el.requestFullscreen) {
                    el.requestFullscreen();
                }
            },
            // 재생 목록에서 삭제
            removePlayList(index) {
                if(confirm('재생목록에서 삭제하시겠습니까?')) {
                    console.log('YES!!!');
                    this.$store.dispatch('removePlaylist', index)
                }
            }
        },
    }
</script>

<style scss>
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
    .section2 {
        display: flex; 
        width: 100%; 
        justify-content: space-between; 
        padding: 10px;
    }
    .s2_div {
        display: flex; 
        background-color: black; 
        width: 80%; 
        height: calc(100vh - 100px);
        margin-right: 40px; 
        flex-direction: column; 
        padding: 8px;
    }
    .recent_div {
        height: 50%; 
        background-color: white; 
        width: 100%;  
    }
</style>
