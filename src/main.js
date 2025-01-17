import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from "@meforma/vue-toaster";
// import Default from './Layout/Wrapper/index.vue'
const app = createApp(App)
app.use(Toaster, {
  position: "top-right",
});
app.use(router)
// app.component("default-layout", Default);
app.mount("#app")