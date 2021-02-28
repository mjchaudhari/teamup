import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import PhoneSignIn from '../views/PhoneSignIn.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/phone-signin',
    name: 'PhoneSignIn',
    component: PhoneSignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
