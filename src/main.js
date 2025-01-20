import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from "@meforma/vue-toaster";
import vue3GoogleLogin from "vue3-google-login";   
const app = createApp(App)
app.config.globalProperties.$licenseKey =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgzNjc5OTksImp0aSI6IjBmZjYxNGFiLWU2NTUtNDA0MS1iMWNmLTJkMTVlMjg1YmRlYiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjhjNTdhMTY3In0.GVQEVi5Ve21mDZNS_DZ6uy1zN7z56swyqUGAYFagh2TQFWyxG4WiUdqLzoE3PGD_7zgomdaxDrnNZe0DHKdz-Q";

app.use(vue3GoogleLogin, {
  clientId:
    "125268970594-9f9f0hk0uqrduj49120fsr5nvj9mjjc9.apps.googleusercontent.com",
});
app.use(Toaster, {
  position: "top-right",
});
app.use(router)

app.mount("#app")