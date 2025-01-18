import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkAdminLogin from './checkAdminLogin'
import checkKhachHangLogin from "./checkKhachHangLogin";
const routes = [
    // Admin
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
            {
                path: "nhan-vien",
                component: () => import("../components/Admin/NhanVien/index.vue"),
                beforeEnter: checkAdminLogin,
            },
            {
                path: "khach-hang",
                component: () => import("../components/Admin/KhachHang/index.vue"),
                beforeEnter: checkAdminLogin,
            },
        ],
    },
    // End Admin

    // Auth Admin
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

    // End Auth Admin

    // Auth Khách Hàng
    {
        path: "/khach-hang",
        component: () => import("../layout/wrapper/Auth/index.vue"),
        children: [
            {
                path: "dang-nhap",
                component: () => import("../components/KhachHang/DangNhap/index.vue"),
            },
            {
                path: "dang-ky",
                component: () => import("../components/KhachHang/DangKy/index.vue"),
            },
            {
                path: "kich-hoat/:id_khach_hang",
                component: () => import("../components/KhachHang/KichHoat/index.vue"),
                props: true,
            },
        ],
    },

    // End Auth Khách Hàng

    // Home
    {
        path: "/",
        component: () => import("../layout/wrapper/Client/index.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/Client/Home/index.vue"),
            },
            {
                path: "/danh-muc/:id_danh_muc-:slug_danh_muc",
                component: () =>
                    import("../components/Client/DanhSachSanPham/index.vue"),
                props: true,
            },
            {
                path: "/chi-tiet/:id_sach-:slug_sach",
                component: () => import("../components/Client/ChiTietSach/index.vue"),
                props: true,
            },
        ],
    },
    // End Home

    // Khách Hàng
    {
        path: "/khach-hang",
        component: () => import("../layout/wrapper/Client/index.vue"),
        children: [
            {
                path: "profile",
                component: () => import("../components/KhachHang/Profile/index.vue"),
                beforeEnter: checkKhachHangLogin,
            },
            {
                path: "dang-nhap",
                component: () => import("../components/KhachHang/DangNhap/index.vue"),
            },
            {
                path: "dang-ky",
                component: () => import("../components/KhachHang/DangKy/index.vue"),
            },
        ],
    },
    // End Khách Hàng
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
