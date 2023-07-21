<template>
    <div>
        <p>FTP上传文件</p>
        <el-input  placeholder="请输入数据!"  maxlength="10"></el-input>
        <el-form :model="upform" :rules="uprules" style="width:100%;" ref="upform" label-width="100px">
                <el-form-item label="上传附件:">
                    <el-button type="primary"
                                    @click="upLoad()"
                                    size="mini"
                                    class="form-btn"
                                    >点击上传</el-button>
        </el-form-item>
</el-form>
    </div>
</template>

<script>
import axios from 'axios';


export default{
  name: 'UploadCommon',
  data() {
        return {}
        
    },
    methods:
    {
        // 请求-上传附件
    upLoad() {
        const _this = this;
        const fileType = ['xls','xlsx','et']
        const inputFile = document.createElement("input")
        inputFile.type = "file"
        inputFile.style.display = "none"
        document.body.appendChild(inputFile)
        inputFile.click()
        inputFile.addEventListener("change",function() {
            const file = inputFile.files[0];
            var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
            if (!fileType.includes(testmsg)) {
              _this.$message.warning("上传的文件格式只能是,xls,xlsx,et");
              document.body.removeChild(inputFile);
              return false;
            }
             const formData = new FormData();
             formData.append("file", file);
             console.log(file);    
            })
        }
    }
}


</script>

<style scoped>
</style>