<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleSelect">
      <i class="icon-check_circle" :class="{'on': onlyContent}"></i>
      <span class="only-content">只显示有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        };
        this.selectType = type;
        console.log(this.selectType);
      },
      toggleSelect(event) {
        if (!event._constructed) {
          return;
        };
        this.onlyContent = !this.onlyContent;
        this.$emit('content.toggle', this.onlyContent);
      }
    },
    created: {
      'ratingtype.select'(type) {
        this.selectType = type;
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
      }
    }
  };
</script>

<style type="text/css">
  .ratingselect{
    margin: 0 18px;
    font-size: 0;
  }
  .rating-type{
    padding-bottom: 18px;
    position: relative;
  }
  .rating-type:after {
    content: ' ';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    font-size: 12px;
    line-height: 16px;
    color: rgb(77, 85, 93);
    border-radius: 2px;
  }
  .rating-type .positive{
    background: rgba(0, 160, 220, 0.2);
  }
  .rating-type .negative{
    background: rgba(77, 85, 93, 0.2);
  }
  .rating-type .count{
    font-size: 8px;
    margin-left: 3px;
  }
  .rating-type .active{
    color: rgb(255, 255, 255);
    background: rgb(0, 160, 220);
  }
  .switch{
    margin: 12px 0;
  }
  .switch .icon-check_circle{
    font-size: 24px;
    line-height: 24px;
    color: rgb(147, 153, 159);
  }
  .switch .only-content{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    margin-left: 4px;
    vertical-align: top;
  }
  .switch .on{
    color: #00c850;
  }
  .ratingselect .ratings-content{
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 16px;
  }
</style>
