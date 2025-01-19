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
                                        <img :src="value.hinh_anh" alt="" class="img-fluid" style="width: 100%; max-height: 80px; object-fit: contain;" />
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
                                        <button class="btn">
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
                        <button class="btn btn-success">Thanh Toán</button>
                    </div>
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
        };
    },
    mounted() {
        this.layDataGioHang();
    },
    methods: {
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
                .get("http://127.0.0.1:8000/api/khach-hang/gio-hang/data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
                .then((res) => {
                    this.list_gio_hang = res.data.data;
                    // this.list_gio_hang.forEach((value, key) => {
                    //     if (value.id == this.$route.params.id_chi_tiet) {
                    //         value.dang_chon = 1;
                    //     }
                    // });
                    // this.list_gio_hang = [...this.list_gio_hang];
                    // this.tinhTongTien();
                });
        },
        capNhat(payload) {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/update", payload, {
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
