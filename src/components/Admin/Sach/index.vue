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
                                    <th class="align-middle text-nowrap text-center" style="width: 250px;">
                                        Tên Sách
                                    </th>
                                    <th class="align-middle text-nowrap text-center">Hình Ảnh</th>
                                    <th class="align-middle text-nowrap text-center">Mô Tả Sách</th>
                                    <th class="align-middle text-nowrap text-center">Danh Mục</th>
                                    <th class="align-middle text-nowrap text-center" style="width: 100px;">Giá Bán</th>
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
                                        <td class="align-middle text-wrap">{{ value.ten_sach }}</td>
                                        <td class="align-middle text-nowrap">
                                            <img :src="value.hinh_anh" alt="" class="img-fluid"
                                                style="width: 100%; max-height: 120px; object-fit: contain;">
                                        </td>
                                        <td class="align-middle text-nowrap text-center" data-bs-toggle='modal'
                                            data-bs-target='#moTaModal' v-on:click="Object.assign(xem_mo_ta, value)">
                                            <i class="fa-solid fa-circle-info fa-2x text-success"></i>
                                        </td>
                                        <td class="align-middle text-wrap">{{ value.ten_danh_muc }}</td>
                                        <td class="align-middle text-nowrap text-end">{{ formatVND(value.gia_ban) }}
                                        </td>
                                        <td class="align-middle text-nowrap text-end">{{ formatVND(value.gia_km) }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="doiTrangThaiSale(value)" v-if="value.is_sale == 1"
                                                class="btn btn-success w-100">Đang Sale</button>
                                            <button v-on:click="doiTrangThaiSale(value)" v-else
                                                class="btn btn-warning text-white w-100">Không Sale</button>
                                            <br>
                                            <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1"
                                                class="btn btn-success mt-2 w-100">Hoạt
                                                Động</button>
                                            <button v-on:click="doiTrangThai(value)" v-else
                                                class="btn btn-warning text-white mt-2 w-100">Tạm Tắt</button>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="Object.assign(xem_them, value)" data-bs-toggle='modal'
                                                data-bs-target='#xemThemModal' class="btn btn-success btn-sm mb-2"><i
                                                    class="fa-regular fa-eye"></i> Xem thêm
                                            </button>
                                            <br>
                                            <button v-on:click="Object.assign(cap_nhat_sach, value)"
                                                data-bs-toggle='modal' data-bs-target='#capNhatModal'
                                                class="btn btn-primary btn-sm me-2"><i class="fas fa-edit"></i> Sửa
                                            </button>
                                            <button v-on:click="Object.assign(del_sach, value)" data-bs-toggle='modal'
                                                data-bs-target='#xoaModal' class="btn btn-danger btn-sm"><i
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
        <div class='modal-dialog modal-xl'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Thêm Mới Sách</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Tên Sách</label>
                                <input v-model="create_sach.ten_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Slug Sách</label>
                                <input v-model="create_sach.slug_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
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
                         <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Chọn Nhà Xuất Bản</label>
                                <select v-model="create_sach.id_nxb" class="form-select mt-2">
                                    <option value="0">-- Vui lòng chọn danh mục --</option>
                                    <template v-for="(value, index) in list_nxb" :key="index">
                                        <option :value="value.id">{{ value.ten_nxb }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Số Lượng Bán</label>
                                <input v-model="create_sach.so_luong_ban" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Giá Bán</label>
                                <input v-model="create_sach.gia_ban" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Giá Khuyến Mãi</label>
                                <input v-model="create_sach.gia_km" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Sale?</label>
                                <select v-model="create_sach.is_sale" class="form-select mt-2">
                                    <option value="0">Không Sale</option>
                                    <option value="1">Đang Sale</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Số Trang</label>
                                <input v-model="create_sach.so_trang" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                         <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Năm Xuất Bản</label>
                                <input v-model="create_sach.nam_xb" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Tình Trạng</label>
                                <select v-model="create_sach.tinh_trang" class="form-select mt-2">
                                    <option value="0">Hoạt Động</option>
                                    <option value="1">Tạm Tắt</option>
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
                                <ckeditor v-model="create_sach.mo_ta" :editor="editor" :config="editorConfig" />
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
        <div class='modal-dialog modal-xl'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Cập Nhật Sách {{ cap_nhat_sach.ten_sach }}</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                   <div class="row">
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Tên Sách</label>
                                <input v-model="cap_nhat_sach.ten_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Slug Sách</label>
                                <input v-model="cap_nhat_sach.slug_sach" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Chọn Danh Mục</label>
                                <select v-model="cap_nhat_sach.id_danh_muc" class="form-select mt-2">
                                    <option value="0">-- Vui lòng chọn danh mục --</option>
                                    <template v-for="(value, index) in list_danh_muc" :key="index">
                                        <option :value="value.id">{{ value.ten_danh_muc }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                         <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Chọn Nhà Xuất Bản</label>
                                <select v-model="cap_nhat_sach.id_nxb" class="form-select mt-2">
                                    <option value="0">-- Vui lòng chọn danh mục --</option>
                                    <template v-for="(value, index) in list_nxb" :key="index">
                                        <option :value="value.id">{{ value.ten_nxb }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Số Lượng Bán</label>
                                <input v-model="cap_nhat_sach.so_luong_ban" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Giá Bán</label>
                                <input v-model="cap_nhat_sach.gia_ban" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Giá Khuyến Mãi</label>
                                <input v-model="cap_nhat_sach.gia_km" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Sale?</label>
                                <select v-model="cap_nhat_sach.is_sale" class="form-select mt-2">
                                    <option value="0">Không Sale</option>
                                    <option value="1">Đang Sale</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Số Trang</label>
                                <input v-model="cap_nhat_sach.so_trang" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                         <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Năm Xuất Bản</label>
                                <input v-model="cap_nhat_sach.nam_xb" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-2">
                                <label>Tình Trạng</label>
                                <select v-model="cap_nhat_sach.tinh_trang" class="form-select mt-2">
                                    <option value="0">Hoạt Động</option>
                                    <option value="1">Tạm Tắt</option>
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
                                <img v-if="xem_truoc_cap_nhat" style="width: 150px; height: 150px" v-bind:src="xem_truoc_cap_nhat" alt=""
                                    class="img-fluid">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2">
                                <label>Mô Tả</label>
                                <ckeditor v-model="cap_nhat_sach.mo_ta" :editor="editor" :config="editorConfig" />
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

    <!-- Xem Thêm Modal -->
    <div class='modal fade' id='xemThemModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h6 class='modal-title fs-5' id='exampleModalLabel'>Bạn Đang Xem Mô Tả Của Sách <b
                            class="text-danger">{{ xem_them.ten_sach }}</b></h6>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body' style="max-height: 500px; overflow-y: auto;">
                    <div class='table-responsive'>
                        <table class='table table-bordered table-hover'>

                            <tbody>
                                <tr class="text-white">
                                    <th class='align-middle text-nowrap text-center bg-primary'>#</th>
                                    <th class='align-middle text-nowrap text-center bg-primary'>Số Lượng Bán</th>
                                    <td class='align-middle text-nowrap text-center bg-primary'>Sô Trang</td>
                                    <td class='align-middle text-nowrap text-center bg-primary'>Nhà Xuất Bản</td>
                                    <td class='align-middle text-nowrap text-center bg-primary'>Tác Giả</td>
                                    <td class='align-middle text-nowrap text-center bg-primary'>Năm Xuất Bản</td>
                                </tr>
                                <tr>
                                    <th class='align-middle text-nowrap text-center'>1</th>
                                    <td class='align-middle text-nowrap text-center'>{{ xem_them.so_luong_ban }}</td>
                                    <td class='align-middle text-nowrap text-center'>{{ xem_them.so_trang }} trang</td>
                                    <td class='align-middle text-nowrap'>{{ xem_them.ten_nxb }}</td>
                                    <td class='align-middle text-nowrap'>{{ xem_them.ten_tac_gia }}</td>
                                    <td class='align-middle text-nowrap text-center'>Năm:{{ xem_them.nam_xb }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, BlockQuote, Font, Link, List, Alignment, Image } from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
import sach from '../../../Utils/sach';

export default {
    mixins: [sach],
    components: {
        Ckeditor
    },
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
            list_nxb: [],
            list_sach: [],
            xem_mo_ta: {},
            editor: ClassicEditor,
            editorConfig: {
                plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, BlockQuote, Font, Link, List, Alignment, Image],
                toolbar: ['heading',
                    '|', 'undo', 'redo', '|', 'bold', 'italic',
                    'fontSize',
                    'fontFamily',
                    'fontColor',
                    '|',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                    '|',
                    'Alignment',
                    'image'
                ],
                licenseKey: this.$licenseKey
            },
            xem_them: {}
        };
    },

    mounted() {
        this.loadDataTacGia();
        this.loadDataSach();
        this.loadDataDanhMuc();
        this.loadDataNXB();
    },
    watch: {
        // Watcher cho `ten_danh_muc` để tự động tạo `slug_danh_muc`
        'create_sach.ten_sach'(newVal) {
            this.create_sach.slug_sach = this.toSluggg(newVal);
        },
    },
}
</script>
