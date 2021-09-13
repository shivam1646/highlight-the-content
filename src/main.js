import Vue from "vue";
import AppLayout from '@/layout'
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBookmark, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faBookmark, faPlus, faEdit, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(AppLayout),
}).$mount("#app");
