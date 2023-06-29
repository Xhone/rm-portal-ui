<template>
    <div>
        <div class="demo-date-picker">
            <label style="padding-left: 25px;">
                <span>
                    MpoNo
                </span>
                <el-input style="width: 200px;" v-model="mpoNo" />

            </label>

            <label style="padding-left: 25px;">
                <span>MpoDate</span>
                <el-date-picker v-model="mpoDate" type="daterange" unlink-panels range-separator="To"
                    start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts"
                    :value-format="getDateFormat()" />
            </label>
            <label style="padding-left: 25px;">
                <el-button @click="search">Search</el-button>
            </label>
        </div>
        <span>{{ mpoDate1 }}</span>
    </div>
    <div style="display: flex; padding: 20px 0px 0px 0px;">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="mpoNo" label="MpoNo" width="100" />
            <el-table-column prop="mpoDate" label="MpoDate" width="100" :formatter="getTableDateFormat" />
            <el-table-column prop="mpoType" label="MpoType" width="100" />
            <el-table-column prop="attn" label="Attn" width="100" />
            <el-table-column prop="heading" label="Heading" width="100" />
            <el-table-column prop="shipMode" label="Ship Mode" width="100" />
            <el-table-column prop="shippment" label="Shippment" width="100" />
            <el-table-column prop="supplier" label="Supplier" width="100" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios'
import http from '@/http/api'
import { alertProps } from 'element-plus';
export default defineComponent({
    name: 'SearchMPO',
    data() {
        return {
            mpo: "测试测试测试测试测试测试",

        }
    },
    setup() {
        const mpoNo = ref('');
        const mpoDate = ref('');
        const mpoDate1 = ref('');
        const mpoDate2 = ref('');
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
        const tableData = ref([
            {
                mpoNo: 'fb24-5480',
                mpoDate: '2018-08-05',
                mpoType: '',
                attn: 'simons',
                heading: 'hcw',
                shipMode: 'sea',
                shipment: '2018-09-01',
                supplier: 'WAFUKN',
            },
        ]);
        function handleEdit(index) {
            alert(index)
        }
        // const handleEdit = (index) => {

        // }
        const handleDelete = (index) => {

        }
        return {
            mpoNo,
            mpoDate,
            mpoDate1,
            mpoDate2,
            shortcuts,
            tableData,
            handleEdit,
            handleDelete,
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
        defaultDate() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            this.mpoDate = [start, end];
        },
        search() {
            if (this.mpoDate != '') {
                this.mpoDate1 = this.mpoDate[0]
                this.mpoDate2 = this.mpoDate[1]
            }
            let params = {
                mpo: this.mpoNo,
                start: this.mpoDate1,
                end: this.mpoDate2
            }

            http.mpo.getMpoHd(params).then((res) => {
                this.tableData = res.data

            }).catch((error) => {
                alert(error.message)
            })

        }
    },
    mounted() {

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