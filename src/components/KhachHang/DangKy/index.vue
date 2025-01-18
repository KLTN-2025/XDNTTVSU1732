<template>
    <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                <div class="col mx-auto">
                    <div class="my-4 text-center">
                        <img src="https://img.pikbest.com/png-images/20241014/modern-school-logo-vector-design-artwork_10962285.png!bw700"
                            width="100" alt="" />
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="border p-4 rounded">
                                <div class="text-center">
                                    <h3 class="">Đăng Ký</h3>
                                    <p>
                                        Bạn Đã Có Tài Khoản?
                                        <a href="">
                                            <router-link to="/khach-hang/dang-nhap">
                                                Đăng Nhập Ngay
                                            </router-link>
                                        </a>
                                    </p>
                                </div>
                                <hr />
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label class="mb-1">Họ và Tên</label>
                                                <input v-model="dang_ky.ho_va_ten" type="text" class="form-control"
                                                    placeholder="Nhập họ và tên của bạn" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label class="mb-1">Số Điện Thoại</label>
                                                <input v-model="dang_ky.so_dien_thoai" type="text" class="form-control"
                                                    placeholder="Nhập số điện thoại của bạn" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label class="mb-1">Email</label>
                                                <input v-model="dang_ky.email" type="text" class="form-control"
                                                    placeholder="Nhập email của bạn" />
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label class="mb-1">Mật Khẩu</label>
                                                <input v-model="dang_ky.password" type="password" class="form-control"
                                                    placeholder="Nhập mật khẩu của bạn" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label class="mb-1">Nhập Lại Mật Khẩu</label>
                                                <input v-on:keyup.enter="dangKy()" v-model="dang_ky.re_password"
                                                    type="password" class="form-control"
                                                    placeholder="Nhập lại mật khẩu của bạn" />
                                            </div>
                                        </div>
                                        <div class="col-12 mt-3">
                                            <button v-on:click="dangKy()" class="btn btn-primary w-100">
                                                <i class="bx bx-user"></i>Đăng Ký Ngay
                                            </button>
                                        </div>
                                        <div class="col-12 mt-3">
                                            <router-link to="/">
                                                <div class="d-grid">
                                                    <button type="button" class="btn btn-secondary">
                                                        <i class="fa-solid fa-circle-left"></i> Quay Lại
                                                        Trang Chủ
                                                    </button>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            dang_ky: {},
        };
    },
    methods: {
         dangKy() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/register', this.dang_ky)
                .then((res) => {
                    if (res.data.status) {
                        this.dang_ky = {};
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('khach-hang/login')
                    }
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
    },
};
</script>
<style></style>
