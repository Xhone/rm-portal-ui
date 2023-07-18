<template>
    <div>
        <div style="float: left;padding-top:0px;">
            <el-dialog v-model="dialogVisible" style="width: 50%;" @close="closeDialog" draggable="false">
                <el-form :model="formData" :inline="true" style="margin-left: 0px;">
                    <el-form-item style="margin-left: 0px;">
                        <el-select v-model="formData.filterName">
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input style="margin-left: 0px;" v-model="formData.filterValue1" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <span style="margin-left: 0px;">To</span>
                    </el-form-item>
                    <el-form-item>
                        <el-input style="margin-left: 0px;" v-model="formData.filterValue2" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: 0px;" @click="search">Search</el-button>
                    </el-form-item>
                    <el-form-item style="margin-left: 0px;">
                        <el-table :data="tempData" border style="width:100%" @row-dblclick="dbSelected">
                            <el-table-column label="Mat Code" prop="matCode" width="100"></el-table-column>
                            <el-table-column label="Type" prop="type" width="100"></el-table-column>
                            <el-table-column label="Sub Type" prop="subType" width="100"></el-table-column>
                            <el-table-column label="Description" prop="description" width="100"></el-table-column>
                            <el-table-column label="Unit" prop="unit" width="100"></el-table-column>
                            <el-table-column label="Active" prop="active" width="100"></el-table-column>

                        </el-table>



                    </el-form-item>
                    <el-form-item>
                        <el-pagination :current-page="currentPage" :total="total" :page-size="pageSize"
                            layout="prev,pager,next,total" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                        <span class="dialog-footer">
                            <el-button @click="cancelDialog">Cancel</el-button>
                        </span>
                    </el-form-item>
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
const emit = defineEmits(['selectedMatCode']);

const formData = reactive({
    filterName: 'MatCode',
    filterValue1: '',
    filterValue2: ''
})



const options = [{
    value: 'MatCode',
    label: 'Mat Code',
},
{
    value: 'Type',
    label: 'Type',
},
{
    value: 'SubType',
    label: 'Sub Type',
},
];
var matCode = ref('');
var dialogVisible = ref(false);
const materialData = ref([]);
var tempData = ref([]);
var currentPage = ref(1);
var pageSize = ref(10);
var total = ref(500);


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

    currentChangePage(materialData.value, current);
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
    http.dtrade.getMaterialDataByFilter(data)
        .then((res) => {
            materialData.value = res.data;
            tempData.value = res.data;
            total.value = res.data.length;

            handleCurrentChange(1);
        })
        .catch((error) => {
            alert(error);
        })
}

const closeDialog = () => {
    dialogVisible = false;
    emit('selectedMatCode', matCode.value, false);
    //console.log("close: "+dialogVisible);
}

const cancelDialog = () => {
    dialogVisible = false;
    emit('selectedMatCode', matCode.value, false);
}



const initMaterialData = () => {
    http.dtrade.getMaterialData().then((res) => {
        materialData.value = res.data;
        tempData.value = res.data;
        total.value = res.data.length;

        handleCurrentChange(1);
    }).catch((error) => {
        console.log(error);
    })
}

const dbSelected = (row) => {

    matCode.value = row["matCode"];
    emit('selectedMatCode', row["matCode"], false);
    dialogVisible = false;
}

watch(props, (newProps) => {
    dialogVisible = newProps.visible;
    //console.log(newProps.visible);
})

onMounted(() => {
    formData.filterValue1 = "";
    formData.filterValue2 = "";


    initMaterialData();
})
</script>

<style scoped></style>