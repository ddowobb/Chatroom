import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { io } from "socket.io-client";
import VueClipboard from 'vue-clipboard2'

const socket = io("http://10.5.71.156:8081");
socket.on("connect", () => {
    console.log("socket connected");
})

socket.on("disconnect", () => {
    console.log("socket disconnected");
})

const app = createApp(App)
app.config.globalProperties.$socket = socket;
app.use(VueClipboard);
app.use(router).mount('#app')
