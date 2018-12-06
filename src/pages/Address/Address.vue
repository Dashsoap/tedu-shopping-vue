<template>
    <div class="container">
        <h1>管理您的收货地址</h1>
        <div v-loading="loading>0">
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-button type="text" @click="onCreate">新增&nbsp;
                        <fa-icon icon="address-card"></fa-icon>
                    </el-button>
                    <template v-if="list.length !== 0">
                        <ul>
                            <li v-for="item in list" :key="item._id" @click="onSelectAddress(item)">
                                <el-card
                                    shadow="hover"
                                    :class="{'active':curId === item._id}"
                                >{{item.detail}}</el-card>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div>还没有地址,添加一个吧!</div>
                    </template>
                </el-col>
                <el-col :span="18">
                    <my-form ref="form" :form="form" @submit="onSubmit"></my-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import myForm from "./Form";
export default {
    components: {
        myForm
    },
    data() {
        return {
            loading: 0,
            list: [],
            curId: "",
            form: {
                province: "",
                city: "",
                area: "",
                phone: "",
                name: "",
                detail: ""
            }
        };
    },
    async mounted() {
        this.loading++;
        const { data } = await Axios.get("/api/address");
        this.list = data;
        this.loading--;
    },
    methods: {
        async onSubmit(address) {
            try {
                const { data } = await Axios.post("/api/address", address);
            } catch ({ response }) {
                this.$message.error(response.data.message);
            }
        },
        onSelectAddress(item) {
            this.curId = item._id;
            this.form = item;
        },
        onCreate() {
            this.onSelectAddress({
                _id: undefined
            });
            this.$refs.form.clearValidate();
        }
    }
};
</script>

<style lang='stylus' scoped>
.container {
    padding: 20px 8%;
    width: 1024;
}

h1 {
    font-weight: 400;
}

ul {
    padding: 0;
    list-style: none;

    li {
        cursor: pointer;

        &:hover {
            .el-card {
                color: #EA6F5A;
            }
        }

        &+li {
            margin-top: 1em;
        }
    }
}

.active {
    border: 1px solid #EA6F5A;
}
</style>