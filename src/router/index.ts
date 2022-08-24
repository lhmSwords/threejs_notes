import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: initRoutes(),
});

export default router;


function initRoutes(): RouteRecordRaw[] {
  const pages = import.meta.glob("@/views/*.vue", { eager: true });

  const routes: RouteRecordRaw[] = [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
      children: [],
    },
  ];

  for (const path in pages) {
    const component = (<any>pages[path]).default;
    const route: RouteRecordRaw = {
      path: `/${component.__name}`,
      name: component.__name,
      component,
    };
    routes[0].children?.push(route);
  }
  return routes;
}
