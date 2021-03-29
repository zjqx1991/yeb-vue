import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {GET, POST} from "./utils/api"


Vue.config.productionTip = false

//安装
Vue.use(ElementUI);

// 插件方式引入请求
Vue.prototype.GET = GET
Vue.prototype.POST = POST


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
