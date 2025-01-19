<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card border-primary border-top border-3 border-0">
                <div class="card-header">
                    <h6 class="mt-2"><b>THÊM MỚI DANH MỤC</b></h6>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>Tên Danh Mục</label>
                        <input v-model="create_danh_muc.ten_danh_muc" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Slug Danh Mục</label>
                        <input v-model="create_danh_muc.slug_danh_muc" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Icon Danh Mục</label>
                        <input v-model="create_danh_muc.icon" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Danh Mục Cha</label>
                        <select v-model="create_danh_muc.id_danh_muc_cha" class="form-control mt-2">
                            <option value="0">Không Có</option>
                            <template v-for="(value, index) in list_danh_muc" :key="index">
                                <option v-if="value.id_danh_muc_cha == 0" :value="value.id">
                                    {{ value.ten_danh_muc }}
                                </option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Tình Trạng</label>
                        <select v-model="create_danh_muc.tinh_trang" class="form-select mt-2">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Tắt</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-primary" v-on:click="themMoiDanhMuc()">
                        Thêm Mới
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card border-primary border-top border-3 border-0">
                <div class="card-header">
                    <h6 class="mt-2"><b>DANH SÁCH DANH MỤC</b></h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th class="align-middle text-nowrap text-center">#</th>
                                    <th class="align-middle text-nowrap text-center">
                                        Tên Danh Mục
                                    </th>
                                    <th class="align-middle text-nowrap text-center">
                                        Slug Danh Mục
                                    </th>
                                    <th class="align-middle text-nowrap text-center">
                                        Icon </th>
                                    <th class="align-middle text-nowrap text-center">
                                        Tình Trạng
                                    </th>
                                    <th class="align-middle text-nowrap text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_danh_muc" :key="index">
                                    <tr>
                                        <th class="align-middle text-nowrap text-center">{{ index + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ value.ten_danh_muc }}</td>
                                        <td class="align-middle text-nowrap">{{ value.slug_danh_muc }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <span v-html="value.icon" class=""></span>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1"
                                                class="btn btn-success w-100">Hoạt
                                                Động</button>
                                            <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 0"
                                                class="btn btn-warning w-100 text-white">Tạm
                                                Tắt</button>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="Object.assign(cap_nhat_danh_muc, value)"
                                                data-bs-toggle='modal' data-bs-target='#capNhatModal'
                                                class="btn btn-primary me-2"><i class="fas fa-edit"></i> Sửa
                                            </button>
                                            <button v-on:click="Object.assign(del_danh_muc, value)"
                                                data-bs-toggle='modal' data-bs-target='#xoaModal'
                                                class="btn btn-danger"><i class="fas fa-trash"></i> Xóa </button>
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
    <!-- Cập Nhật Modal -->
    <div class='modal fade' id='capNhatModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Danh Mục</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="mb-2">
                        <label>Tên Danh Mục</label>
                        <input v-model="cap_nhat_danh_muc.ten_danh_muc" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Slug Danh Mục</label>
                        <input v-model="cap_nhat_danh_muc.slug_danh_muc" type="text" class="form-control mt-2" />
                    </div>
                     <div class="mb-2">
                        <label>Icon Danh Mục</label>
                        <input v-model="cap_nhat_danh_muc.icon" type="text" class="form-control mt-2" />
                    </div>
                    <div class="mb-2">
                        <label>Danh Mục Cha</label>
                        <select v-model="cap_nhat_danh_muc.id_danh_muc_cha" class="form-control mt-2">
                            <option value="0">Không Có</option>
                            <template v-for="(value, index) in list_danh_muc" :key="index">
                                <option v-if="value.id_danh_muc_cha == 0" :value="value.id">
                                    {{ value.ten_danh_muc }}
                                </option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Tình Trạng</label>
                        <select v-model="cap_nhat_danh_muc.tinh_trang" class="form-select mt-2">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Tắt</option>
                        </select>
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button v-on:click="capNhatDanhMuc()" type='button' class='btn btn-primary'
                        data-bs-dismiss='modal'>Xác
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
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xóa Danh Mục</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <span>Bạn có chắc chắn muốn xóa danh mục <b class="text-danger">{{ del_danh_muc.ten_danh_muc }}</b>
                        không!</span>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button v-on:click="xoaDanhMuc()" type='button' class='btn btn-primary' data-bs-dismiss='modal'>Xác
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
            create_danh_muc: {
                ten_danh_muc: '',
                slug_danh_muc: '',
                icon: '',
                id_danh_muc_cha: 0,
                tinh_trang: 1,
            },
            del_danh_muc: {},
            cap_nhat_danh_muc: {},
            list_danh_muc: [],
        };
    },
    mounted() {
        this.loadDataDanhMuc();
    },
    watch: {
        // Watcher cho `ten_danh_muc` để tự động tạo `slug_danh_muc`
        'create_danh_muc.ten_danh_muc'(newVal) {
            this.create_danh_muc.slug_danh_muc = this.toSluggg(newVal);
        },
    },
    methods: {
        loadDataDanhMuc() {
            axios
                .get('http://127.0.0.1:8000/api/admin/danh-muc/data')
                .then((res) => {
                    this.list_danh_muc = res.data.data
                });
        },
        themMoiDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/create", this.create_danh_muc)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDanhMuc();
                        this.create_danh_muc = {
                            ten_danh_muc: '',
                            slug_danh_muc: '',
                            id_danh_muc_cha: 0,
                            tinh_trang: 1,
                        }
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
        capNhatDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/update", this.cap_nhat_danh_muc)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDanhMuc();
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
        xoaDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/delete", this.del_danh_muc)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDanhMuc();
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
        doiTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/change", value)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataDanhMuc();
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
        toSluggg(title) {
            if (!title) return '';
            var slug = title.toLowerCase();
            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            //Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
        },
    },
};
</script>
