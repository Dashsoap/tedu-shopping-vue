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
                                <el-card shadow="hover" :class="{'active':editForm === item}">
                                    <el-row type="flex" justify="space-between">
                                        <span>{{item.detail}}</span>
                                        <el-button
                                            type="text"
                                            circle
                                            class="delete-button"
                                            @click.stop="onDelete(item)"
                                            :loading="item.deleteLoading>0"
                                        >
                                            <fa-icon icon="times-circle"></fa-icon>
                                        </el-button>
                                    </el-row>
                                </el-card>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div>还没有地址,添加一个吧!</div>
                    </template>
                </el-col>
                <el-col :span="18">
                    <my-form
                        v-loading="editLoading>0"
                        v-if="editForm"
                        :form="editForm"
                        @submit="onSubmit"
                    ></my-form>
                    <my-form
                        ref="form"
                        v-loading="createLoading>0"
                        v-else
                        @submit="onSubmit"
                        key="create-form"
                    ></my-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import myForm from "./Form";
import _ from "lodash";
export default {
    components: {
        myForm
    },
    beforeCreate(){
        document.title = '收货地址管理 | 膜法商城'
    },
    data() {
        return {
            loading: 0,
            editLoading: 0,
            createLoading: 0,
            list: [],
            editForm: null
        };
    },
    async mounted() {
        this.loading++;
        const { data } = await Axios.get("/api/address");
        this.list = data.map(item => {
            return { ...item, deleteLoading: 0 };
        });
        this.loading--;
    },
    methods: {
        async onSubmit(address) {
            /** 处于编辑状态 */
            if (address._id) {
                const _id = address._id;
                delete address._id;
                this.editLoading++;
                await this.$axios.put(`/api/address/${_id}`, address);
                this.$message.success("修改地址成功");
                this.editLoading--;
            } else {
                this.createLoading++;
                const { data } = await this.$axios.post(
                    "/api/address",
                    address
                );
                this.list.push(data);
                this.$message.success("新增地址成功");
                this.createLoading--;
            }
        },
        onSelectAddress(item) {
            this.editForm = item;
        },
        onCreate() {
            this.editForm = null;
        },
        async onDelete(item) {
            item.deleteLoading++;
            await Axios.delete(`/api/address/${item._id}`);
            _.remove(this.list, n => n._id === item._id);
            this.$message.success("地址删除成功");
            item.deleteLoading--;
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

.delete-button {
    padding: 0;
}
</style>