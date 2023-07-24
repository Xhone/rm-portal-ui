<template>
    <div>
      
            <p>Select to PackListNo</p>
            <el-select v-model="value" style="width:130px;" placeholder="Please Select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input type="text"  placeholder="Please input data!" v-model="fieldValue" maxlength="30"  style="width: 150px;"></el-input>
            <el-button type="primary" @click="packlistselect">Search</el-button>
            <br/>
            <br/>
            <br/>
            <br/>
            <el-table
                :data="tableData"
                style="width: 100%;height: 300px;"
                @cell-dblclick="bccelldblclick">
                    <el-table-column
                        prop="packNo"
                        label="PackListNo"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="packDate"
                        label="PackDate"
                        width="180">
                    </el-table-column>
            </el-table>
            

        
    </div>
</template>

<script>
import axios from 'axios';
import http from '@/http/api'

let serverUrl="https://localhost:44311/api/PackList"

export default{
  name: 'SelectPackList',
  data() {
        return {
            fieldValue:"",
            tableData:[],
            options: [{
                value: 'PackNo',
                label: 'PackListNo'
                }, {
                value: 'SuppCode',
                label: 'Factory'
                }, {
                value: 'PreparedBy',
                label: 'Prepared By'
                }, {
                value: 'SCHeading',
                label: 'SC Heading'
                },
                {
                value: 'TtlCtn',
                label: 'Ttl Ctn'
                },
                {
                value: 'TtlNW',
                label: 'Ttl NW'
                },
                {
                value: 'TtlGW',
                label: 'Ttl GW'
                }
            ],
            value:''
        }
        
    },
    setup(props,context) {
        
    },
    methods:
    {
        bccelldblclick(row){
            
            this.packlistno=row.packNo;
            this.$emit("onevent",this.packlistno);
            
        },
        packlistselect()
        {   //查询符合条件的数据
            let data={
                    fieldName:this.value,
                    filedValue:this.fieldValue
            }
            http.packlist.packlistselect(data).then((res)=>{
                this.tableData=[];
                res.data.forEach(element=>{
                    let vote={};
                    vote.packNo =element["packNo"];
                    vote.packDate=element["packDate"];
                    this.tableData.push(vote);
                });

            }).catch((res)=>{
                this.$notify({
                        title: 'error',
                        message: 'The query fails. Please contact the administrator！',
                        type: 'error'
                });   
            });
            // axios({
            //     url:serverUrl+'/SelectSomePackList',//服务器url
            //     method:"post",
            //     headers:{"Content-Type":"application/json"},  
            //     data:JSON.stringify({
            //         fieldName:this.value,
            //         filedValue:this.fieldValue
            //     })
            // }).then((res)=>{
            //     this.tableData=[];
            //     res.data.forEach(element=>{
            //         let vote={};
            //         vote.packNo =element["packNo"];
            //         vote.packDate=element["packDate"];
            //         this.tableData.push(vote);
            //     });

            // }).catch((res)=>{
               
            // });
        }
    },
    created(){
        this.value=this.options[0].value;

    },
    mounted() {

        http.packlist.packlistAllselect().then((res)=>{
            console.log(res.data);
            res.data.forEach(element=>{
                let vote={};
                vote.packNo =element["packNo"];
                vote.packDate=element["packDate"];
                this.tableData.push(vote);
            });
        }).catch((res)=>{
            this.$notify({
                        title: 'error',
                        message: 'The query fails. Please contact the administrator！',
                        type: 'error'
             });   
        });
        // axios({
        //     url:serverUrl+'/selectPackList',//服务器url
        //     method:"post"
        // }).then((res)=>{
        //     console.log(res.data);
        //     res.data.forEach(element=>{
        //         let vote={};
        //         vote.packNo =element["packNo"];
        //         vote.packDate=element["packDate"];
        //         this.tableData.push(vote);
        //     });
        // }).catch((res)=>{
        //     this.$notify({
        //                 title: 'error',
        //                 message: 'The query fails. Please contact the administrator！',
        //                 type: 'error'
        //      });   
        // });
    }
}


</script>

<style scoped>
</style>
