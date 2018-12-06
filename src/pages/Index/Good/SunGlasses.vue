<template>
    <div class="container" :style="`background:${background}`">
        <h1>长者之风</h1>
        <h2>引领 2019 墨镜潮流</h2>
    </div>
</template>

<script>
import background from "@/assets/glasses-background.jpg";
export default {
    mounted() {
        console.log(background);
    }
};
</script>

<style lang='stylus' scoped>
@import './style.styl';

.container {
    background: url('../../../assets/glasses-background.jpg');
    background-size: cover;
    display: flex;
    flex-direction: column;
}

h1 {
    font-size: 180px;
    color: #FFFFFF;
    text-shadow: 0 2px 4px #000000;
}

h2 {
    margin: auto 0 0 auto;
    font-size: 100px;
    color: #FFFFFF;
    text-shadow: 0 2px 4px #000000;
}
</style>