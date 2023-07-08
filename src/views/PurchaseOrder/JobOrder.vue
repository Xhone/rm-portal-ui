<template>
    <div>
        <div style="float: left;padding-top:0px;">
            <el-dialog v-model="dialogVisible" style="width: 50%;" @close="closeDialog" draggable="true">
                <el-form :model="formData" :inline="true" style="margin-left: -20px;">
                    <el-form-item style="margin-left: -200px;">
                        <el-select v-model="formData.filterName">
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input style="margin-left: -20px;" v-model="formData.filterValue1" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <span style="margin-left: -40px;">To</span>
                    </el-form-item>
                    <el-form-item>
                        <el-input style="margin-left: -50px;" v-model="formData.filterValue2" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: -40px;" @click="search">Search</el-button>
                    </el-form-item>
                    <el-table :data="tempData" border style="width:100%" @row-dblclick="dbSelected">
                        <el-table-column label="Job No" fixed="left" prop="jobNo" width="100"></el-table-column>
                        <el-table-column label="Job Date" prop="jobDate" width="100"></el-table-column>
                        <el-table-column label="Job Type" prop="jobType" width="100"></el-table-column>
                        <el-table-column label="Style No" prop="styleNo" width="100"></el-table-column>
                        <el-table-column label="Factory" prop="suppCode" width="100"></el-table-column>
                        <el-table-column label="Customer" prop="custCode" width="100"></el-table-column>
                        <el-table-column label="Customer Style No" prop="custStyle" width="100"></el-table-column>
                        <el-table-column label="Season" prop="season" width="100"></el-table-column>
                        <el-table-column label="Delivery Date" prop="jobDeliDate" width="90"></el-table-column>
                        <el-table-column label="Sales Team" fixed="right" prop="salesTeamCode"
                            width="102"></el-table-column>
                    </el-table>
                    <el-pagination :current-page="currentPage" :total="total" :page-size="pageSize"
                        layout="prev,pager,next,total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                        <span class="dialog-footer">
                    <el-button @click="cancelDialog">Cancel</el-button>
                </span>
                </el-form>
               
            </el-dialog>
        </div>
        <div>



        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import http from '@/http/api'

const props = defineProps(["visible"]);
const emit = defineEmits(['selectedJob']);

const formData = reactive({
    filterName: 'JobNo',
    filterValue1: '',
    filterValue2: ''
})



const options = [{
    value: 'JobNo',
    label: 'Job No',
},
{
    value: 'JobType',
    label: 'Job Type',
},
{
    value: 'StyleNo',
    label: 'StyleNo',
},
{
    value: 'SuppCode',
    label: 'Factory',
},
{
    value: 'CustCode',
    label: 'Customer',
},
{
    value: 'CustStyle',
    label: 'Customer Style No',
},
{
    value: 'Season',
    label: 'Season',
},
];
var jobNo=ref('');
var dialogVisible = ref(false);
const jobData = ref([]);
var tempData = ref([]);
var currentPage = ref(1);
var pageSize = ref(10);
var total = ref(500);
const columns = ref([]);

//分页方法
const currentChangePage = (list, current) => {
    let from = (current - 1) * pageSize.value;
    let to = current * pageSize.value;
    tempData = ref([]);
    for (; from < to; from++) {
        if (list[from]) {
            tempData.value.push(list[from]);

        }
    }

}
//分页
//页码切换
const handleCurrentChange = (current) => {
    currentPage.value = current;

    currentChangePage(jobData.value, current);
}
//每页条数切换
const handleSizeChange = (size) => {
    pageSize.value = size;
    handleCurrentChange(currentPage.value);


}

const search = () => {
    let data = {
        name: formData.filterName,
        value1: formData.filterValue1,
        value2: formData.filterValue2
    }
    http.mpo.getJobDataByFilter(data)
        .then((res) => {
            jobData.value = res.data;
            tempData.value = res.data;
            total.value = res.data.length;

            handleCurrentChange(1);
        })
        .catch((error) => {
            alert(error);
        })
}

const closeDialog=()=>{
    dialogVisible=false;
    emit('selectedJob', jobNo.value, false);
    //console.log("close: "+dialogVisible);
}

const cancelDialog=()=>{
    dialogVisible=false;
    emit('selectedJob', jobNo.value, false);
}

const initColumns = () => {
    columns.value = [
        { prop: 'jobNo', label: 'Job No', width: 100 },

    ];
}

const initJobData = () => {
    http.mpo.getJobData().then((res) => {
        jobData.value = res.data;
        tempData.value = res.data;
        total.value = res.data.length;

        handleCurrentChange(1);
    }).catch((error) => {
        console.log(error);
    })
}

const dbSelected = (row) => {
    //console.log(row["jobNo"]);
    jobNo.value=row["jobNo"];
    emit('selectedJob', row["jobNo"], false);
    dialogVisible = false;
}

watch(props, (newProps) => {
    dialogVisible = newProps.visible;
    //console.log(newProps.visible);
})

onMounted(() => {
    formData.filterValue1 = "";
    formData.filterValue2 = "";
   
    initColumns();
    initJobData();
})
</script>

<style scoped></style>