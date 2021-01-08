import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import axios from '../src/axios'
import store from './components/store'
import VueSocialSharing from 'vue-social-sharing'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(VueSocialSharing)
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  store: store,
});
