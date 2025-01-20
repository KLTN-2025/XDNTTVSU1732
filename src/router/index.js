import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkAdminLogin from "./checkAdminLogin";
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
            {
                path: "nha-xuat-ban",
                component: () => import("../components/Admin/NhaXuatBan/index.vue"),
                beforeEnter: checkAdminLogin,
            },
            {
                path: "don-hang",
                component: () => import("../components/Admin/DonHang/index.vue"),
                beforeEnter: checkAdminLogin,
            },
            {
                path: "profile",
                component: () => import("../components/Admin/Profile/index.vue"),
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
            {
                path: "quen-mat-khau",
                component: () =>
                    import("../components/KhachHang/QuenMatKhau/index.vue"),
            },
            {
                path: "dat-lai-mat-khau/:hash_reset",
                component: () =>
                    import("../components/KhachHang/DatLaiMatKhau/index.vue"),
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
            {
                path: "/goi-y-cho-ban",
                component: () => import("../components/Client/GoiYChoBan/index.vue"),
            },
            {
                path: "/dang-sale",
                component: () => import("../components/Client/DangSale/index.vue"),
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
                path: "gio-hang",
                component: () => import("../components/KhachHang/GioHang/index.vue"),
                name: "gioHang",
            },
            {
                path: "lich-su-mua-hang",
                component: () =>
                    import("../components/KhachHang/LichSuMuaHang/index.vue"),
            },
        ],
    },
    // End Khách Hàng
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
