<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mt-2"><b>Danh Sách Quyền</b></h6>
                    <button class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#taoQuyenModal'>Thêm
                        Mới</button>
                </div>
                <div class="card-body">
                    <div class="input-group mb-1">
                        <input v-model="search.noi_dung" type="text" v-on:keyup.enter="timKiem()" class="form-control"
                            placeholder="Nhập tên cần tìm kiếm..">
                        <button class="input-group-text bg-success text-white" v-on:click="timKiem()">Tìm Kiếm</button>
                    </div>
                    <div class='table-responsive'>
                        <table class='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>#</th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Tên Quyền
                                    </th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_quyen" :key="index">
                                    <tr>
                                        <th class='align-middle text-nowrap text-center'>{{ index + 1 }}</th>
                                        <td class='align-middle text-nowrap'>{{ value.ten_quyen }}</td>
                                        <td class='align-middle text-nowrap text-center'>
                                            <button class="btn btn-info btn-sm me-2 text-white"
                                                v-on:click="chonQuyen(value)">Chọn Quyền</button>
                                            <button class="btn btn-primary btn-sm me-2" data-bs-toggle='modal'
                                                data-bs-target='#capNhatQuyenModal'
                                                v-on:click="Object.assign(update_quyen, value)">Sửa </button>
                                            <button class="btn btn-danger btn-sm" data-bs-toggle='modal'
                                                data-bs-target='#xoaQuyenModal'
                                                v-on:click="Object.assign(delete_quyen, value)">Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h6 class="mt-2"><b> Danh Sách Chức Năng</b></h6>
                </div>
                <div class="card-body">
                    <div class='table-responsive'>
                        <table class='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>#</th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Tên Chức Năng
                                    </th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_chuc_nang" :key="index">
                                    <tr>
                                        <th class='align-middle text-nowrap text-center'>{{ index + 1 }}</th>
                                        <td class='align-middle text-nowrap'>{{ value.ten_chuc_nang }}</td>
                                        <td class='align-middle text-nowrap text-center'>
                                            <button class="btn btn-info btn-sm text-white"
                                                v-on:click="capQuyen(value.id)">Cấp Quyền</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h6 class="mt-2"><b> Bạn Đang Cấp Quyền Cho <b class="text-danger">{{ chon_quyen.ten_quyen
                                }}</b></b></h6>
                </div>
                <div class="card-body">
                    <div class='table-responsive'>
                        <table class='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>#
                                    </th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Tên Quyền
                                    </th>
                                    <th class='align-middle text-nowrap text-center bg-primary text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_chi_tiet_quyen" :key="index">
                                    <tr class="align-middle">
                                        <td class="text-wrap text-center">{{ index + 1 }}</td>
                                        <td class="text-wrap">{{ value.ten_chuc_nang }}</td>
                                        <td class="text-center">
                                            <button class="btn btn-danger btn-sm" v-on:click="huyQuyen(value)">Hủy
                                                Quyền</button>
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

    <!-- Modal tạo quyền -->
    <div class='modal fade' id='taoQuyenModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header bg-primary'>
                    <h1 class='modal-title fs-5 text-white' id='exampleModalLabel'>Thêm Mới Quyền</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <label class="mb-1">Tên Quyền</label>
                    <input type="text" class="form-control" v-model="create_quyen.ten_quyen">
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' v-on:click="taoQuyen()" class='btn btn-primary' data-bs-dismiss='modal'>Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal sửa quyền -->
    <div class='modal fade' id='capNhatQuyenModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header bg-primary'>
                    <h1 class='modal-title fs-5 text-white' id='exampleModalLabel'>Cập Nhật Quyền</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <label class="mb-1">Tên Quyền</label>
                    <input type="text" class="form-control" v-model="update_quyen.ten_quyen">
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' v-on:click="capNhatQuyen()" class='btn btn-primary'
                        data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal xóa quyền -->
    <div class='modal fade' id='xoaQuyenModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header bg-primary'>
                    <h1 class='modal-title fs-5 text-white' id='exampleModalLabel'>Xóa Quyền</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <span>Bạn có chắc chắn muốn xóa quyền <b>{{ delete_quyen.ten_quyen }}</b> này không?</span>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button type='button' v-on:click="xoaQuyen()" class='btn btn-primary' data-bs-dismiss='modal'>Xác
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
            list_quyen: [],
            create_quyen: {
                ten_quyen: '',
            },
            update_quyen: {},
            delete_quyen: {},
            search: {},
            list_chuc_nang: [],
            chon_quyen: {},
            list_chi_tiet_quyen: {}
        }
    },
    mounted() {
        this.loadDataQuyen();
        this.loadDataChucNang();
    },
    methods: {
        loadDataQuyen() {
            axios
                .get('http://127.0.0.1:8000/api/admin/phan-quyen/data')
                .then((res) => {
                    this.list_quyen = res.data.data;
                })
        },
        loadDataChucNang() {
            axios
                .get('http://127.0.0.1:8000/api/admin/chuc-nang/data')
                .then((res) => {
                    this.list_chuc_nang = res.data.data;
                })
        },
        taoQuyen() {
            axios
                .post('http://127.0.0.1:8000/api/admin/phan-quyen/create', this.create_quyen)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataQuyen();
                        this.create_quyen.ten_quyen = '';
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        capNhatQuyen() {
            axios
                .post('http://127.0.0.1:8000/api/admin/phan-quyen/update', this.update_quyen)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataQuyen();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        xoaQuyen() {
            axios
                .post('http://127.0.0.1:8000/api/admin/phan-quyen/delete', this.delete_quyen)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataQuyen();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        timKiem() {
            axios
                .post('http://127.0.0.1:8000/api/admin/phan-quyen/search', this.search)
                .then((res) => {
                    this.list_quyen = res.data.data
                })
        },
        chonQuyen(value) {
            this.chon_quyen = value;
            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/data', this.chon_quyen, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_chi_tiet_quyen = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        capQuyen(id_chuc_nang) {
            if (!this.chon_quyen.id) {
                this.$toast.error('Vui lòng chọn quyền trước khi cấp quyền!');
                return;
            }
            var payload = {
                id_quyen: this.chon_quyen.id,
                id_chuc_nang: id_chuc_nang
            }
            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/create', payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.chonQuyen(this.chon_quyen);
                    } else {
                        this.$toast.error(res.data.message)
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        huyQuyen(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/delete', value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.chonQuyen(this.chon_quyen);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        }
    },
}
</script>
<style></style>