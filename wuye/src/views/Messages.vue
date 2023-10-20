<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="我的信息">
                <el-form ref="form" class="box_acct_form" :model="form" label-width="120px">
                    <el-row v-show="false">
                        <el-col :span="12">
                            <el-form-item label="主键id:" prop="id" label-width="130px">
                                <el-input size="medium" v-model="form.u_id"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="*用户账号:">
                                <el-input size="medium" readonly v-model="form.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="*用户名称:">
                                <el-input size="medium" readonly v-model="form.nickname"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="*性别:">
                                <el-input size="medium" class="input" disabled v-model="form.sex"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="*类型:">
                                <el-input size="medium" class="input" disabled v-model="form.type"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="联系电话:">
                                <el-input size="medium" readonly v-model="form.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="邮箱:">
                                <el-input size="medium" readonly v-model="form.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="生效时间:">
                                <el-date-picker v-model="form.createtime" class="input" size="medium" type="date"
                                    style="width: 100%;background-color: #FAFAFA" disabled placeholder="请选择出生日期"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="详细住址:">
                                <el-input size="medium" class="input" disabled v-model="form.homeaddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="我的车位:">
                                <el-input size="medium" readonly v-model="form.parkname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计费状态:">
                                <el-input size="medium" readonly v-model="form.coststatus"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12" style="width: 100%">
                            <el-form-item label="我的描述:">
                                <el-input type="textarea" readonly rows="2" v-model="form.note" size="medium"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>

            <div class="panel" style="margin-top: 20px">
                <p class="panel-title" style="font-weight: bolder;margin-left: 10px;padding: 0 1px">头像信息/更换</p>
                <el-card class="box-card" shadow="always">
                    <div class="panel-body" style="">
                        <div class="btn_div" style="display: flex">

                            <div style="margin-top: 17px;margin-left: 20px;cursor: pointer;">

                                <div class="imgDiv" v-viewer="{ movable: true }">
                                    <img :src="icon" style="width: 260px;height: 240px">
                                </div>
                            </div>
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-card>

            </div>
        </el-tabs>
    </div>
</template>
<script>
import { GetMyId } from '@/api/house'

export default {

    data() {
        return {
            form: {},
            icon: '',
            imageUrl: '',
            id: '',
            token: '',
            formlist:{},

        }
    },
    mounted() {
        this.token = localStorage.getItem('token')
        // this.getData()
    },
    methods: {

        // async getData() {
        //     console.log({ id: this.id, token: this.token });
        //     let res = await GetMyId({ id: this.id, token: this.token })
        //     console.log(res);
        //     res.data.forEach(element => {
        //         this.form = element
        //         this.icon = `http://community.byesame.com/file/${element.icon}`
        //     });
        // },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }

}

</script>


<style scoped>
.form {
    width: 99%;
    margin-left: 3px;
}

.el-row {
    margin-top: 20px;
}

.box-card {
    margin-top: 10px;
    margin-bottom: 5px;
    width: 100%;
    height: 300px;
    background: #FFF;

}

.input>>>.el-input__inner {
    background-color: #FAFAFA;
    /*background-color: #f3f3f1;*/
    color: grey;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>