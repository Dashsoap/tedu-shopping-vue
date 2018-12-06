<template>
    <div>
        <sun-glasses></sun-glasses>
        <glasses></glasses>
    </div>
</template>

<script>
import Axios from "axios";
import Glasses from './Good/Glasses'
import SunGlasses from './Good/SunGlasses'
export default {
    components:{
        Glasses,
        SunGlasses
    },
    async beforeCreate() {
        try {
            const { data } = await Axios.get("/api/me");
            console.log(data);
        } catch ({ response }) {
            console.log(response);
        }
    }
};
</script>

<style lang='stylus' scoped>

</style>