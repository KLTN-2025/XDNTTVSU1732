<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                <div class="col mx-auto">
                    <div class="my-4 text-center"><img
                            src="https://img.pikbest.com/png-images/20241014/modern-school-logo-vector-design-artwork_10962285.png!bw700"
                            width="120" alt=""></div>
                    <div class="card">
                        <div class="card-body">
                            <div class="border p-4 rounded">
                                <div class="text-center">
                                    <h3 class="">ĐĂNG NHẬP</h3>
                                </div>
                                <div class="d-grid">
                                    <a class="btn my-4 shadow-sm btn-white" href="javascript:;"> <span
                                            class="d-flex justify-content-center align-items-center">
                                            <img class="me-2" src="../../../assets/images/icons/search.svg" width="16"
                                                alt="Image Description">
                                            <span>Đăng Nhập Google</span>
                                        </span></a>
                                </div>
                                <div class="form-body">
                                    <div class="row g-3">
                                        <div class="col-12"><label class="form-label">Email</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent"><i
                                                        class="fa-solid fa-envelope"></i>
                                                </div><input v-model="dang_nhap.email" type="email"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-12"><label class="form-label">Password</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent"><i
                                                        class="fa-solid fa-lock"></i></div>
                                                <input v-on:keyup.enter="dangNhap()" v-model="dang_nhap.password"
                                                    type="password" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-12"><button type="button" v-on:click="dangNhap()" class="btn btn-primary w-100"><i
                                                    class="fa-solid fa-lock-open"></i>Đăng
                                                Nhập</button></div>
                                        <div class="col-12"><a href="/khach-hang/dang-ky" class=""><button type="button"
                                                    class="btn btn-danger w-100"><i class="bx bx-user"></i>Đăng
                                                    Ký</button></a></div>
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
            dang_nhap: {}
        }
    },
    mounted() {
        // this.kiemTraDangNhap()
    },
    methods: {
        dangNhap() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/login", this.dang_nhap)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success(res.data.message);
                        this.create = {};
                        localStorage.setItem("token_khach_hang", res.data.token);
                        this.$router.push('/khach-hang/profile')
                    }
                    else {
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
        // kiemTraDangNhap() {
        //     axios
        //         .get("http://127.0.0.1:8000/api/khach-hang/check-login", {
        //             headers: {
        //                 Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
        //             }
        //         })
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.$router.push('/khach-hang/dang-nhap')
        //             }
        //         });
        // },
    },
}
</script>
<style></style>