<template>
    <div class="sblock">
     <el-tabs @tab-click="selectedTabHandle">
        <el-tab-pane label="GenMpo">GenMPO</el-tab-pane>
        <el-tab-pane label="New">New</el-tab-pane>
        <el-button type="primary" @click="this.$router.push({ name: 'GenMPO' })">GenMpo</el-button>
        <el-button type="primary" @click="this.$router.push({name:'EditMpo'})">New</el-button>
     </el-tabs>
       
    </div>
    <div>
        <div class="sblock">
            <label>MpoNo: </label>
            <el-input style="width: 150px;" v-model="mpoNo" />

            <label>MpoType: </label>
            <el-select style="width: 150px;" clearable v-model="mpoType">
                <el-option v-for="item in mpoTypes" :value="item"></el-option>
            </el-select>
            <label>Status: </label>
            <el-select style="width: 150px;" clearable v-model="mpoStatus">
                <el-option v-for="item in status" :value="item" />
            </el-select>

            <label>
                <el-button type="primary" @click="search">Search</el-button>
            </label>
        </div>
        <div class="sblock">
            <label>JobNo: </label>
            <el-input style="width: 150px;" />

            <label>Supplier: </label>
            <el-select style="width: 150px;" clearable v-model="supplier">
                <el-option v-for="item in suppliers" :value="item.suppCode" />
            </el-select>

            <label>MpoDate:</label>
            <el-date-picker v-model="mpoDate" type="daterange" unlink-panels range-separator="To"
                start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts"
                :value-format="getDateFormat()" />


        </div>
    </div>

    <!-- <div class="demo-date-picker">
        <label>
            <span>
                MpoNo
            </span>
            <el-input style="width: 200px;"  />
        </label>

        <label>
            <span>MpoDate</span>
            <el-date-picker v-model="mpoDate" type="daterange" unlink-panels range-separator="To"
                start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts"
                :value-format="getDateFormat()" />
        </label>

        <label>
            <el-button @click="search">Search</el-button>
        </label>
    </div> -->

    <div style="display: flex; padding: 20px 0px 0px 0px;">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">Edit</el-button>
                    <el-button size="small" type="danger"
                        @click="handleDelete(scope.$index, scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="mpoNo" label="MpoNo" width="100" />
            <el-table-column prop="mpoDate" label="MpoDate" width="100" :formatter="getTableDateFormat" />
            <el-table-column prop="mpoType" label="MpoType" width="100" />
            <el-table-column prop="jobNo" label="Job No" width="100" />
            <el-table-column prop="heading" label="Heading" width="100" />
            <el-table-column prop="supplier" label="Supplier" width="100" />
            <el-table-column prop="shippedTo" label="Ship To" width="100" />
            <el-table-column prop="shipMode" label="Ship Mode" width="100" />
            <el-table-column prop="shipDate" label="ShipDate" width="100" :formatter="getTableDateFormat" />
            <el-table-column prop="status" label="Status" width="100" />
            <el-table-column prop="ccy" label="Currency" width="100" />
            <el-table-column prop="terms" label="Terms" width="100" />
            <el-table-column prop="payment" fixed="right" label="Payment" width="100" />
            <el-table-column prop="attn" label="Attn" width="100" />

        </el-table>
    </div>
</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import http from '@/http/api'
import { alertProps } from 'element-plus';
import store from '@/store';
import router from '@/router'
export default defineComponent({
    name: 'SearchMPO',
    data() {
        return {
            mpo: "测试测试测试测试测试测试",

        }
    },
    setup(props, context) {
        store.commit("clearMpoData");
        // 获取全局属性和方法
        const { proxy } = getCurrentInstance();

        const mpoNo = ref('');
        const mpoDate = ref('');
        const supplier = ref('');
        const suppliers = ref([]);
        const mpoType = ref('');
        const mpoTypes = ref(["BUY TO ORDER", "PROVIDED BY CLIENT", "DEFECT REPLACEMENT", "ADDITIONAL PURCHASE", "PURCHASE CALICO"])
        const mpoStatus = ref('');
        const status = ref(["Open", "Cancel", "Complete"]);

        const shortcuts = [
            {
                text: 'Last week',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    return [start, end]
                },
            },
            {
                text: 'Last month',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    return [start, end]
                },
            },
            {
                text: 'Last 3 months',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                    return [start, end]
                },
            },
        ];
        var tableData = ref([]);
        function handleEdit(id) {
            let params = {
                id: id
            }
            http.mpo.getMpo(params).then((res) => {
                if (res.status === 200) {
                    let data = res.data;
                    store.commit("setMpoData", data);
                    store.commit("updateEditState", true);
                    router.push({ name: "EditMpo" });
                }

                if (res.status === 404) {
                    router.push("/404");
                    store.commit("clearMpoData");
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    router.push("/404");
                    store.commit("clearMpoData");
                }
            })


        }

        const handleDelete = (index, id) => {
            let params = {
                id: id
            }
            http.mpo.deleteMpo(params).then((res) => {
                if (res.status === 200) {
                    proxy.$message({
                        message: "The data has been deleted successfully.",
                        type: "info"
                    });
                    tableData.value.splice(index, 1);
                }
            }).catch((error) => {
                proxy.$message({ message: 'Failed to delete data', type: 'error' })

            })


        }

        const selectedTabHandle=(pane,event)=>{
            console.log(pane.label);
            if(pane.label==="GenMpo"){
                proxy.$router.push({ name: 'GenMPO' })
            }
        }

        function defaultDate() {

            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)

            mpoDate.value = [start, end];

            //console.log(store.state.suppliers);
            if(sessionStorage.getItem("supplier")){
                suppliers.value=JSON.parse(sessionStorage.getItem("supplier"));
            }


        }



        return {
            mpoNo,
            mpoDate,
            supplier,
            suppliers,
            mpoType,
            mpoTypes,
            mpoStatus,
            status,
            shortcuts,
            tableData,
            handleEdit,
            handleDelete,
            selectedTabHandle,
            defaultDate,
        }

    },
    methods: {
        test() {
            alert(this.mpo);
        },
        getDateFormat() {
            return 'YYYY-MM-DD'
        },
        getTableDateFormat(row) {
            let time = new Date(row.mpoDate)
            if (!time) {
                return ''
            }

            let year = time.getFullYear()
            let month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
            let day = (time.getDate() + 1) < 10 ? '0' + (time.getDate() + 1) : (time.getDate())
            return year + '-' + month + '-' + day
        },

        search() {
            if (this.mpoDate) {
                var mpoDate1 = this.mpoDate[0]
                var mpoDate2 = this.mpoDate[1]
            }
            var temp = null;
            switch (this.mpoStatus) {
                case 'Open':
                    temp = 'O';
                    break
                case 'Complete':
                    temp = 'C';
                    break
                case 'Cancel':
                    temp = 'X';
                default:
                    break;
            }
            let params = {
                mpo: this.mpoNo,
                mpoType: this.mpoType,
                supplier: this.supplier,
                status: temp,
                jobNo: this.jobNo,
                start: mpoDate1,
                end: mpoDate2
            }

            http.mpo.getMpoHd(params).then((res) => {

                this.tableData = res.data

            }).catch((error) => {
                this.$message({ message: 'failed request, ' + error, type: 'error' })
            })

        }
    },
    mounted() {
        this.defaultDate();
        this.search();


        //console.log("search mounted test");
    },
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
    padding: 0px, 20px;
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

.sblock {
    width: 1200px;
    display: flex;
    margin: 8px 0;
}

label {
    display: inline-block;
    width: 120px;
    //padding-left: 25px;
    text-align: right;
    vertical-align: text-top;

}
</style>