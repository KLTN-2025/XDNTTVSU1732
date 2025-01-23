<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <div class="position-relative d-inline-block">
                            <img src="https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?rs=1&amp;pid=ImgDetMain"
                                alt="Admin" class="rounded-circle" width="110">
                            <button type="button" data-bs-toggle='modal'
                                v-on:click="Object.assign(thong_tin_update, thong_tin)"
                                data-bs-target='#capNhatProfileModal'
                                class="btn btn-primary rounded-circle position-absolute d-flex justify-content-center align-items-center"
                                style="width: 32px; height: 32px; bottom: 0; right: 0; border: 2px solid #fff;">
                                <i class="fa-solid fa-pen-nib ms-1" style="font-size: 13px;"></i>
                            </button>
                        </div>

                        <div class="mt-3">
                            <h4>{{ thong_tin.ho_va_ten }}</h4>
                            <p class="text-secondary mb-1">Quản trị viên</p>
                            <p class="text-muted font-size-sm"><i class="fa-solid fa-circle text-success me-1"></i> Đang
                                hoạt động
                            </p>
                        </div>
                    </div>
                    <hr class="">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><i class="fa-solid fa-envelope text-primary me-2"></i> Email </h6><span
                                class="text-secondary">{{ thong_tin.email }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><i class="fa-solid fa-phone text-primary me-2"></i> Số điện thoại </h6>
                            <span class="text-secondary">{{ thong_tin.so_dien_thoai }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><i class="fa-solid fa-calendar text-primary me-2"></i> Ngày tham gia </h6>
                            <span class="text-secondary">{{ formatDate(thong_tin.created_at) }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><i class="fa-solid fa-clock text-primary me-2"></i> Lần cuối đăng nhập
                            </h6><span class="text-secondary">{{ formatDateTime(thong_tin.last_login_at) }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="border rounded-3 p-4">
                        <h5 class="mb-4 text-primary"><i class="fa-solid fa-lock me-2"></i> Đổi mật khẩu </h5>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Mật khẩu hiện tại</h6>
                            </div>
                            <div class="col-sm-9"><input v-model="update_pass.password_old" type="password"
                                    class="form-control" placeholder="Nhập mật khẩu hiện tại"></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Mật khẩu mới</h6>
                            </div>
                            <div class="col-sm-9"><input v-model="update_pass.new_password" type="password"
                                    class="form-control" placeholder="Nhập mật khẩu mới"></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Xác nhận mật khẩu</h6>
                            </div>
                            <div class="col-sm-9"><input v-on:keyup.enter="doiMatKhau()"
                                    v-model="update_pass.re_password" type="password" class="form-control"
                                    placeholder="Xác nhận mật khẩu mới"></div>
                        </div>
                    </div>
                    <div class="text-end mt-4"><button v-on:click="doiMatKhau()" type="button"
                            class="btn btn-primary px-4"><i class="fa-regular fa-floppy-disk me-2"></i> Lưu
                            thay đổi </button></div>
                </div>
            </div>
        </div>
    </div>

    <div class='modal fade' id='capNhatProfileModal' tabindex='-1' aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Thông Tin</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="mb-2">
                        <label class="mb-1">Họ Và Tên</label>
                        <input type="text" class="form-control" v-model="thong_tin_update.ho_va_ten">
                    </div>
                    <div class="mb-2">
                        <label class="mb-1">Email</label>
                        <input type="text" class="form-control" v-model="thong_tin_update.email">
                    </div>
                    <div class="mb-2">
                        <label class="mb-1">Số Điện Thoại</label>
                        <input type="text" class="form-control" v-model="thong_tin_update.so_dien_thoai">
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' class='btn btn-primary' v-on:click="capNhatThongTin()"
                        data-bs-dismiss='modal'>Xác Nhận</button>
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
            thong_tin: {},
            update_pass: {
                password_old: '',
                new_password: '',
                re_password: ''
            },
            thong_tin_update: {
                ho_va_ten: '',
                email: '',
                so_dien_thoai: ''
            }
        }
    },
    mounted() {
        this.layThongTinAdmin();
    },
    methods: {
        layThongTinAdmin() {
            axios
                .get("https://ban-sach-be.dzfullstack.edu.vn/api/admin/profile/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        doiMatKhau() {
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/admin/password/change", this.update_pass, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.update_pass = {}
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        capNhatThongTin() {
            const payload = {
                ho_va_ten: this.thong_tin_update.ho_va_ten,
                email: this.thong_tin_update.email,
                so_dien_thoai: this.thong_tin_update.so_dien_thoai
            };
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/admin/profile/update", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layThongTinAdmin();
                        this.thong_tin_update = {}
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                day: '2-digit', // Nghĩa là hiển thị 2 số
                month: '2-digit', // Nghĩa là hiển thị 2 số
                year: 'numeric', // Nghĩa là hiển thị 4 số
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