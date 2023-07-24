<template>
    <div id="div1">
            <table>
                <!-- <tr>
                    <td>
                        <p>PONumber:</p>
                    </td>
                    <td>
                        <el-input type="text" v-model="poNumber" placeholder="Please enter content"></el-input>
                    </td> 
                    <td>
                        <download-excel
                                :data   = "pojson_data"
                                :fields = "pojson_fields"                             
                                :name = "excelponame" 
                                :before-finish="finishDownload"
                                >listno
                                <el-button type="primary" v-text="btn2" @click="getPoExcel"></el-button>
                        </download-excel>
                    </td> 
                </tr> -->
                <tr> 
                    <td>
                        <p>PackNumber:</p>
                    </td>
                    <td>
                        <el-input type="text" v-model="packNumber" style="width: 150px;" placeholder="Please enter content"></el-input>
                    </td>
                    <td>
                            <el-button type="primary" v-text="btn1" @click="getPackListExcel"></el-button>       
                    </td>
                </tr>
                <tr>
                    <td>
                        FTP文件上传：
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="#"
                            :http-request="uploadSectionFile"
                            :on-preview="handlePreview"
                            :before-upload="beforeUpload"
                            multiple
                            :on-exceed="handleExceed"
                            :show-file-list="true"
                            :file-list="fileList"
                        >
                            <el-button :loading="loading" size="small" type="primary" @click="uploadDoSomthing">点击上传</el-button>
                        </el-upload>

                    </td>
                    <td>     
                        

                        
                    </td>
                </tr>
            </table>
            
            
     
            
           
    </div>
</template>

<script>


//需要安装依赖 npm install vue-json-excel
import axios from 'axios';
import { ref } from 'vue';
import Qs from "qs"	
import http from '@/http/api'

let year = new Date().getFullYear();
let month = new Date().getMonth() +1;
let day = new Date().getDate();
let hour = new Date().getHours();
let minute = new Date().getMinutes();
let second = new Date().getSeconds();

//let serverUrl="https://localhost:44311/api/PackList"

export default{
    
    name:"exportPackListExcel",
    props:{
        packlistno:{
            type:String,
            default:""
        }
    },
    data(){
        return{
            tp:"",
            poNumber:"",
_packNumber: this.packlistno,
get packNumber() {
return this._packNumber;
},
set packNumber(value) {
this._packNumber = value;
},
            fileList: [],
            btn1:"Export PackList excel",
            btn2:"Export PO  Excel",
            btn3:"上传",
            excelponame:"POExcel"+year+"-"+month+"-"+day+"-"+hour+":"+minute+":"+second,
            message:"已导出",
            pojson_data:[],
            pojson_fields: {  //导出Excel表格的表头设置
                'PO_ORDER_ID': 'po_order_id',
                'VERSION': 'version',
                'PO_ORDER_DATE':'po_order_date',
                'GMT_SUPPLIER_CODE': 'gmt_supplier_code',
                'YARN_SUPPLIER_COUNTRY': 'yarn_supplier_country',
                'CCY': 'ccy',
                'STATUS_CODE': 'status_code',
                'SHIP_DATE':'ship_date',
                'JOBNOS': 'jobnos',
                'DLY_COUNTRY': 'dly_country',
                'GMT_SUPPLIER_CONPER': 'gmt_supplier_conper',
                'MERCHANDISER': 'merchandiser',
                'UOM':'uom',
                'ORIGIN':'origin',
                'AMOUNT':'amount',
                'DEST_PORT':'dest_port',
                'QTY':'qty',
                'PRICE':'price',
                'YARN_SUPPLIER_ADDR':'yarn_supplier_addr',
                'COUNTRY_ORIGIN':'country_origin',
                'DEST_PORT_COUNTRY':'dest_port_country',
                'PAY_TERM_CODE':'pay_term_code',
                'DLY_COUNTRY':'dly_country',
                'SHIP_MODE':'ship_mode',
                'SEASON_CODE':'season_code',
                'SEASON_YEAR':'season_year',
                'CUST_CODE':'cust_code',
                'COLOR_DESC':'color_desc',
                'COLOR_REF':'color_ref',
                'COLOR_REF2':'color_ref2'

               
            },
            tables:[],
            excelplname:"PackListExcel"+year+"-"+month+"-"+day+"-"+hour+":"+minute+":"+second,
            pljson_data:[],
            pljson_fields: {  //导出Excel表格的表头设置
                'PONO': 'pono',
                'MATERIALCODE': 'materialcode',
                'COLORCODE':'colorcode',
                'SIZE': 'size',
                'LOT': 'lot',
                'ROLL_NO': 'roll_no',
                'QTYINKG': 'qtyinkg',
                'UNIT':'unit',
                'NW': 'nw',
                'GW': 'gw',
                'INVOICE_NO': 'invoice_no',
                'JOBNUM': 'jobnum'
               
            },
            isOneCycle:"true"
            
        }
    },
    mounted(){
        console.log(this.packlistno);
    },
    methods:{
        uploadDoSomthing(){
            this.isOneCycle="true"
        },
        // 上传附件开始
        uploadSectionFile(param) {
            //创建临时的路径
            
            var filesArray = []
            let file = param.file
            filesArray.push(file)
            var nameArray=[]
            this.tables=[]
            filesArray.forEach(row=>{
                this.tables.push(row.name);
              
            })
            console.log(this.tables);
            let data={
                name:this.tables
            }
            http.packlist.uploadSectionFile(data).then(res=>{
                    if(res.data){
                            this.$notify({
                                    title: 'success',
                                    message: 'Upload successfully',
                                    type: 'success'
                            });
                            this.fileList=[]
                            this.tables=[]
                        }else{
                            this.$notify({
                                    title: 'error',
                                    message: 'Upload failure',
                                    type: 'error'
                            });
                        }
                }).catch(res=>{
                    this.$notify({
                                    title: 'error',
                                    message: 'Upload failure',
                                    type: 'error'
                            });
                })
                // axios({
                //         method:'post',
                //         url:serverUrl+'/uploadFTP',//服务器url
                //         headers:{"Content-Type":"application/json"},     
                //         data: JSON.stringify({
                //             name:this.tables
                //         })
                        
                // }).then(res=>{
                //     if(res.data){
                //             this.$notify({
                //                     title: '成功',
                //                     message: '上传成功',
                //                     type: 'success'
                //             });
                //             this.fileList=[]
                //             this.tables=[]
                //         }else{
                //             this.$notify({
                //                     title: '失败',
                //                     message: '失败成功',
                //                     type: 'error'
                //             });
                //         }
                // }).catch(res=>{
                //     this.$notify({
                //                     title: '失败',
                //                     message: '失败成功',
                //                     type: 'error'
                //             });
                // })
                this.isOneCycle="false";
            
            
        },
        // 上传附件删除
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // 上传限制
        beforeUpload(file){
            var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xls'
            const extension2 = testmsg === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 20
            if(!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8 && !extension9 && !extension10 && !extension11 && !extension12 && !extension13 && !extension14) {
                this.$message({
                message: '上传文件只能是xls/xlsx格式!',
                type: 'warning'
                });
            }
            if(!isLt2M) {
                this.$message({
                message: '上传文件大小不能超过 20MB!',
                type: 'warning'
                });
            }
            return extension && isLt2M || extension2 && isLt2M || extension3 && isLt2M || extension4 && isLt2M || extension5 && isLt2M || extension6 && isLt2M || extension7 && isLt2M || extension8 && isLt2M || extension9 && isLt2M || extension10 && isLt2M || extension11 && isLt2M || extension12 && isLt2M || extension13 && isLt2M || extension14 && isLt2M
        },

        finishDownload(){
            alert("Export Complete");
            this.fileList=[]
        },
        getPackListExcel(){
          
            if(this.packlistno==""){
                alert("Receipt number is empty, please enter！");
            }else{
                let data={id:this.packlistno}

                http.packlist.exportPackListExcel(data).then((res) =>{
                    console.log(res.data);
                    if(res.data){
                        this.$notify({
                                title: 'export success',
                                message: 'The file is in D:\\Excel',
                                type: 'success'
                        });
                        this.$emit("onevent",this.message);
                    }
                   
                }).catch((res) =>{
                    alert("The export fails.Please contact the administrator!");
                });

                // axios({
                //     method:'get',
                //     url:serverUrl+'/GetPackListExcel?id='+this.packlistno,//服务器url
                
                // }).then((res) =>{
                //     console.log(res.data);
                //     if(res.data){
                //         this.$notify({
                //                 title: '导入成功',
                //                 message: '文件在D:\\Excel中',
                //                 type: 'success'
                //         });
                //         this.$emit("onevent",this.message);
                //     }
                   
                // }).catch((res) =>{
                //     alert("The export fails.Please contact the administrator!");
                // })
            }
            
        },

        getPoExcel()
        {
            if(this.poNumber==""){
                alert("Purchase order number is empty, please enter！");
            }else{
                    let data={id:this.poNumber}
                    http.packlist.getPoExcel(data).then((res)=>{
                            console.log(res.data);
                            this.pojson_data=[];
                            res.data.forEach(element => {
                                let vote = {}
                                vote.po_order_id=element["poorderid"]
                                vote.version=element["version"]
                                vote.po_order_date=element["poorderdate"]
                                vote.gmt_supplier_code=element["gmtsuppliercode"]
                                vote.yarn_supplier_country=element["yarnsuppliercountry"]
                                vote.ccy=element["ccy"]
                                vote.status_code=element["statuscode"]
                                vote.ship_date=element["shipdate"]
                                vote.jobnos=element["jobnos"]
                                vote.dly_country=element["dlycountry"]
                                vote.gmt_supplier_conper=element["gmtsupplierconper"]
                                vote.merchandiser=element["merchandiser"]
                                vote.uom=element["uom"]
                                vote.origin=element["origin"]
                                vote.amount=element["amount"]
                                vote.dest_port=element["destport"]
                                vote.qty=element["qty"]
                                vote.price=element["price"]
                                vote.yarn_supplier_addr=element["yarnsupplieraddr"]
                                vote.country_origin=element["countryorigin"]
                                vote.dest_port_country=element["dest_portcountry"]
                                vote.pay_term_code=element["paytermcode"]
                                vote.dly_country=element["dlycountry"]
                                vote.ship_mode=element["shipmode"]
                                vote.season_code=element["seasoncode"]
                                vote.season_year=element["seasonyear"]
                                vote.cust_code=element["custcode"]
                                vote.color_desc=element["colordesc"]
                                vote.color_ref=element["colorref"]
                                vote.color_ref2=element["colorref2"]
                                this.pojson_data.push(vote)
                            });
                            alert("Export complete!");

                    }).catch((res)=>{
                        alert("The export fails.Please contact the administrator!");

                    })
                    // axios({
                    // methods:"get",
                    // url:serverUrl+'/GetPOExcel?id='+this.poNumber,
                    // }).then((res)=>{
                    //         console.log(res.data);
                    //         this.pojson_data=[];
                    //         res.data.forEach(element => {
                    //             let vote = {}
                    //             vote.po_order_id=element["poorderid"]
                    //             vote.version=element["version"]
                    //             vote.po_order_date=element["poorderdate"]
                    //             vote.gmt_supplier_code=element["gmtsuppliercode"]
                    //             vote.yarn_supplier_country=element["yarnsuppliercountry"]
                    //             vote.ccy=element["ccy"]
                    //             vote.status_code=element["statuscode"]
                    //             vote.ship_date=element["shipdate"]
                    //             vote.jobnos=element["jobnos"]
                    //             vote.dly_country=element["dlycountry"]
                    //             vote.gmt_supplier_conper=element["gmtsupplierconper"]
                    //             vote.merchandiser=element["merchandiser"]
                    //             vote.uom=element["uom"]
                    //             vote.origin=element["origin"]
                    //             vote.amount=element["amount"]
                    //             vote.dest_port=element["destport"]
                    //             vote.qty=element["qty"]
                    //             vote.price=element["price"]
                    //             vote.yarn_supplier_addr=element["yarnsupplieraddr"]
                    //             vote.country_origin=element["countryorigin"]
                    //             vote.dest_port_country=element["dest_portcountry"]
                    //             vote.pay_term_code=element["paytermcode"]
                    //             vote.dly_country=element["dlycountry"]
                    //             vote.ship_mode=element["shipmode"]
                    //             vote.season_code=element["seasoncode"]
                    //             vote.season_year=element["seasonyear"]
                    //             vote.cust_code=element["custcode"]
                    //             vote.color_desc=element["colordesc"]
                    //             vote.color_ref=element["colorref"]
                    //             vote.color_ref2=element["colorref2"]
                    //             this.pojson_data.push(vote)
                    //         });
                    //         alert("Export complete!");

                    // }).catch((res)=>{
                    //     alert("The export fails.Please contact the administrator!");

                    // })

            }

            
        }
   
    }
}
</script>


<style scoped>
#div1{

    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width:900px;
    height:300px;
    text-align: center;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
table{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    margin-top: 20px;
    padding: 0;
    
}
td{
    width:250px;
    padding: 0;
    text-align: left;
}
.fansdialog /deep/ .el-dialog__body {
    height: 20vh;
    overflow: auto;
  }
</style>