export const state = () => ({
    // userId: null,

    // 영상/이미지 목록
    imgAndVedio: [],
    // 휴지통
    trash: [],
    // 플레이 리스트
    playList: [],
})

export const mutations = {
    // logIn(state, payload) {
    //     state.userId = payload;
    // },
    // 업로드
    addContent(state, payload) {
        state.imgAndVedio.push(payload);
    },
    // 휴지통
    addTrash(state, payload) {
        console.log('store add trash', payload)
        let { file, index } = payload
        state.trash.push(state.imgAndVedio[index]);
        state.imgAndVedio.splice(index, 1);
    },
    // 플레이리스트에 추가
    addPlayist(state, payload) {
        console.log('store add playlist', payload)
        state.playList.push(payload.file);
    },
    // 플레이리스트에서 삭제
    removePlayList(state, payload) {
        console.log('store remove playlist');
        state.playList.splice(payload, 1);
    },
    // 영구 삭제
    delContent(state, payload) {
        state.trash.splice(payload, 1);
    },
    // content 저장
    loadContent(state, payload) {
        state.imgAndVedio = payload;
    },
    // 휴지통 저장
    loadTrash(state, payload) {
        state.trash = payload;
    },
    loadPlayList(state, payload) {
        state.playList = payload;
    }
}

export const actions = {
    // logIn({ commit }, payload) {
    //     commit('logIn', payload);
    // },
    // logOut({ commit }, payload) {
    //     commit('logIn', null);
    // }

    // 이미지/영상 업로드
    addContent({ commit }, payload) {
        commit('addContent', payload);
    },
    // 이미지/영상 삭제(휴지통으로 이동)
    async tmpDelContent({ commit }, payload) {
        try {
            // 실제로는 파일의 고유값(idx) 넘기기
            let result = await this.$axios.post(`/file/trash/${payload.index}`)

            if(result.data.type == "SUCCESS") {
                commit('addTrash', payload);
                alert('이미지/영상을 휴지통으로 이동했습니다.')
            }
        } catch(err) {
            alert('이미지/영상을 휴지통으로 이동하는데 실패했습니다.')
        }
    },
    // 플레이 리스트에 추가
    addPlaylist({ commit }, payload) {
        commit('addPlayist', payload);
        alert('플레이 리스트에 추가했습니다.')
    },
    removePlaylist({ commit }, payload) {
        commit('removePlayList', payload);
    },
    // 영구 삭제
    async delContent( {commit }, payload) {
        try {
            let result = await this.$axios.delete(`/file/${payload}`)
            console.log('payload ===>', payload)
            console.log('bbbbbbbbb', result)

            if(result.data.type == "SUCCESS") {
                console.log('store 영구 삭제')
                commit('delContent', payload);
                alert('영구삭제 되었습니다.')
            }
        } catch(error) {
            console.log(error);
            alert('영구 삭제에 실패했습니다.')
        }
    },
    getAllContents( {commit}, payload ) {
        commit('loadContent', payload);
    },
    getAllTrash( {commit }, payload ) {
        commit('loadTrash', payload);        
    },
    getPlayList( { commit }, payload ) {
        commit('loadPlayList', payload);
    }
}