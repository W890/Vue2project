<template>
    <div id="add">
        <div class="app">

            <p style="background-color: #f0f0f0;">
            <p style="color: blue;background-color: #ffffff;display: block;
            width: 100px;
            ">录入信息</p>
            </p>
            <br><br><br>
            <div class="zim">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <div>
                        <el-form-item label="小区名称">
                            <el-input v-model="form.communityname" placeholder="小区名称"></el-input>
                        </el-form-item>
                        <el-form-item label="单元名称">
                            <el-input v-model="form.unitname" placeholder="单元名称"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="填写栋数">
                            <el-input v-model="form.unitnum" placeholder="栋数"></el-input>
                        </el-form-item>
                        <el-form-item label="选择状态">
                            <el-select v-model="form.unitstatus" placeholder="选择状态">
                                <el-option label="已建成" value="1"></el-option>
                                <el-option label="未建成" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="width: 186px;height: 55px;margin:0 auto;">
                        <el-button @click="goto()" type="primary">返回</el-button>
                        <el-button @click="addunit()" type="primary">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { Addunit } from '@/api/house'
export default {
    data() {
        return {
            form: {
                communityname: '',
                unitname: '',
                unitnum: '',
                unitstatus: '',
                token: ''
            },
        }
    },
    mounted() {
        this.form.token = localStorage.getItem('token')
        // 获取数据
        // this.getdata();
    },
    methods: {
        async addunit() {
            console.log(this.form);
            let res = await Addunit(this.form)
            // this.form=res.data
            console.log(res);
            this.dialogFormVisible = false
            this.goto()
        },
        
        //页面跳转
        goto() {
            this.$router.push('/house/unit')
        },
        

    },


}

</script>
<style>
#add {
    width: 100%;
    height: 650px;
    background-color: #f0f0f0;
}

.app {
    width: 1800px;
    height: 500px;
    margin: 0 auto;
    background-color: #ffffff;
}

.zim {
    width: 590px;
    height: 222px;
    margin: 0 auto;
}
</style>