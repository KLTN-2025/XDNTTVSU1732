<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-md-4 border-end">
                <img :src="chi_tiet_sach.hinh_anh" class="img-fluid"
                    style="max-height: 400px; width: 100%; object-fit: contain;" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">{{ chi_tiet_sach.ten_sach }}</h4>
                    <div class="d-flex gap-3 py-3">
                        <div class="cursor-pointer">
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-secondary"></i>
                        </div>
                        <div>Đánh giá: <b>142</b></div>
                        <div class="text-success"><i class="bx bxs-cart-alt align-middle"></i> Đã bán: 100</div>
                    </div>
                    <dl class="row">
                        <dt class="col-sm-3">Giá Gốc</dt>
                        <dd class="col-sm-9"><del>
                                {{ formatVND(chi_tiet_sach.gia_ban) }}
                            </del></dd>

                        <dt class="col-sm-3">Giá Khuyến Mãi</dt>
                        <dd class="col-sm-9 text-danger"><b>{{ formatVND(chi_tiet_sach.gia_km) }}</b></dd>

                        <dt class="col-sm-3">Số Lượng Hiện Tại</dt>
                        <dd class="col-sm-9">{{ chi_tiet_sach.so_luong_ban }} </dd>
                    </dl>
                    <hr>
                    <div class="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                        <div class="col">
                            <label class="form-label">Số Lượng Mua</label>
                            <div class="input-group input-spinner">
                                <button v-on:click="tru()" class="btn btn-white" type="button" id="button-plus">
                                    -
                                </button>
                                <input v-on:change="doi()" v-model="chi_tiet_sach.so_luong_mua" type="number"
                                    class="form-control text-center" style="width: 100px; max-width: 100px;">
                                <button v-on:click="cong()" class="btn btn-white" type="button" id="button-minus"> +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex gap-3 mt-3">
                        <a href="#" class="btn btn-primary" v-on:click="muaNgay()">Mua Ngay</a>
                        <a v-on:click="themGioHang()" class="btn btn-outline-primary"><span class="text">Thêm
                                vào giỏ
                                hàng</span> <i class="bx bxs-cart-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="card-body">
            <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-bs-toggle="tab" href="#moTa" role="tab" aria-selected="true">
                        <div class="d-flex align-items-center">
                            <div class="tab-icon"><i class="bx bx-comment-detail font-18 me-1"></i>
                            </div>
                            <div class="tab-title"> Mô Tả </div>
                        </div>
                    </a>
                </li>
                <li class="nav-item" v-on:click="getDataDanhGia()" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#danhGia" role="tab" aria-selected="false"
                        tabindex="-1">
                        <div class="d-flex align-items-center">
                            <div class="tab-icon"><i class="bx bx-bookmark-alt font-18 me-1"></i>
                            </div>
                            <div class="tab-title">Đánh Giá</div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="tab-content pt-3">
                <div class="tab-pane fade show active" id="moTa" role="tabpanel">
                    <p v-html="chi_tiet_sach.mo_ta"></p>
                </div>
                <div class="tab-pane fade" id="danhGia" role="tabpanel">
                    <div class="card radius-10">
                        <div class="card-body">
                            <template v-for="(value, index) in list_danh_gia" :key="index">
                                <div class="d-flex align-items-center">
                                    <img src="https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/avatar-cute-dong-vat-1725201830.jpg"
                                        class="align-self-center rounded-circle p-1 border" width="90" height="90"
                                        alt="...">
                                    <div class="flex-grow-1 ms-3">
                                        <h5 class="mt-0">{{ value.ho_va_ten }}</h5>
                                        <p>{{ value.noi_dung }}</p>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="d-flex gap-3">
                                                <button class="btn btn-outline-primary btn-sm"
                                                    v-on:click="Object.assign(danh_gia_update, value)"
                                                    data-bs-toggle='modal'
                                                    data-bs-target='#updateDanhGiaModal'>Sửa</button>
                                                <button class="btn btn-outline-danger btn-sm"
                                                    v-on:click="Object.assign(delete_danh_gia, value)"
                                                    data-bs-toggle='modal'
                                                    data-bs-target='#deleteDanhGiaModal'>Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </template>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group mb-3">
                                        <input v-model="danh_gia.noi_dung" v-on:keyup.enter="danhGia()" type="text"
                                            class="form-control" placeholder="Nhập đánh giá của bạn">
                                        <span class="input-group-text" v-on:click="danhGia()">Đánh Giá</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật Đánh Giá -->
    <div class='modal fade' id='updateDanhGiaModal' tabindex='-1' aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Sửa Đánh Giá</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <input v-model="danh_gia_update.noi_dung" type="text" class="form-control"
                        placeholder="Nhập đánh giá của bạn">
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' class='btn btn-primary' v-on:click="suaDanhGia()" data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa Đánh Giá -->
    <div class='modal fade' id='deleteDanhGiaModal' tabindex='-1' aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xóa Đánh Giá</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' class='btn btn-primary' v-on:click="xoaDanhGia()" data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['id_sach', 'slug_sach'],
    data() {
        return {
            id_sach: this.$route.params.id_sach,
            chi_tiet_sach: {},
            order: 0,
            danh_gia: {
                noi_dung: '',
                id_sach: this.$route.params.id_sach
            },
            list_danh_gia: [],
            danh_gia_update: {},
            delete_danh_gia: {}
        }
    },

    mounted() {
        this.layThongTinSach();
    },
    methods: {
        getDataDanhGia() {
            var payload = {
                id_sach: this.id_sach
            }
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia/data", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list_danh_gia = res.data.data;
                })
        },
        danhGia() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia/create", this.danh_gia, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.danh_gia.noi_dung = "";
                        this.getDataDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                })
        },
        suaDanhGia() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia/update", this.danh_gia_update, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.danh_gia_update.noi_dung = "";
                        this.getDataDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        xoaDanhGia() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia/delete", this.delete_danh_gia, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.getDataDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        formatVND(number) {
            number = parseInt(number);
            return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },
        doi() {
            if (this.chi_tiet_sach.so_luong_mua < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
                this.chi_tiet_sach.so_luong_mua = 1;
            } else if (this.chi_tiet_sach.so_luong_mua > this.chi_tiet_sach.so_luong_ban) {
                this.chi_tiet_sach.so_luong_mua = this.chi_tiet_sach.so_luong_ban;
                var message = "Số lượng mua tối đa chỉ được " + this.chi_tiet_sach.so_luong_ban + " sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
            }
        },
        tru() {
            this.chi_tiet_sach.so_luong_mua = this.chi_tiet_sach.so_luong_mua * 1 - 1;
            if (this.chi_tiet_sach.so_luong_mua < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
                this.chi_tiet_sach.so_luong_mua = 1;
            }
        },
        cong() {
            this.chi_tiet_sach.so_luong_mua = this.chi_tiet_sach.so_luong_mua * 1 + 1;
            if (this.chi_tiet_sach.so_luong_mua > this.chi_tiet_sach.so_luong_ban) {
                this.chi_tiet_sach.so_luong_mua = this.chi_tiet_sach.so_luong_ban;
                var message = "Số lượng mua tối đa chỉ được " + this.chi_tiet_sach.so_luong_ban + " sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
            }
        },
        layThongTinSach() {
            axios
                .get('http://127.0.0.1:8000/api/home/chi-tiet-sach/' + this.id_sach)
                .then((res) => {
                    if (res.data.status) {
                        this.chi_tiet_sach = res.data.data;
                        this.order = res.data.order;
                        this.chi_tiet_sach.so_luong_mua = 1;
                    }
                });
        },
        themGioHang() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/create", this.chi_tiet_sach, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                    } else {
                        this.$router.push('/khach-hang/dang-nhap');
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        muaNgay() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/create", this.chi_tiet_sach, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + 'Vui lòng thực hiện thanh toán' + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push({ name: 'gioHang', params: { id_chi_tiet: res.data.chi_tiet } });
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                })
        },
    },
}
</script>
<style></style>