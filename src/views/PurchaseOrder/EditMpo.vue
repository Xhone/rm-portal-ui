<template>
    <div>
        <el-form ref="mpoFormRef" :model="mpoForm" :rules="dataFormRules" style="padding: 0px 20px 0px 0px;"
            class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Mpo No" prop="mpoNo">
                        <el-input v-model="mpoForm.mpoNo" style="width: 210px;" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Mpo Date">
                        <el-date-picker v-model="mpoForm.mpoDate" placeholder="Mpo Date" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Incharge">
                        <el-input v-model="mpoForm.incharge" style="width: 210px;" />
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
                        <el-select v-model="mpoForm.shipMode" style="width: 210px;">
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
                <el-col :span="4">
                    <el-form-item label="Shipment">
                        <el-date-picker v-model="mpoForm.shipmentDate" />
                    </el-form-item>

                </el-col>
                <el-col :span="4">
                    <el-select v-model="mpoForm.lighting">
                        <el-option v-for="item in lightings" :value="item" />
                    </el-select>


                </el-col>
                <el-col :span="8">
                    <el-form-item label="Shipped To">
                        <el-select v-model="mpoForm.shippedTo">
                            <el-option v-for="(item, index) in shippeds" :value="item.suppCode" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="Supplier" prop="supplier" class="grid-content ep-bg-purple">

                        <el-select v-model="mpoForm.supplier">
                            <el-option v-for="(item, index) in suppliers" :key="item.suppCode" :value="item.suppCode">

                                <el-button text="true" style="width: 100%;" @click="getsuppEngName(index)">{{ item.suppCode
                                }}</el-button>
                            </el-option>

                        </el-select>


                    </el-form-item>
                </el-col>
                <el-col :span="4">

                    <el-input v-model="mpoForm.suppEngName" class="grid-content ep-bg-purple-light" disabled />


                </el-col>
                <el-col :span="8">
                    <el-form-item label="Attn">
                        <el-input v-model="mpoForm.attn" style="width: 210px;" />
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="Currency">
                        <el-select v-model="mpoForm.currency">
                            <el-option v-for="(item, index) in currencies" :value="item.ccy">
                                <el-button text="true" style="width:100%;" @click="getRate(index)">{{ item.ccy
                                }}</el-button>
                            </el-option>
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
                <el-select v-model="mpoForm.terms">
                    <el-option v-for="item in terms" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Payment">
                <el-select v-model="mpoForm.payment">
                    <el-option v-for="item in payments" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="DeliveryAddress">
                <el-input v-model="mpoForm.deliveryAddress" />
            </el-form-item>
            <el-row>
                <el-col :span="3">
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

            <el-form-item label="Detail">
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
            <el-form-item label="Surcharge">
                <el-table :data="mpoForm.mpoSurcharge" :row-class-name="surchargeTableRowClassName"
                    @cell-click="surchargeTabClick" border style="width: 100%;">
                    <el-table-column prop="surType" label="SurType">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabSurchargeClickIndex && tabSurchargeClickLabel === 'SurType'">
                                <el-select v-model="scope.row.surType" size="mini">
                                    <el-option v-for="(item, index) in surcharges" :value="item.surType">
                                        <el-button text="true" style="width:100%;"
                                            @click="getSurDescription(scope.row.index, index)">{{ item.surType
                                            }}</el-button>
                                    </el-option>
                                </el-select>
                            </span>
                            <span v-else>{{ scope.row.surType }}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="surDescription" label="SurDescription">

                    </el-table-column>
                    <el-table-column prop="surPercent" label="SurPercent">
                        <template #default="scope">
                            <span
                                v-if="scope.row.index === tabSurchargeClickIndex && tabSurchargeClickLabel === 'SurPercent'">
                                <el-input v-model="scope.row.surPercent" placeholder="please input quantity" size="mini"
                                    @blue="inputSurchargeBlur" />
                            </span>
                            <span v-else>{{ scope.row.surPercent }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="surAmount" label="SurAmount">
                        <template #default="scope">
                            <span
                                v-if="scope.row.index === tabSurchargeClickIndex && tabSurchargeClickLabel === 'SurAmount'">
                                <el-input v-model="scope.row.surAmount" placeholder="please input quantity" size="mini"
                                    @blue="inputSurchargeBlur" />
                            </span>
                            <span v-else>{{ scope.row.surAmount }}</span>
                        </template>
                    </el-table-column>

                </el-table>
            </el-form-item>
            <el-form-item label="Remark">
                <el-input v-model="mpoForm.remark" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSave">Save</el-button>
                <el-button @click="onDelete">Delete</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import axios from 'axios'
import store from '@/store/index'
import http from '@/http/api'

export default (await import('vue')).defineComponent({
    name: 'EditMpo',
    setup(props, context) {
        // 获取全局属性和方法
        const { proxy, ctx } = getCurrentInstance();

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
            incharge: store.state.userInfo,
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
            mpoDetail: [],
            mpoSurcharge: [{ "surType": "", "surDescription": "", "surPercent": 0, "surAmount": 0 }]
        });

        const mpoFormRef = ref(mpoForm);

        const suppliers = ref([]);
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

        const terms = ref([]);

        const payments = ref([]);

        const currencies = ref([]);

        const shippeds = ref([]);

        const surcharges = ref([]);

        if (store.state.selectedData.length > 0) {
            //console.log(store.state.userInfo);
            mpoForm.incharge = store.state.userInfo;
            mpoForm.heading = store.state.selectedData[0]["scHeading"];
            mpoForm.shipmentDate = new Date();
            mpoForm.supplier = store.state.selectedData[0]["suppCode"];
            mpoForm.suppEngName = store.state.selectedData[0]["suppName"];
            mpoForm.currency = store.state.selectedData[0]["ccy"];
            mpoForm.rate = store.state.selectedData[0]["rate"];
            mpoForm.jobNo = store.state.selectedData[0]["jobNo"];

            http.dtrade.getSumPoData(store.state.selectedData).then((res) => {


                for (let d of res.data) {
                    //console.log(d);
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
            }).catch((error) => {

            })


        }

        const dataFormRules = ref({
            mpoNo: { required: true, message: "please enter purchase code", trigger: "blur" },
        })

        const getsuppEngName = (index) => {
            mpoForm.suppEngName = suppliers.value[index]["engName"];
        }

        const getRate = (index) => {
            mpoForm.rate = currencies.value[index]["rate"];
        }

        const getSurDescription = (rowIndex, index) => {
            if (mpoForm.mpoSurcharge[rowIndex]["surType"] === "") {
                mpoForm.mpoSurcharge[rowIndex]["surDescription"] = "";
            }
            else {
                mpoForm.mpoSurcharge[rowIndex]["surDescription"] = surcharges.value[index]["surDescription"];
            }

        }

        const handleSurchargeDelete = (index) => {
            mpoForm.mpoSurcharge.splice(index, 1);
        }
        const onSave = () => {
            ctx.$refs.mpoFormRef.validate((valid) => {
                if (valid) {
                    var status = 'O';
                    switch (mpoForm.status) {
                        case 'Open':
                            status = 'O';
                            break
                        case 'Complete':
                            status = 'C';
                            break
                        case 'Cancel':
                            status = 'X';
                            break
                        default: return
                    }
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
                        status: status,
                        payment: mpoForm.payment,
                        subconFlag: mpoForm.suconFlag,
                        subconType: mpoForm.suconType,
                        jobNoStr: mpoForm.jobNo,
                        inCharge: mpoForm.incharge,
                        revisedDate: mpoForm.revisedDate,
                        shippedTo: mpoForm.shippedTo,
                        allowPurchase: mpoForm.allowPurchase,
                        txMpoDets: mpoForm.mpoDetail,
                        txMpoSurcharges: mpoForm.mpoSurcharge
                    }


                    http.mpo.saveMpo(txMpoHd).then((res) => {
                        console.log("ERROR: " + res.message);
                    }).catch((error) => {
                        alert(error.message);
                    })
                    ctx.$refs["mpoFormRef"].resetFields();
                } else {
                    proxy.$message({ message: 'MpoNo can not be empty.', type: 'warning' })
                    ctx.$refs["mpoFormRef"].resetFields();
                }
            })

        }

        function initData() {

            http.dtrade.getSupplier().then((res) => {
                suppliers.value = res.data;

                // for(let v of suppliers.value){
                //     console.log(v["engName"]);
                // }

            }).catch((error) => {

            });

            http.dtrade.getTerms().then((res) => {
                terms.value = res.data;
            }).catch((error) => {

            });

            http.dtrade.getPayment().then((res) => {
                payments.value = res.data;
            }).catch((error) => {

            });

            http.dtrade.getCcy().then((res) => {
                currencies.value = res.data;
                //console.log(currencies.value);
            }).catch((error) => {

            });

            http.dtrade.getShipped().then((res) => {
                shippeds.value = res.data;
            }).catch((error) => {

            })

            http.dtrade.getSurType().then((res) => {
                surcharges.value = res.data;
            }).catch((error) => {

            })
            // axios.get('./init.json').then((res) => {
            //     //let value = [];
            //     //value = res.data[key];

            //     return res.data[key];

            // })


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

        onMounted(() => {
            initData();
        });

        return {
            mpoForm,
            mpoFormRef,
            count,
            mpoTypes,
            lightings,
            status,
            headings,
            shipModes,
            ccys,
            dataFormRules,
            suppliers,
            terms,
            payments,
            currencies,
            shippeds,
            surcharges,
            onSave,
            initData,
            addRow,
            deleteRow,
            getsuppEngName,
            getRate,
            getSurDescription,
            handleSurchargeDelete,

        }
    },
    data() {
        return {
            tabClickIndex: null,
            tabClickLabel: '',
            tabSurchargeClickIndex: null,
            tabSurchargeClickLabel: '',

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
        },

        surchargeTableRowClassName({ row, rowIndex }) {
            row.index = rowIndex
        },
        surchargeTabClick(row, column, cell, event) {
            switch (column.label) {
                case 'SurType':
                    this.tabSurchargeClickIndex = row.index;
                    this.tabSurchargeClickLabel = column.label
                    break
                case 'SurPercent':
                    this.tabSurchargeClickIndex = row.index;
                    this.tabSurchargeClickLabel = column.label
                    break
                case 'SurAmount':
                    this.tabSurchargeClickIndex = row.index;
                    this.tabSurchargeClickLabel = column.label;
                    break

                default: return;
            }
        },
        inputSurchargeBlur(row, event, column) {
            this.tabSurchargeClickIndex = null;
            this.tabSurchargeClickLabel = '';
        },

    },

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