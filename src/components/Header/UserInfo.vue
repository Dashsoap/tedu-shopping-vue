<template>
    <el-dropdown trigger="click" @command="onClick">
        <el-button circle type="primary" plain>{{firstLetter}}</el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editAddress">修改收货地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import _ from "lodash";
export default {
    computed: {
        firstLetter() {
            return _.toUpper(this.$store.state.me.username[0]);
        }
    },
    methods: {
        onClick(command) {
            switch (command) {
                case "editAddress":
                    this.$router.push("/address");
                    break;
                case "logout":
                    this.$store.dispatch("logout");
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style scoped>
</style>