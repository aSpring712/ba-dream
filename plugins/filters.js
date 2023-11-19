import Vue from 'vue'

// 파일 용량 변환 byte -> KB, MB
Vue.filter('fileSize', data => {
    if(isNaN(data)) {
        return data;
    }

    if(data > 1048576) {
        return Math.ceil(data/1048576) + "MB"
    } else if(data > 1024) {
        return Math.ceil(data/1024) + "KB"
    } else {
        return Math.ceil(data) + "byte"
    }
});

// 파일 재생시간 변환
Vue.filter('convertDuration', duration => {
    if(isNaN(duration)) {
        return duration;
    }

    if(duration < 60) {
        return duration.toFixed(2) + "초"
    } else if(duration < 3600) {
        return (duration/60).toFixed(2) + "분"
    } else {
        return (duration/3600).toFixed(2) + "시간"
    }
});
