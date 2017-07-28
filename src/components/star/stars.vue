<template>
  <div class="stars" :class="`stars-${size}`">
    <span class="star" v-for="cs in starClasses" :class="cs"></span>
  </div>
</template>

<script>
    const ON = 'on';
    const HALF = 'half';
    const OFF = 'off';

    export default {
        props: {
          score: Number,
          size: Number
        },
      /*
      * 5
      * 3.4 --> 3全星 2 灰星
      * 3.5 --> 3全 1半 1 灰
      * */
        computed: {
          starClasses () {
            const sca = []
            const score = this.score
            const scoreInteger = Math.floor(score)
            // 添加 ON
            for (let i = 0; i < scoreInteger; i++) {
              sca.push(ON)
            }
            // 添加HALF
             if(score-scoreInteger>=0.5){
                  sca.push(HALF)
             }

             // 添加OFF
            while(sca.length<5){
                 sca.push(OFF)
            }
            return sca
          }
        },

    }
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
      diplay inline-block
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
