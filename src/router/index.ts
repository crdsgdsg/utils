import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        name:"aaa",
        path: '/jsonProduce',
        component: () => import('@/views/jsonProduce/index.vue')
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router