<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" class="tab-a">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-a">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-a">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import ShopHeader from './components/header/header.vue';

export default {
  name: 'app',
  data() {
    return {
        seller: this.seller
    }
  },
  created() {
    this.$http.get('/mock/data.json').then(response => {
      response = response.body;
      this.seller = response.seller;
    });
  },
  components: {
    'v-header': ShopHeader
  }
}
</script>

<style>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab:after{
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item .tab-a{
    width: 100%;
  }
  .tab .tab-item .router-link-active{
    color: red;
  }
</style>
