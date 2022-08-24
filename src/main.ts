import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.scss";
import router from "@/router/index";
import plugins from "@/plugins/index";

const app = createApp(App);

app.use(router);

app.use(plugins);

app.mount("#app");
