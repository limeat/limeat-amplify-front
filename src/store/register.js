// import axios from 'axios';
/* eslint-disable */
const state = {
    user: {
        detail: {
            lat: '',
            long: ''
        },
        signUp: {
            account: '',
            password: '',
            code: ''
        }
    }
}

const getters = {
    user: state => state.user
}

export default {
    namespaced: true,
    state, getters
}
