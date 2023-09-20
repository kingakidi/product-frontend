/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import ProductList from "./components/ProductList.vue";
import ProductBatches from "./components/ProductBatches.vue";
import LoginComponent from "./components/LoginComponent.vue";
import beforeEnter from "./auth";
import axios from "axios";

const router = new VueRouter({
  //mode: 'history',
  routes: [
    {
      path: "/product_batches",
      component: ProductBatches,
      // beforeEnter,
    },
    {
      path: "/product_list",
      component: ProductList,
      // beforeEnter,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      // beforeEnter,
    },
    {
      path: "/batche/:batchId",
      component: ProductList,
    },
    {
      path: "/",
      component: LoginComponent,
      // beforeEnter(to,from,next){
      //     axios.get(url+'auth').then(res=>{
      //         if(res.data.status ==='authenticated')
      //             next(from);
      //         else
      //             next(false)
      //     });
      // }
    },
  ],
});

Vue.use(VueRouter);

export { router };
