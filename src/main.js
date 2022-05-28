import Maska from 'maska';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { useStore } from './store';

import './assets/main.css';

const app = createApp(App);
app.use(Maska);
app.use(createPinia());

useStore().initialize();

app.mount('#app');
