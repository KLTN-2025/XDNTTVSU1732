<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card border-primary border-top border-3 border-0">
                <div class="card-header d-flex justify-content-between">
                    <h6 class="mt-2"><b>DANH SÁCH SÁCH ĐANG BÁN</b></h6>
                    <button data-bs-toggle='modal' data-bs-target='#themMoiModal' class="btn btn-primary"><i
                            class="fa-solid fa-plus"></i> Thêm Mới</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th class="align-middle text-nowrap text-center">#</th>
                                    <th class="align-middle text-nowrap text-center">
                                        Tên Sách
                                    </th>
                                    <th class="align-middle text-nowrap text-center">Hình Ảnh</th>
                                    <th class="align-middle text-nowrap text-center">Mô Tả Sách</th>
                                    <th class="align-middle text-nowrap text-center">Tác Giả</th>
                                    <th class="align-middle text-nowrap text-center">Danh Mục</th>
                                    <th class="align-middle text-nowrap text-center">Số Lượng Bán</th>
                                    <th class="align-middle text-nowrap text-center">Giá Bán</th>
                                    <th class="align-middle text-nowrap text-center">Giá Khuyến Mãi</th>
                                    <th class="align-middle text-nowrap text-center">
                                        Tình Trạng
                                    </th>
                                    <th class="align-middle text-nowrap text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_sach" :key="index">
                                    <tr>
                                        <th class="align-middle text-nowrap text-center">{{ index + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ value.ten_sach }}</td>
                                        <td class="align-middle text-nowrap">
                                            <img :src="value.hinh_anh" alt="" class="img-fluid"
                                                style="width: 100%; max-height: 120px; object-fit: contain;">
                                        </td>
                                        <td class="align-middle text-nowrap text-center" data-bs-toggle='modal'
                                            data-bs-target='#moTaModal' v-on:click="Object.assign(xem_mo_ta, value)">
                                            <i class="fa-solid fa-circle-info fa-2x text-success"></i>
                                        </td>
                                        <td class="align-middle text-nowrap">{{ value.id_tac_gia }}</td>
                                        <td class="align-middle text-nowrap">{{ value.id_danh_muc }}</td>
                                        <td class="align-middle text-nowrap">{{ value.so_luong_ban }}</td>
                                        <td class="align-middle text-nowrap">{{ value.gia_ban }}</td>
                                        <td class="align-middle text-nowrap">{{ value.gia_km }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="doiTrangThaiSale(value)" v-if="value.is_sale == 1" class="btn btn-success">Đang Sale</button>
                                            <button v-on:click="doiTrangThaiSale(value)" v-else class="btn btn-warning text-white">Không Sale</button>
                                            <br>
                                            <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1" class="btn btn-success mt-2">Hoạt
                                                Động</button>
                                            <button v-on:click="doiTrangThai(value)" v-else class="btn btn-warning text-white mt-2">Tạm Tắt</button>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="Object.assign(cap_nhat_sach, value)"
                                                data-bs-toggle='modal' data-bs-target='#capNhatModal'
                                                class="btn btn-primary me-2"><i class="fas fa-edit"></i> Sửa
                                            </button>
                                            <button v-on:click="Object.assign(del_sach, value)" data-bs-toggle='modal'
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
    </div>

    <!-- Thêm Mới Modal -->
    <div class='modal fade' id='themMoiModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Thêm Mới Sách</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Tên Sách</label>
                                <input v-model="create_sach.ten_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Slug Sách</label>
                                <input v-model="create_sach.slug_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Chọn Tác Giả</label>
                                <select v-model="create_sach.id_tac_gia" class="form-select mt-2">
                                    <option value="">-- Vui lòng chọn tác giả --</option>
                                    <template v-for="(value, index) in list_tac_gia" :key="index">
                                        <option :value="value.id">{{ value.ten_tac_gia }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Chọn Danh Mục</label>
                                <select v-model="create_sach.id_danh_muc" class="form-select mt-2">
                                    <option value="0">-- Vui lòng chọn danh mục --</option>
                                    <template v-for="(value, index) in list_danh_muc" :key="index">
                                        <option :value="value.id">{{ value.ten_danh_muc }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Số Lượng Bán</label>
                                <input v-model="create_sach.so_luong_ban" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Giá Bán</label>
                                <input v-model="create_sach.gia_ban" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Giá Khuyến Mãi</label>
                                <input v-model="create_sach.gia_km" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Sale?</label>
                                <select v-model="cap_nhat_sach.is_sale" class="form-select mt-2">
                                    <option value="0">Không Sale</option>
                                    <option value="1">Đang Sale</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2">
                                <label>Hình Ảnh</label>
                                <input type="file" class="form-control" accept="image/*"
                                    v-on:change="loadAnhTuLocal($event)" ref="inputFile">
                            </div>
                            <div class="mb-2 text-center">
                                <img v-if="xem_truoc" style="width: 150px; height: 150px" v-bind:src="xem_truoc" alt=""
                                    class="img-fluid">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2">
                                <label>Mô Tả</label>
                                <textarea v-model="create_sach.mo_ta" class="form-control mt-2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button v-on:click="themMoiSach()" type='button' class='btn btn-primary'
                        data-bs-dismiss='modal'>Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cập Nhật Modal -->
    <div class='modal fade' id='capNhatModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Sách {{ cap_nhat_sach.ten_sach }}</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Tên Sách</label>
                                <input v-model="cap_nhat_sach.ten_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Slug Sách</label>
                                <input v-model="cap_nhat_sach.slug_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Chọn Tác Giả</label>
                                <select v-model="cap_nhat_sach.id_tac_gia" class="form-select mt-2">
                                    <option value="">-- Vui lòng chọn tác giả --</option>
                                    <template v-for="(value, index) in list_tac_gia" :key="index">
                                        <option :value="value.id">{{ value.ten_tac_gia }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Chọn Danh Mục</label>
                                <select v-model="cap_nhat_sach.id_danh_muc" class="form-select mt-2">
                                    <option value="">-- Vui lòng chọn danh mục --</option>
                                    <template v-for="(value, index) in list_danh_muc" :key="index">
                                        <option :value="value.id">{{ value.ten_danh_muc }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Số Lượng Bán</label>
                                <input v-model="cap_nhat_sach.so_luong_ban" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Giá Bán</label>
                                <input v-model="cap_nhat_sach.gia_ban" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Giá Khuyến Mãi</label>
                                <input v-model="cap_nhat_sach.gia_km" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Sale?</label>
                                <select v-model="cap_nhat_sach.is_sale" class="form-select mt-2">
                                    <option value="0">Không Sale</option>
                                    <option value="1">Đang Sale</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2">
                                <label>Hình Ảnh</label>
                                <input type="file" class="form-control" accept="image/*"
                                    v-on:change="loadAnhTuLocalCapNhat($event)" ref="inputFile">
                            </div>
                            <div class="mb-2 text-center">
                                <!-- Hiển thị ảnh xem trước nếu có -->
                                <img v-if="xem_truoc_cap_nhat" style="width: 150px; height: 150px"
                                    v-bind:src="xem_truoc_cap_nhat" alt="" class="img-fluid">
                                <!-- Nếu không có ảnh xem trước, sử dụng ảnh cũ -->
                                <img v-else :src="cap_nhat_sach.hinh_anh" style="width: 150px; height: 150px"
                                    alt="Hình ảnh cũ" class="img-fluid">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2">
                                <label>Mô Tả</label>
                                <textarea v-model="cap_nhat_sach.mo_ta" class="form-control mt-2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button v-on:click="capNhatSach()" type='button' class='btn btn-primary'
                        data-bs-dismiss='modal'>Thêm
                        Mới</button>
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
                    <span>Bạn có chắc chắn muốn xóa sách <b class="text-danger">{{ del_sach.ten_sach }}</b>
                        không!</span>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
                    <button v-on:click="xoaSach()" type='button' class='btn btn-primary' data-bs-dismiss='modal'>Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Mô Tả Modal -->
    <div class='modal fade' id='moTaModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h6 class='modal-title fs-5' id='exampleModalLabel'>Bạn Đang Xem Mô Tả Của Sách <b
                            class="text-danger">{{ xem_mo_ta.ten_sach }}</b></h6>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body' style="max-height: 500px; overflow-y: auto;">
                    <span v-html="xem_mo_ta.mo_ta"></span>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Đóng</button>
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
            create_sach: {},
            del_sach: {},
            cap_nhat_sach: {},
            list_danh_muc: [],
            xem_truoc: "",
            file_anh: "",
            xem_truoc_cap_nhat: "",
            file_anh_cap_nhat: "",
            list_tac_gia: [],
            list_sach: [],
            xem_mo_ta: {}
        };
    },
    mounted() {
        this.loadDataTacGia();
        this.loadDataSach();
        this.loadDataDanhMuc();
    },
    watch: {
        // Watcher cho `ten_danh_muc` để tự động tạo `slug_danh_muc`
        'create_sach.ten_sach'(newVal) {
            this.create_sach.slug_sach = this.toSluggg(newVal);
        },
    },
    methods: {
        loadAnhTuLocal(event) {
            this.file_anh = event.target.files[0];
            this.createImage(this.file_anh);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.xem_truoc = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        loadAnhTuLocalCapNhat(event) {
            this.file_anh_cap_nhat = event.target.files[0];
            this.createImageCapNhat(this.file_anh_cap_nhat);
        },
        createImageCapNhat(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.xem_truoc_cap_nhat = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        loadDataTacGia() {
            axios
                .get('http://127.0.0.1:8000/api/admin/tac-gia/data-open')
                .then((res) => {
                    this.list_tac_gia = res.data.data
                });
        },
        loadDataDanhMuc() {
            axios
                .get('http://127.0.0.1:8000/api/admin/danh-muc/data-open')
                .then((res) => {
                    this.list_danh_muc = res.data.data
                });
        },
        loadDataSach() {
            axios
                .get('http://127.0.0.1:8000/api/admin/sach/data')
                .then((res) => {
                    this.list_sach = res.data.data
                });
        },
        themMoiSach() {
            let formData = new FormData();
            formData.append('ten_sach', this.create_sach.ten_sach);
            formData.append('slug_sach', this.create_sach.slug_sach);
            formData.append('id_danh_muc', this.create_sach.id_danh_muc);
            formData.append('id_tac_gia', this.create_sach.id_tac_gia);
            formData.append('so_luong_ban', this.create_sach.so_luong_ban);
            formData.append('gia_ban', this.create_sach.gia_ban);
            formData.append('gia_km', this.create_sach.gia_km);
            formData.append('mo_ta', this.create_sach.mo_ta);
            formData.append('is_sale', this.create_sach.is_sale);
            formData.append('hinh_anh', this.file_anh); // Thêm ảnh vào FormData
            axios
                .post("http://127.0.0.1:8000/api/admin/sach/create", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đặt header là multipart
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataSach();
                        this.create_sach = {}
                        this.$refs.inputFile.value = null;  // Reset lại input file
                        this.file_anh = null;  // Reset tệp ảnh
                        this.xem_truoc = "";  // Reset hình ảnh xem trước
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

        capNhatSach() {
            let formData = new FormData();
            formData.append('id', this.cap_nhat_sach.id);
            formData.append('ten_sach', this.cap_nhat_sach.ten_sach);
            formData.append('slug_sach', this.cap_nhat_sach.slug_sach);
            formData.append('id_danh_muc', this.cap_nhat_sach.id_danh_muc);
            formData.append('id_tac_gia', this.cap_nhat_sach.id_tac_gia);
            formData.append('so_luong_ban', this.cap_nhat_sach.so_luong_ban);
            formData.append('gia_ban', this.cap_nhat_sach.gia_ban);
            formData.append('gia_km', this.cap_nhat_sach.gia_km);
            formData.append('mo_ta', this.cap_nhat_sach.mo_ta);
            formData.append('is_sale', this.cap_nhat_sach.is_sale);
            // Nếu có ảnh mới thì gửi ảnh mới lên
            if (this.file_anh_cap_nhat) {
                formData.append('hinh_anh', this.file_anh_cap_nhat);
            } else {
                formData.append('hinh_anh', this.cap_nhat_sach.hinh_anh); // Giữ ảnh cũ nếu không có ảnh mới
            }

            axios
                .post("http://127.0.0.1:8000/api/admin/sach/update", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đặt header là multipart
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataSach();
                        this.cap_nhat_sach = {};  // Reset form cập nhật
                        this.file_anh_cap_nhat = null; // Reset ảnh
                        this.xem_truoc_cap_nhat = ""; // Reset ảnh xem trước
                        this.$refs.inputFileCapNhat.value = null;  // Reset lại input file
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
        xoaSach() {
            axios
                .post('http://127.0.0.1:8000/api/admin/sach/delete', this.del_sach)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataSach();
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
                .post('http://127.0.0.1:8000/api/admin/sach/change', value)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataSach();
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

        doiTrangThaiSale(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/sach/change-sale', value)
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataSach();
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
}
</script>
