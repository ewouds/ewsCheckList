import { createApp } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import App from "./App.vue";
//import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

localStorage.setItem("ewschecklistver", "v20240509.1");

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount("#app");
