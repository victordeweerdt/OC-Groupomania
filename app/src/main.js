import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

require('./assets/styles/main.css');

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');