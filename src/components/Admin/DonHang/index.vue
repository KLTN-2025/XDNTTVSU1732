<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Danh Sách Đơn Đặt Hàng</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="bg-primary text-white text-center aligin-middle">
                                    <th>STT</th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Người Đặt</th>
                                    <th>Ngày Đặt</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_don_hang" :key="index">
                                    <tr class="align-middle">
                                        <th class="text-center">{{ index + 1 }}</th>
                                        <td class="text-center">{{ value.ma_don_hang }}</td>
                                        <td>{{ value.ten_nguoi_nhan }}</td>
                                        <td class="text-center">{{ formatDateTime(value.created_at) }}</td>
                                        <td class="text-center">
                                            <button v-if="value.tinh_trang_don_hang == 0" class="btn btn-warning">Chờ Xử
                                                Lý</button>
                                            <button v-if="value.tinh_trang_don_hang == 1" class="btn btn-success">Đã Xử
                                                Lý</button>
                                            <button v-if="value.tinh_trang_don_hang == 2" class="btn btn-primary">Đã
                                                Giao
                                                Vân Chuyển</button>
                                            <button v-if="value.tinh_trang_don_hang == 3" class="btn btn-success">Đã
                                                Giao
                                                Thành Công</button>
                                            <button v-if="value.tinh_trang_don_hang == 4" class="btn btn-danger">Đã
                                                Hủy</button>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="xem_don_hang = value" class="btn btn-primary me-2"
                                                data-bs-toggle='modal' data-bs-target='#xemDonHangModal'>Xem Đơn
                                                Hàng</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Xem Đơn Hàng -->
    <div class='modal fade' id='xemDonHangModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xem Thông Tin Đơn Hàng {{
                        xem_don_hang.ma_don_hang
                    }}</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="bg-primary text-white text-center aligin-middle">
                                <th>Hình Ảnh</th>
                                <th>Tên Sách</th>
                                <th>Số Lượng</th>
                                <th>Tổng Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <td class="text-center">
                                    <img :src="xem_don_hang.hinh_anh" class="img-fluid" style="width: 100%; height: 100px; object-fit: contain;" alt="">
                                </td>
                                <td>{{ xem_don_hang.ten_sach }}</td>
                                <td class="text-center">{{ xem_don_hang.so_luong }}</td>
                                <td class="text-end">{{ formatVND(xem_don_hang.tong_tien_thanh_toan) }}</td>
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
            list_don_hang: [],
            xem_don_hang: {}
        }
    },
    mounted() {
        this.getDataDonHang();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
        getDataDonHang() {
            axios
                .get('http://127.0.0.1:8000/api/admin/don-hang/data')
                .then((res) => {
                    this.list_don_hang = res.data.data;
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        toastr.error(v[0]);
                    });
                });
        },
        formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                day: '2-digit', // Nghĩa là hiển thị 2 số
                month: '2-digit', // Nghĩa là hiển thị 2 số
                year: 'numeric', // Nghĩa là hiển thị 4 số
                hour: '2-digit', // Nghĩa là hiển thị 2 số
                minute: '2-digit', // Nghĩa là hiển thị 2 số
                second: '2-digit' // Nghĩa là hiển thị 2 số
            });
        }
    },
}
</script>
<style></style>