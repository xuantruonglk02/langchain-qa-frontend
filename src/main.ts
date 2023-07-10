import 'bootstrap/dist/css/bootstrap.min.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/global.scss';
import router from './plugins/vue-router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});
