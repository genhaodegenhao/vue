<template>
  <div class="shopcart">
    <div class="shop-cart">
      <div class="cart-content">
        <div class="cartLeft" @click="toggleList">
          <div class="logo-wrapper">
            <div class="cart-logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="cart-price">￥{{totalPrice}}</div>
          <div class="cart-desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="cartRight" @click="pay">
          <div class="pay" :class="{'enough':(this.totalPrice>=this.minPrice)}">{{cartCount}}</div>
        </div>
      </div>
      <transition name="slidefold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="title">购物车</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" id="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <div class="name">{{food.name}}</div>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="shopcartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleList"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      cartCount() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
        } else if (this.totalPrice >= this.minPrice) {
            return '去结算'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
           if (!this.scroll) {
             let listContent = document.getElementById('list-content');
             this.scroll = new BScroll(listContent, {
               click: true
             });
           } else {
             this.scroll.refresh();
           }
          })
        }
        return show;
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`需要支付${this.totalPrice}元`);
      }
    }
  };
</script>

<style type="text/css">
  .shop-cart {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
  }
  .shop-cart .cart-content {
    display: flex;
    background: #141d27;
    color: rgba(255, 255, 255, 0.4);
  }
  .cart-content .cartLeft {
    flex: 1;
    font-size: 0;
  }
  .cartLeft .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .logo-wrapper .cart-logo {
    width: 44px;
    height: 44px;
    background: #2b343c;
    border-radius: 50%;
    text-align: center;
  }
  .logo-wrapper > .highlight{
    background: rgb(0, 160, 240);
  }
  .cart-logo i {
    line-height: 44px;
    color: #80858a;
    font-size: 24px;
  }
  .cart-logo > .highlight{
    color: #fff;
  }
  .logo-wrapper .num {
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    right: 0;
  }
  .cartLeft .cart-price {
    display: inline-block;
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
    padding-right: 12px;
    margin: 12px 12px 0 0;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  .cartLeft .cart-desc {
    display: inline-block;
    font-size: 12px;
  }
  .cart-content .cartRight {
    flex: 0 0 105px;
    width: 105px;
  }
  .cartRight .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background: #2b333b;
  }
  .cartRight .enough{
    color: #fff;
    background: #00b43c;
  }
  .shopcart-list{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0, -100%, 0);
  }
  .slidefold-enter-active, .slidefold-leave-active {
    transition: all 0.2s linear;
  }
  .slidefold-enter, .slidefold-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .shopcart-list .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .shopcart-list .list-content{
    max-height: 217px;
    padding: 0 18px;
    overflow: hidden;
  }
  .list-header .title{
    float: left;
    font-size: 14px;
    font-weight: 200;
    color: rgb(7, 17, 27);
  }
  .list-header .empty{
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }
  .list-content .food{
    height: 48px;
    line-height: 48px;
    display: flex;
  }
  .food .name{
    flex: 1;
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27)
  }
  .food .price{
    float: right;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20)
  }
  .food .shopcartcontrol-wrapper{
    float: right;
    margin-left: 12px;
    padding-top: 5px;
  }
  .list-mask{
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
  }
</style>
