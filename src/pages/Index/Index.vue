<template>
    <el-container>
        <el-main>
            <sun-glasses></sun-glasses>
            <glasses></glasses>
            <good-list></good-list>
        </el-main>
        <el-footer>
            <my-footer></my-footer>
        </el-footer>
    </el-container>
</template>

<script>
import Glasses from "./Good/Glasses";
import SunGlasses from "./Good/SunGlasses";
import GoodList from "./Good/GoodList";
import myFooter from "@/components/Footer/Footer";
export default {
    components: {
        Glasses,
        SunGlasses,
        GoodList,
        myFooter
    }
};
</script>

<style lang='stylus' scoped>
</style>