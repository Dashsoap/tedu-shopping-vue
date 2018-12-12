<template>
    <div>
        <el-row type="flex" justify="space-between" align="middle">
            <h1>用户管理</h1>
            <create-user-dialog @submit="onCreate"></create-user-dialog>
        </el-row>
        <div v-loading="loading>0">
            <el-table :data="showList">
                <el-table-column label="ID" prop="_id"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="用户权限" prop="roles">
                    <template slot-scope="scope">
                        <el-tag type="info" v-for="item in scope.row.roles" :key="item">{{item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            :loading="scope.row.deleteLoading>0"
                            type="text"
                            @click="onDelete(scope.row)"
                        >删除</el-button>
                        <el-button
                            v-if="!scope.row.roles.includes('ADMIN')"
                            :loading="scope.row.setRoleLoading>0"
                            type="text"
                            @click="onSetRole(scope.row)"
                        >设为管理员</el-button>
                        <el-button
                            v-else
                            :loading="scope.row.setRoleLoading>0"
                            type="text"
                            @click="onRemoveRole(scope.row)"
                        >移除管理员权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import CreateUserDialog from "./CreateUserDialog";
export default {
    data() {
        return {
            loading: 0,
            list: []
        };
    },
    components: {
        CreateUserDialog
    },
    async beforeMount() {
        this.loading++;
        const { data } = await this.$axios.get("/api/user");
        /** 过滤自身用户 */
        this.list = data.map(item => {
            let visible = true;
            if (item._id === this.$store.state.me._id) {
                visible = false;
            }
            return {
                ...this.packItem(item),
                visible
            };
        });
        this.loading--;
    },
    methods: {
        // 对item进行包装
        packItem(item) {
            return {
                ...item,
                visible: true,
                deleteLoading: 0,
                setRoleLoading: 0
            };
        },
        onCreate(data) {
            this.list.push(this.packItem(data));
        },
        async onDelete(item) {
            item.deleteLoading++;
            await this.$axios.delete(`/api/user/${item._id}`);
            item.deleteLoading--;
            item.visible = false;
        },
        async onSetRole(item) {
            item.setRoleLoading++;
            const { data } = await this.$axios.post(
                `/api/user/admin/${item._id}`
            );
            item.roles = data.roles;
            item.setRoleLoading--;
        },
        async onRemoveRole(item) {
            item.setRoleLoading++;
            const { data } = await this.$axios.delete(
                `/api/user/admin/${item._id}`
            );
            item.roles = data.roles;
            item.setRoleLoading--;
        }
    },
    computed: {
        showList() {
            return this.list.filter(item => item.visible);
        }
    }
};
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
</style>