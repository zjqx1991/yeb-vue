import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/common/login.vue"

Vue.use(VueRouter)

/**
 * 配置一些固定的界面
 */
const routes = [
  {
    path: '/',
    name: 'Login1',
    component: Login,
    hidden: true
  }
]

/**
 * 动态添加的界面
 */
const router = new VueRouter({
  routes
})

export default router
