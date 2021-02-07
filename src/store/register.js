// import axios from 'axios';
/* eslint-disable */
const state = {
    user: {
        detail: {
            lat: '',
            long: '',
            firstName: '',
            lastName: '',
            birth: ''
        },
        likes: {
            flavors: [],
            types: [],
            price: ''
        },
        signUp: {
            account: '',
            password: '',
            code: ''
        }
    },
    register: {
        status: '',
        phone: '',
        code: '',
    }
}

const getters = {
    user: state => state.user,
    register: state => state.register
}


const mutations = {
    RECEIVE_USER_PHONE_DATE(state, payload) {
        state.register.phone = payload.phone;
        state.register.code = payload.code;
        state.register.status = payload.status;
    },
    RECEIVE_USER_DETAIL(state, payload) {
        state.user.detail.firstName = payload.firstName;
        state.user.detail.lastName = payload.lastName;
        state.user.detail.birth = payload.birth;
    },
    RECEIVE_USER_LIKES(state, payload) {
        state.user.likes = payload;
    }
}


const actions = {
    getVerCode({ commit, state }, payload) {
        const phone = payload.phone;
        const status = payload.status;
        const random = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        let code = '';
        for (let e = 0; e < 6; e += 1) {
            const index = Math.floor(Math.random() * 10);
            code += random[index];
        }
        commit('RECEIVE_USER_PHONE_DATE', { phone: phone, code: code, status: status });
    },
    saveUserData({ commit, state }, payload) {
        const firstName = payload.firstName;
        const lastName = payload.lastName;
        const birth = payload.birth;
        commit('RECEIVE_USER_DETAIL', { firstName, lastName, birth });
    },
    setDefaultLikes({ commit, state }, payload) {
        commit('RECEIVE_USER_LIKES', payload);
    }
}


export default {
    namespaced: true,
    state, getters, mutations, actions
}
