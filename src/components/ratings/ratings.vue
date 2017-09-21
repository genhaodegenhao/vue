<template>
	<div class="ratings" id="hhh">
    <div >
      <div class="rating-service">
        <div class="rating-left">
          <div class="score">{{seller.serviceScore}}</div>
          <div class="text">
            <p>综合评分</p>
            <p>高于周边商家{{seller.rankRate}}</p>
          </div>
        </div>
        <div class="rating-right">
          <div class="serviceScore">服务态度 <star :size="36" :score="seller.serviceScore"></star><div class="attr-score">{{seller.serviceScore}}</div></div>
          <div class="foodScore">食物评分<star :size="36" :score="seller.foodScore"></star><div class="attr-score">{{seller.foodScore}}</div></div>
          <div class="deliveryTime">送达时间<span>{{seller.deliveryTime}}分钟</span></div>
        </div>
      </div>
      <div class="rating-contenter">
        <ratingselect :ratings="ratings"></ratingselect>
        <div class="rating-content">
          <ul>
            <li v-for="rating in ratings" class="rating-item">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import star from '../../components/star/star.vue';
    import ratingselect from '../../components/ratingSelect/ratingselect.vue';
    import Bscroll from 'better-scroll';

    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          ratings: this.ratings
        }
      },
      components: {
        star,
        ratingselect
      },
      created() {
        this.$http.get('/mock/data.json').then(response => {
            response = response.body;
            this.ratings = response.ratings;
            this.$nextTick(() => {
              this.initScroll();
            })
        });
      },
      methods: {
        initScroll() {
          this.ratingscroll = new Bscroll(document.getElementById('hhh'), {
            scrollY: true
          })
        }
      }
    };
</script>

<style type="text/css">
  @import "../../assets/common/css/common.css";
  .rating-service{
    padding: 18px 0;
    display: flex;
  }
  .rating-left{
    flex: auto;
    text-align: center;
    position: relative;
  }
  .rating-left:after{
    content: ' ';
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
  }
  .rating-left .score{
    font-size: 24px;
    color: rgb(255, 153, 0);
    line-height: 28px;
  }
  .rating-left .text{
    margin: 6px 0;
  }
  .rating-left .text p:nth-child(1){
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
    margin-bottom: 8px;
  }
  .rating-left .text p:nth-child(2){
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
  }
  .rating-right{
    flex-grow: 2;
    margin: 0 24px;
    color: rgb(7, 17, 27);
    font-size: 12px;
    line-height: 18px;
  }
  .serviceScore,.foodScore{
    display: flex;
  }
  .serviceScore .star,.foodScore .star{
    margin: 0 12px;
  }
  .attr-score{
    color: rgb(255, 153, 0);
    font-size: 12px;
    line-height: 18px;
  }
  .rating-right .foodScore{
    margin: 8px 0;
  }
  .deliveryTime span{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 18px;
    margin-left: 12px;
  }
  .ratings{
    position: absolute;
    top: 174px;
    width: 100%;
    overflow: hidden;
  }
</style>
