<template>
    <el-container>
        <el-aside width="300px">
            <side-bar></side-bar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import SideBar from "./SideBar";
export default {
    components: {
        SideBar
    }
};
</script>

<style scoped>
</style>