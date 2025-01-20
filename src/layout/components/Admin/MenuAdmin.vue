<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            <div>
                <img src="../../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text">Rukada</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">

                <li class="nav-item">
                    <router-link to="/admin/danh-muc">
                        <a class="nav-link" href="/admin/danh-muc">
                            <div class="parent-icon"><i class="fa-solid fa-list"></i>
                            </div>
                            <div class="menu-title">Danh Mục</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/sach">
                        <a class="nav-link" href="/admin/sach">
                            <div class="parent-icon"><i class="fa-solid fa-book-open-reader"></i>
                            </div>
                            <div class="menu-title">Sách</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/tac-gia">
                        <a class="nav-link" href="/admin/tac-gia">
                            <div class="parent-icon"><i class="fa-solid fa-id-card"></i>
                            </div>
                            <div class="menu-title">Tác Giả</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/nha-xuat-ban">
                        <a class="nav-link" href="/admin/nha-xuat-ban">
                            <div class="parent-icon"><i class="fa-solid fa-user-tie"></i>
                            </div>
                            <div class="menu-title">Nhà Xuất Bản</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/nhan-vien">
                        <a class="nav-link" href="/admin/nhan-vien">
                            <div class="parent-icon"><i class="fa-solid fa-users-gear"></i>
                            </div>
                            <div class="menu-title">Nhân Viên</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/khach-hang">
                        <a class="nav-link" href="/admin/khach-hang">
                            <div class="parent-icon"><i class="fa-solid fa-users-line"></i>
                            </div>
                            <div class="menu-title">Khách Hàng</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/don-hang">
                        <a class="nav-link" href="/admin/don-hang">
                            <div class="parent-icon"><i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div class="menu-title">Đơn Hàng</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/danh-gia">
                        <a class="nav-link" href="/admin/danh-gia">
                            <div class="parent-icon"><i class="fa-solid fa-ranking-star"></i>
                            </div>
                            <div class="menu-title">Đánh Giá</div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>