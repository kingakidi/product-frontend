<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div style="margin-top: 30px">
    <buttons></buttons>

    <table-component
      v-if="products.length"
      table-title="Product List"
      v-bind:products="sortedProducts"
    ></table-component>

    <div style="text-align: center; font-size: 30px; margin-top: 40px" v-else>
      No Product Register on this Batches
    </div>
  </div>
</template>

<script>
import TableComponent from "../Tables/ProductTable";
import Buttons from "../Buttons.vue";
import M from "materialize-css";
import axios from "axios";
import url from "../../config";

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
  },
  methods: {
    getProducts(batchId) {
      axios.get(url + "batch" + `/${batchId}`).then(
        (response) => {
          this.batches = response.data.products;

          if (this.batches.length > 0) {
            this.products = this.batches;
          } else {
            this.products = [];
          }
        },
        () => {}
      );
    },
    // getProducts() {
    //   this.$store.dispatch("getProducts");
    // },
  },
  created() {
    const batchId = this.$route.params.batchId;

    this.getProducts(batchId);
  },
};
</script>

<style scoped></style>
