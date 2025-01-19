<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-4">
                            <h6 class="mt-2"><b>{{ danh_muc.ten_danh_muc }}</b></h6>
                        </div>
                        <div class="col">
                            <div class="btn-group w-100" role="group" aria-label="Button group with nested dropdown">
                                <button type="button" class="btn btn-white">Sắp Xếp</button>
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button"
                                        class="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bx bx-chevron-down"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <li><a class="dropdown-item" href="#">A -Z</a></li>
                                        <li><a class="dropdown-item" href="#">Z - A</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="btn-group w-100" role="group">
                                <button type="button" class="btn btn-white">Chọn Giá</button>
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button"
                                        class="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bx bx-slider"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="btnGroupDrop1">
                                        <li><a class="dropdown-item" href="#">Dưới 20k</a></li>
                                        <li><a class="dropdown-item" href="#">Dưới 50</a></li>
                                        <li><a class="dropdown-item" href="#">Dưới 100k</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                         <div class="col-lg-4">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm cần tìm kiếm">
                                <button type="button" class="input-group-text bg-success">Tìm Kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="card">
            <div class="card-body">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                    <template v-for="(value, index) in list" :key="index">
                        <div class="col-lg-2 d-flex">
                            <div class="card flex-fill">

                                <img :src="value.hinh_anh" style="max-height: 250px; width: 100%; object-fit: contain;"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <router-link :to="'/chi-tiet/' + value.id + '-' + value.slug_sach">
                                        <h6 class="card-title cursor-pointer">{{ value.ten_sach }}</h6>
                                    </router-link>
                                    <div class="clearfix">
                                        <p class="mb-0 float-start">SL: <strong>{{ value.so_luong_ban }}</strong>
                                        </p>
                                        <p class="mb-0 float-end fw-bold">
                                            <span class="me-2 text-decoration-line-through text-secondary"><del
                                                    class="text-danger">{{ formatVND(value.gia_ban)
                                                    }}</del></span><span>{{
                                                        formatVND(value.gia_km) }}</span>
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center mt-3 fs-6">
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                        <p class="mb-0 ms-auto">4.2(182)</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['id_danh_muc', 'slug_danh_muc'],
    data() {
        return {
            list: [],
            id_danh_muc: null,
            danh_muc: {}
        }
    },

    mounted() {
        this.id_danh_muc = this.$route.params.id_danh_muc;
        this.loadDataTheoDanhMuc();
    },
    beforeRouteUpdate(to, from, next) {
        this.id_danh_muc = to.params.id_danh_muc;
        this.loadDataTheoDanhMuc();
        next();
    },
    methods: {
        formatVND(number) {
            number = parseInt(number);
            return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },

        loadDataTheoDanhMuc() {
            axios
                .get('https://ban-sach-be.dzfullstack.edu.vn/api/home/danh-muc/danh-sach/' + this.id_danh_muc)
                .then((res) => {
                    this.list = res.data.data
                    this.danh_muc = res.data.danh_muc
                });
        }
    },
}
</script>
<style></style>