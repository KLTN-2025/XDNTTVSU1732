import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
  {
    path: "/admin",
    component: () => import("../layout/wrapper/Admin/index.vue"),
    children: [
      //   {
      //     path: "danh-muc",
      //     component: () => import("../components/Admin/Test_view/index.vue"),
      //   },
    ],
  },
  {
    path: "/",
    component: () => import("../layout/wrapper/Client/index.vue"),
    children: [
      //   {
      //     path: "danh-muc",
      //     component: () => import("../components/Admin/Test_view/index.vue"),
      //   },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
