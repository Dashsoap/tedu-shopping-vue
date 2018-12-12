<template>
    <div>
        <el-dialog title="新增商品" :visible.sync="visible">
            <my-form :loading="loading>0" @submit="onSubmit"></my-form>
        </el-dialog>
        <el-button type="primary" @click="visible = true">新增</el-button>
    </div>
</template>

<script>
import myForm from "./Form";
export default {
    components: {
        myForm
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
            const { data } = await this.$axios.post("/api/goods", form);
            this.$message.success(`商品: ${data.name}添加成功!`);
            this.visible = false;
            this.loading--;
            this.$emit("submit", data);
        }
    }
};
</script>

<style scoped>
</style>