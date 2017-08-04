// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import vueResource from 'vue-resource'
import Scroller from 'vue-scroller'

Vue.use(vueResource);
Vue.use(Scroller);

import router from './router'

import './common/stylus/index.styl'

import './mock/mockServer'



Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
