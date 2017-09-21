<template>
  <div class="cartcontrol">
    <transition name="fadeTranslate">
      <div class="count-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <transition name="fadeRotate">
            <span class="inner icon-remove_circle_outline" v-show="food.count>0"></span>
          </transition>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="count-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style type="text/css">
  .cartcontrol {
    font-size: 0;
  }
  .count-add {
    display: inline-block;
    color: rgb(0, 160, 220);
    line-height: 24px;
    font-size: 24px;
    padding: 6px;
  }
  .count-decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.2s linear;
  }
  .fadeTranslate-enter-active, .fadeTranslate-leave{
    transition: all 0.2s linear;
  }
  .fadeTranslate-enter, .fadeTranslate-leave-active{
    transform: translate3d(30px, 0, 0);
    opacity: 0;
  }
  .count-decrease .inner {
    display: inline-block;
    font-size: 24px;
    color: rgb(0, 160, 220);
    transition: all 0.2s linear;
  }
  .fadeRotate-enter-active, .fadeRotate-leave{
    transition: all 0.2s linear;
  }
  .fadeRotate-enter, .fadeRotate-leave-active{
    transform: rotate(180deg);
    opacity: 0;
  }
  .cartcontrol .count {
    display: inline-block;
    width: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    text-align: center;
    vertical-align: top;
    padding-top: 6px;
  }
</style>
