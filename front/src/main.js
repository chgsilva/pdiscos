import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')