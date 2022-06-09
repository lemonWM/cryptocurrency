// store/index.js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currencyList: [],
            currencyFilter: '',
            resetFilter: false,
            filterBy: ''
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
        },
        updateFilterBy(state, payload) {
            
            state.filterBy = payload
        }
    }
})

export default store