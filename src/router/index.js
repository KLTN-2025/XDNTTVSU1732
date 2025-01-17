import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkAdminLogin from './checkAdminLogin'
const routes = [
  {
    path: "/admin",
    component: () => import("../layout/wrapper/Admin/index.vue"),
    children: [
      {
        path: "danh-muc",
        component: () => import("../components/Admin/DanhMuc/index.vue"),
        beforeEnter: checkAdminLogin,
      },
      {
        path: "sach",
        component: () => import("../components/Admin/Sach/index.vue"),
        beforeEnter: checkAdminLogin,
      },
      {
        path: "tac-gia",
        component: () => import("../components/Admin/TacGia/index.vue"),
        beforeEnter: checkAdminLogin,
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("../layout/wrapper/Auth/index.vue"),
    children: [
      {
        path: "dang-nhap",
        component: () => import("../components/Admin/DangNhap/index.vue"),
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
