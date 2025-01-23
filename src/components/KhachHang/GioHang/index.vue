<template>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="d-lg-flex align-items-center mb-4 gap-3">
                            <div class="position-relative">
                                <input type="text" class="form-control ps-5 radius-30" placeholder="Search Order" />
                                <span class="position-absolute top-50 product-show translate-middle-y"><i
                                        class="bx bx-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <input class="form-check-input me-3" type="checkbox" value="" aria-label="..." /><b>Chọn Tất
                                Cả</b>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th></th>
                                <th class="text-center text-nowrap align-middle">#</th>
                                <th class="text-center text-nowrap align-middle">Hình Ảnh</th>
                                <th class="text-wrap text-center align-middle" style="width: 300px;">Tên Sách</th>
                                <th class="text-center text-nowrap align-middle">Số Lượng</th>
                                <th class="text-center text-nowrap align-middle">Đơn Giá</th>
                                <th class="text-center text-nowrap align-middle">Thành Tiền</th>
                                <th class="text-center text-nowrap align-middle">Ghi Chú</th>
                                <th class="text-center text-nowrap align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_gio_hang" :key="index">
                                <tr>
                                    <td class="align-middle text-center">
                                        <input class="form-check-input" type="checkbox" v-model="value.chon_sp"
                                            @change="tinhTongTien()" aria-label="..." />
                                    </td>
                                    <th class="text-center text-nowrap align-middle">
                                        {{ index + 1 }}
                                    </th>
                                    <td class="text-center text-nowrap align-middle">
                                        <img :src="value.hinh_anh" alt="" class="img-fluid"
                                            style="width: 100%; max-height: 80px; object-fit: contain;" />
                                    </td>
                                    <td class="text-wrap align-middle" style="width: 300px;">{{ value.ten_sach }}</td>
                                    <td style="width: 140px" class="align-middle">
                                        <div class="input-group input-spinner d-flex justify-content-center flex-row"
                                            style="flex-wrap: nowrap">
                                            <button v-on:click="tru(value)" class="btn btn-white" type="button"
                                                id="button-minus">
                                                −
                                            </button>
                                            <input v-on:change="capNhat(value)" type="text"
                                                class="form-control text-center" v-model="value.so_luong" />
                                            <button v-on:click="cong(value)" class="btn btn-white" type="button"
                                                id="button-plus">
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td class="text-end text-nowrap align-middle">
                                        {{ formatVND(value.don_gia) }}
                                    </td>
                                    <td class="text-end text-nowrap align-middle">
                                        <b class="text-danger">{{ formatVND(value.thanh_tien) }}</b>
                                    </td>
                                    <td class="text-center text-nowrap align-middle">
                                        <textarea v-on:change="capNhat(value)" v-model="value.ghi_chu"
                                            class="form-control" cols="30" rows="3"></textarea>
                                    </td>
                                    <td class="text-center text-nowrap align-middle">
                                        <button v-on:click="xoaGioHang(value)" class="btn">
                                            <i class="fa-solid fa-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-end">
                        <button class="btn btn-outline-danger me-3">
                            Tổng tiền: {{ formatVND(tong_tien) }}
                        </button>
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#muaHangModal">Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="muaHangModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Mua Hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table mb-0 table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center text-nowrap">#</th>
                                <th class="text-center text-nowrap">Tên Sách</th>
                                <th class="text-center text-nowrap">Số Lượng</th>
                                <th class="text-center text-nowrap">Đơn Giá</th>
                                <th class="text-center text-nowrap">Thành Tiền</th>
                                <th class="text-center text-nowrap">Ghi Chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_gio_hang" :key="index">
                                <tr v-if="value.chon_sp == true">
                                    <td class="text-center align-middle" style="width: 10px;">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="align-middle" style="width: 400px;">{{ value.ten_sach }}</td>
                                    <td class="text-center align-middle">{{ value.so_luong }}</td>
                                    <td class="text-end align-middle">{{ formatVND(value.don_gia) }}</td>
                                    <td class="text-end align-middle">{{ formatVND(value.thanh_tien) }}
                                    </td>
                                    <td class="text-center align-middle" style="width: 350px;">
                                        {{ value.ghi_chu }}
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <th colspan="3" class="align-middle">
                                    <select v-model="id_dia_chi" class="form-select">
                                        <option value="">-- Vui Lòng Chọn Địa Chỉ Giao Hàng --</option>
                                        <template v-for="(value, index) in list_dia_chi" :key="index">
                                            <option v-bind:value="value.id">
                                                {{ value.ten_nguoi_nhan }} - {{ value.so_dien_thoai }} - {{
                                                value.dia_chi }}
                                            </option>
                                        </template>
                                    </select>
                                </th>
                                 <th colspan="2" class="align-middle">
                                        <select v-model="phuong_thuc" class="form-select">
                                            <option value="">-- Chọn Kiểu Thanh Toán --</option>
                                            <option value="0">Thanh toán khi nhận hàng</option>
                                            <option value="1">Thanh toán qua mã QR</option>
                                        </select>
                                </th>
                                <th colspan="2" class="align-middle text-nowrap text-end text-danger">
                                    Tổng Tiền: {{ formatVND(tong_tien) }}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="muaHang()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận Mua Hàng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            list_gio_hang: [],
            tong_tien: 0,
            list_dia_chi: [],
            id_dia_chi: "",
            phuong_thuc : ""
        };
    },
    mounted() {
        this.layDataGioHang();
        this.loadDataDiaChi()
    },
    methods: {
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
        tinhTongTien() {
            let dang_chon = 0;
            this.list_gio_hang.forEach((value, index) => {
                if (value.chon_sp == true) {
                    dang_chon = dang_chon + value.thanh_tien;
                }
            });
            this.tong_tien = dang_chon;
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
        layDataGioHang() {
            axios
                .get("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/gio-hang/data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
                .then((res) => {
                    this.list_gio_hang = res.data.data;
                    this.list_gio_hang.forEach((value, key) => {
                        if (value.id == this.$route.params.id_chi_tiet) {
                            value.chon_sp = 1;
                        }
                    });
                    this.list_gio_hang = [...this.list_gio_hang];
                    this.tinhTongTien();
                });
        },
        muaHang() {
			var list_chon = [];
			this.list_gio_hang.forEach((value, key) => {
				if (value.chon_sp && value.chon_sp == true) {
					list_chon.push(value);
				}
			});
			var payload = {
				'id_dia_chi': this.id_dia_chi,
				'ds_mua_sp': list_chon,
                'phuong_thuc': this.phuong_thuc
			};
			axios
				.post('https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/mua-hang', payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
				.then((res) => {
					if (res.data.status) {
						this.$toast.success('Thông báo<br>' + res.data.message);
						this.tong_tien = 0,
						this.layDataGioHang();
					} else {
						this.$toast.error('Thông báo<br>' + res.data.message);
					}
				});
		},
        xoaGioHang(payload) {
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/gio-hang/delete", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDataGioHang();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        capNhat(payload) {
            axios
                .post("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/gio-hang/update", payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao =
                            '<b>Thông báo</b><span style="margin-top: 5px">' +
                            res.data.message +
                            "<span>";
                        this.$toast.success(thong_bao);
                        this.layDataGioHang();
                    } else {
                        var thong_bao =
                            '<b>Thông báo</b><span style="margin-top: 5px">' +
                            res.data.message +
                            "<span>";
                        this.$toast.error(thong_bao);
                    }
                });
        },
        tru(value) {
            value.so_luong = value.so_luong * 1 - 1;
            if (value.so_luong < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm.";
                var thong_bao =
                    '<b>Thông báo</b><span style="margin-top: 5px">' + message + "<span>";
                this.$toast.warning(thong_bao);
                value.so_luong = 1;
                this.capNhat(value);
            } else {
                this.capNhat(value);
            }
        },
        cong(value) {
            value.so_luong = value.so_luong * 1 + 1;
            this.capNhat(value);
        },
    },
};
</script>
<style></style>
