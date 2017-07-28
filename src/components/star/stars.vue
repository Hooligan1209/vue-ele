<template>
  <div class="stars stars-48">
    <span class="star on"></span>
    <span class="star on"></span>
    <span class="star on"></span>
    <span class="star half"></span>
    <span class="star off"></span>
  </div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .stars
    height 24px
    margin 0 auto
    display flex
    align-items center
    justify-content space-around
    .star
      display inline-block
      background-repeat no-repeat
    &.stars-48
      width 200px
      .star
        width 20px
        height 20px
        background-size 20px 20px
        &.on
          bg-image(star48_on)
        &.half
          bg-image(star48_half)
        &.off
          bg-image(star48_off)
    &.stars-36
      width 150px
      .star
        width 15px
        height 15px
        background-size 15px 15px
        &.on
          bg-image(star36_on)
        &.half
          bg-image(star36_half)
        &.off
          bg-image(star36_off)
    &.stars-24
      width 100px
      .star
        width 10px
        height 10px
        background-size 10px 10px
        &.on
          bg-image(star24_on)
        &.half
          bg-image(star24_half)
        &.off
          bg-image(star24_off)
</style>
