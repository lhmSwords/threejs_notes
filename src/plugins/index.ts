import type { App } from "vue";
import elementplus from "./element-plus";

export default {
  install: (app: App, options?: any) => {
    app.use(elementplus);
  },
};
