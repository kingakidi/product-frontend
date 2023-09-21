<template>
  <div style="margin-top: 30px">
    <buttons></buttons>
    <summary-component></summary-component>
    <table-component
      table-title="Products Expiring soon"
      v-bind:products="products"
    ></table-component>
  </div>
</template>

<script>
import SummaryComponent from "./SummaryComponent";
import TableComponent from "./Tables/ProductTable";
import Buttons from "./Buttons";

import M from "materialize-css";
export default {
  name: "DashBoard",
  components: {
    SummaryComponent,
    TableComponent,
    Buttons,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted: function () {
    try {
      M.FormSelect.init(document.querySelectorAll("select"));
      this.products = this.$store.state.products;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped></style>
