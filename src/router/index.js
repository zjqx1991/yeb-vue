import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/common/login.vue"
import Home from '../views/home/home.vue'
import Test1 from '../views/home/test1.vue';
import Test2 from '../views/home/test2.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login1',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: '导航一',
    component: Home,
    hidden: false,
    children: [
      {
        path: '/test1',
        name: '选项111',
        component: Test1
      },
      {
        path: '/test2',
        name: '选项222',
        component: Test2
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
