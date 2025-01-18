<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-md-4 border-end">
                <img :src="chi_tiet_sach.hinh_anh" class="img-fluid"
                    style="max-height: 400px; width: 100%; object-fit: contain;" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">{{ chi_tiet_sach.ten_sach }}</h4>
                    <div class="d-flex gap-3 py-3">
                        <div class="cursor-pointer">
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-warning"></i>
                            <i class="bx bxs-star text-secondary"></i>
                        </div>
                        <div>Đánh giá: <b>142</b></div>
                        <div class="text-success"><i class="bx bxs-cart-alt align-middle"></i> Đã bán: 100</div>
                    </div>
                    <dl class="row">
                        <dt class="col-sm-3">Giá Gốc</dt>
                        <dd class="col-sm-9">{{ chi_tiet_sach.gia_ban }}</dd>

                        <dt class="col-sm-3">Giá Khuyến Mãi</dt>
                        <dd class="col-sm-9">{{ chi_tiet_sach.gia_km }}</dd>

                        <dt class="col-sm-3">Số Lượng Hiện Tại</dt>
                        <dd class="col-sm-9">{{ chi_tiet_sach.so_luong_ban }} </dd>
                    </dl>
                    <hr>
                    <div class="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                        <div class="col">
                                <label class="form-label">Số Lượng Mua</label>
                                <div class="input-group input-spinner" style="width: 150px;">
                                    <button class="btn btn-white" type="button" id="button-plus"> -
                                    </button>
                                    <input type="text" class="form-control text-center" value="1">
                                    <button class="btn btn-white" type="button" id="button-minus"> +
                                    </button>
                                </div>
                            </div>
                    </div>
                    <div class="d-flex gap-3 mt-3">
                        <a href="#" class="btn btn-primary">Mua Ngay</a>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="card-body">
            <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-bs-toggle="tab" href="#moTa" role="tab" aria-selected="true">
                        <div class="d-flex align-items-center">
                            <div class="tab-icon"><i class="bx bx-comment-detail font-18 me-1"></i>
                            </div>
                            <div class="tab-title"> Mô Tả </div>
                        </div>
                    </a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#danhGia" role="tab" aria-selected="false"
                        tabindex="-1">
                        <div class="d-flex align-items-center">
                            <div class="tab-icon"><i class="bx bx-bookmark-alt font-18 me-1"></i>
                            </div>
                            <div class="tab-title">Đánh Giá</div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="tab-content pt-3">
                <div class="tab-pane fade show active" id="moTa" role="tabpanel">
                    <p v-html="chi_tiet_sach.mo_ta"></p>
                </div>
                <div class="tab-pane fade" id="danhGia" role="tabpanel">
                    <div class="card radius-10">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <img src="../../../assets/images/avatars/avatar-5.png"
                                    class="align-self-center rounded-circle p-1 border" width="90" height="90"
                                    alt="...">
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mt-0">Center-aligned media</h5>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla</p>
                                    <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
                                        leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                                        ridiculus mus.</p>
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex align-items-center">
                                <img src="../../../assets/images/avatars/avatar-6.png"
                                    class="align-self-end rounded-circle p-1 border" width="90" height="90" alt="...">
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mt-0">Bottom-aligned media</h5>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla</p>
                                    <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
                                        leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                                        ridiculus mus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['id_sach', 'slug_sach'],
    data() {
        return {
            id_sach: this.$route.params.id_sach,
            chi_tiet_sach: {}
        }
    },

    mounted() {
        this.layThongTinSach();
        console.log(this.id_sach);

    },
    methods: {
        layThongTinSach() {
            axios
                .get('http://127.0.0.1:8000/api/home/chi-tiet-sach/' + this.id_sach)
                .then((res) => {
                    if (res.data.status) {
                        this.chi_tiet_sach = res.data.data;
                    }
                });
        }
    },
}
</script>
<style></style>