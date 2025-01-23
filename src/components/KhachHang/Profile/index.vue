<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab"
                                aria-selected="true">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-user font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">Profile</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab"
                                aria-selected="false" tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-address-book font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">Địa chỉ nhận hàng</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab"
                                aria-selected="false" tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-lock font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">Đổi mật khẩu</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content py-3">
                        <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img src="https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/avatar-cute-dong-vat-1725201830.jpg"
                                                    style="width: 140px; height: 140px;" alt=""
                                                    class="rounded-circle p-1 bg-primary">
                                                <div class="mt-3">
                                                    <h4>{{ thong_tin.ho_va_ten }}</h4>
                                                    <p class="text-secondary mb-1">{{ thong_tin.email }}</p>
                                                    <p class="text-muted font-size-sm">Đà Nẵng</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Họ và Tên</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.ho_va_ten" type="text"
                                                        class="form-control" placeholder="Nhập họ và tên">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.email" type="text" class="form-control"
                                                        placeholder="Nhập email">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Số Điện Thoại</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.so_dien_thoai" type="text"
                                                        class="form-control" placeholder="Nhập số điện thoại">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3"></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <button v-on:click="capNhatProfile()" type="button"
                                                        class="btn btn-primary px-4">Lưu</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="primaryprofile" role="tabpanel">
                            <div class="row">
                                <div class="col-7">
                                    <h2>Địa chỉ nhận hàng</h2>
                                </div>
                                <div class="col-5 text-end">
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#themModal">
                                        <i class="fa-solid fa-plus"></i>Thêm địa chỉ
                                    </button>
                                </div>
                                <hr>
                            </div>
                            <template v-for="(value, index) in list_dia_chi" :key="index">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <h5 class="mb-4">Địa chỉ</h5>
                                            {{ value.ten_nguoi_nhan }} | ({{ value.so_dien_thoai }})
                                            <div class="row">
                                                <div class="col-6">{{ value.dia_chi }}</div>
                                            </div>
                                        </div>
                                        <div class="col-3"></div>
                                        <div class="col-2 text-end">
                                            <div class="row mb-2 mt-3">
                                                <button type="button" class="btn btn-danger px-5 radius-30"
                                                    data-bs-toggle="modal" data-bs-target="#deleteModal" v-on:click="Object.assign(dia_chi_delete, value)">Xoá</button>
                                            </div>
                                            <div class="row">
                                                <button type="button" class="btn btn-primary px-5 radius-30"
                                                    data-bs-toggle="modal" data-bs-target="#capnhatModal" v-on:click="Object.assign(dia_chi_update, value)">Cập Nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                style="display: none;" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Xoá</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div
                                                class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                                    </div>
                                                    <div class="ms-3">
                                                        <div class="text-dark">
                                                            Bạn muốn xóa địa chỉ <b>{{ dia_chi_delete.dia_chi }}</b> vĩnh viễn?
                                                            <br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Đóng</button>
                                            <button v-on:click="xoaDiaChi()" type="button" class="btn btn-danger"
                                                data-bs-dismiss="modal">Xoá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="capnhatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true" style="display: none;">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Cập nhật địa chỉ</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <label class="mb-2">Tên Người Nhận:</label>
                                                    <input v-model="dia_chi_update.ten_nguoi_nhan" type="text" class="form-control" placeholder="Họ và tên">
                                                </div>
                                                <div class="col-lg-6">
                                                    <label class="mb-2">Số điện thoại:</label>
                                                    <input v-model="dia_chi_update.so_dien_thoai" type="text" class="form-control" placeholder="Số điện thoại">
                                                </div>
                                            </div>
                                            <label class="mt-2 mb-2">Địa chỉ:</label>
                                            <input v-model="dia_chi_update.dia_chi" type="text" class="form-control"
                                                placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Đóng</button>
                                            <button v-on:click="capNhatDiaChi()" type="button" class="btn btn-primary"
                                                data-bs-dismiss="modal">Lưu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="themModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm địa chỉ
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <label class="mb-2">Tên Người Nhận:</label>
                                                    <input v-model="dia_chi_create.ten_nguoi_nhan" type="text"
                                                        class="form-control" placeholder="Họ và tên">
                                                </div>
                                                <div class="col-lg-6">
                                                    <label class="mb-2">Số điện thoại:</label>
                                                    <input v-model="dia_chi_create.so_dien_thoai" type="text"
                                                        class="form-control" placeholder="Số điện thoại">
                                                </div>
                                            </div>
                                            <label class="mt-2 mb-2">Địa chỉ:</label>
                                            <input v-on:keyup.enter="themMoiDiaChi()" type="text" v-model="dia_chi_create.dia_chi" class="form-control"
                                                placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã">

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Trở
                                                lại</button>
                                            <button type="button" v-on:click="themMoiDiaChi()" class="btn btn-danger"
                                                data-bs-dismiss="modal">Hoàn
                                                Thành</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="primarycontact" role="tabpanel">
                            <div class="col">
                                <h4>Thay đổi mật khẩu</h4>
                            </div>
                            <div class="col">Quản lý mật khẩu để bảo mật tài khoản</div>
                            <div class="col"><b>Lưu ý:</b> Khi đăng nhập bằng google mật khẩu mặc định là <b class="text-danger">123456</b>, vui lòng đổi trước khi thực hiện mua hàng nhé!</div>
                            <hr>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label for="">Mật khẩu cũ</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="update_password.old_password" type="text" placeholder="Nhập mật khẩu cũ" class="form-control">
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label for="">Mật khẩu mới</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="update_password.new_password" type="password" placeholder="Nhập mật khẩu mới" class="form-control">
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label for="">Nhập lại Mật khẩu mới </label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="update_password.re_password" type="password" placeholder="Nhập lại mật khẩu mới" class="form-control">
                                </div>
                            </div>
                            <button class="btn btn-primary" v-on:click="doiMatKhau()">Lưu</button>
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
            thong_tin: {},
            dia_chi_create: {},
            dia_chi_update: {},
            dia_chi_delete: {},
            update_password : {},
            list_dia_chi: [],
        }
    },

    mounted() {
        this.layThongTinKhachHang();
        this.loadDataDiaChi()
    },

    methods: {
        layThongTinKhachHang() {
            axios
                .get("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/profile/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
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
        capNhatProfile() {
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/profile/edit", this.thong_tin, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layThongTinKhachHang();

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

        loadDataDiaChi() {
            axios
                .get("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/dia-chi/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                        this.list_dia_chi = res.data.data;
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        themMoiDiaChi() {
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/dia-chi/create", this.dia_chi_create, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDiaChi();

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
        capNhatDiaChi() {
             axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/dia-chi/update", this.dia_chi_update, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDiaChi();
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
         xoaDiaChi() {
             axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/dia-chi/delete", this.dia_chi_delete, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDiaChi();
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
        doiMatKhau() {
             axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/password/change", this.update_password, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layThongTinKhachHang();
                        this.update_password = {};
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