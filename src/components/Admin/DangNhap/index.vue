<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                <div class="col mx-auto">
                    <div class="my-4 text-center">
                        <img src="https://img.pikbest.com/png-images/20241014/modern-school-logo-vector-design-artwork_10962285.png!bw700"
                            width="180" alt="" />
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="border p-4 rounded">
                                <div class="text-center">
                                    <h3 class="">ĐĂNG NHẬP QUẢN TRỊ</h3>
                                </div>
                                <div class="login-separater text-center mb-4">
                                    <hr />
                                </div>
                                <div class="form-body">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label">Email</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent">
                                                    <i class="fa-solid fa-envelope"></i>
                                                </div>
                                                <input v-model="tai_Khoan.email" type="email" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Password</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent">
                                                    <i class="fa-solid fa-lock"></i>
                                                </div>
                                                <input v-on:keyup.enter="dangNhap()" v-model="tai_Khoan.password"
                                                    type="password" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="button" v-on:click="dangNhap()" class="btn btn-primary w-100">
                                                <i class="fa-solid fa-lock-open"></i>Đăng Nhập
                                            </button>
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
            tai_Khoan: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        dangNhap() {
            axios
                .post("http://127.0.0.1:8000/api/admin/login", this.tai_Khoan)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success(res.data.message);
                        this.create = {
                            email: "",
                            password: "",
                        };
                        localStorage.setItem("token_nhan_vien", res.data.token);
                        localStorage.setItem("name", res.data.name);
                        setTimeout(() => {
                            window.location.href = "/admin/danh-muc"
                        }, 2000);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
    },
};
</script>
<style></style>
