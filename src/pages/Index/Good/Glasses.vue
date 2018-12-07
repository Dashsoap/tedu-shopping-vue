<template>
    <el-row type="flex" class="container" :gutter="30">
        <el-col :span="12" class="left">
            <img src="@/assets/glasses.jpg">
        </el-col>
        <el-col :span="12" class="right">
            <div class="title">
                <h1>苟利国家生死以</h1>
                <h1>岂因祸福避趋之</h1>
            </div>

            <div class="bottom">
                <h2>经典黑框复刻</h2>
                <div>
                    <add-cart-button></add-cart-button>
                    <span>￥92</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import AddCartButton from "../AddCartButton";
export default {
    components: {
        AddCartButton
    }
};
</script>

<style lang='stylus' scoped>
@import './style.styl';

.title {
    h1 {
        &:last-child {
            text-align: right;
        }
    }
}

.left {
    display: flex;
    align-items: center;
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.bottom {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;

    span {
        font-size: 2em;
        color: #EA6F5A;
        margin-left: 0.5em;
    }
}

h2 {
    font-weight: 400;
    color: #bcbcbc;
}
</style>