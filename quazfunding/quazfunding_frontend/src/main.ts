import { createApp } from 'vue'
import './assets/css/app.css'
import App from './App.vue'
import router from './router/router'
import { initFlowbite } from 'flowbite'
import store from './store/store'

initialize()

function initialize() {
    let app = createApp(App)
    settingsApp(app)
    app.mount('#app')
    settingsProgram()
}

function settingsApp(app: App<Element>) {
    app.use(router())
    app.use(store)
    initFlowbite()
}

function settingsProgram() {
    store.dispatch('programModule/setCampaigns')
}