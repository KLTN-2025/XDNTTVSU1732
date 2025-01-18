<template>
   <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container">
         <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
            <div class="col mx-auto">
               <div class="my-4 text-center"><img
                     src="https://img.pikbest.com/png-images/20241014/modern-school-logo-vector-design-artwork_10962285.png!bw700"
                     width="120" alt=""></div>
               <div class="card">
                  <div class="card-body">
                     <div class="border p-4 rounded">
                        <div class="text-center">
                           <h3 class="">ĐĂNG NHẬP</h3>
                        </div>
                        <div class="d-grid">
                           <a class="btn my-4 shadow-sm btn-white" href="javascript:;"> <span
                                 class="d-flex justify-content-center align-items-center">
                                 <img class="me-2" src="../../../assets/images/icons/search.svg" width="16"
                                    alt="Image Description">
                                 <span>Sign Up with Google</span>
                              </span></a>
                        </div>
                        <div class="form-body">
                           <div class="row g-3">
                              <div class="col-12"><label class="form-label">Email</label>
                                 <div class="input-group">
                                    <div class="input-group-text bg-transparent"><i class="fa-solid fa-envelope"></i>
                                    </div><input type="email" class="form-control">
                                 </div>
                              </div>
                              <div class="col-12"><label class="form-label">Password</label>
                                 <div class="input-group">
                                    <div class="input-group-text bg-transparent"><i class="fa-solid fa-lock"></i></div>
                                    <input type="password" class="form-control">
                                 </div>
                              </div>
                              <div class="col-12"><button type="button"
                                       class="btn btn-primary w-100"><i class="fa-solid fa-lock-open"></i>Đăng
                                       Nhập</button></div>
                              <div class="col-12"><a href="/khach-hang/dang-ky" class=""><button type="button"
                                       class="btn btn-danger w-100"><i class="bx bx-user"></i>Đăng Ký</button></a></div>
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
export default {
   data() {
      return {
         dang_nhap : {}
      }
   },

   methods: {
      dang_nhap() {
         
      }
   },
}
</script>
<style></style>