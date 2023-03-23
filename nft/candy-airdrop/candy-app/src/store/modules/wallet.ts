import { connect, disconnect } from "@/modules/wallet/connect"
import { errorAlert, successAlert } from "./alert.default";

const wallet = {

    namespaced: true,

    state: () => ({
        loading: false,
        connected: false,
        address: null
    }),

    mutations: {
        SET_LOADING(state: any, payload: boolean) { state.loading = payload },
        SET_ADDRESS(state: any, payload: string) { state.address = payload; state.connected = payload ? true : false }
    },

    actions: {
        async connectWalletACTION({ commit }: { commit: any }) {
            commit('SET_LOADING', true)
            // address can return address pubkey or error on failure
            const address = await connect()
            if (address) {
                commit('SET_ADDRESS', address)
                successAlert("Connected", `As ${address}`)
            } else {
                errorAlert("Cannot connect to your wallet", address)
            }
            commit('SET_LOADING', false)
        },
        disconnectWalletACTION({ commit }: { commit: any }) {
            commit('SET_LOADING', true)
            disconnect()
            successAlert("Diconnected", "")
            commit('SET_ADDRESS', null)
            commit('SET_LOADING', false)
        }
    }
}
export default wallet