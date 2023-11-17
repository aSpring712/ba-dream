export const state = () => ({
    userId: null,
    members: [],
    imgAndVedio: [],
    trash: [],
})

export const mutations = {
    logIn(state, payload) {
        state.userId = payload;
    },
    // 회원가입
    signUp(state, payload) {
        state.members.push(payload);
    },
    // 업로드
    upload(state, payload) {

    },
    remove(state, payload) {

    },
}

export const actions = {
    // 회원가입
    signUp({ commit, state }, payload) {
        commit('signUp', payload);
    },
    logIn({ commit }, payload) {
        commit('logIn', payload);
    },
    logOut({ commit }, payload) {
        commit('logIn', null);
    }
}