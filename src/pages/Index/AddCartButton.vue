<template>
    <div class="add-cart-button" :loading="loading>0" @click="onClick">添加至购物车</div>
</template>

<script>
export default {
    props: {
        good_id: {
            required: true
        }
    },
    data() {
        return {
            loading: 0
        };
    },
    methods: {
        async onClick() {
            this.loading++;
            await this.$store.dispatch("setCarts", {
                good_id: this.good_id
            });
            this.$message.success("添加成功");
            this.loading--;
        }
    }
};
</script>

<style scoped>
.add-cart-button {
    border: 2px solid #000;
    display: inline;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: inherit;
}
</style>