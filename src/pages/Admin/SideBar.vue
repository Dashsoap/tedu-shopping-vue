<template>
    <el-menu :default-active="$route.path" router>
        <el-menu-item index="/admin/user">用户管理</el-menu-item>
        <el-menu-item index="/admin/goods">商品管理</el-menu-item>
    </el-menu>
</template>

<script>
export default {};
</script>

<style scoped>
</style>