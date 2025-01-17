import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
  {
    path: "/admin",
    component: () => import("../layout/wrapper/Admin/index.vue"),
    children: [
      {
        path: "danh-muc",
        component: () => import("../components/Admin/DanhMuc/index.vue"),
      },
      {
        path: "sach",
        component: () => import("../components/Admin/Sach/index.vue"),
      },
      {
        path: "tac-gia",
        component: () => import("../components/Admin/TacGia/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layout/wrapper/Client/index.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/Client/Home/index.vue"),
      },
    ],
  },
  {
    path: "/khach-hang",
    component: () => import("../layout/wrapper/Client/index.vue"),
    children: [
      {
        path: "profile",
        component: () => import("../components/KhachHang/Profile/index.vue"),
      },
    ],
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
