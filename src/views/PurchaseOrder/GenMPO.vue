<template>
    <div>
        <div class="demo-date-picker">
            <label style="padding-left: 25px;">
                
                    TxnNo
               

                <el-input style="width: 200px;" v-model="txnNo">
                    <template #suffix>
                        <el-button style="border: none;margin-right: -10px;" @click="getJobOrder">...</el-button>
                    </template>

                </el-input>

            </label>


            <label style="padding-left: 25px;">
                <el-button @click="search">Apply</el-button>
            </label>
            <label style="padding-left: 25px;">
                <el-button @click="genMpo">GenMPO</el-button>
            </label>
        </div>

    </div>
    <div>
        <JobOrder :visible="dialogVisible" @selected-job="getJobNo"></JobOrder>
        
    </div>
    <div style="display: flex; padding: 20px 0px 0px 0px;">
        <el-table :data="tableData" height="500" border style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="jobNo" fixed="left" label="Job No" width="90" />
            <el-table-column prop="styleNo" label="Style No" width="100" />
            <el-table-column prop="matCode" label="Material Code" width="120" />
            <el-table-column prop="tempMat" label="Temp Material" width="120" />
            <el-table-column prop="colorCode" label="Color Code" width="110" />
            <el-table-column prop="color" label="Color" width="100" />
            <el-table-column prop="sizes" label="Size" width="100" />
            <el-table-column prop="mrReqQty_B" label="Req Qty"></el-table-column>
            <el-table-column prop="mrOutsMpoQty_B" label="Oustanding MPO Qty" width="110"></el-table-column>
            <el-table-column prop="mrNetBalQty_B" label="Net Req Bal" width="105"></el-table-column>
            <el-table-column prop="newNetBal" label="Net Req Bal YDS" width="105"></el-table-column>
            <el-table-column prop="suppCode" label="Vendor"></el-table-column>
            <el-table-column prop="articleNo" label="Article No" width="100"></el-table-column>
            <el-table-column prop="buyUnit" label="Buy Unit" width="100"></el-table-column>
            <el-table-column prop="pxUnit" label="Price Unit" width="95"></el-table-column>
            <el-table-column prop="uPx" label="Price"></el-table-column>
            <el-table-column prop="description" fixed="right" label="Description" width="110"></el-table-column>

        </el-table>
    </div>
</template>
<script>
import { defineComponent, getCurrentInstance, ref ,inject} from 'vue';
import axios from 'axios'
import store from '@/store/index'
import http from '@/http/api'
import JobOrder from './JobOrder.vue'
export default defineComponent({
    name: "GenMPO",
    data() {
        return {
            mpo: "测试测试测试测试测试测试",
        };
    },
    setup(props,context) {
  
        
        const reload=inject('reload');
        const{proxy}=getCurrentInstance();
        
      

        var dialogVisible = ref(false);
        const txnNo = ref("");
        const mpoDate = ref("");
        const mpoDate1 = ref("");
        const mpoDate2 = ref("");
        const shortcuts = [
            {
                text: "Last week",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                },
            },
            {
                text: "Last month",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                },
            },
            {
                text: "Last 3 months",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                },
            },
        ];
        var tableData = ref([]);
        var selectedData = ref([]);
        function handleEdit() {
        }
        const handleDelete = function (index) {
        };
        function handleSelectionChange(selection) {
            selectedData.value = selection;
            store.commit("setSelectedData", selection);
            // for (let d of selectedData) {
            //     console.log(d["jobNo"]);
            //     console.log(d["matCode"]);
            // }
        }


        return {
            dialogVisible,
            txnNo,
            mpoDate,
            mpoDate1,
            mpoDate2,
            shortcuts,
            tableData,
            selectedData,
            handleEdit,
            handleDelete,
            handleSelectionChange,
            reload,

        };
    },
    props: {},
    methods: {
       
        getDateFormat() {
            return "YYYY-MM-DD";
        },
        getTableDateFormat(row) {
            let time = new Date(row.mpoDate);
            if (!time) {
                return "";
            }
            let year = time.getFullYear();
            let month = (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
            let day = (time.getDate() + 1) < 10 ? "0" + (time.getDate() + 1) : (time.getDate());
            return year + "-" + month + "-" + day;
        },
        defaultDate() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.mpoDate = [start, end];
        },
        search() {
            let params = {
                jobNo: this.txnNo,
            };
            http.mpo.getMpoView(params).then((res) => {
                this.tableData = res.data;
            }).catch((error) => {
                alert(error.message);
            });
        },
        getJobOrder() {
            this.dialogVisible = true;
        },
        getJobNo(value1, value2) {
            this.txnNo = value1;
            this.dialogVisible = value2
        },
        genMpo() {
            
            if (this.selectedData.length > 0){
                store.commit("updateEditState",false);
                this.$router.push({ name: 'EditMpo' })
                this.reload();
            }
                
        }
    },
    mounted() {
        //console.log("genMpo mounted test");
    },
    components: { JobOrder }
})  
</script>
<style lang="less" scoped>
.v-date-range ::v-deep(.el-input__prefix) {
    display: none;
}

.v-date-range ::v-deep(.el-input__inner) {
    padding: 0;
}

.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: left;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>