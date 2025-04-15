import axios from "axios";

export default {
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
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
                .get("http://127.0.0.1:8000/api/admin/tac-gia/data-open", {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    this.list_tac_gia = res.data.data;
                    if(res.data.status == false) {
                        this.$toast.error(res.data.message);
                    }
                });
        },
        loadDataNXB() {
            axios
                .get("http://127.0.0.1:8000/api/admin/nha-xuat-ban/data-open", {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    this.list_nxb = res.data.data;
                    if (res.data.status == false) {
                      this.$toast.error(res.data.message);
                    }
                });
        },
        loadDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/admin/danh-muc/data-open", {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    this.list_danh_muc = res.data.data;
                    if (res.data.status == false) {
                      this.$toast.error(res.data.message);
                    }
                });
        },
        loadDataSach() {
            axios
                .get(`http://127.0.0.1:8000/api/admin/sach/data`, {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    this.list_sach = res.data.data; // Dữ liệu sách
                    if (res.data.status == false) {
                      this.$toast.error(res.data.message);
                    }
                });
        },
        themMoiSach() {
            let formData = new FormData();
            formData.append("ten_sach", this.create_sach.ten_sach);
            formData.append("slug_sach", this.create_sach.slug_sach);
            formData.append("id_danh_muc", this.create_sach.id_danh_muc);
            formData.append("id_tac_gia", this.create_sach.id_tac_gia);
            formData.append("so_luong_ban", this.create_sach.so_luong_ban);
            formData.append("gia_ban", this.create_sach.gia_ban);
            formData.append("gia_km", this.create_sach.gia_km);
            formData.append("mo_ta", this.create_sach.mo_ta);
            formData.append("is_sale", this.create_sach.is_sale);
            formData.append("so_trang", this.create_sach.so_trang);
            formData.append("id_nxb", this.create_sach.id_nxb);
            formData.append("nam_xb", this.create_sach.nam_xb);
            formData.append("tinh_trang", this.create_sach.tinh_trang);
            formData.append("hinh_anh", this.file_anh); // Thêm ảnh vào FormData
            axios
                .post("http://127.0.0.1:8000/api/admin/sach/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt header là multipart
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataSach();
                        this.create_sach = {};
                        this.$refs.inputFile.value = null; // Reset lại input file
                        this.file_anh = null; // Reset tệp ảnh
                        this.xem_truoc = ""; // Reset hình ảnh xem trước
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
            formData.append("id", this.cap_nhat_sach.id);
            formData.append("ten_sach", this.cap_nhat_sach.ten_sach);
            formData.append("slug_sach", this.cap_nhat_sach.slug_sach);
            formData.append("id_danh_muc", this.cap_nhat_sach.id_danh_muc);
            formData.append("id_tac_gia", this.cap_nhat_sach.id_tac_gia);
            formData.append("so_luong_ban", this.cap_nhat_sach.so_luong_ban);
            formData.append("gia_ban", this.cap_nhat_sach.gia_ban);
            formData.append("gia_km", this.cap_nhat_sach.gia_km);
            formData.append("mo_ta", this.cap_nhat_sach.mo_ta);
            formData.append("is_sale", this.cap_nhat_sach.is_sale);
            formData.append("so_trang", this.cap_nhat_sach.so_trang);
            formData.append("id_nxb", this.cap_nhat_sach.id_nxb);
            formData.append("nam_xb", this.cap_nhat_sach.nam_xb);
            formData.append("tinh_trang", this.cap_nhat_sach.tinh_trang);
            // Nếu có ảnh mới thì gửi ảnh mới lên
            if (this.file_anh_cap_nhat) {
                formData.append("hinh_anh", this.file_anh_cap_nhat);
            } else {
                formData.append("hinh_anh", this.cap_nhat_sach.hinh_anh); // Giữ ảnh cũ nếu không có ảnh mới
            }

            axios
                .post("http://127.0.0.1:8000/api/admin/sach/update", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt header là multipart
                        Authorization:
                            "Bearer " + localStorage.getItem("token_nhan_vien"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataSach();
                        this.cap_nhat_sach = {}; // Reset form cập nhật
                        this.file_anh_cap_nhat = null; // Reset ảnh
                        this.xem_truoc_cap_nhat = ""; // Reset ảnh xem trước
                        this.$refs.inputFileCapNhat.value = null; // Reset lại input file
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
              .post(
                "http://127.0.0.1:8000/api/admin/sach/delete",
                this.del_sach,
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("token_nhan_vien"),
                  },
                }
              )
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
              .post("http://127.0.0.1:8000/api/admin/sach/change", value, {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("token_nhan_vien"),
                },
              })
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
              .post("http://127.0.0.1:8000/api/admin/sach/change-sale", value, {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("token_nhan_vien"),
                },
              })
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
            if (!title) return "";
            var slug = title.toLowerCase();
            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
            slug = slug.replace(/đ/gi, "d");
            //Xóa các ký tự đặt biệt
            slug = slug.replace(
                /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
                ""
            );
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, "-");
            slug = slug.replace(/\-\-\-\-/gi, "-");
            slug = slug.replace(/\-\-\-/gi, "-");
            slug = slug.replace(/\-\-/gi, "-");
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = "@" + slug + "@";
            slug = slug.replace(/\@\-|\-\@|\@/gi, "");
            return slug;
        },
    },
};
