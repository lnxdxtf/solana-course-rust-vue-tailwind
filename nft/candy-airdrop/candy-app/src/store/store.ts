import { createStore } from 'vuex'
import wallet from './modules/wallet'

const store = createStore({
    state: () => {

    },
    modules: {
        wallet
    }
})

export default store