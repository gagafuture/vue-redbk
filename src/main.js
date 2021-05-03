// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueTouch from 'vue-touch'
import {getCookie} from './cookie'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fastclick from 'fastclick';


Vue.use(VueTouch,{name: 'v-touch'})

axios.defaults.baseURL = 'http://localhost:8254/'   //加前缀
axios.defaults.withCredentials = true   //允许跨域
global.axios = axios    //全局化

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(Mint);

Vue.use(ElementUI)
Vue.use(MintUI)

router.beforeEach((to,from,next)=>{
  if(getCookie("auth").length!= 0 ){
    if(store.state.auth == ""){
      store.dispatch("author",{userName:getCookie("auth"),imageUrl:getCookie("imageUrl"),pid:getCookie("pid")})
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
