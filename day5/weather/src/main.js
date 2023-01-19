
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'; 

import App from './App.vue';
import WeatherInfo from './components/WeatherInfo.vue'
import WeatherDetail from './components/WeatherDetail.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

const routes = [
  { path: '/', component: WeatherDetail },
  { path: '/weather-info/:cityName', component: WeatherInfo, props: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app');