<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card border-primary border-top border-3 border-0">
                <div class="card-header">
                    <h6 class="mt-2"><b>THÊM MỚI TÁC GIẢ</b></h6>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>Tên Tác Giả</label>
                        <input v-model="create_nxb.ten_nxb" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Tình trạng</label>
                        <select v-model="create_nxb.tinh_trang" class="form-select mt-2">
                            <option value="">-- Vui lòng chọn -- </option>
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Tắt</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="themMoiNXB()" class="btn btn-primary">
                        Thêm Mới
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card border-primary border-top border-3 border-0">
                <div class="card-header">
                    <h6 class="mt-2"><b>DANH SÁCH NHÀ XUẤT BẢN</b></h6>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th class="text-center text-nowrap">#</th>
                                <th class="text-center text-nowrap">Tên Nhà Xuát Bản</th>
                                <th class="text-center text-nowrap">Tình Trạng</th>
                                <th class="text-center text-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_nha_xuat_ban" :key="index">
                                <tr>
                                    <th class="align-middle text-center">{{ index + 1 }}</th>
                                    <td class="align-middle">{{ value.ten_nxb }}</td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                            class="btn btn-success w-100">
                                            Hoạt Động
                                        </button>
                                        <button v-on:click="changeTrangThai(value)" v-else
                                            class="btn btn-warning text-white w-100">
                                            Tạm tắt
                                        </button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="Object.assign(edit_nxb, value)" data-bs-toggle='modal'
                                            data-bs-target='#capNhatModal' class="btn btn-primary me-2"><i
                                                class="fas fa-edit"></i> Sửa
                                        </button>
                                        <button v-on:click="Object.assign(del_nxb, value)" data-bs-toggle='modal'
                                            data-bs-target='#xoaModal' class="btn btn-danger"><i
                                                class="fas fa-trash"></i> Xóa </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Cập Nhật Modal -->
    <div class='modal fade' id='capNhatModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Tác Giả</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="mb-2">
                        <label>Tên Tác Giả</label>
                        <input v-model="edit_nxb.ten_nxb" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Tình trạng</label>
                        <select v-model="edit_nxb.tinh_trang" class="form-select mt-2">
                            <option value="0">Tạm Tắt</option>
                            <option value="1">Hoạt Động</option>
                        </select>
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' v-on:click="capNhatNXB()" class='btn btn-primary' data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Xóa Modal -->
    <div class='modal fade' id='xoaModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Tác Giả</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <span>Bạn có chắc chắn muốn xóa tác giả <b class="text-danger">{{ del_nxb.ten_nxb }}</b>
                        không!</span>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' v-on:click="xoaNXB()" class='btn btn-primary' data-bs-dismiss='modal'>Xác
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
            list_nha_xuat_ban: [],
            edit_nxb: {},
            del_nxb: {},
            create_nxb: {
                ten_nxb: '',
                tinh_trang: '',
            }
        }
    },
    mounted() {
        this.loadDataNXB()
    },
    methods: {
        loadDataNXB() {
            axios
                .get('http://127.0.0.1:8000/api/admin/nha-xuat-ban/data')
                .then((res) => {
                    this.list_nha_xuat_ban = res.data.data
                });
        },
        themMoiNXB() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nha-xuat-ban/create', this.create_nxb)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNXB();
                        this.$toast.success(res.data.message);
                        this.create_nxb = {
                            ten_nxb: '',
                            tinh_trang: '',
                        }
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
        capNhatNXB() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nha-xuat-ban/update', this.edit_nxb)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNXB();
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
        xoaNXB() {
            axios
                .post('http://127.0.0.1:8000/api/admin/nha-xuat-ban/delete', this.del_nxb)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNXB();
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
        changeTrangThai(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/nha-xuat-ban/change', value)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNXB();
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
        }
    },
};
</script>
<style></style>
