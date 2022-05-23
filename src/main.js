import { createApp } from 'vue';
import Maska from 'maska';

import App from './App.vue';

import './assets/main.css';

const app = createApp(App);
app.use(Maska);
app.mount('#app');
