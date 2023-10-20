<template>
    <div id="repair">
        <br>
        <div class="repair1">
            <el-tabs type="border-card">
            <el-tab-pane label="维修处理">
                <div class="zim1">
                    <div @click="gotuone()" style="background-color: #20a0ff;">
                        <li>
                            <i class="el-icon-headset"></i>
                        </li>
                        <p>智能设备维修</p>
                    </div>
                    <div @click="gototwo()" style="background-color: #13ce66;">
                        <li>
                            <i class="el-icon-office-building"></i>
                        </li>
                        <p>家具设备维修</p>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            gotuone(){
                this.$router.push('/service/smartRepair')
            },
            gototwo(){
                this.$router.push('/service/houseRepair')
            }
        }
    }
</script>
<style>
#repair {
    width: 100%;
    height: 382px;
    background-color: #f0f0f0;

}

.repair1 {
    width: 1800px;
    /* height: 322px; */
    background-color: #ffffff;
    margin: 0 auto;
}

.zim1 {
    width: 580px;
    height: 178px;
    margin-top: 60px;
    margin-left: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
}

.zim1 div {
    width: 252px;
    height: 158px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.el-icon-headset {
    font-size: 100px;
    color: white;
}

.el-icon-office-building {
    font-size: 100px;
    color: white;
}

p {
    font-size: 18px;
    color: white;
}

li {
    list-style: none;
}
</style>