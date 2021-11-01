import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import less from 'less';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import service from './utils/axios.js';
Vue.config.productionTip = false;
Vue.prototype.axios = service;
Vue.use(ElementUI);
Vue.use(less);
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
