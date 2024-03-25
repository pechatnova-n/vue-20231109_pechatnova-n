import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { createProgress } from './plugins/progress';

const progress = createProgress({ container: '#progress', router });

createApp(App).use(router).use(progress).mount('#app');
