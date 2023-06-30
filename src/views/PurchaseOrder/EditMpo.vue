<template>
    <div style="position: absolute;">
        <el-form :model="mpoForm" label-width="120px" class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Mpo No">
                        <el-input v-model="mpoForm.mpoNo" style="width: 210px;" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Mpo Date">
                        <el-date-picker v-model="mpoForm.mpoDate" placeholder="Mpo Date" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Attn">
                        <el-input v-model="mpoForm.attn" style="width: 210px;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Mpo Type">
                        <el-select v-model="mpoForm.mpoType">
                            <el-option v-for="item in mpoTypes" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Revised Date">
                        <el-date-picker v-model="mpoForm.revisedDate" placeholder="Revised Date" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Ship Mode">
                        <el-select v-model="mpoForm.shipMode">
                            <el-option v-for="item in shipModes" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Heading">
                        <el-select v-model="mpoForm.heading">
                            <el-option v-for="item in headings" :key="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="Shipment">
                        <el-date-picker v-model="mpoForm.shipmentDate" />
                    </el-form-item>
                </el-col>
                <el-col :span="3">

                    <el-select v-model="mpoForm.lighting">
                        <el-option v-for="item in lightings" :value="item" />
                    </el-select>

                </el-col>
                <el-col :span="8">
                    <el-form-item label="Shipped To">
                        <el-select v-model="mpoForm.shippedTo">

                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="Supplier" class="grid-content ep-bg-purple">

                        <el-select v-model="mpoForm.supplier"></el-select>


                    </el-form-item>
                </el-col>
                <el-col :span="4">

                    <el-input v-model="mpoForm.suppEngName" class="grid-content ep-bg-purple-light" disabled />


                </el-col>
                <el-col :span="8">
                    <el-form-item label="Incharge">
                        <el-select v-model="mpoForm.incharge"></el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="Currency">
                        <el-select v-model="mpoForm.currency">
                            <el-option v-for="item in ccys" :value="item.value" />
                        </el-select>

                    </el-form-item>

                </el-col>
                <el-col :span="4">

                    <el-input v-model="mpoForm.rate" disabled />


                </el-col>
                <el-col :span="8">
                    <el-form-item label="Status">
                        <el-select v-model="mpoForm.status" style="width: 210px;">
                            <el-option v-for="item in status" :value="item" />
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-form-item label="Terms">
                <el-select v-model="mpoForm.terms"></el-select>
            </el-form-item>
            <el-form-item label="Payment">
                <el-select v-model="mpoForm.payment"></el-select>
            </el-form-item>
            <el-form-item label="DeliveryAddress">
                <el-input v-model="mpoForm.deliveryAddress" />
            </el-form-item>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="OverRecvAllowance">
                        <el-input v-model="mpoForm.allowPurchase" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="OverQty">
                <el-radio-group v-model="mpoForm.overQtyType">
                    <el-radio id="1" label="Job Average" />
                    <el-radio id="2" label="ToStock" />
                    <el-radio id="3" label="Manual" />
                </el-radio-group>
            </el-form-item>
            <el-row>
                <el-col :span="2">
                    <el-form-item label="Bulk Purchase">
                        <el-checkbox v-model="mpoForm.suconFlag"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="Request By">
                        <el-input v-model="mpoForm.suconType" :disabled="!mpoForm.suconFlag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="VAT%">
                        <el-input v-model="mpoForm.revision" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="JobNo:">
                <el-input v-model="mpoForm.jobNo" type="textarea" />
            </el-form-item>
            <el-form-item label="Remark">
                <el-input v-model="mpoForm.remark" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-table :data="mpoForm.mpoDetail" :row-class-name="tableRowClassName" border style="width: 100%;"
                    @cell-click="tabClick">

                    <el-table-column prop="seq" label="Seq" property="true">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Seq'">
                                <el-input v-model="scope.row.seq" placeholder="please input seq" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.seq }}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="materialCode" label="Material Code" width="130">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Material Code'">
                                <el-input v-model="scope.row.materialCode" placeholder="please input material code"
                                    size="mini" @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.materialCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tempMat" label="Temp Mat" width="120">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Temp Mat'">
                                <el-input v-model="scope.row.tempMat" placeholder="please input" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.tempMat }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="colorCode" label="Color Code" width="110">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Color Code'">
                                <el-input v-model="scope.row.colorCode" placeholder="please input color code" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.colorCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="color" label="Color" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Color'">
                                <el-input v-model="scope.row.color" placeholder="please input color" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.color }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="size" label="Size" width="60">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Size'">
                                <el-input v-model="scope.row.size" placeholder="please input size" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.size }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mpoQty" label="Mpo Qty" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Mpo Qty'">
                                <el-input v-model="scope.row.mpoQty" :blur="inputBlur" placeholder="please input quantity"
                                    size="mini" @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.mpoQty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Allocation" align="center">
                        <el-table-column prop="jobQty" label="Job Qty" width="100">
                            <template #default="scope">
                                <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Job Qty'">
                                    <el-input v-model="scope.row.jobQty" placeholder="please input quantity" size="mini"
                                        @blue="inputBlur" />
                                </span>
                                <span v-else>{{ scope.row.jobQty }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stockQty" label="Stock Qty" width="100">
                            <template #default="scope">
                                <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Stock Qty'">
                                    <el-input v-model="scope.row.stockQty" placeholder="please input quantity" size="mini"
                                        @blue="inputBlur" />
                                </span>
                                <span v-else>{{ scope.row.stockQty }}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="jobReqQty" label="Job Req Qty" width="108">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Job Req Qty'">
                                <el-input v-model="scope.row.jobReqQty" placeholder="please input quantity" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.jobReqQty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="buyUnit" label="Buy Unit" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Buy Unit'">
                                <el-input v-model="scope.row.buyUnit" placeholder="please input unit" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.buyUnit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="Price" width="60">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Price'">
                                <el-input v-model="scope.row.price" placeholder="please input price" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="priceUnit" label="Price Unit" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Price Unit'">
                                <el-input v-model="scope.row.priceUnit" placeholder="please input unit" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.priceUnit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="width" label="Width" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Width'">
                                <el-input v-model="scope.row.width" placeholder="please input width" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.width }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="weight" label="Weight" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Weight'">
                                <el-input v-model="scope.row.weight" placeholder="please input weight" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.weight }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Operations" width="100">
                        <template #default="scope">

                            <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
                                delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button class="mt-4" style="width: 100%;" @click="addRow">Add Item</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSave">Save</el-button>
                <el-button @click="onDelete">Delete</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { ref, reactive } from 'vue';
import axios from 'axios'
import store from '@/store/index'
import http from '@/http/api'
import { getChildState } from 'element-plus/es/components/tree/src/model/node';
export default (await import('vue')).defineComponent({
    name: 'EditMpo',
    setup() {
        //console.log(store.state.selectedData.length);

        const mpoForm = reactive({
            mpoNo: '',
            mpoDate: new Date(),
            attn: '',
            mpoType: '',
            revisedDate: '',
            shipMode: '',
            heading: '',
            shipmentDate: '',
            lighting: '',
            shippedTo: '',
            supplier: '',
            suppEngName: '',
            incharge: '',
            currency: '',
            rate: 0.0,
            status: 'Open',
            terms: '',
            payment: '',
            deliveryAddress: '',
            allowPurchase: 0,
            overQtyType: 'Job Average',
            suconFlag: false,
            suconType: '',
            revision: 0,
            jobNo: '',
            remark: '',
            mpoDetail: []
        });
        const count = ref(1);
        const mpoTypes = ref(["BUY TO ORDER", "PROVIDED BY CLIENT", "DEFECT REPLACEMENT", "ADDITIONAL PURCHASE", "PURCHASE CALICO"])
        const lightings = ref(["ETD", "ETA", "CLOSING"]);
        const status = ref(["Open", "Cancel", "Complete"]);
        const headings = [{
            value: 'CWL'
        },
        {
            value: "HCW"
        },
        {
            value: "HW"
        },
        {
            value: "HWPTE"
        },
        {
            value: "CWLPTE"
        }];

        var ccys = [{
            value: "RMB", rate: 0.88
        },
        {
            value: "USD", rate: 7.75
        },
        {
            value: "HKD", rate: 1.00
        }];
        const shipModes = ref(
            ["AIR", "SEA", "SEA/AI",
                "TRUCK", "LOCAL", "DHL",
                "ANYCOV", "BY SCS", "FYEAR",
                "FEDEX", "UPS", "COUR", "AIR CC",
                "HC", "UEC", "PAIR"
            ]);
        function onSave() {


            let txMpoHd = {
                mpoNo: mpoForm.mpoNo,
                mpoType: mpoForm.mpoType,
                revision: mpoForm.revision,
                mpoDate: mpoForm.mpoDate,
                heading: mpoForm.heading,
                suppCode: mpoForm.supplier,
                terms: mpoForm.terms,
                deliAdd: mpoForm.deliveryAddress,
                shipDate: mpoForm.shipmentDate,
                shipMode: mpoForm.shipMode,
                lighting: mpoForm.lighting,
                ccy: mpoForm.currency,
                attn: mpoForm.attn,
                remark: mpoForm.remark,
                status: mpoForm.status,
                payment: mpoForm.payment,
                subconFlag: mpoForm.suconFlag,
                subconType: mpoForm.suconType,
                jobNoStr: mpoForm.jobNo,
                inCharge: mpoForm.incharge,
                UDDATE1: mpoForm.revisedDate,
                UDField3: mpoForm.shippedTo,
                allowPurchase: mpoForm.allowPurchase,
                //txMpoDets:mpoForm.mpoDetail,
            }

            // http.post('api/mpo/save', mpoForm, false).then((res) => {
            //     console.log("ERROR: " + res.message);
            // }).catch((error) => {
            //     alert(error.message);
            // })
        }

        function initData(key) {
            axios.get('./init.json').then((res) => {
                //let value = [];
                //value = res.data[key];

                return res.data[key];

            })
        }

        function addRow() {
            mpoForm.mpoDetail.push({
                seq: count.value++,
                materialCode: "",
                tempMat: "",
                colorCode: "",
                color: "",
                size: "",
                mpoQty: 0,
                jobQty: 0,
                stockQty: 0,
                jobReqQty: 0,
                buyUnit: "LBS",
                price: 0,
                priceUnit: "LBS",
                width: 0,
                weight: 0
            })
        }
        function deleteRow(index) {
            count.value--;
            mpoForm.mpoDetail.splice(index, 1);
        }

        if (store.state.selectedData.length > 0) {
            mpoForm.heading = store.state.selectedData[0]["scHeading"];
            mpoForm.shipmentDate = new Date();
            mpoForm.supplier = store.state.selectedData[0]["suppCode"];
            mpoForm.suppEngName = store.state.selectedData[0]["suppName"];
            mpoForm.currency = store.state.selectedData[0]["ccy"];
            mpoForm.rate = store.state.selectedData[0]["rate"];
            for (let d of store.state.selectedData) {
                mpoForm.mpoDetail.push({
                    seq: count.value++,
                    materialCode: d["matCode"],
                    tempMat: d["tempMat"],
                    colorCode: d["colorCode"],
                    color: d["color"],
                    size: d["sizes"],
                    mpoQty: d["mrReqQty_B"],
                    jobQty: d["mrReqQty_B"],
                    stockQty: 0,
                    jobReqQty: d["mrReqQty_B"],
                    buyUnit: d["buyUnit"],
                    price: d["uPx"],
                    priceUnit: d["pxUnit"],
                    width: d["width1"],
                    weight: d["weight"]
                })
               
            }
        }


        return {
            mpoForm,
            count,
            mpoTypes,
            lightings,
            status,
            headings,
            shipModes,
            ccys,
            onSave,
            initData,
            addRow,
            deleteRow,

        }
    },
    data() {
        return {
            tabClickIndex: null,
            tabClickLabel: '',

        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex
        },
        tabClick(row, column, cell, event) {
            switch (column.label) {
                case 'Seq':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label
                    break
                case 'Material Code':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label
                    break
                case 'Temp Mat':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Color Code':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Color':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Size':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Mpo Qty':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Job Qty':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Stock Qty':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Job Req Qty':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Buy Unit':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Price':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Price Unit':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Width':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                case 'Weight':
                    this.tabClickIndex = row.index;
                    this.tabClickLabel = column.label;
                    break
                default: return;
            }
        },
        inputBlur(row, event, column) {
            this.tabClickIndex = null;
            this.tabClickLabel = '';
        }
    }
})
</script>
<style lang="less" scoped>
.el-row {
    margin-bottom: 2px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>