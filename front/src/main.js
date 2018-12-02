import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
// import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(Vuetify)
// Vue.user(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
