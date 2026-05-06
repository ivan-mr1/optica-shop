import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/app';
import router from '@/app/routing';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');
