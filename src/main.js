import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//安装
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
