<template>
	<div class="seller">
    <div class="seller-content">
      <div class="content-top">
        <h3>{{seller.name}}</h3>
        <div class="starAndcount">
          <star :size="36" :score="seller.serviceScore"></star>
          <div class="sellCount">月售{{seller.sellCount}}单</div>
        </div>
        <div class="favorite" @click="toggleFavo">
          <i class="icon-favorite" :class="{'active': favo}"></i>
        </div>
      </div>
      <div class="content-bottom">
        <div><p>起送价</p><p class="delivery"><span>{{seller.minPrice}}</span>元</p></div>
        <div><p>商家配送</p><p class="delivery"><span>{{seller.deliveryPrice}}</span>元</p></div>
        <div class="noborder"><p>平均配送时间</p><p class="delivery"><span>{{seller.deliveryTime}}</span>分钟</p></div>
      </div>
    </div>
    <div class="activity"></div>
    <div class="seller-pic"></div>
    <div class="seller-info"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favo: false
      }
    },
    components: {
      star
    },
    methods: {
      toggleFavo() {
        this.favo = !this.favo;
      }
    }
  };
</script>

<style type="text/css">
  .content-top{
    margin: 18px;
    padding-bottom: 18px;
    font-size: 0;
    position: relative;
  }
  .content-top:after{
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .content-top h3{
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .content-top .star{
    display: inline-block;
  }
  .content-top .sellCount{
    display: inline-block;
    margin-left: 20px;
    font-size: 10px;
    color: rgb(77, 85, 93);
    line-height: 18px;
    vertical-align: top;
  }
  .content-bottom {
    display: flex;
  }
  .content-bottom div{
    flex: 1;
    text-align: center;
    position: relative;
  }
  .content-bottom div:after{
    content: ' ';
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
  }
  .content-bottom .noborder:after{
    border: none;
  }
  .content-bottom p{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
  }
  .content-bottom .delivery{
    margin-top: 4px;
  }
  .delivery span{
    font-size: 24px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    line-height: 24px;
  }
  .favorite .icon-favorite{
    font-size: 25px;
  }
  .favorite .active{
    color: red;
  }
</style>
