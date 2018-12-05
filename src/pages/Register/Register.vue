<template>
    <div class="container">
        <img src="@/assets/index-logo.svg">
        <h1>欢迎加入膜法世界</h1>
        <span>创建你自己的小马甲</span>
        <el-card class="mt-2">
            <el-form ref="form" :model="form" :rules="rules" hide-required-asterisk>
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="请输入密码">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>-->
                <el-form-item prop="checkPassword" label="请再次输入密码">
                    <el-input type="password" v-model="form.checkPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-button :loading="loading>0" type="primary" round @click="onSubmit">挥动膜杖</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Axios from "axios";

export default {
    methods: {
        /** 用户点击注册按钮 */
        onSubmit() {
            this.$refs.form.validate(async res => {
                if (res) {
                    this.loading++;
                    try {
                        // 得到的返回数据
                        const res = await Axios.post("/api/user", this.form);
                        this.$message.success(
                            `用户: ${res.data.username}注册成功!`
                        );
                        this.$router.push("/login");
                    } catch ({ response }) {
                        // 服务端返回错误原因
                        this.$notify.error(response.data.message);
                    } finally {
                        this.loading--;
                    }
                }
            });
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            loading: 0,
            form: {
                username: "",
                password: "",
                checkPassword: ""
                // email: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        pattern: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$",
                        message:
                            "由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间"
                    }
                ],
                checkPassword: [
                    {
                        validator: validatePass,
                        trigger: "blur"
                    }
                ]

                // email: [
                //   {
                //     type: "email",
                //     message: "请输入有效的邮箱"
                //   },
                //   {
                //     required: true,
                //     message: "请输入邮箱",
                //     trigger: "blur"
                //   }
                // ]
            }
        };
    }
};
</script>

 <style lang="stylus"
 scoped>
 .el-card {
     min-width: 300px;
 }

 .el-form {
     .el-button {
         display: block;
         margin: auto;
         width: 50%;
     }
 }

 .container {
     display: flex;
     flex-direction: column;
     align-items: center;
 }

 img {
     width: 3rem;
     height: auto;
     margin-top: 30px;
 }
</style>