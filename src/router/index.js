import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import toyApp from '../views/toy-app.vue'
import aboutPage from '../views/about.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: home
    },
    {
      path: '/toy',
      name: 'toy-app',
      component: toyApp
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage
    },
    {
      path: '/toy/:toyId',
      name: 'toy-details',
      component: toyDetails
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
  ]
})

export default router
