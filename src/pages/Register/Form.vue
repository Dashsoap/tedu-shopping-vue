<template>
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
        <el-button :loading="loading>0" type="primary" round @click="onSubmit">{{submitText}}</el-button>
    </el-form>
</template>

<script>
export default {
    props: {
        submitText: {
            type: String,
            default: "挥动魔杖"
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        /** 用户点击注册按钮 */
        onSubmit() {
            this.$refs.form.validate(async res => {
                if (res) {
                    this.$emit("submit", this.form);
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

<style scoped>
</style>