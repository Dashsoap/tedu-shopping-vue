<template>
    <div>
        <el-row type="flex" justify="space-between" align="middle">
            <h1>商品管理</h1>
            <create-goods-dialog @submit="onCreate"></create-goods-dialog>
        </el-row>
        <el-row :gutter="30" v-loading="loading>0">
            <el-col :xs="24" :md="12" :lg="8" :xl="4" v-for="item in list" :key="item._id">
                <el-card
                    :body-style="{ padding: '0px' }"
                    v-if="item.visible"
                    v-loading="item.loading>0"
                >
                    <div
                        v-response
                        class="card-img-container"
                        :style="{backgroundImage:`url(${item.img})`}"
                        @click="updateForm = item"
                    >
                        <div class="mask"></div>
                    </div>
                    <footer>
                        <el-row type="flex" justify="space-between" align="middle">
                            <h1>{{item.name}}</h1>
                            <el-button type="text" @click="onDelete(item)">删除</el-button>
                        </el-row>
                        <p>{{item.detail}}</p>
                    </footer>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="修改商品信息" :visible.sync="updateForm">
            <my-form :form="updateForm" @submit="onUpdate"></my-form>
        </el-dialog>
    </div>
</template>

<script>
import CreateGoodsDialog from "./CreateGoodsDialog";
import myForm from "./Form";

export default {
    components: {
        myForm,
        CreateGoodsDialog
    },
    data() {
        return {
            loading: 0,
            updateForm: null,
            list: []
        };
    },
    methods: {
        onCreate(data) {
            this.list.push({ ...data, loading: 0, visible: true });
        },
        async onDelete(item) {
            item.loading++;
            await this.$axios.delete(`/api/goods/${item._id}`);
            item.visible = false;
            item.loading--;
        },
        async onUpdate(item) {
            item.loading++;
            this.updateForm = null;
            await this.$axios.put(`/api/goods/${item._id}`, item);
            item.loading--;
        }
    },
    async beforeMount() {
        this.loading++;
        const { data } = await this.$axios.get("/api/goods");
        this.list = data.map(item => ({
            ...item,
            loading: 0,
            visible: true
        }));
        this.loading--;
    }
};
</script>

<style lang='stylus' scoped>
.el-card {
    margin-bottom: 30px;

    img {
        width: 100%;
    }

    footer {
        padding: 0 20px;

        p {
            margin-top: 0;
        }
    }
}

.card-img-container {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
        .mask {
            opacity: 0.4;
        }
    }
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0;
    transition-duration: 0.3s;
}
</style>