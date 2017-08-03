<template>
  <div>
    <div class="shopcart">
      <!--底部布局-->
      <div class="content">
        <div class="content-left" @click="toggle">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="totalPrice<minPrice?'not-enough':'enough'">
            {{payText}}
          </div>
        </div>
      </div>
      <!--小圆球-->

      <div class="ball-container">
        <transition
          v-for="(ball,index) in balls"
          :key="index"
          :css="false"
          @before-enter="beforeDrop"
          @enter="drop"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.isShow">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>

      <!--底部商品列表-->
      <transition name="fold">
        <div class="shopping-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearFoods">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in foods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>{{food.price}}</span></div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food" :updateFoodCount="updateFoodCount"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggle"></div>
    </transition>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartControl from '../cartControl/cartControl.vue'
  export default {
    props: {
      minPrice: Number,
      deliveryPrice: Number,
      foods: Array,
      updateFoodCount: Function
    },
    data () {
      return {
        isShow: false,
        balls: [// 所有小球状态的数组
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false}
        ],
        droppingBalls: [] // 保存所有正在执行动画的ball
      }
    },
    computed: {
      totalPrice () {
        return this.foods.reduce((preToal, food) => {
          return preToal + food.price * food.count
        }, 0)
      },
      totalCount () {
        return this.foods.reduce((preToal, food) => {
          return preToal + food.count
        }, 0)
      },
      payText () {
        const minPrice = this.minPrice
        const totalPrice = this.totalPrice
        if (totalPrice === 0) {
          return `${minPrice}元起送`
        } else if (minPrice > totalPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      listShow () {
        if(!this.totalCount) {
          this.isShow = false
          return false
        }
        if(this.isShow) {
          this.$nextTick(() => {
            // 如何只创建一个对象？
            // 1.判断是否已经存在保存的对象
            // 2.创建对象后，将对象保存起来
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                // 第一次显示列表时创建
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return this.isShow
      }
    },
    methods: {
      toggle () {
        if (this.totalCount) {
          this.isShow = !this.isShow
        }
      },
      clearFoods () {
           if(confirm('确定清空吗？')){
             this.$emit('clearSelectFoods')
           }
      },
      // 动画进入之前的回掉
      beforeDrop () {

      },
      // 动画进入的回掉
      drop () {

      },
      // 动画进入之后的回掉
      afterDrop () {

      }
    },
    components: {
      cartControl
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background-color: #141d27
      letter-spacing 0
      color rgba(225, 225, 225, .4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background-color: #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              foot-size 24px
              color #80858a
              &.highlight
                color #fff

          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background-color: rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)

        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, .1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff

        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px

      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          foot-size 12px
          foot-weight 700
          &.not-enough
            background-color: #2b333b
          &.enough
            background-color: #00b43c
            color #fff

    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all .4s
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition all .4s linear

    .shopping-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition all .5s
      &.fold-enter, &.fold-leave-to
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background-color: #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, .1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            foot-weight 700
            color rgb(240, 20, 20)
          .cartControl
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    bcakdrop-filter blur(10px)
    opacity 1
    background-color: rgba(7, 17, 27, .6)
    &.fade-enter-active, &.fade-leave-active
      transition all .5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background-color: rgba(7, 17, 27, 0)

</style>
