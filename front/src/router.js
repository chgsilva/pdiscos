import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Albums from './views/Albums.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/albums',
            name: 'albums',
            component: Albums
        }
    ]
})
