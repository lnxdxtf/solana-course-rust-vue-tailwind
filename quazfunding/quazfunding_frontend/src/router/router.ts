import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'

async function loadPage(page: string) {
    return await import(`../pages/${page}.vue`)
}

const router = () => {
    const routes = [
        { path: '/', name: 'Home', component: () => loadPage('Home') },

        // PATH AUTH
        {
            path: '/app', name: 'App', beforeEnter: (to, from, next) => {
                store.state.walletModule.connected ? next() : next('/')
            },
            children: [
                { path: '/donate', name: 'Donate', component: () => loadPage('Donate') }
            ]
        },
    ]

    const router = createRouter({
        history: createWebHistory(),
        routes
    })
    return router
}

export default router