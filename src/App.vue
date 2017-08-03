<template>
  <div>
    <ele-header :seller="seller"></ele-header>

    <div class="tabs border-1px">

      <div class="tabPane">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tabPane">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tabPane">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view :seller="seller"></router-view>

  </div>
</template>
<script>
import header from './components/header/header.vue'
export default {
    data () {
      return {
          seller: {}
      }
    },
  created () {
    this.$http.get('/mock/seller')
      .then(response => {
        const result = response.data
        if(result.status === "ok"){
          this.seller = result.data
        }
      })
  },
  　components: {
      'ele-header': header
   }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tabs
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,.1))
    .tabPane
      font-style: 14px
      width 0
      flex 1
      text-align center
      & > a
        display block
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240 , 20 , 20)

</style>
