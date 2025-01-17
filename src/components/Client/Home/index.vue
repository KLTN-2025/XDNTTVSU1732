<template>
   <!-- BANNER -->
   <div class="row">
      <div class="col-lg-12">
         <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                  aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner" style="border-radius: 10px">
               <div class="carousel-item active">
                  <img src="../../../assets/images/banner/1.png" class="d-block w-100" alt="..." />
               </div>
               <div class="carousel-item">
                  <img src="../../../assets/images/banner/2.png" class="d-block w-100" alt="..." />
               </div>
               <div class="carousel-item">
                  <img src="../../../assets/images/banner/3.png" class="d-block w-100" alt="..." />
               </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
               data-bs-slide="prev">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
               data-bs-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Next</span>
            </button>
         </div>
      </div>
   </div>
   <!-- ĐANG GIẢM GIÁ -->
   <div class="row mt-4">
      <div class="col-lg-12 text-center">
         <div class="d-inline-block">
            <h4><b>NHÀ SÁCH ONLINE</b></h4>
            <div class="text-center">
               <hr class="bg-primary my-2" style="width: 100%; height: 3px; border: none; border-radius: 5px" />
            </div>
         </div>
      </div>
      <div class="col-lg-12">
         <div class="row row-cols-1 row-cols-md-3 row-cols-xl-5 product-grid">
            <div class="col">
               <div class="card radius-10">
                  <div class="card-body">
                     <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-primary mb-3">
                           <img src="../../../assets/images/banner/4.png" alt="Fast Food" class="rounded-circle"
                              style="width: 50px; height: 50px" />
                        </div>
                        <h5 class="my-1">Đặt Sách Dễ Dàng</h5>
                        <p class="mb-0 text-secondary">
                           Tập trung vào sự tiện lợi khi mua sách online.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div class="col">
               <div class="card radius-10">
                  <div class="card-body">
                     <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-danger mb-3">
                           <img src="../../../assets/images/banner/5.png" alt="Delivery" class="rounded-circle"
                              style="width: 50px; height: 50px" />
                        </div>
                        <h5 class="my-1">Click Mua Sách</h5>
                        <p class="mb-0 text-secondary">Gợi cảm giác mua sắm sách chỉ với một cú click.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div class="col">
               <div class="card radius-10">
                  <div class="card-body">
                     <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-info mb-3">
                           <img src="../../../assets/images/banner/6.png" alt="Diverse Cuisine" class="rounded-circle"
                              style="width: 50px; height: 50px" />
                        </div>
                        <h5 class="my-1">Sách 24/7</h5>
                        <p class="mb-0 text-secondary">Nhấn mạnh sự phục vụ liên tục và tiện lợi mọi lúc.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div class="col">
               <div class="card radius-10">
                  <div class="card-body">
                     <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-success mb-3">
                           <img src="../../../assets/images/banner/7.png" alt="Combo" class="rounded-circle"
                              style="width: 50px; height: 50px" />
                        </div>
                        <h5 class="my-1">Sách Hay Mỗi Ngày</h5>
                        <p class="mb-0 text-secondary">Gợi ý rằng sách tốt luôn sẵn sàng hàng ngày.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div class="col">
               <div class="card radius-10">
                  <div class="card-body">
                     <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-warning mb-3">
                           <img src="../../../assets/images/banner/8.png" alt="Healthy Food" class="rounded-circle"
                              style="width: 50px; height: 50px" />
                        </div>
                        <h5 class="my-1">Mua Sách Tiện Lợi</h5>
                        <p class="mb-0 text-secondary">Đơn giản, gần gũi và dễ dàng tiếp cận.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- SẢN PHẨM BÁN CHẠY -->
   <div class="row mt-3">
      <div class="col-lg-12">
         <h4 class="fw-bold mb-3">SẢN PHẨM BÁN CHẠY</h4>
         <hr />
         <div class="card">
            <div class="card-body">
               <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- GỢI Ý CHO BẠN -->
   <div class="row mt-3">
      <div class="col-lg-12">
         <h4 class="fw-bold mb-3">GỢI Ý CHO BẠN</h4>
         <hr />
         <div class="card">
            <div class="card-body">
               <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-2 d-flex">
                     <div class="card flex-fill">
                        <img
                           src="https://www.netabooks.vn/Data/Sites/1/Product/46292/hoang-tu-be-le-petit-prince-song-ngu-viet-phap.jpg"
                           class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h6 class="card-title cursor-pointer">Tên Sách</h6>
                           <div class="clearfix">
                              <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                              <p class="mb-0 float-end fw-bold">
                                 <span
                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                              </p>
                           </div>
                           <div class="d-flex align-items-center mt-3 fs-6">
                              <div class="cursor-pointer">
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-warning"></i>
                                 <i class="bx bxs-star text-secondary"></i>
                              </div>
                              <p class="mb-0 ms-auto">4.2(182)</p>
                           </div>
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
export default {};
</script>
<style></style>
