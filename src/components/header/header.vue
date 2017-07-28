<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <i class="brand"></i>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="supports" v-if="seller.supports">
            <i class="icon" :class="supportClasses[seller.supports[0].type]"></i>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div @click="maskShow(true)" class="supports-count" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <i class="bulletin-title"></i>
        <span @click="maskShow(true)" class="bulletin-text">
          {{seller.bulletin}}
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div v-show="isShow" class="mask">
          <div class="mask-wrapper clearfix">
            <div class="mask-main">
              <h1 class="title">{{seller.name}}</h1>
              <div class="star-wrapper">

                <!--评星组件标签-->
                <Stars></Stars>

              </div>
              <div class="info">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="list">
                <li class="item" v-for="support in seller.supports">
                  <i class="icon" :class="supportClasses[support.type]"></i>
                  <span class="text">{{support.description}}</span>
                </li>
                <!--<li class="item">
                  <i class="icon discount"></i>
                  <span class="text">VC无限橙果汁全场8折</span>
                </li>
                <li class="item">
                  <i class="icon guarantee"></i>
                  <span class="text">已加入“外卖保”计划,食品安全保障</span>
                </li>
                <li class="item">
                  <i class="icon invoice"></i>
                  <span class="text">该商家支持发票,请下单写好发票抬头</span>
                </li>
                <li class="item">
                  <i class="icon special"></i>
                  <span class="text">单人精彩套餐</span>
                </li>-->
              </ul>
              <div class="info">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="text">
                  {{seller.bulletin}}
                </p>
              </div>
            </div>
          </div>
          <div @click="maskShow(false)" class="mask-footer">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import Stars from '../star/stars.vue'
    export default {
        props: ['seller'],
        data () {
            return {
              isShow: false,
              supportClasses: ['decrease' , 'discount' , 'guarantee' , 'invoice' , 'special']
            }
        },
        methods: {
          maskShow (isShow) {
              this.isShow = isShow
          }
        },
      components: {
        Stars
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    overflow hidden
    background-color rgba(7,17,27,.5)
    color #fff
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size:0
      .avatar
        display: inline-block
        vertical-align top
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin:2px 0 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image(brand)
            background-size 30px 18px
            background-repeat: no-repeat
            vertical-align top
          .name
            margin-left: 6px
            font-size: 16px
            line-height 18px
        .description
          font-size: 12px
          line-height 12px
        .supports
          margin: 10px 0 2px
          .icon
            display: inline-block
            width: 12px
            height: 12px
            background-size 12px 12px
            background-repeat no-repeat
            vertical-align: top
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)

          .text
            margin-left 4px
            font-size 10px
            line-height 12px



      .supports-count
        position absolute
        right 12px
        bottom 15px
        height 10px
        line-height 10px
        padding 7px 8px
        border-radius 10px
        background-color rgba(0,0,0,.2)
        .count
          font-size 10px
          line-height 10px
        .icon-keyboard_arrow_right
          font-size 10px
          line-height 10px
          font-weight 200
          padding-left 5px



    .bulletin-wrapper
      position relative
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      padding 0 25px 0 12px
      height 28px
      background-color rgba(7,17,27,.2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        vertical-align middle
        background-size 22px 12px
        background-repeat no-repeat
        bg-image(bulletin)
      .bulletin-text
        font-size 10px
        line-height 28px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        bottom 0
        font-size 10px
        line-height 28px
        font-weight 200


    .background
      position absolute
      left 0
      top 0
      filter:blur(10px)
      z-index -1
      width 100%
      height 100%

    .mask
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      background-color rgba(7,17,27,.8)
      z-index 5
      &.fade-enter-active,&.fade-leave-active
        transition opacity .5s
      &.fade-enter,&.fade-leave-to
        opacity 0
      .mask-wrapper
        min-height 100%

        .mask-main
          padding-top 64px
          padding-bottom 64px
          .title
            text-align center
          .star-wrapper
            margin-top 16px
          .info
            display: flex
            align-items center
            width 80%
            margin 28px auto 24px
            .text
              margin 0 12px
            .line
              flex 1
              height 1px
              background-color: rgba(255, 255, 255, .2)

          .list
            width 80%
            margin 24px auto 28px
            .item
              margin 6px 0
              font-size 12px
              line-height 12px
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align middle
                margin-right 6px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image(decrease_2)
                &.discount
                  bg-image(discount_2)
                &.guarantee
                  bg-image(guarantee_2)
                &.invoice
                  bg-image(invoice_2)
                &.special
                  bg-image(special_2)


          .bulletin
            width 75%
            margin 0 auto
            .text
              font-size 12px
              line-height 24px
              text-indent 2em

      .mask-footer
        margin-top -64px
        text-align center
        .icon-close
          font-size 32px
          color rgba(255,255,255,.5)


</style>
