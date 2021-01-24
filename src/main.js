import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import infiniteScroll from "vue-infinite-scroll";
Vue.config.productionTip = false;

Vue.use(infiniteScroll);
Vue.use(ElementUI);
Vue.use(VueFullPage);
Vue.use(VueLazyload, {
  loading: require("./assets/css/1.png"),
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
