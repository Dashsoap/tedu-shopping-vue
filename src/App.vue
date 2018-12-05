<template>
    <div id="app">
        <my-header class="header"></my-header>
        <router-view class="my-body"></router-view>
    </div>
</template>

<script>
import MyHeader from "./components/Header/Header";

export default {
    name: "app",
    components: {
        MyHeader
    }
};
</script>

<style lang="stylus">
@import '/assets/theme.styl';

html {
    box-sizing: border-box;
    font-size: 16px;
}

body {
    margin: 0;
}

a {
    text-decoration: none;
    color: $primary;
    font-weight: 500;
}

.mt-1 {
    margin-top: 10px;
}

.mt-2 {
    margin-top: 20px;
}

.mt-3 {
    margin-top: 30px;
}
</style>
