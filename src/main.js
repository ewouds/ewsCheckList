import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
//import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

localStorage.setItem("ewschecklistver", "v0.3");

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
