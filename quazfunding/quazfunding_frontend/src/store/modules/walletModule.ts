import { alertNormalizer } from "../../modules/alert"
import { connectWallet } from "../../modules/wallet"

const walletModule = {

    namespaced: true,

    state: () => ({
        loading: false,
        connected: false,
        wallet: null
    }),

    mutations: {
        SET_LOADING(state: any, payload: boolean) {
            state.loading = payload
        },
        SET_WALLET(state: any, payload: any) {
            state.wallet = payload
            state.connected = true
        }
    },

    actions: {
        async connectWallet({ commit }: { commit: any }) {
            commit('SET_LOADING', true)
            const wallet = await connectWallet()
            if (typeof (wallet) != 'string') alertNormalizer({ type: 3, title: 'Error', message: wallet.message })
            else commit('SET_WALLET', wallet)
            commit('SET_LOADING', false)
        },
    }

}

export default walletModule