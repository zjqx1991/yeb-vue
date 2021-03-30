import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'

//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {GET, POST} from "./utils/api"
import {USER_INFO_URL} from './utils/apiUrlConst';
import { TOKEN_KEY, USERINFO_KEY } from './utils/const_utils';
import { initMenus } from './utils/menus';


Vue.config.productionTip = false

//安装
Vue.use(ElementUI);

// 插件方式引入请求
Vue.prototype.GET = GET
Vue.prototype.POST = POST

/**
 * 路由导航，前缀守卫
 */
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem(TOKEN_KEY)
  if (token) {
    // 获取菜单
    initMenus(router, store);
    // 用户信息
    let userInfo = window.sessionStorage.getItem(USERINFO_KEY)
    if (!userInfo) {
      GET(USER_INFO_URL).then(res => {
        if (res.code == 0) {
          window.sessionStorage.setItem(USERINFO_KEY, JSON.stringify(res.data))
          next();
        }
      })
    }
  }
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
