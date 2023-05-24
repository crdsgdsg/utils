import {createApp} from 'vue'
import './style.less'
import './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'default-passive-events'

import App from './App.vue'
import router from "./router";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
