import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home.vue'
import aboutPage from '../views/about.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage
    }
  ]
})

export default router
