<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item"
              v-for="(good , index) in goods"
              :key="index"
              :class="{current: index===currIndex}"
              @click="clickMenuItem(index , $event)"
          >
            <span class="text border-1px">
              <i class="icon"
                 :class="supportClasses[good.type]" v-if="good.type>=0"></i>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook"
              v-for="(good , index) in goods"
              :key="index"
          >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in good.foods">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartcontral :food="food" :update-food-count="updateFoodCount"></cartcontral>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import cartcontral from '../cartControl/cartContral.vue'
  import BScroll from 'better-scroll'

    export default {
        data () {
            return {
              goods: [],
              supportClasses: ["decrease", "discount", "guarantee", "invoice", "special"],
              scrollY: 0,
              tops: []
            }
        },
        created () {
            this.$http.get('/mock/goods')
              .then(response => {
                  const result = response.body;
                 if(result.status == "ok"){
                      this.goods = result.data

                   // 延时到界面更新完成后执行
                   this.$nextTick(() => {
                       this._initScroll();
                       this._initTops()
                   })
                 }
              })
        },
      methods: {
          _initScroll () {
             // 为menu添加滚动功能
            new BScroll(this.$refs.menuWrapper , {
                click: true // 在滚动区域允许响应点击事件
            });
            // 为foods列表添加滚动功能
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper , {
                click: true,
                probeType: 3  //让scroll的回掉函数被调用
            });

            // 监视foods列表的滚动距离
            this.foodsScroll.on('scroll' , (pos) => {
                this.scrollY = Math.abs(pos.y)
            })
          },
        _initTops () {
              // 获取每一个foods列表的高度，保存为数组
          const tops = []
          let top = 0
          tops.push(top)
          // 找到每一个foods列表li
          const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          for (var i = 0; i < lis.length; i++) {
            var li = lis[i]
            top += li.clientHeight
            tops.push(top)
          }
          this.tops = tops
        },
        // 点击menu 滑动foods列表（下标）
        clickMenuItem (index , event) {
            // 过滤原生事件的回掉
           if(!event._constructed){
                return
           }
           // 找到对应的li
          const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          const li = lis[index];

          // 平滑滑动到li
          this.foodsScroll.scrollToElement(li , 300)
        },
        updateFoodCount (food , isAdd , event) {
               if(!event._constructed){
                    return
               }
                if(isAdd){ // 增加1
                    if(!food.count){ // 第一次点击
                         // food.count 给food添加一个count属性 （没有数据绑定）
                      this.$set(food , 'count' , 1) // 有数据绑定，会更新界面
                    }else { // 不是第一次进入
                      food.count++

                    }
                }else {
                     if(food.count){
                          food.count--
                     }
                }

        }
      },
      computed: {
          // 被选中的menu item的下标
        currIndex () {
            const {tops , scrollY} = this;
            return tops.findIndex((top , index) => {
                // 条件： scrollY大于或等于当前Top，且小于下一个Top
              return scrollY>=top && scrollY<tops[index+1]
            })
        }
      },
      components: {
        cartcontral
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color: #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10px
          margin-top -1px
          background-color: #fff
          font-weight 700
          .text
            border-1px(#fff)
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image(decrease_3)
          &.discount
            bg-image(discount_3)
          &.guarantee
            bg-image(guarantee_3)
          &.invoice
            bg-image(invoice_3)
          &.special
            bg-image(special_3)
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,.1))
          font-size 12px

    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background-color: #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border none
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc , .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240 ,20 , 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartControl-wrapper
            position absolute
            right 0
            bottom 12px
</style>
