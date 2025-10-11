<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Danh Sách Đơn Đặt Hàng</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="bg-primary text-white text-center aligin-middle">
                                    <th>STT</th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Người Đặt</th>
                                    <th>Ngày Đặt</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_don_hang" :key="index">
                                    <tr class="align-middle">
                                        <th class="text-center">{{ index + 1 }}</th>
                                        <td class="text-center">{{ value.ma_don_hang }}</td>
                                        <td>{{ value.ten_nguoi_nhan }}</td>
                                        <td class="text-center">{{ formatDateTime(value.created_at) }}</td>
                                        <td class="text-center">
                                            <!-- nhóm nút đổi trạng thái (THÊM MỚI) -->
                                            <div class="mb-2">
                                                <select
                                                    :class="['form-select form-select-sm w-auto d-inline-block', getStatusSelectClass(value.tinh_trang_don_hang)]"
                                                    :value="value.tinh_trang_don_hang"
                                                    @change="updateTrangThai(value.id, Number($event.target.value))">
                                                    <option :value="0">Chờ Xử Lý</option>
                                                    <option :value="1">Đã Xử Lý</option>
                                                    <option :value="2">Đã Giao Vận Chuyển</option>
                                                    <option :value="3">Đã Giao Thành Công</option>
                                                    <option :value="4">Đã Hủy</option>
                                                </select>

                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="xem_don_hang = value" class="btn btn-primary me-2"
                                                data-bs-toggle='modal' data-bs-target='#xemDonHangModal'>
                                                Xem Đơn Hàng
                                            </button>
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
    <!-- Xem Đơn Hàng -->
    <div class='modal fade' id='xemDonHangModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Xem Thông Tin Đơn Hàng {{
                        xem_don_hang.ma_don_hang
                        }}</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="bg-primary text-white text-center aligin-middle">
                                <th>Hình Ảnh</th>
                                <th>Tên Sách</th>
                                <th>Số Lượng</th>
                                <th>Tổng Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <td class="text-center">
                                    <img :src="xem_don_hang.hinh_anh" class="img-fluid"
                                        style="width: 100%; height: 100px; object-fit: contain;" alt="">
                                </td>
                                <td>{{ xem_don_hang.ten_sach }}</td>
                                <td class="text-center">{{ xem_don_hang.so_luong }}</td>
                                <td class="text-end">{{ formatVND(xem_don_hang.tong_tien_thanh_toan) }}</td>
                            </tr>
                        </tbody>
                    </table>
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
            list_don_hang: [],
            xem_don_hang: {}
        }
    },
    mounted() {
        this.getDataDonHang();
    },
    methods: {
        getStatusSelectClass(s) {
            switch (Number(s)) {
                case 0: return 'bg-warning text-dark border-warning';    // Chờ xử lý
                case 1: return 'bg-success text-white border-success';   // Đã xử lý
                case 2: return 'bg-primary text-white border-primary';   // Đang vận chuyển
                case 3: return 'bg-success text-white border-success';   // Giao thành công
                case 4: return 'bg-danger text-white border-danger';     // Đã hủy
                default: return 'bg-secondary text-white border-secondary';
            }
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
        getDataDonHang() {
            axios
                .get('http://127.0.0.1:8000/api/admin/don-hang/data', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_don_hang = res.data.data;
                    if (res.data.status == false) {
                        this.$toast.error(res.data.message)
                    }
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        toastr.error(v[0]);
                    });
                });
        },
        formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                day: '2-digit', // Nghĩa là hiển thị 2 số
                month: '2-digit', // Nghĩa là hiển thị 2 số
                year: 'numeric', // Nghĩa là hiển thị 4 số
                hour: '2-digit', // Nghĩa là hiển thị 2 số
                minute: '2-digit', // Nghĩa là hiển thị 2 số
                second: '2-digit' // Nghĩa là hiển thị 2 số
            });
        },
        updateTrangThai(id, status) {
            axios.post('http://127.0.0.1:8000/api/admin/don-hang/cap-nhat-trang-thai',
                { id: id, tinh_trang_don_hang: status },
                { headers: { Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien") } }
            )
                .then((res) => {
                    if (res.data.status) {
                        this.$toast?.success(res.data.message || 'Đã cập nhật');
                        // cập nhật tại chỗ
                        const row = this.list_don_hang.find(x => x.id === id);
                        if (row) row.tinh_trang_don_hang = status;
                    } else {
                        this.$toast?.error(res.data.message || 'Cập nhật thất bại');
                    }
                })
                .catch((err) => {
                    this.$toast?.error('Lỗi cập nhật trạng thái');
                    console.error(err);
                });
        },
    },
}
</script>
<style></style>