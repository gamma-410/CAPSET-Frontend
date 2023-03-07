import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import CreateView from '../views/CreateView.vue'
import LiveView from '../views/LiveView.vue'
import StudioView from '../views/StudioView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/home/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/home/lives/:id',
    name: 'lives',
    component: LiveView
  },
  {
    path: '/home/studio',
    name: 'studio',
    component: StudioView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
