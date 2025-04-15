<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h6 class="mt-2"><b>DANH SÁCH KHÁCH HÀNG ĐÃ ĐÁNH GIÁ SẢN PHẨM</b></h6>
                </div>
                <div class="card-body">
                    <div class='table-responsive'>
                        <table class='table table-bordered table-hover'>
                            <thead>
                                <tr class="bg-primary text-white">
                                    <th class='align-middle text-nowrap text-center'>#</th>
                                    <th class='align-middle text-nowrap text-center'>Tên Khách Hàng</th>
                                    <th class='align-middle text-nowrap text-center'>Tên Sách</th>
                                    <th class='align-middle text-nowrap text-center'>Thời Gian Đánh Giá</th>
                                    <th class='align-middle text-nowrap text-center'>Xem Đánh Giá</th>
                                    <th class='align-middle text-nowrap text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_kh_danh_gia" :key="index">
                                    <tr>
                                        <th class='align-middle text-nowrap text-center'>{{ index + 1 }}</th>
                                        <td class='align-middle text-nowrap'>{{ value.ho_va_ten }}</td>
                                        <td class='align-middle text-nowrap'>{{ value.ten_sach }}</td>
                                        <td class='align-middle text-nowrap text-center'>{{ formatDateTime(value.created_at) }}</td>
                                        <td class='align-middle text-nowrap text-center'>
                                            <button class="btn btn-success" data-bs-toggle='modal'
                                                v-on:click="Object.assign(xem_danh_gia, value)"
                                                data-bs-target='#xemDanhGiaModal'>Xem</button>
                                        </td>
                                        <td class='align-middle text-nowrap text-center'>
                                            <button class="btn btn-danger" data-bs-toggle='modal'
                                                v-on:click="Object.assign(delete_danh_gia, value)"
                                                data-bs-target='#xoaDanhGiaModal'>Xóa</button>
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

    <!-- Modal Xem Đánh Giá -->
    <div class='modal fade' id='xemDanhGiaModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header bg-primary'>
                    <h1 class='modal-title fs-5 text-white' id='exampleModalLabel'>NỘI DUNG ĐÁNH GIÁ</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>

                    <td class='align-middle text-wrap'>{{ xem_danh_gia.noi_dung }}</td>

                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa Đánh Giá -->
    <div class='modal fade' id='xoaDanhGiaModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header bg-primary'>
                    <h1 class='modal-title fs-5 text-white' id='exampleModalLabel'>XÓA ĐÁNH GIÁ</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <span>Bạn chắc chắn muốn xóa đánh giá của khách hàng {{ delete_danh_gia.ho_va_ten }}</span>
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
    data() {
        return {
            list_kh_danh_gia: [],
            xem_danh_gia: {},
            delete_danh_gia: {},
        }
    },
    mounted() {
        this.loadDataKhDanhGia();
    },
    methods: {
        loadDataKhDanhGia() {
            axios
                .get('http://127.0.0.1:8000/api/admin/khach-hang-danh-gia/data', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_kh_danh_gia = res.data.data;
                    if(res.data.stauts == false) {
                        this.$toast.error(res.data.message)
                    }
                })
        },
        xoaDanhGia() {
            axios
                .post('http://127.0.0.1:8000/api/admin/khach-hang-danh-gia/delete', this.delete_danh_gia, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhDanhGia();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
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