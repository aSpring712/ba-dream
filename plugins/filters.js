import Vue from 'vue'

// 파일 용량 변환 byte -> KB, MB
Vue.filter('fileSize', data => {
    if(data > 1048576) {
        return Math.ceil(data/1048576) + "MB"
    } else if(data > 1024) {
        return Math.ceil(data/1024) + "KB"
    } else {
        return Math.ceil(data) + "byte"
    }
});

