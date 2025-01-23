import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  position: "top-right",
});
export default function(from, to, next) {
    axios
        .get("https://ban-sach-be.dzfullstack.edu.vn/api/admin/nhan-vien/check-login", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
            }
        })
        .then((res) => {
            if (res.data.status) {
                next();
            } else {
                next("/admin/dang-nhap");
                toaster.error("Bạn cần đăng nhập trước!!!!");
            }
        });
}