<template>
    <div id="app">
        <my-header class="header"></my-header>
        <router-view class="my-body"></router-view>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import MyHeader from "./components/Header/Header";
export default {
    name: "app",
    components: {
        MyHeader
    },
    beforeCreate() {
        this.$store.dispatch("login");
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            //  start the progress bar
            this.$Progress.start();

            /** 判断路由是否需要鉴权 */
            if (to.meta.auth) {
                if (!this.$store.state.me) {
                    next({
                        path: "login",
                        query: {
                            next: to.fullPath
                        }
                    });
                    this.$Progress.finish();
                } else {
                    next();
                }
            } else {
                next();
            }

            //  continue to next page
            /** 检测用户登录状态 */
        });
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish();
        });
    }
};
</script>

<style lang="stylus">
@import '/assets/theme.styl';

html {
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

.ml-2 {
    margin-left: 20px;
}
</style>
