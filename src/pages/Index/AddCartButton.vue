<template>
    <div class="add-cart-button" @click="onClick">添加至购物车</div>
</template>

<script>
export default {
    methods: {
        onClick(e) {
            this.$emit("click", e);
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