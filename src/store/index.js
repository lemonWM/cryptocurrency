// store/index.js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currencyList: []
        }
    },
    mutations: {
        updateList(state, payload) {

            state.currencyList = payload
        }
    }
})

export default store