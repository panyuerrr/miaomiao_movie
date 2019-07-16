// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Scroller from '@/components/scroller'
import Loading from '@/components/Loading'
import store from './store'
import { Carousel ,CarouselItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.axios=axios

Vue.filter('setWH',(url,arg)=>{
	return url.replace(/w\.h/,arg);
})
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component('Scroller',Scroller);
Vue.component('Loading',Loading);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App ,
  },
  template: '<App/>',
  store
 
})
