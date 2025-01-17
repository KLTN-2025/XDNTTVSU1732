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
                            <div class="parent-icon"><i class='bx bx-cookie'></i>
                            </div>
                            <div class="menu-title">Danh Mục</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                        data-bs-toggle="dropdown">
                        <div class="parent-icon"><i class='bx bx-cart'></i>
                        </div>
                        <div class="menu-title">Bán Sách</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link to="/admin/sach">
                                <a class="dropdown-item" href="/admin/sach"><i
                                        class="bx bx-right-arrow-alt"></i>Sách</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/tac-gia">
                                <a class="dropdown-item" href="/admin/tac-gia"><i class="bx bx-right-arrow-alt"></i>Tác
                                    Giả</a>
                            </router-link>
                        </li>
                    </ul>
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