<template>
  <transition name="translateLeft">
    <div class="foodWrapper" v-show="showFlag" id="foodWrapper">
      <div class="foodDec-wrapper">
        <div class="food-head">
          <div class="foodImg">
            <img :src="food.image" alt="">
            <i class="icon-arrow_lift" @click="hideFoodDetail"></i>
          </div>
          <div class="foodDec">
            <div class="food-name">{{food.name}}</div>
            <div class="food-dec">
              <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
            </div>
            <div class="food-price">￥{{food.price}}</div>
          </div>
        </div>
        <div class="food-introduce" v-show="food.info">
          <h2>商品介绍</h2>
          <p class="food-info">{{food.info}}</p>
        </div>
        <div class="food-rating">
          <h2>商品评价</h2>
          <div class="allRating">
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          </div>
          <div class="rating-content">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="rating-time">{{rating.rateTime}}</div>
                <div class="user">
                  <span class="username">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <p class="rating-text">
                  <i :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>
                  <span>{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import ratingselect from '../../components/ratingSelect/ratingselect.vue';
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      showFoodDetail() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            let foodWrapper = document.getElementById('foodWrapper');
            this.scroll = new BScroll(foodWrapper, {
              click: true
            });
          };
          // dom改变了，重新计算高度
          this.scroll.refresh();
        });
      },
      hideFoodDetail() {
        this.showFlag = false;
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        } else if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  };
</script>

<style type="text/css">
  @import "../../assets/common/css/common.css";
  .foodWrapper{
    width: 100%;
    background: #f3f5f7;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    transition: all 0.3s linear;
    transform: translate3d(0, 0, 0);
    font-size: 0;
  }
  .translateLeft-enter-active,.translateLeft-leave-active{
    transition: all 0.3s linear;
  }
  .translateLeft-enter,.translateLeft-leave-active{
    transform: translate3d(100%, 0, 0);
  }
  .food-head{
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .foodImg{
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }
  .foodImg img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .foodImg .icon-arrow_lift{
    font-size: 16px;
    display: block;
    position: fixed;
    top: 12px;
    left: 12px;
    color: #fff;
    padding: 8px;
  }
  .foodDec{
    padding: 18px;
    background: #fff;
  }
  .foodDec .food-name,.food-introduce h2,.food-rating h2{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .foodDec .food-dec{
    width: 100%;
    height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    margin: 8px 0 18px 0;
  }
  .foodDec .food-dec span:first-child{
    margin-right: 12px;
  }
  .foodDec .food-price{
    height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
    line-height: 24px;
  }
  .food-introduce{
    padding: 18px;
    margin: 16px 0;
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .food-introduce .food-info{
    font-size: 12px;
    font-weight: 200;
    color: rgb(77, 85, 93);
    line-height: 24px;
    margin: 6px 8px 0;
  }
  .food-rating h2{
    margin: 18px;
  }
  .allRating{
    font-size: 14px;
    position: relative;
    padding-bottom: 5px;
  }
  .allRating:after {
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
</style>
