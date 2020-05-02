import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import TimingFullBoard from "@/components/boards/TimingFullBoard";
import VueRouter from "vue-router";
import App from "@/App";
import Filters from "./filters/Filters";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueNativeSock, 'ws://localhost:8091/', {
  format: 'json',
  reconnection: true,
  reconnectionDelay: 5000 // time to reconnect in milliseconds
});

const router = new VueRouter({
  routes: [{
    path: "/boards/full-timing", component: TimingFullBoard
  }, {
    path: "/", redirect:  "/boards/full-timing"
  }]
});

new Vue({
  router,
  components: {Filters},
  render: h => h(App)
}).$mount('#app');