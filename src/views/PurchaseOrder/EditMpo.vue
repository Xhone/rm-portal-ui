<template>
    <div>
        <div style="display: flex; width: 100%; padding: 0;flex-wrap: wrap;">
            <MaMatHeadDet :visible="dialogVisible" @selected-mat-code="getMatCode"></MaMatHeadDet>
        </div>
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
                    <el-radio id="1" label="1">Job Average</el-radio>
                    <el-radio id="2" label="2">ToStock</el-radio>
                    <el-radio id="3" label="3">Manual</el-radio>
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
                <el-table :data="mpoForm.mpoDetail" :row-class-name="tableRowClassName" :summary-method="getSumDetail"
                    stripe border style="width: 100%;" @cell-click="tabClick">

                    <el-table-column prop="seq" label="Seq" property="true">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Seq'">
                                <el-input v-model="scope.row.seq" placeholder="please input seq" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.seq }}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="matCode" label="Material Code" width="150">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Material Code'">
                                <el-input v-model="scope.row.matCode" placeholder="please input material code" size="mini"
                                    @blue="inputBlur">
                                    <template #suffix>
                                        <el-button style="border: none;margin-right: -10px;"
                                            @click="getVisible">...</el-button>
                                    </template>
                                </el-input>
                            </span>
                            <span v-else>{{ scope.row.matCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" label="...">
                        <template #default="props">
                            <div>
                                <div class="block">
                                    <label>Material Code:</label> <el-input style="width:320px;"
                                        v-model="props.row.matCode" />
                                    <label style="margin-left:20px">Temp Mat:</label> <el-input style="width:420px;"
                                        v-model="props.row.tempMat" />
                                </div>

                                <div class="block">
                                    <label>Description:</label> <el-input
                                        style="width: 800px;height:auto;vertical-align: top;" v-model="props.row.matDesc"
                                        type="textarea" />

                                </div>
                                <div class="block">
                                    <label>Color Code:</label> <el-input style="width: 150px;"
                                        v-model="props.row.colorCode" />
                                    <label>Color:</label> <el-input style="width: 150px;" v-model="props.row.color" />
                                    <label>Size:</label> <el-input style="width: 150px;" v-model="props.row.size" />
                                </div>

                                <div class="block">
                                    <label>Vendor Article No:</label> <el-input style="width: 150px;"
                                        v-model="props.row.vendorNo" />
                                    <label>Vendor Color:</label> <el-input style="width: 150px;"
                                        v-model="props.row.vendorColor" />
                                    <label>Origin:</label> <el-select style="width: 150px;" v-model="props.row.origin">
                                        <el-option v-for="item in countries" :value="item" />
                                    </el-select>
                                </div>

                                <div class="block"><label>Width:</label> <el-input style="width: 150px;" type="text"
                                        v-model="props.row.width" />
                                    <el-input style="width:80px" v-model="props.row.widthUnit" />
                                    <label>Weight:</label> <el-input style="width: 150px;" v-model="props.row.weight" />
                                </div>
                                <div class="block">
                                    <label>Qty:</label> <el-input style="width: 150px;" v-model="props.row.qty" />
                                    <el-input style="width:80px;" v-model="props.row.buyUnit" />
                                </div>

                                <div class="block">
                                    <label>Unit Price:</label> <el-input style="width: 150px;" v-model="props.row.upx" />
                                    <el-input style="width:80px;" v-model="props.row.pxUnit" />
                                </div>
                                <div class="block">
                                    <label>Buy Unit:</label> <el-input style="width:80px" v-model="props.row.buyUnit" /> =
                                    <el-input style="width:80px" v-model="props.row.buyUnitFactor" />
                                    <el-input style="width:80px" v-model="props.row.buyUnit" />
                                </div>
                                <div class="block">
                                    <label>Price Unit:</label> <el-input style="width: 80px;" v-model="props.row.pxUnit" />
                                    = <el-input style="width: 80px;" v-model="props.row.pxUnitFactor" />
                                    <el-input style="width:80px" v-model="props.row.buyUnit" />
                                </div>

                                <div class="block">
                                    <label>Custom Description:</label> <el-input
                                        style="width: 600px;height: auto;vertical-align: top;" v-model="props.row.remark"
                                        type="textarea" />
                                </div>
                                <h3>Job Details</h3>
                                <el-table :data="props.row.txMpoDetMrs" border>
                                    <el-table-column label="Job No" prop="mrNo">

                                    </el-table-column>
                                    <el-table-column label="Req Qty" prop="qty"></el-table-column>
                                    <el-table-column label="Net Bal Qty"></el-table-column>
                                    <el-table-column label="Mpo Qty" prop="qty"></el-table-column>
                                </el-table>
                            </div>
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
                    <el-table-column prop="qty" label="Mpo Qty" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Mpo Qty'">
                                <el-input v-model="scope.row.qty" :blur="inputBlur" placeholder="please input quantity"
                                    size="mini" @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.qty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Allocation" align="center">
                        <el-table-column prop="mrQty" label="Job Qty" width="100">
                            <template #default="scope">
                                <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Job Qty'">
                                    <el-input v-model="scope.row.mrQty" placeholder="please input quantity" size="mini"
                                        @blue="inputBlur" />
                                </span>
                                <span v-else>{{ scope.row.mrQty }}</span>
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
                    <el-table-column prop="firstMrQty" label="Job Req Qty" width="108">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Job Req Qty'">
                                <el-input v-model="scope.row.firstMrQty" placeholder="please input quantity" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.firstMrQty }}</span>
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
                    <el-table-column prop="upx" label="Price" width="60">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Price'">
                                <el-input v-model="scope.row.upx" placeholder="please input price" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.upx }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pxUnit" label="Price Unit" width="100">
                        <template #default="scope">
                            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'Price Unit'">
                                <el-input v-model="scope.row.pxUnit" placeholder="please input unit" size="mini"
                                    @blue="inputBlur" />
                            </span>
                            <span v-else>{{ scope.row.pxUnit }}</span>
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
                    @cell-click="surchargeTabClick" @cell-mouse-leave="surchargeCellMouseLeave" border style="width: 100%;">
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
import { ref, reactive, getCurrentInstance, onMounted, inject, watch, onUpdated } from 'vue';
import store from '@/store/index'
import http from '@/http/api'
import MaMatHeadDet from './MaMatHeadDet.vue';
export default (await import('vue')).defineComponent({
    name: 'EditMpo',
    components: {
        MaMatHeadDet
    },
    setup(props, context) {

        const reload = inject('reload');
        // 获取全局属性和方法
        const { proxy } = getCurrentInstance();

        const mpoForm = reactive({
            id: 0,
            mpoNo: '',
            mpoDate: new Date(),
            attn: '',
            mpoType: '',
            revisedDate: new Date(),
            shipMode: '',
            heading: '',
            shipmentDate: new Date(),
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
            overQtyType: '1',
            suconFlag: false,
            suconType: '',
            revision: '',
            jobNo: '',
            remark: '',
            mpoDetail: [],
            txMpoMatDetail: [],
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

        const countries = ref([]);

        var dialogVisible = ref(false);

        var matCode = ref('');

        if (store.state.selectedData) {

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

                for (let i = 1; i < store.state.selectedData.length; i++) {
                    if (store.state.selectedData[i]["jobNo"] != store.state.selectedData[i - 1]["jobNo"]) {
                        mpoForm.jobNo += "," + store.state.selectedData[i]["jobNo"];
                    }
                }

                http.dtrade.getSumPoData(store.state.selectedData).then((res) => {


                    for (let d of res.data) {
                        //console.log(d);
                        mpoForm.mpoDetail.push({
                            seq: count.value++,
                            matCode: d["matCode"],
                            tempMat: d["tempMat"],
                            colorCode: d["colorCode"],
                            color: d["color"],
                            size: d["sizes"],
                            qty: d["mrReqQty_B"],
                            mrQty: d["mrReqQty_B"],
                            stockQty: 0,
                            firstMrQty: d["mrReqQty_B"],
                            buyUnit: d["buyUnit"],
                            upx: d["uPx"],
                            pxUnit: d["pxUnit"],
                            width: d["width1"],
                            weight: d["weight"],
                            widthUnit: d["widthUnit"],
                            buyUnitFactor: d["buyUnitFactor"],
                            pxUnitFactor: d["pxUnitFactor"],
                            matDesc: d["matDesc"],
                            txMpoDetMrs: d["mrDatas"]
                        })

                        //console.log(mpoForm.mpoDetail);

                    }
                }).catch((error) => {

                })

                getMatDetail();
            }
        }


        const dataFormRules = ref({
            mpoNo: { required: true, message: "please enter purchase code", trigger: "blur" },
            mpoType: { required: true, message: "", trigger: "blur" },
            currency: { required: true, message: "", trigger: "blur" },
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

        function getMatDetail() {
            http.dtrade.getMatDetail(store.state.selectedData).then((res) => {


                for (let d of res.data) {
                    //console.log(d);
                    mpoForm.txMpoMatDetail.push({
                        matCode: d["matCode"],
                        tempMat: d["tempMat"],
                        buyUnit: d["buyUnit"],
                        buyUnitFactor: d["buyUnitFactor"],
                        priceUnit: d["priceUnit"],
                        priceUnitFactor: d["priceUnitFactor"],
                        width: d["width"],
                        weight: d["weight"],
                        matDesc: d["matDesc"],
                        mpoAmount: d["mpoAmount"],
                        remark: '',
                        origin: '',

                    })



                }
            }).catch((error) => {

            })

        }

        function getVisible() {
            dialogVisible.value = true;
        }

        function getMatCode(value1, value2) {
            mpoForm.mpoDetail[proxy.tabClickIndex]["matCode"] = value1;
            matCode.value = value1;
            dialogVisible.value = value2;
            let params = {
                matCode: value1
            };
            http.dtrade.getMaMatDetail(params).then((res) => {
                mpoForm.mpoDetail[proxy.tabClickIndex]["matDesc"] = res.data["description"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["width"] = res.data["width1"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["weight"] = res.data["weight"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["buyUnit"] = res.data["buyUnit"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["buyUnitFactor"] = res.data["buyUnitFactor"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["pxUnit"] = res.data["pxUnit"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["pxUnitFactor"] = res.data["pxUnitFactor"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["widthUnit"] = res.data["widthUnit"];
                mpoForm.mpoDetail[proxy.tabClickIndex]["upx"] = res.data["upx"];
            }).catch((error) => {

            })
        }

        const handleSurchargeDelete = (index) => {
            mpoForm.mpoSurcharge.splice(index, 1);
        }

        const surchargeCellMouseLeave = (row, column, cell, event) => {
            switch (column.label) {
                case ("SurPercent"):
                    console.log(mpoForm.mpoSurcharge[row.index]["surPercent"] / 100);
                    break;
                default:
                    break;
            }
        }
        var qtys = 0;
        var prices = 0;
        const getSumDetail = (param) => {
            const { columns, data } = param;

            //console.log(columns);

            //     columns.forEach((column, index) => {
            //     const values = data.map((item) => Number(item[column.property]));

            //     //console.log(column.property)
            //     // if (column.property == "qty") {
            //     //     qtys = values.reduce((prev, curr) => {
            //     //         const value = Number(curr);
            //     //         if (!isNaN(value)) {
            //     //             return prev + curr;
            //     //         } else {
            //     //             return prev;
            //     //         }
            //     //     }, 0);
            //     // }
            //     // if (column.property == "upx") {
            //     //     prices = values.reduce((prev, curr) => {
            //     //         const value = Number(curr);
            //     //         if (!isNaN(value)) {
            //     //             return prev + curr;
            //     //         } else {
            //     //             return prev;
            //     //         }
            //     //     }, 0)
            //     // }

            //     console.log(qtys*prices);


            // })


        }
        const onSave = () => {
            proxy.$refs.mpoFormRef.validate((valid) => {
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
                        id: mpoForm.id,
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
                        overQtyType: mpoForm.overQtyType,
                        txMpoDets: mpoForm.mpoDetail,
                        txMpoMatDets: mpoForm.txMpoMatDetail,
                        txMpoSurcharges: mpoForm.mpoSurcharge
                    }

                    if (store.state.isEdited) {
                        http.mpo.putMpo(txMpoHd).then((res) => {
                            proxy.$message({ message: "successfully save", type: "info" });
                        }).catch((error) => {
                            proxy.$message({ message: error.data, type: "error" });
                        })
                    } else {
                        http.mpo.saveMpo(txMpoHd).then((res) => {
                            proxy.$message({ message: "successfully save", type: "info" });
                        }).catch((error) => {
                            proxy.$message({ message: error.data, type: "error" });

                        })
                        store.commit("clearSelectedData");
                        proxy.$refs["mpoFormRef"].resetFields();
                    }
                    proxy.reload();

                } else {
                    proxy.$message({ message: 'MpoNo can not be empty.', type: 'warning' })
                    proxy.$refs["mpoFormRef"].resetFields();
                }
            })

        }

        function initData() {

            http.dtrade.getSupplier().then((res) => {
                suppliers.value = res.data;



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

            http.dtrade.getCountry().then((res) => {
                countries.value = res.data;
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
                matCode: "",
                tempMat: "",
                colorCode: "",
                color: "",
                size: "",
                qty: 0,
                mrQty: 0,
                stockQty: 0,
                firstMrQty: 0,
                buyUnit: "LBS",
                upx: 0,
                pxUnit: "LBS",
                width: 0,
                weight: 0,
                widthUnit: "",
                buyUnitFactor: 1,
                pxUnitFactor: 1,
                matDesc: "",
                vendorNo: "",
                vendorColor: "",
                origin: "",
                remark: "",
                txMpoDetMrs: []
            })
        }
        function deleteRow(index) {
            count.value--;
            mpoForm.mpoDetail.splice(index, 1);
        }

        onMounted(() => {
            initData();

        });

        onUpdated(() => {
            //console.log("update test");
            if (store.state.isEdited) {
                if (store.state.mpoData) {
                    let mpoData = store.state.mpoData;
                    mpoForm.id = mpoData.id
                    mpoForm.mpoNo = mpoData.mpoNo;
                    mpoForm.mpoDate = mpoData.mpoDate;
                    mpoForm.attn = mpoData.attn
                    mpoForm.mpoType = mpoData.mpoType;
                    mpoForm.revisedDate = mpoData.revisedDate;
                    mpoForm.shipMode = mpoData.shipMode;
                    mpoForm.heading = mpoData.heading;
                    mpoForm.shipmentDate = mpoData.shipDate
                    mpoForm.lighting = mpoData.lighting
                    mpoForm.shippedTo = mpoData.shippedTo;
                    mpoForm.supplier = mpoData.suppCode
                    //mpoForm.suppEngName
                    mpoForm.incharge = mpoData.inCharge
                    mpoForm.currency = mpoData.ccy;
                    mpoForm.rate = mpoData.rate;
                    switch (mpoData.status) {
                        case 'O':
                            mpoForm.status = 'Open';
                            break
                        case 'C':
                            mpoForm.status = 'Complete';
                            break
                        case 'X':
                            mpoForm.status = 'Cancel';
                            break
                        default: break
                    }

                    mpoForm.terms = mpoData.terms;
                    mpoForm.payment = mpoData.payment;
                    mpoForm.deliveryAddress = mpoData.deliAdd
                    mpoForm.allowPurchase = mpoData.allowPurchase;
                    mpoForm.overQtyType = mpoData.overQtyType;
                    mpoForm.suconFlag = mpoData.subconFlag;
                    mpoForm.suconType = mpoData.subconType;
                    mpoForm.revision = mpoData.revision;
                    mpoForm.jobNo = mpoData.jobNoStr;
                    mpoForm.remark = mpoData.remark;
                    mpoForm.mpoDetail = mpoData.txMpoDets;
                    mpoForm.txMpoMatDetail = mpoData.txMpoMatDets;
                    mpoForm.mpoSurcharge = mpoData.txMpoSurcharges;
                }
            }
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
            countries,
            dialogVisible,
            matCode,
            reload,
            onSave,
            initData,
            addRow,
            deleteRow,
            getsuppEngName,
            getRate,
            getSurDescription,
            handleSurchargeDelete,
            getMatDetail,
            getVisible,
            getMatCode,
            surchargeCellMouseLeave,
            getSumDetail,

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
                case "...":
                    //console.log(this.mpoForm.mpoDetail[row.index]);
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

.block {
    width: 1200px;
    display: block;
    margin: 20px 0;
}

.center {
    text-align: center;
}

label {
    display: inline-block;
    width: 120px;
    text-align: right;
    //vertical-align: text-top;

}

// .el-input{
//     vertical-align: top;
// }
</style>