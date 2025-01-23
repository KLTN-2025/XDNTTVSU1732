import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
});
export default function (from, to, next) {
    axios
        .get("https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/check-login", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
            },
        })
        .then((res) => {
            if (res.data.status) {
                next();
                localStorage.setItem("name_kh", res.data.name);
                localStorage.setItem("email_kh", res.data.email);
                localStorage.setItem("check_kh", res.data.status);
            } else {
                next("/khach-hang/dang-nhap");
                toaster.error(res.data.message);
            }
        });
}