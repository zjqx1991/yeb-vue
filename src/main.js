import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {GET, POST} from "./utils/api"
import { TOKEN_KEY } from './utils/const_utils';
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
  console.log(`路由导航，前缀守卫--${token}`)
  if (token) {
    initMenus(router, store);
  }
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
