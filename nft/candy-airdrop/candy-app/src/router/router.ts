import { createRouter, createWebHistory } from 'vue-router'

const lazyloadPage = async (page: string) => await import(`../pages/${page}.vue`)

const router = () => {
    const routes = [
        { path: '/', name: 'Home', component: () => lazyloadPage('Home') }
    ]

    return createRouter({
        history: createWebHistory(),
        routes
    })
}

export default router