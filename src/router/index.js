/**
 * 路由模块配置
 */
import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

// 引入组件
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller' , component: seller},
    {path: '/' ,redirect: '/goods'}
  ]
})
