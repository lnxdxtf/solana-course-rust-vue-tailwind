import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/app.css'
import router from '@/router/router'
import store from './store/store'
import { check } from './modules/wallet/connect'

function init() {
    const app = createApp(App)
    app.use(router())
    app.use(store)
    settingsAfterMount()
    app.mount('#app')
}

function settingsAfterMount() {
    if (check()) store.dispatch('wallet/connectWalletACTION')
}

init()