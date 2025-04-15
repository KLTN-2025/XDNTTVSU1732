<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mt-2"><b>DANH SÁCH NHÂN VIÊN</b></h6>
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
                                <th class="text-center">Quyền</th>
                                <th class="text-center">Tình Trạng</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_nhan_vien" :key="k">
                                <tr>
                                    <th class="align-middle text-center">{{ k + 1 }}</th>
                                    <td class="align-middle">{{ v.ho_va_ten }}</td>
                                    <td class="align-middle">{{ v.email }}</td>
                                    <td class="align-middle text-center">{{ v.so_dien_thoai }}</td>
                                    <td class="align-middle text-center">{{ v.ten_quyen }}</td>
                                    <td class="align-middle text-center">
                                        <template v-if="v.tinh_trang == 1">
                                            <button v-on:click="doiTrangThai(v)" class="btn btn-success w-100">Hoạt
                                                Động</button>
                                        </template>
                                        <template v-else>
                                            <button v-on:click="doiTrangThai(v)"
                                                class="btn btn-warning w-100 text-white">Tạm Tắt</button>
                                        </template>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#capnhatModal" v-on:click="Object.assign(edit_nhan_vien, v)"><i
                                                class="fas fa-edit"></i> Sửa</button>
                                        <button class="btn btn-danger" data-bs-toggle="modal"
                                            v-on:click="Object.assign(del_nhan_vien, v)" data-bs-target="#delModal"><i
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
                        <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Thêm Mới Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label class="form-lable">Họ Và Tên</label>
                            <input v-model="create_nhan_vien.ho_va_ten" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Email</label>
                            <input v-model="create_nhan_vien.email" type="email" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Số Điện Thoại</label>
                            <input v-model="create_nhan_vien.so_dien_thoai" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Password</label>
                            <input v-model="create_nhan_vien.password" type="password" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label>Quyền</label>
                            <select v-model="create_nhan_vien.id_quyen" class="form-select mt-2">
                                <template v-for="(v, k) in list_quyen" :key="k">
                                    <option :value="v.id">
                                        {{ v.ten_quyen }}
                                    </option>
                                </template>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Tình Trạng</label>
                            <select v-model="create_nhan_vien.tinh_trang" class="form-control">
                                <option value="1">Hoạt Động</option>
                                <option value="0">Tạm Dừng</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="themMoiNhanVien()" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                            Mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc muốn xóa Nhân Viên <b class="text-danger">{{ del_nhan_vien.ho_va_ten
                                }}</b>
                            này
                            không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="xoaNhanVien()">Xác
                            nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label class="form-lable">Họ Và Tên</label>
                            <input v-model="edit_nhan_vien.ho_va_ten" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Email</label>
                            <input v-model="edit_nhan_vien.email" type="email" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Số Điện Thoại</label>
                            <input v-model="edit_nhan_vien.so_dien_thoai" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label>Quyền</label>
                            <select v-model="edit_nhan_vien.id_quyen" class="form-control mt-2">
                                <template v-for="(v, k) in list_quyen" :key="k">
                                    <option :value="v.id">
                                        {{ v.ten_quyen }}
                                    </option>
                                </template>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-lable">Tình Trạng</label>
                            <select v-model="edit_nhan_vien.tinh_trang" class="form-control">
                                <option value="0">Tạm Dừng</option>
                                <option value="1">Hoạt Động</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            v-on:click="capNhatNhanVien()">Cập
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
            create_nhan_vien: {},
            edit_nhan_vien: {},
            del_nhan_vien: {},
            list_nhan_vien: [],
            search: {},
            list_quyen: []
        }

    },
    mounted() {
        this.loadDataNhanVien();
        this.loadDataQuyen();
    },
    methods: {
         loadDataQuyen() {
            axios
                .get('http://127.0.0.1:8000/api/admin/phan-quyen/data')
                .then((res) => {
                    this.list_quyen = res.data.data;
                })
        },
        loadDataNhanVien() {
            axios
                .get('http://127.0.0.1:8000/api/admin/nhan-vien/data')
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                });
        },
        themMoiNhanVien() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/create', this.create_nhan_vien)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
                        this.$toast.success(res.data.message);
                        this.create_nhan_vien = { }
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
        capNhatNhanVien() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/update', this.edit_nhan_vien)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
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
        xoaNhanVien() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/delete', this.del_nhan_vien)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
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
        doiTrangThai(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/change', value)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
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
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/search', this.search)
                .then((res) => {
                    this.list_nhan_vien = res.data.data;
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
