import Vue from 'vue'
import TimingFullBoard from "@/components/boards/TimingFullBoard";
import VueRouter from "vue-router";
import App from "@/App";
import Filters from "./filters/Filters";
import GridBoard from "./components/boards/GridBoard";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: "/boards/full-timing", component: TimingFullBoard,
  }, {
    path: "/boards/grid", component: GridBoard
  }, {
    path: "/", redirect:  "/boards/full-timing"
  }]
});

new Vue({
  router,
  components: {Filters},
  render: h => h(App)
}).$mount('#app');