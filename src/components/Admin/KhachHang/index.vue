<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mt-2"><b>DANH SÁCH KHÁCH HÀNG</b></h6>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themMoiModal">
                        <i class="fa-solid fa-user-plus"></i> Thêm Mới
                    </button>
                </div>
                <div class="card-body table-responsive">
                    <div class="input-group mt-3 mb-2 w-100">
                        <input v-on:keyup="timKiem()" v-model="search.noi_dung" type="text"
                            class="form-control search-control border border-1 border-secondary"
                            placeholder="Search...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                class="bx bx-search"></i></span>
                        <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">Tìm
                            Kiếm</button>
                    </div>
                    <table class="table table-bordered table-hover ">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Họ Và Tên</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Số Điện Thoại</th>
                                <th class="text-center" style="width: 180px;">Kích Hoạt</th>
                                <th class="text-center" style="width: 180px;">Tình Trạng</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_khach_hang" :key="k">
                                <tr>
                                    <th class="align-middle text-center">{{ k + 1 }}</th>
                                    <td class="align-middle">{{ v.ho_va_ten }}</td>
                                    <td class="align-middle">{{ v.email }}</td>
                                    <td class="align-middle text-center">{{ v.so_dien_thoai }}</td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="doiTrangThaiActive(v)" v-if="v.is_active == 1" class="btn btn-success w-100">Đã Kích Hoạt</button>
                                        <button v-on:click="doiTrangThaiActive(v)" v-else class="btn btn-warning w-100 text-white">Chưa Kích Hoạt</button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <template v-if="v.is_block == 0">
                                            <button v-on:click="doiTrangThaiBlock(v)" class="btn btn-success w-100">Hoạt
                                                Động</button>
                                        </template>
                                        <template v-else>
                                            <button v-on:click="doiTrangThaiBlock(v)"
                                                class="btn btn-warning w-100 text-white">Đã Chặn</button>
                                        </template>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#capnhatModal" v-on:click="Object.assign(edit_kh, v)"><i
                                                class="fas fa-edit"></i> Sửa</button>
                                        <button class="btn btn-danger" data-bs-toggle="modal"
                                            v-on:click="Object.assign(del_kh, v)" data-bs-target="#delModal"><i
                                                class="fas fa-trash"></i> Xóa</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Thêm Mới Khách Hàng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label class="form-lable">Họ Và Tên</label>
                            <input v-model="create_kh.ho_va_ten" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Email</label>
                            <input v-model="create_kh.email" type="email" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Số Điện Thoại</label>
                            <input v-model="create_kh.so_dien_thoai" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Password</label>
                            <input v-model="create_kh.password" type="password" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Nhập Lại Password</label>
                            <input v-model="create_kh.re_password" type="password" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Kích Hoạt</label>
                            <select v-model="create_kh.is_active" class="form-control">
                                <option value="1">Đã Kích Hoạt</option>
                                <option value="0">Chưa Kích Hoạt</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Tình Trạng</label>
                            <select v-model="create_kh.is_block" class="form-control">
                                <option value="0">Hoạt Động</option>
                                <option value="1">Đã Chặn</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="themMoiKhachHang()" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                            Mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Khách Hàng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc muốn xóa Khách Hàng <b class="text-danger">{{ del_kh.ho_va_ten
                                }}</b>
                            này
                            không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="xoaKhachHang()">Xác
                            nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật Khách Hàng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label class="form-lable">Họ Và Tên</label>
                            <input v-model="edit_kh.ho_va_ten" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Email</label>
                            <input v-model="edit_kh.email" type="email" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Số Điện Thoại</label>
                            <input v-model="edit_kh.so_dien_thoai" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Kích Hoạt</label>
                            <select v-model="edit_kh.is_active" class="form-control">
                                <template v-if="edit_kh.is_active == 1">
                                    <option value="" disabled>Đã Kích Hoạt</option>
                                </template>
                                <template v-else>
                                    <option value="1">Đã Kích Hoạt</option>
                                    <option value="0">Chưa Kích Hoạt</option>
                                </template>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Tình Trạng</label>
                            <select v-model="edit_kh.is_block" class="form-control">
                                <option value="0">Hoạt Động</option>
                                <option value="1">Đã Chặn</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            v-on:click="capNhatKhachHang()">Cập
                            nhật</button>
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
            create_kh: {
                
            },
            edit_kh: {},
            del_kh: {},
            list_khach_hang: [],
            search: {},
        }

    },
    mounted() {
        this.loadDataKhachHang();
    },
    methods: {
        loadDataKhachHang() {
            axios
                .get('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/data', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_khach_hang = res.data.data
                    if(res.data.status == false) {
                        this.$toast.error(res.data.message)
                    }
                });
        },
        themMoiKhachHang() {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/create', this.create_kh, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhachHang();
                        this.$toast.success(res.data.message);
                        this.create_kh = {}
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
        capNhatKhachHang() {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/update', this.edit_kh, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhachHang();
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
        xoaKhachHang() {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/delete', this.del_kh, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhachHang();
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
        doiTrangThaiBlock(value) {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/change-block', value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhachHang();
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
        doiTrangThaiActive(value) {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/change', value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataKhachHang();
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
        timKiem() {
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/admin/khach-hang/search', this.search, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_khach_hang = res.data.data;
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        toastr.error(v[0]);
                    });
                });
        }
    }
}
</script>
<style></style>
