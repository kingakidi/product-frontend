<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/no-unused-components -->
<template>
  <div>
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
// import Dashboard from "./components/Dashboard.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
// import Buttons from "./components/Buttons.vue";
import $ from "jquery";
import M from "materialize-css";

export default {
  name: "App",
  data: () => {
    return {
      msg: "msg",
    };
  },
  components: {
    // Dashboard,
    HeaderComponent,
    // Buttons,
  },
  beforeCreate: function () {},
  mounted: function () {
    M.AutoInit();
    $("select[required]").css({
      display: "block",
      height: 0,
      padding: 0,
      width: 0,
      position: "absolute",
    });
  },
};
</script>

<style scoped></style>
