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
                <!-- <li class="nav-item dropdown">
                    <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                        data-bs-toggle="dropdown">
                        <div class="parent-icon"><i class='bx bx-home-circle'></i>
                        </div>
                        <div class="menu-title">Dashboard</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Default</a>
                        </li>
                        <li> <a class="dropdown-item" href="index2.html"><i
                                    class="bx bx-right-arrow-alt"></i>Alternate</a>
                        </li>
                        <li> <a class="dropdown-item" href="index3.html"><i
                                    class="bx bx-right-arrow-alt"></i>Graphical</a>
                        </li>
                    </ul>
                </li> -->
                <li class="nav-item">
                    <router-link to="/">
                        <a class="nav-link" href="/">
                            <div class="parent-icon"><i class="fa-solid fa-house"></i>
                            </div>
                            <div class="menu-title">Home</div>
                        </a>
                    </router-link>
                </li>
                <template v-for="(value, index) in list_danh_muc" :key="index">
                    <template v-if="value.id_danh_muc_cha == 0">
                        <li class="nav-item dropdown">
                            <a href="/danh-muc" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                data-bs-toggle="dropdown">
                                <div class="parent-icon">
                                    <span v-html="value.icon"></span>
                                </div>
                                <div class="menu-title">{{ value.ten_danh_muc }}</div>
                            </a>
                            <ul class="dropdown-menu">
                                <template v-for="(v, k) in list_danh_muc" :key="k">
                                    <router-link :to="'/danh-muc/' + v.id + '-' + v.slug_danh_muc">
                                        <a v-if="value.id == v.id_danh_muc_cha" class="dropdown-item">
                                           <i class="fa-solid fa-arrow-right-long"></i> {{ v.ten_danh_muc }}
                                        </a>
                                    </router-link>
                                </template>
                            </ul>
                        </li>
                    </template>
                </template>
            </ul>
        </nav>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    data() {
        return {
            list_danh_muc: [],
        }
    },
    mounted() {
        this.loadDataDanhMuc();
    },
    methods: {
        loadDataDanhMuc() {
            axios
                .get('http://127.0.0.1:8000/api/home/data-menu')
                .then((res) => {
                    this.list_danh_muc = res.data.data
                });
        },
    },
}
</script>
<style></style>