<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2"><b>Lịch Sử Đơn Hàng</b></h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center bg-primary text-white">
                                    <th>#</th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Tên Sách</th>
                                    <th>Số Lượng</th>
                                    <th>Tổng Tiền Thanh Toán</th>
                                    <th>Phương Thức</th>
                                    <th>Thông tin người mua</th>
                                    <th>Thanh Toán</th>
                                    <th>Tình Trạng Đơn Hàng</th>
                                    <th>Đánh Giá</th>
                                    <th>In Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(v, k) in list" :key="k" class="align-middle">
                                    <th>{{ k + 1 }}</th>
                                    <td class="text-center">{{ v.ma_don_hang }}</td>
                                    <td>{{ v.ten_sach }}</td>
                                    <td class="text-center">{{ v.so_luong }}</td>
                                    <td class="text-end">{{ formatVND(v.tong_tien_thanh_toan) }}</td>
                                    <td class="text-center">
                                        <button v-if="v.phuong_thuc == 0" class="btn btn-outline-warning w-100">Thanh Toán Khi
                                            Nhận
                                            Hàng</button>
                                        <button v-else class="btn btn-outline-primary w-100">Thanh Toán Online</button>
                                    </td>
                                    <td class="text-center">
                                        <button v-on:click="nguoi_mua = v" class="btn btn-success" data-bs-toggle='modal'
                                            data-bs-target='#xemThongTinModal'>Xem thông tin</button>
                                    </td>
                                    <td class="text-center">
                                        <button v-if="v.is_thanh_toan == 1" class="btn btn-success w-100">Đã Thanh
                                            Toán</button>
                                        <button v-else class="btn btn-warning text-white w-100">Chưa Thanh Toán</button>
                                    </td>
                                    <td class="text-center">
                                        <button v-if="v.tinh_trang_don_hang == 0" v-on:click="huy_don = v"
                                            data-bs-toggle='modal' data-bs-target='#huyDonModal'
                                            class="btn btn-success w-100">Chờ Xử
                                            Lý</button>
                                        <button v-else-if="v.tinh_trang_don_hang == 1" class="btn btn-info w-100">Đã Xử
                                            Lý</button>
                                        <button v-else-if="v.tinh_trang_don_hang == 2" v-on:click="xac_nhan = v"
                                            class="btn btn-primary w-100" data-bs-toggle='modal'
                                            data-bs-target='#xacNhanModal'>Đang Giao Đơn</button>
                                        <button v-else-if="v.tinh_trang_don_hang == 3" class="btn btn-primary w-100">Đã
                                            Nhận</button>
                                        <button v-else class="btn btn-danger w-100">Đã Hủy</button>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-secondary"><i
                                                class="fa-solid fa-file-invoice-dollar"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Xác Nhận Đơn Hàng -->
    <div class='modal fade' id='xacNhanModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xác Nhận Đã Nhận Được Đơn Hàng</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    Bạn có chắc chắn đã nhận được đơn hàng có có mã đơn là <b>{{ xac_nhan.ma_don_hang }}</b> chưa? Nếu
                    đã nhận được đơn hàng, vui lòng xác nhận để hoàn tất quá trình mua hàng.
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    <button type='button' class='btn btn-primary' v-on:click="xacNhan()" data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Hủy Đơn Hàng -->
    <div class='modal fade' id='huyDonModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xác Nhận Hủy Đơn Hàng</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    Bạn có chắc chắn muốn đơn hàng có có mã đơn là <b>{{ huy_don.ma_don_hang }}</b> không? Nếu muốn hủy
                    đơn hàng, vui lòng xác nhận để hoàn tất quá trình hủy đơn hàng.
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    <button type='button' class='btn btn-primary' v-on:click="huyDon()" data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Xem Thôn Tin Người Mua Đơn Hàng -->
    <div class='modal fade' id='xemThongTinModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Thôn Tin Người Mua Đơn Hàng {{ nguoi_mua.ma_don_hang }}</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center bg-primary text-white">
                                <th>#</th>
                                <th>Tên Người Mua</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <th class="text-center">1</th>
                                <td>{{ nguoi_mua.ten_nguoi_nhan }}</td>
                                <td class="text-center">{{ nguoi_mua.so_dien_thoai }}</td>
                                <td>{{ nguoi_mua.dia_chi_giao_hang }}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
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
            list: [],
            xac_nhan: {
                ma_don_hang: ''
            },
            huy_don: {
                ma_don_hang: ''
            },
            nguoi_mua : {}
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lich-su-don-hang/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                })
        },
        xacNhan() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/xac-nhan-don-hang/change", this.xac_nhan, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        huyDon() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/huy-don-hang/change", this.huy_don, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        this.$toast.error(v[0]);
                    });
                });
        }
    },
}
</script>
<style></style>