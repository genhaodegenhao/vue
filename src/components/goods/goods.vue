<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" id="menu-wrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" id="foods-wrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="food-content">
                  <h2 class="name">{{food.name}}</h2>
                  <p v-show="food.description" class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="sellcount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new-price">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old-price"><i>￥</i>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import food from '../../components/food/food.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/mock/data.json').then(response => {
        response = response.body;
        this.goods = response.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodsWrapper = document.getElementById('foods-wrapper');
        let foodList = foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.showFoodDetail();
      },
      _initScroll() {
        this.menuScroll = new BScroll(document.getElementById('menu-wrapper'), {
          click: true,
          snap: true
        });
        this.foodsScroll = new BScroll(document.getElementById('foods-wrapper'), {
          probeType: 3,
          click: true,
          momentum: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodsWrapper = document.getElementById('foods-wrapper');
        let foodList = foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
<style type="text/css">
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }

  .menu-wrapper .menu-item {
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }

  .menu-wrapper .current {
    position: relative;
    z-index: 10;
    background: #fff;
    margin-top: -1px;
  }
  .menu-wrapper .current .text{
    font-weight: 700;
  }
  .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 200;
    line-height: 14px;
    position: relative;
  }
  .menu-item .text:after {
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .menu-item .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .menu-item .decrease {
    background-image: url('decrease_3@2x.png');
  }

  .menu-item .discount {
    background-image: url('discount_3@2x.png');
  }

  .menu-item .guarantee {
    background-image: url('guarantee_3@2x.png');
  }

  .menu-item .invoice {
    background-image: url('invoice_3@2x.png');
  }

  .menu-item .special {
    background-image: url('special_3@2x.png');
  }

  .foods-wrapper {
    flex: 1;
  }

  .food-list .title {
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 26px;
    height: 26px;
    padding-left: 14px;
    background: #f3f5f7;
    border-left: 2px solid #d9dde1;
  }

  .food-list .food-item {
    margin: 18px;
    font-size: 0;
    display: flex;
    position: relative;
    padding-bottom: 18px;
  }

  .food-list .food-item:after {
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }

  .food-list .food-item:last-child {
    padding-bottom: 0;
  }

  .food-list .food-item:last-child:after {
    display: none;
  }

  .food-item .icon {
    display: inline-block;
  }

  .food-item .food-content {
    display: inline-block;
    vertical-align: top;
    margin: 2px 0 8px 10px;
    flex: 1;
    position: relative;
  }

  .food-content .name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
  }

  .food-content .desc, .extra {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    margin: 8px 0;
  }

  .extra .rating {
    margin-left: 12px;
  }

  .price .new-price {
    font-size: 14px;
    color: rgb(240, 20, 20);
    font-weight: 700;
  }
  .price i {
    font-size: 10px;
  }
  .price .old-price {
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-left: 8px;
    text-decoration: line-through;
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: -10px;
  }
</style>
