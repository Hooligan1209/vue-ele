<template>

    <div class="ratings" ref="ratings">
      <scroller>
      <div class="ratings-content">
        <!--头部评分和评星-->
        <div class="overview">
          <!--评分-->
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <!--评星-->
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :score="seller.serviceScore" :size="36"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>

            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :score="seller.foodScore" :size="36"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>

            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>

        <split></split>

        <ratingselect
          :ratings="ratings"
          :content-only="contentOnly"
          :select-type="selectType"
          :desc="{all:'全部',positive:'满意',negative:'不满意'}"
          @toggleContentOnly="toggleContentOnly"
          @setSelectType="setSelectType"
        ></ratingselect>

        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-for="(rating , index) in filterRatings" :key="index">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :score="rating.score" :size="24"></star>
                  <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend">
                  <span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
                  <span class="item"  v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </scroller>
    </div>




</template>

<script>
  import star from '../star/stars.vue'
  import split from '../split/split.vue'
  import BScroll from 'better-scroll'
  import ratingselect from '../ratingselect/ratingselect.vue'

    export default {
      props: ['seller'],
      data () {
          return {
              ratings: [],
              contentOnly: false,
              selectType: 2,
              busy: false
          }
      },
      created () {
        this.$http.get('/mock/ratings')
          .then(response => {
              const result = response.data
             if(result.status == 'ok'){
                  this.ratings = result.data
             }
          })
      },
      methods: {
         toggleContentOnly () {
             this.contentOnly = !this.contentOnly

         },
          setSelectType (selectType) {
             this.selectType = selectType

          }
      },
      computed: {
          filterRatings () {
            const {ratings , contentOnly , selectType} = this
            return ratings.filter(rating => {
                const {text,rateType}=rating
               if(selectType === 2){
                    return !contentOnly || !!text
               }else {
                   return selectType === rateType && (!contentOnly || !!text)
               }
            })
          }
      },
      components: {
        star,
        split,
        ratingselect
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7,17,27,.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255,153,0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7,17,27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147,153,159)


      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          display flex
          align-items center
          margin-bottom 8px
          letter-spacing normal
          .title
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .stars
            display inline-flex
            margin 0 12px
          .score
            display inline-block
            font-size 12px
            line-height 18px
            color rgb(255,153,0)


        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
          .delivery
            margin-left 12px
            font-size 12px
            color rgb(147,153,159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .stars
              display inline-flex
              margin-right 6px
            .delivery
              display inline-block
              vertical-align center
              line-height 12px
              font-size 10px
              color rgb(147,153,159)
          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7,17,27)
            font-size 12px
          .recommend
            line-height 16px
            letter-spacing normal
            .icon-thumb_up , .icon-thumb_down , .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(147,153,159)
            .item
              padding 0 6px
              border 1px solid rgba(7,17,27,.1)
              border-radius 1px
              color rgb(147,153,159)
              background #fff


</style>
