<template>
    <div class="container" v-loading="loading>0">
        <input ref="input" type="file" accept=".jpg, .png" @input="onUpload">
        <el-button v-if="!value" type="primary" @click="onClick">点击上传</el-button>
        <img v-else :src="value" @click="onClick">
    </div>
</template>

<script>
import shortid from "shortid";

export default {
    props: ["value"],
    data() {
        return {
            loading: 0
        };
    },
    methods: {
        async getUploadUrl(fileName) {
            const { data } = await this.$axios.get(
                `/api/pre_signed_url?name=${fileName}`
            );
            return data;
        },
        uploadFile(url, file) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("PUT", url);
                xhr.onload = e => {
                    if (xhr.status === 200) {
                        resolve(e);
                    } else {
                        reject(e);
                    }
                };
                xhr.send(file);
            });
        },
        onClick() {
            this.$refs.input.value = null;
            this.$refs.input.click();
        },
        async onUpload(e) {
            try {
                this.loading++;
                const file = e.target.files[0];
                const fileName =
                    shortid.generate() + "." + file.name.split(".")[1];
                const uploadUrl = await this.getUploadUrl(fileName);
                await this.uploadFile(uploadUrl, file);
                const fileUrl = `http://minio.sxyori.com/tedu/${fileName}`;
                this.$emit("input", fileUrl);
            } catch (e) {
                this.$message(e.toString());
            } finally {
                this.loading--;
            }
        }
    }
};
</script>

<style scoped>
input {
    display: none;
}
img {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: auto;
}
.container {
    display: inline-block;
    width: 200px;
    height: 200px;
}
</style>