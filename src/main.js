import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { router } from "./router";
import "materialize-css/dist/css/materialize.min.css";
// import "material-design-icons/iconfont/material-icons.css";
import M from "materialize-css";

new Vue({
  el: "#app",
  render: (h) => h(App),
  components: {
    App,
  },
  mounted: function () {
    M.AutoInit();
    this.$store.dispatch("getProducts");
  },
  template: "<App/>",
  data: {
    msg: "Vue",
  },
  router,
  store,
});
