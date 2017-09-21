// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Goods from './components/goods/goods.vue';
import Ratings from './components/ratings/ratings.vue';
import Seller from './components/seller/seller.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller },
  { path: '/', redirect: '/goods' }
];
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
