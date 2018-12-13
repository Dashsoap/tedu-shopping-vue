<template>
    <div>
        <h1>选购膜法商品</h1>
        <el-row :gutter="30" v-loading="loading>0">
            <el-col :xs="24" :md="12" :lg="8" :xl="4" v-for="item in list" :key="item._id">
                <el-card :body-style="{ padding: '0px' }">
                    <div
                        v-response
                        class="card-img-container"
                        :style="{backgroundImage:`url(${item.img})`}"
                    ></div>
                    <footer>
                        <el-row type="flex" justify="space-between" align="middle">
                            <div>
                                <h2>{{item.name}}</h2>
                                <p>{{item.detail}}</p>
                            </div>
                            <div>
                                <h3>{{item.price}}</h3>
                                <add-cart-button :good_id="item._id" color="#EA6F5A"></add-cart-button>
                            </div>
                        </el-row>
                    </footer>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import AddCartButton from "../AddCartButton";
export default {
    data() {
        return {
            loading: 0,
            list: []
        };
    },
    components: {
        AddCartButton
    },
    async beforeMount() {
        const { data } = await this.$axios.get("/api/goods");
        this.list = data;
    }
};
</script>

<style lang="stylus" scoped>
.card-img-container {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
}

h1 {
    text-align: center;
    font-size: 2rem;
}

footer {
    padding: 20px;
    box-sizing: border-box;
}

h3 {
    text-align: right;
    color: #555;
    font-size: 2em;
    font-weight: 300;
}
</style>