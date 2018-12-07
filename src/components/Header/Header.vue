<template>
    <nav v-if="isVisible">
        <div id="icon">
            <img src="@/assets/index-logo.svg">
            <h1>膜法商城</h1>
        </div>
        <router-link :to="{ name: 'login'}"></router-link>
        <div id="search">
            <input>
            <fa-icon icon="search"></fa-icon>
        </div>
        <div id="button-group">
            <cart></cart>
            <el-button
                v-if="!$store.state.me"
                @click="$router.push({name:'login'})"
                type="primary"
                plain
                round
            >登录</el-button>
            <user-info class="ml-2" v-else></user-info>
        </div>
    </nav>
</template>

<script>
import UserInfo from "./UserInfo";
import Cart from "./Cart.vue";

export default {
    components: {
        UserInfo,
        Cart
    },
    data() {
        return {};
    },
    methods: {
        
    },
    computed: {
        isVisible() {
            const nameList = ["login", "register", "404"];
            return !nameList.includes(this.$route.name);
        }
    }
};
</script>

<style scoped>
nav {
    height: 4rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #efefef;
    padding: 0 20px;
}
#icon {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 1rem;
}

#icon > img {
    display: inline-block;
    height: 2rem;
    margin-right: 0.4rem;
    width: auto;
}
#search > svg {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
}
#search {
    position: relative;
}

#icon > h1 {
    font-weight: 400;
    font-size: 1.6rem;
    margin: 0;
}
#search > input {
    border: 1px solid #bcbcbc;
    max-width: 10rem;
    width: 5rem;
    font-size: 1rem;
    border-radius: 2em;
    transition: 0.3s ease-in-out;
    outline: none;
    padding: 0.5em 1em;
}
#search > input:focus {
    border-color: #ea6f5a;
    width: 10rem;
}

#search > input:focus + svg {
    color: #ea6f5a;
}
#button-group {
    margin-left: auto;
}
</style>