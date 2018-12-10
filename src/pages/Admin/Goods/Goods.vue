<template>
    <div>
        <el-row type="flex" justify="space-between" align="middle">
            <h1>商品管理</h1>
            <create-goods-dialog @submit="onCreate"></create-goods-dialog>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="8" v-for="item in list" :key="item._id">
                <el-card>{{item.name}}</el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CreateGoodsDialog from "./CreateGoodsDialog";
export default {
    components: {
        CreateGoodsDialog
    },
    data() {
        return {
            loading: 0,
            list: []
        };
    },
    methods: {
        onCreate(data) {
            this.list.push(data);
        }
    },
    async beforeMount() {
        this.loading++;
        const { data } = await this.$axios.get("/api/goods");
        this.list = data;
        this.loading--;
    }
};
</script>

<style scoped>
</style>