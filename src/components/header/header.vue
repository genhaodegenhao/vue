<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt=""/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="distribution">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="head-background">
      <img width="100%" height="100%" :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="coupon-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="coupon-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
       star
    }
  };
</script>
<style type="text/css">
  @import "../../assets/common/css/style.css";
  .header {
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden;
  }
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .content-wrapper .avatar {
    display: inline-block;
  }
  .content-wrapper .avatar img {
    border-radius: 2px;
  }
  .content {
    display: inline-block;
    font-size: 12px;
    margin: 2px 12px 0 16px;
    vertical-align: top;
  }
  .content .title {
    height: 18px;
    font-size: 0;
  }
  .content .title .brand {
    width: 30px;
    height: 18px;
    background-image: url('brand@2x.png');
    background-repeat: no-repeat;
    background-size: 30px 18px;
    display: inline-block;
    line-height: 18px;
  }
  .content .title .name {
    vertical-align: top;
    font-size: 16px;
    font-weight: bold;
    margin-left: 6px;
  }
  .content .distribution {
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin: 8px 0 10px;
  }
  .support {
    height: 12px;
    font-size: 0;
  }
  .support .icon {
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .support .decrease{
    background-image: url('decrease_1@2x.png');
  }
  .supports .discount{
    background-image: url('decrease_1@2x.png');
  }
  .supports .guarantee{
    background-image: url('guarantee_1@2x.png');
  }
  .supports .invoice{
    background-image: url('invoice_1@2x.png');
  }
  .supports .special{
    background-image: url('special_1@2x.png');
  }
  .support .text {
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
    margin-left: 4px;
    vertical-align: top;
  }
  .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
  }
  .support-count .count {
    font-size: 10px;
    vertical-align: top;
  }
  .support-count .icon-keyboard_arrow_right {
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    background-color: rgba(7, 17, 27, 0.2);
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .bulletin-wrapper .bulletin-title {
    width: 22px;
    height: 12px;
    background-image: url('bulletin@2x.png');
    background-size: 22px 12px;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .bulletin-wrapper .bulletin-text {
    font-size: 10px;
    font-weight: 200;
    margin-left: 4px;
    vertical-align: top;
  }
  .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }
  .head-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  .detail {
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    z-index: 1000;
    backdrop-filter: blur(10px);
  }
  .detail-wrapper {
    min-height: 100%;
    width: 100%;
  }
  .detail-wrapper .detail-main {
    padding-bottom: 64px;
    margin-top: 64px;
  }
  .detail-main .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
  }
  .detail-main .star-wrapper{
    margin-top: 16px;
    text-align: center;
  }
  .detail-main .coupon-title {
    width: 85%;
    margin: 28px auto 24px auto;
    display: flex;
  }
  .detail-main .coupon-title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }
  .detail-main .coupon-title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .supports,.bulletin{
    width: 85%;
    margin: 0 auto;
  }
  .supports .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .supports .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .supports .support-item .decrease{
    background-image: url('decrease_2@2x.png');
  }
  .supports .support-item .discount{
    background-image: url('discount_2@2x.png');
  }
  .supports .support-item .guarantee{
    background-image: url('guarantee_2@2x.png');
  }
  .supports .support-item .invoice{
    background-image: url('invoice_2@2x.png');
  }
  .supports .support-item .special{
    background-image: url('special_2@2x.png');
  }
  .supports .support-item .text{
    line-height: 16px;
    font-size: 12px;
  }
  .bulletin .text{
    padding: 0 12px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
  }
  .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    font-size: 32px;
    clear: both;
    margin: -64px auto 0 auto;
  }
</style>
