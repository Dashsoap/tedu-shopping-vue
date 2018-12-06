<template>
    <div>
        <el-form
            ref="form"
            label-position="top"
            :model="form"
            hide-required-asterisk
            :rules="rules"
        >
            <el-row type="flex" justify="space-between" :gutter="30">
                <el-col :span="8">
                    <el-form-item label="省" prop="province">
                        <el-select
                            v-model="form.province"
                            placeholder="请选择您所在的省份"
                            @change="onProvinceChange"
                        >
                            <el-option
                                v-for="item in province"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="市" prop="city">
                        <el-select
                            v-model="form.city"
                            placeholder="请选择您所在的省份"
                            @change="onCityChange"
                        >
                            <el-option
                                v-for="item in city"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="区/县" prop="area">
                        <el-select v-model="form.area" placeholder="请选择您所在的省份">
                            <el-option
                                v-for="item in area"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="联系方式" prop="phone">
                        <el-input type="number" v-model="form.phone" placeholder="请输入您的联系方式"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货人姓名" prop="name">
                        <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="详细地址" prop="detail">
                    <el-input v-model="form.detail" placeholder="请输入您的详细地址"></el-input>
                </el-form-item>
            </el-row>
            <el-row type="flex" justify="end">
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import province from "./province.js";
import city from "./city.js";
import area from "./area.js";
import { lengthRule, requiredRule } from "../../service/validatorService.js";
export default {
    props: {
        form: {
            type: Object,
            default() {
                return {
                    province: "",
                    city: "",
                    area: "",
                    phone: "",
                    name: "",
                    detail: ""
                };
            }
        }
    },
    data() {
        return {
            province,
            rules: {
                province: [requiredRule()],
                city: [requiredRule()],
                area: [requiredRule()],
                name: [requiredRule(), lengthRule(2, 8)],
                phone: [requiredRule(), lengthRule(6, 11)],
                detail: [requiredRule(), lengthRule(1, 20)]
            }
        };
    },
    computed: {
        city() {
            return city[this.form.province] || [];
        },
        area() {
            return area[this.form.city] || [];
        }
    },
    methods: {
        /** 当用户选择了新的省份 */
        onProvinceChange() {
            this.form.city = "";
            this.onCityChange();
        },
        /** 当用户选择了新的市 */
        onCityChange() {
            this.form.area = "";
        },
        onSubmit() {
            this.$refs.form.validate(result => {
                if (result) {
                    const final = { ...this.form };
                    /** 将省,市,地区的id转化为名字 */
                    this.province.some(item => {
                        if (item.id === this.form.province) {
                            final.province = item.name;
                            return true;
                        }
                    });
                    this.city.some(item => {
                        if (item.id === this.form.city) {
                            final.city = item.name;
                            return true;
                        }
                    });
                    this.area.some(item => {
                        if (item.id === this.form.area) {
                            final.area = item.name;
                            return true;
                        }
                    });
                    this.$emit("submit", final);
                }
            });
        },
        clearValidate() {
            this.$refs.form.clearValidate();
        }
    }
};
</script>

<style scoped>
</style>