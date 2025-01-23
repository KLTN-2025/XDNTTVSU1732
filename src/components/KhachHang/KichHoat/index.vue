<template>

</template>
<script>
import axios from 'axios';

export default {
    props: ["id_khach_hang"],
    mounted() {
        this.kichHoatTaiKhoan()
    },
    methods: {
        kichHoatTaiKhoan() {
            var payload = {
                id_khach_hang: this.$route.params.id_khach_hang
            };
            console.log(payload);
            
            axios
                .post('https://ban-sach-be.dzfullstack.edu.vn/api/khach-hang/kich-hoat', payload)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success(res.data.message);
                        this.$router.push('/khach-hang/dang-nhap')
                    } else if (res.data.status == 2) {
                        this.$toast.warning(res.data.message);
                        this.$router.push('/')
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/')
                    }
                })
                .catch((res) => {
                    var list_error = Object.values(res.response.data.errors);
                    list_error.forEach((v, k) => {
                        this.$toast.error(v[0]);
                    });
                });
        }
    }
}
</script>
<style></style>