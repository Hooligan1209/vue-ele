<template>
    <div class="cartControl">
      <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline"
             v-if="food.count"
             @click="updateFoodCount(food , false , $event)"
        >
            <!--减少-->
        </div>
      </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="updateFoodCount(food , true , $event)"></div>
    </div>
</template>

<script>

    export default {
        props: {
            food: Object,
            updateFoodCount: Function
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    foot-size 0
    .cart-decrease
      display inline-block
      padding 6px
      foot-size 24px
      line-height 24px
      color rgb(0,160,220)
      &.move-enter-active , &.move-leave-active
        transition all .3s
      &.move-enter , &.move-leave-to
        opacity 0
        transform translateX(10px) rotate(180deg)
    .cart-count
      display inline-block
      font-size 10px
      line-height 24px
      color rgb(147,153,159)
      text-align center
      width 12px
      vertical-align top
      padding-top 6px
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      foot-size 24px
      color rgb(0,160,220)

</style>
