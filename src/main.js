import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue';

import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueCryptojs);

// Vue.http.options.root = "https://ljc-blog-app-default-rtdb.firebaseio.com/";

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

Vue.filter('brief', (content) => {
  const words_num = 20;
  const maxLen = 80;
  if (content.split(" ").length >= words_num) {
    return content.split(" ").splice(0,words_num).join(" ") + "...";
  } else if (content.length >= maxLen) {
    return content.substr(0, maxLen) + "...";
  }
  return content.split(" ").splice(0,words_num).join(" ");
});

Vue.filter('shortTitle', (title) => {
  const words_num = 15;
  const maxLen = 100;
  if (title.split(" ").length >= words_num) {
    return title.split(" ").splice(0,words_num).join(" ") + "...";
  } else if (title.length >= maxLen) {
    return title.substr(0, maxLen) + "...";
  }
  return title.split(" ").splice(0,words_num).join(" ");
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
