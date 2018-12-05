<template>
    <div>hello</div>
</template>

<script>
import Axios from "axios";
export default {
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

<style scoped>
</style>