// store/index.js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currencyList: [],
            currencyFilter: '',
            resetFilter: false
        }
    },
    mutations: {
        updateList(state, payload) {

            state.currencyList = payload
        },
        updateSearchFilter(state, payload) {

            state.currencyFilter = payload
        },
        updateResetFilter(state, payload) {

            state.resetFilter = payload
        }
    }
})

export default store