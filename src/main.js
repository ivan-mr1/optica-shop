import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/app';
import router from '@/app/routing';
import { i18n } from '@/shared/i18n';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');
