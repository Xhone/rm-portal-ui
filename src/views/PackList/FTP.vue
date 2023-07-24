<template>
    <div>
        <p>Uploading files through FTP</p>
        <el-input  placeholder="Please enter data!"  maxlength="10"></el-input>
        <el-form :model="upform" :rules="uprules" style="width:100%;" ref="upform" label-width="100px">
                <el-form-item label="Upload attachment:">
                    <el-button type="primary"
                                    @click="upLoad()"
                                    size="mini"
                                    class="form-btn"
                                    >Click to upload</el-button>
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
              _this.$message.warning("The file format to be uploaded must be xlsx");
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