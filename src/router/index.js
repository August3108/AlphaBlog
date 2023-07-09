import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/app/HomeView'
import ShowMore from '@/views/app/ShowMore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog/ShowMore',
    name: 'ShowMore',
    component: ShowMore
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
