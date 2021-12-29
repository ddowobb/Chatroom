import { createRouter, createWebHashHistory } from 'vue-router'
import Join from '../views/Join.vue'
import Create from '../views/Create.vue'

const routes = [
  {
    path: '/',
    name: 'Create',
    component: Create
  }
  , {
    path: '/join/:room_id',
    name: 'Join',
    component: Join
  },
  {
    path: '/join/',
    name: 'JoinEmpty',
    component: Join
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
