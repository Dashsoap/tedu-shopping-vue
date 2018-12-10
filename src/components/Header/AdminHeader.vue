<template>
    <nav v-if="isVisible">
        <div id="icon">
            <img src="@/assets/index-logo.svg">
            <h1>膜法商城管理</h1>
        </div>
        <el-button type="text" @click="onLogout">
            <fa-icon icon="sign-out-alt"></fa-icon>&nbsp;注销
        </el-button>
    </nav>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        onLogout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        }
    },
    computed: {
        isVisible() {
            const nameList = ["admin", "admin-user", "admin-goods"];
            return nameList.includes(this.$route.name);
        }
    }
};
</script>

<style lang="stylus" scoped>
nav {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #efefef;
    padding: 0 20px;
}

#icon {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 1rem;
    align-items: center;

    img {
        display: inline-block;
        height: 2rem;
        margin-right: 0.4rem;
        width: auto;
    }

    h1 {
        font-weight: 400;
    }
}
</style>