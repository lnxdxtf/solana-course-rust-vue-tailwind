import { createStore } from "vuex";
import walletModule from "./modules/walletModule";
import programModule from "./modules/programModule";

const store = createStore({
    state: () => {

    },

    modules: {
        walletModule,
        programModule
    }
})

export default store