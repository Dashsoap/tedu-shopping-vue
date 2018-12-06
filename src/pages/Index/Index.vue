<template>
    <div>
        <sun-glasses></sun-glasses>
        <glasses></glasses>
    </div>
</template>

<script>
import Axios from "axios";
import Glasses from "./Good/Glasses";
import SunGlasses from "./Good/SunGlasses";
export default {
    components: {
        Glasses,
        SunGlasses
    },
};
</script>

<style lang='stylus' scoped>
</style>