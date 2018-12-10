<template>
    <div>
        <el-dialog title="新增用户" :visible.sync="visible">
            <el-form ref="form" :model="form" label-position="top" :rules="rules">
                <el-form-item label="商品名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入商品名"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model.number="form.price" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="img">
                    <uploader v-model="form.img"></uploader>
                </el-form-item>
                <el-form-item label="商品描述" prop="detail">
                    <el-input v-model="form.detail" placeholder="请输入商品描述"></el-input>
                </el-form-item>
                <el-button type="primary" :loading="loading>0" @click="onSubmit">确定</el-button>
            </el-form>
        </el-dialog>
        <el-button type="primary" @click="visible = true">新增</el-button>
    </div>
</template>

<script>
import Uploader from "@/components/Uploader";
import { requiredRule, lengthRule } from "../../../service/validatorService.js";
export default {
    components: {
        Uploader
    },
    data() {
        return {
            loading: 0,
            visible: false,
            form: {
                name: "",
                price: "",
                detail: "",
                img: ""
            },
            rules: {
                name: [requiredRule(), lengthRule(2, 12)],
                price: [
                    requiredRule(),
                    {
                        type: "number",
                        message: "请输入数字"
                    }
                ],
                detail: [requiredRule(), lengthRule(2, 20)],
                img: [
                    requiredRule(),
                    {
                        type: "url",
                        message: "图片无效"
                    }
                ]
            }
        };
    },
    methods: {
        /** 用户点击注册按钮 */
        onSubmit() {
            this.$refs.form.validate(async result => {
                if (result) {
                    this.loading++;
                    // 得到的返回数据
                    const { data } = await this.$axios.post(
                        "/api/goods",
                        this.form
                    );
                    this.$message.success(`商品: ${data.name}添加成功!`);
                    this.visible = false;
                    this.loading--;
                    this.$emit("submit", data);
                }
            });
        }
    }
};
</script>

<style scoped>
</style>