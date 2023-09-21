<template>
  <div class="table" style="margin-top: 30px">
    <div class="container">
      <div class="z-depth-1 white t-wrapper">
        <div class="row">
          <div class="col s12 m8 l6">
            <div class="title">
              <h5>{{ tableTitle }}</h5>
            </div>
          </div>
          <div class="col s12 m6 l6">
            <div class="input-field">
              <select id="filter" v-model="filterCriteria">
                <option value="" disabled selected>Select to filter</option>
                <option value="">All Products</option>
                <option value="0">Already Expired</option>
                <option value="30">Expiring in 30 days</option>
                <option value="60">Expiring in 60 days</option>
                <option value="90">Expiring in 90 days</option>
              </select>
              <label for="filter">Filter by Expiration</label>
            </div>
          </div>
        </div>
        <error-alert v-bind:message="errorMsg" ref="errorAlert"></error-alert>
        <success-alert
          v-bind:message="successMsg"
          ref="successAlert"
        ></success-alert>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Manufacturer</th>
              <th>Bar Code</th>
              <th>Production Date</th>
              <th>Expiry Date</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filterProduct" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.manufacturer }}</td>
              <td>{{ product.barcode }}</td>
              <td>{{ product.manufacturing_date }}</td>
              <td>{{ product.expiry_date }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button
                  @click="editProduct(product)"
                  class="btn waves-circle fa fa-pencil"
                ></button>
              </td>
              <td>
                <button
                  @click="deleteProduct(product.id)"
                  class="btn waves-circle red fa fa-trash"
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <edit-product-component
      v-bind:product="currentProduct"
    ></edit-product-component>
  </div>
</template>

<script>
import axios from "axios";
import EditProductComponent from "../Modals/EditProductComponent";

import ErrorAlert from "../Alerts/ErorrAlert";
import SuccessAlert from "../Alerts/SuccessAlert";

import moment from "moment";
import M from "materialize-css";
import url from "../../config";

export default {
  name: "TableComponent",
  props: ["tableTitle", "products"],
  data() {
    return {
      errorMsg: "",
      successMsg: "",
      currentProduct: "",
      filterCriteria: "",
    };
  },
  computed: {
    filterProduct() {
      let products = this.products;
      const currentDate = moment();

      if (this.filterCriteria === "") {
        return this.products;
      } else if (this.filterCriteria === "0") {
        return products.filter((product) => {
          const expiryDate = moment(product.expiry_date);
          return expiryDate.isBefore(currentDate);
        });
      } else {
        const filterDays = parseInt(this.filterCriteria);
        if (!isNaN(filterDays)) {
          const filterDate = currentDate.clone().add(filterDays, "days");
          return products.filter((product) => {
            const expiryDate = moment(product.expiry_date);
            return expiryDate.isBetween(currentDate, filterDate, null, "[]");
          });
        }
      }

      // Add a default return statement to return all products if none of the conditions are met
      return products;
    },
  },

  components: { ErrorAlert, SuccessAlert, EditProductComponent },
  methods: {
    editProduct(product) {
      this.currentProduct = product;
      let modal = M.Modal.getInstance(
        document.getElementById("edit-product-modal")
      );
      modal.options.onCloseStart = () => {
        this.$store.dispatch("getProducts");
      };
      modal.open();
    },
    deleteProduct(id) {
      axios.delete(url + "product/" + id).then(
        (response) => {
          const msg = response.data;
          if (msg.status === "success") {
            this.successMsg = "Product successfully deleted";
            this.$refs.successAlert.showAlert();
            this.$store.dispatch("getProducts");
          } else {
            this.errorMsg = "Product was not deleted due to system error";
            this.errorAlert.showAlert();
          }
        }, // Promise then callback
        () => {
          this.errorMsg = "Server error: Request can't be process ";
          this.$refs.errorAlert.showAlert();
        }
      );
    },
  },
  mounted() {
    M.FormSelect.init(document.querySelector("#filter")).destroy();
    M.Modal.init(document.querySelectorAll(".modal"));
  },
};
</script>

<style scoped></style>
