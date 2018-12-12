<template>
    <div>
        <el-dialog title="新增用户" :visible.sync="visible">
            <register-form submitText="确认" @submit="onSubmit" :loading="loading>0"></register-form>
        </el-dialog>
        <el-button type="primary" @click="visible = true">新增</el-button>
    </div>
</template>

<script>
import RegisterForm from "../../Register/Form";

export default {
    components: {
        RegisterForm
    },
    data() {
        return {
            loading: 0,
            visible: false
        };
    },
    methods: {
        /** 用户点击注册按钮 */
        async onSubmit(form) {
            this.loading++;
            // 得到的返回数据
            const { data } = await this.$axios.post("/api/user", form);
            this.$message.success(`用户: ${data.username}添加成功!`);
            this.visible = false;
            this.loading--;
            this.$emit("submit", data);
        }
    }
};
</script>

<style scoped>
</style>