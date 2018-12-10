<template>
    <div>
        <el-row type="flex" justify="space-between" align="middle">
            <h1>用户管理</h1>
            <create-user-dialog @submit="onCreate"></create-user-dialog>
        </el-row>
        <div v-loading="loading>0">
            <el-table :data="list">
                <el-table-column label="ID" prop="_id"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="用户权限" prop="roles">
                    <template slot-scope="scope">
                        <el-tag type="info" v-for="item in scope.row.roles" :key="item">{{item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text">删除</el-button>
                        <el-button type="text">设为管理员</el-button>
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
        this.list = data;
        this.loading--;
    },
    methods: {
        onCreate(data) {
            this.list.push(data);
        }
    }
};
</script>

<style scoped>
</style>