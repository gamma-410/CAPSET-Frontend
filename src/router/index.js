import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import CreateView from '../views/CreateView.vue'
import LiveView from '../views/LiveView.vue'
import StudioView from '../views/StudioView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/lives/:id',
    name: 'lives',
    component: LiveView
  },
  {
    path: '/studio',
    name: 'studio',
    component: StudioView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
