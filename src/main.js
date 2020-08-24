import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";       
import VueFirebase from 'vue-firebase'

Vue.config.productionTip = false;
// Config firebase project
const firebaseConfig = {
	apiKey: "AIzaSyBngMAVli5tDuOda0i6T2abMHZrHZBnhkw",
	authDomain: "image-capture-956f9.firebaseapp.com",
	databaseURL: "https://image-capture-956f9.firebaseio.com",
	projectId: "image-capture-956f9",
	storageBucket: "image-capture-956f9.appspot.com",
	messagingSenderId: "365056608785",
	appId: "1:365056608785:web:ba6c18c52fdc5df270bfb0",
	measurementId: "G-BP1SDG7FYT"
  };

Vue.use(VueFirebase, { firebase: firebase, config: firebaseConfig });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
