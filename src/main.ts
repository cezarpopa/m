import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import App from './App.vue'
import './registerServiceWorker'
import "./main.scss"

createApp(App)
  .component('BootstrapIcon', BootstrapIcon)
  .use(createPinia())
  .mount('#app')
