import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vSession from './utils/vSession'
import 'element-plus/dist/index.css'
import pinia from '@/store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.provide('global', {vSession})
app.mount('#app')