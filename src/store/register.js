/* eslint-disable */
import axios from 'axios'

const GRAPHQL_API = 'http://3.139.153.191:4000/'

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
    saveUserData({ commit, state }, payload) {
        const firstName = payload.firstName;
        const lastName = payload.lastName;
        const birth = payload.birth;
        commit('RECEIVE_USER_DETAIL', { firstName, lastName, birth });
    },
    setDefaultLikes({ commit, state }, payload) {
        commit('RECEIVE_USER_LIKES', payload);
    },
    verifyPhone({ commit, state }, payload) {
        const phone = payload.phone;
        const code = payload.code;
        return axios({
            method: 'POST',
            url: GRAPHQL_API,
            data: {
                query: `
                    mutation {
                        verifyCellphone(
                            payload: {
                                cellphone: "${phone}",
                                verificationCode: "${code}"
                            }
                        ){
                            status,
                            message,
                            token
                        }
                    }
                `
            }
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            })
    },
    getVerCode({ commit, state }, payload) {
        const phone = payload.phone;
        const status = payload.status;
        return axios({
            method: 'POST',
            url: GRAPHQL_API,
            data: {
                query: `
                    mutation {
                        sendSmsVerificationCode(
                            payload: {
                                cellphone: "${phone}"
                            }
                        ){
                            status,
                            message
                        }
                    }
                `
            }
        })
        .then((res) => {
            commit('RECEIVE_USER_PHONE_DATE', { phone: phone, code: '', status: status });
            return res;
        })
    },
    createAccount({ commit, state }, payload) {
        const phone = payload.phone;
        const firstName = payload.firstName;
        const lastName = payload.lastName;
        const birthday = payload.birth;
        return axios({
            method: 'POST',
            url: GRAPHQL_API,
            data: {
                query: `
                    mutation {
                        createAccount(
                            payload: {
                                cellphone: "${phone}",
                                firstName: "${firstName}",
                                lastName: "${lastName}",
                                birthday: ${birthday}
                            }
                        ){
                            status,
                            message
                        }
                    }
                `
            }
        })
        .then((res) => {
            return res;
        })
    },
    // 取得帳號資訊
    getAccountInfo({ commit, state }, payload) {
        const token = payload.token;
        return axios({
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: GRAPHQL_API,
            data: {
                query: `
                    {
                        getAccount {
                            message
                        }
                    }
                `
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
    }
}


export default {
    namespaced: true,
    state, getters, mutations, actions
}
