// store/index.js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currencyList: [],
            currencyFilter: ''
        }
    },
    mutations: {
        updateList(state, payload) {

            state.currencyList = payload
        },
        updateSearchFilter(state, payload) {

            state.currencyFilter = payload
        }
    }
})

export default store