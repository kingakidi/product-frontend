<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div>
    <buttons></buttons>
    <table-component
      table-title="Product List"
      v-bind:products="sortedProducts"
    ></table-component>
  </div>
</template>

<script>
import TableComponent from "./Tables/ProductTable";
import Buttons from "./Buttons";
import M from "materialize-css";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  computed: {
    sortedProducts() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.products.reverse();
    },
  },
  components: {
    Buttons,
    TableComponent,
  },
  mounted: function () {
    M.FormSelect.init(document.querySelectorAll("select"));
    this.products = this.$store.state.products;
  },
  methods: {
    getProducts() {
      this.$store.dispatch("getProducts");
    },
  },
  created() {},
};
</script>

<style scoped></style>
