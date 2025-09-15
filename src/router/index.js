import { createRouter, createWebHistory } from 'vue-router'
import Home from '../js/pages/Home.vue' // adjust path if needed

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Home.vue is now the homepage
  },
  // other routes...
]

const router = createRouter({
  history: createWebHistory('/'), // base URL
  routes,
})

export default router
