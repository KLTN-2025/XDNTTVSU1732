<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-4">
                            <h6 class="mt-2"><b>GỢI Ý CHO BẠN</b></h6>
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
                                        <li><a class="dropdown-item" href="#" @click="sortList('az')">A -Z</a></li>
                                        <li><a class="dropdown-item" href="#" @click="sortList('za')">Z - A</a></li>
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
                                        <li><a class="dropdown-item" href="#" @click="sortPrice('tangDan')">Giá Tăng
                                                Dần</a></li>
                                        <li><a class="dropdown-item" href="#" @click="sortPrice('giamDan')">Giá Giảm
                                                Dần</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="input-group">
                                <input type="text" v-on:keyup.enter="timKiem()" v-model="search.noi_dung" class="form-control" placeholder="Nhập tên sản phẩm cần tìm kiếm">
                                <button type="button" v-on:click="timKiem()" class="input-group-text bg-success">Tìm Kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(value, index) in list_sach_goi_y" :key="index">
                            <div class="col-lg-2 d-flex">
                                <div class="card flex-fill">
                                    <img :src="value.hinh_anh"
                                        style="max-height: 250px; width: 100%; object-fit: contain;"
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
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_sach_goi_y: [],
            search: {
                noi_dung: ''
            }
        }
    },
    mounted() {
        this.loadDataGoiy();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,)
        },
        loadDataGoiy() {
            axios
                .get('http://127.0.0.1:8000/api/home/data-goi-y-all')
                .then((res) => {
                    this.list_sach_goi_y = res.data.list_sach_goi_y;
                })
        },
        timKiem() {
            axios
                .post('http://127.0.0.1:8000/api/home/tim-kiem-goi-y', this.search)
                .then((res) => {
                    this.list_sach_goi_y = res.data.list_sach_goi_y;
                })
        },
        sortList(order) {
            if (order === 'az') {
                this.list_sach_goi_y.sort((a, b) => a.ten_sach.localeCompare(b.ten_sach));
            } else if (order === 'za') {
                this.list_sach_goi_y.sort((a, b) => b.ten_sach.localeCompare(a.ten_sach));
            }
        },
        sortPrice(order) {
            if (order === 'tangDan') {
                this.list_sach_goi_y.sort((a, b) => a.gia_km - b.gia_km);
            } else if (order === 'giamDan') {
                this.list_sach_goi_y.sort((a, b) => b.gia_km - a.gia_km);
            }
        }
    },
    computed: {

    }
}
</script>
<style></style>