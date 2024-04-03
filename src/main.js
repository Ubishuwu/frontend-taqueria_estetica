import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'
import './style.css'
import App from './App.vue'
import { router } from "./routes/main.js";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
