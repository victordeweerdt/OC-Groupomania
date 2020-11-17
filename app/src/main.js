import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueCookies)
Vue.use(VueConfirmDialog)
Vue.use(require('vue-moment'));

require('./assets/styles/main.css');

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
 
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)