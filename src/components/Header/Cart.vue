<template>
    <div>
        <el-popover placement="bottom-end" width="400" trigger="click">
            <div v-if="carts.length">
                <el-row
                    v-for="(item,k) in carts"
                    :key="k"
                    class="cart mt-2"
                    type="flex"
                    :gutter="20"
                >
                    <el-col v-response :span="6">
                        <img :src="item.good.img">
                    </el-col>
                    <el-col :span="12" class="column">
                        <h1>{{item.good.name}}</h1>
                        <p>{{item.good.detail}}</p>
                    </el-col>
                    <el-col
                        :span="6"
                        style="display:flex;flex-direction:column;align-items:flex-end"
                    >
                        <span>{{item.good.price}}</span>
                        <el-row type="flex" align="middle" class="button-group">
                            <el-button
                                type="text"
                                icon="el-icon-minus"
                                @click="onSetCarts(item,-1)"
                            ></el-button>
                            <label>{{item.count}}</label>
                            <el-button type="text" icon="el-icon-plus" @click="onSetCarts(item,1)"></el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row type="flex" align="middle" justify="space-between" class="mt-3">
                    <span class="total">总计: {{total}}</span>
                    <el-button type="primary">结算</el-button>
                </el-row>
            </div>
            <el-row v-else type="flex" justify="center" class="empty">购物车空空如也</el-row>
            <el-button type="primary" slot="reference" round @click="handleCartClick">购物车
                <fa-icon icon="shopping-cart"></fa-icon>
            </el-button>
        </el-popover>
    </div>
</template>

<script>
import _ from "lodash";
export default {
    data() {
        return {
            visible: false,
            loading: 0
        };
    },
    async beforeMount() {
        await this.$store.dispatch("getCarts");
    },
    methods: {
        handleCartClick() {
            this.visible = true;
        },
        onSetCarts(item, count) {
            if (item.count === 1 && count < 0) {
                this.$store.dispatch("deleteCarts", item);
            } else {
                this.$store.dispatch("setCarts", {
                    good_id: item.good._id,
                    count
                });
            }
        }
    },
    computed: {
        total() {
            let total = 0;
            _.forEach(this.$store.state.cart, item => {
                total += item.good.price * item.count;
            });
            return total;
        },
        carts() {
            return _.filter(this.$store.state.cart, item => item.count > 0);
        }
    }
};
</script>

<style lang='stylus' scoped>
@import '../../assets/theme.styl';

.cart {
    img {
        display: block;
        width: 100%;
    }

    h1 {
        margin: 0;
        font-size: 1.1rem;
    }

    p {
        margin: 0;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    span {
        font-size: 1.2rem;
        color: $primary;
    }

    .button-group {
        .el-button {
            padding: 0;
        }
    }

    label {
        padding: 0 10px;
    }
}

.total {
    font-size: 1.3rem;
}

.empty {
    color: #bcbcbc;
}
</style>