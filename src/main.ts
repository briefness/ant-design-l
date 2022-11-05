import { createApp } from 'vue';

import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupGlobDirectives } from '@/directives';
import './style.css';
import App from './App.vue';

const app = createApp(App);

setupStore(app);
setupRouter(app);
setupGlobDirectives(app);

app.mount('#app');
