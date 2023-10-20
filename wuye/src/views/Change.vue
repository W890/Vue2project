<template>
    <div>
        <div>
            <el-tabs type="border-card">
                <el-tab-pane label="密码修改">
                    <div class="cha-box">
                        <div>
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="旧密码">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>

                                <el-form-item label="新密码">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>

                                <el-form-item label="确认密码 ">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div>
                            <el-button type="primary">主要按钮</el-button>
                            <el-button type="primary">主要按钮</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
  
<script>
import { GetMyId } from "@/api/house";
export default {
    data() {
        return {
            form: {},
        };
    },
    mounted() {
        // this.messagedata.token = localStorage.getItem('token')
        // this.getdata()
    },
    methods: {
        async getdata() {
            // console.log(this.messagedata);
            // let res = await GetMyId(this.messagedata);
            // console.log(res);
        },
    },
};
</script>
  
<style scoped>
.cha-box .el-input {
    width: 500px;
    /* text-align: left; */
}

.cha-box {
    padding-left: 70px;
    width: 50%;
    text-align: center;
}
</style>