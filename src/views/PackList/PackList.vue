<template>
    <div>
        <br/><br/><br/><br/>
        <form>
            <div id="save_case">
                <el-button type="primary" @click="SavePage">SAVE</el-button>
                <el-button type="primary" @click="dialogTableVisible=true">Export PackList Excel</el-button>
                <!-- <el-button type="primary">导出Excel报关</el-button> -->
            </div>
            <table id="table1">
                <tr>
                    <td>
                        <el-button @click="threePortClick" size="mini" type="primary" style="margin:0;padding: 0; width:40px;height: 40px; float:right;">...</el-button>
                     
                        <el-input readonly type="text" id="packlistNO"    class="elinput" v-model="packlistno" maxlength="30" @focus="SelectPackListMessage" style="width: 130px;" v-if="packlistnoIsShow"></el-input>
                        <p>Mat PackList No:</p>
                        
                    </td>
                    <td>
                        
                        <el-input readonly type="Date"  class="elinput" v-model="date" style="width: 130px;"></el-input>
                        <p>Date:</p>
                    </td>
                    <td>
                        
                        <el-input readonly  class="elinput" v-model="ccy2"></el-input>
                        <el-input  readonly class="elinput" v-model="ccy1"></el-input>
                        <p>Ccy:</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                        <el-input readonly  class="elinput" v-model="factory"></el-input>
                        <p>Factory:</p>
                    </td>
                    <td>
                        
                        <el-input readonly  class="elinput" v-model="preparedby"></el-input>
                        <p>Prepared By:</p>
                    </td>
                    <td>
                        
                        <el-input  readonly class="elinput" v-model="TtlCtn"></el-input>
                        <p>Ttl Ctn:</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                        <el-input  readonly class="elinput" v-model="DocNo"></el-input>
                        <p>Doc No.:</p>
                    </td>
                    <td>
                        
                        <el-input  readonly class="elinput" v-model="SCHeading"></el-input>
                        <p>SC Heading:</p>
                    </td>
                    <td>
                        
                        <el-input  readonly class="elinput" v-model="TtlNW"></el-input>
                        <p>Ttl NW:</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                        <el-input readonly  class="elinput" v-model="TtlGW"></el-input>
                        <p>Ttl GW:</p>
                    </td>
                    <td>
                        
                        <el-input readonly  class="elinput" v-model="exportFlag"></el-input>
                        <p>ExportFlag:</p>
                    </td>
                    <td>
                        
                        <el-input  readonly class="elinput" v-model="fabtrim"></el-input>
                        <p>FabTrim:</p>
                    </td>
                </tr>
            </table>
            
            <br/>
            <br/>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="Summary" name="Summary">
                    
                    <div class="threeButton">
                
                        <el-button @click="toggleSelection()" type="danger">Unselect</el-button>
                        <el-button type="primary" @click="PartMarkDN">Batch Mark D/N</el-button>
                        <el-button type="primary" @click="PartMarkAdjustment">Batch Mark ADJUSTMENT</el-button>
                        <!-- <el-button type="primary">批量Mark Taking</el-button> -->
                    </div>
                    
                    <el-table id="table2"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;height: 50vh;"
                       >
                        <el-table-column
                            prop="selection"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="Seq"
                            label="Seq"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="SumId"
                            label="SumId"
                            width="80"
                        >

                        </el-table-column>
                        <el-table-column
                            prop="DocNo"
                            label="Doc No"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="Mpo_No"
                            label="Mpo_No"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="Mat_Code"
                            label="Mat_Code"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="Temp_Mat"
                            label="Temp_Mat"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="Color_Code"
                            label="Color_Code"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="Color"
                            label="Color"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="ChnColor"
                            label="ChnColor"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="Job_No"
                            label="Job_No"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="Issus_Unit"
                            label="Issus_Unit"
                            width="120">
                        </el-table-column>
                
                        <el-table-column
                            prop="Qty_yds"
                            label="QTY(YDS)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.QtyYds" class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Qty_psc"
                            label="QTY(PSC)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.Qtypc" class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Qty_m"
                            label="QTY(M)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.QtyM" class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Qty_kg"
                            label="QTY(KG)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.QtyKg" class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="PKGS(包)数量"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.pkgs" class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="uc_Px"
                            label="uc_Px"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="ctn_No"
                            label="Ctn_No"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="Invoice_No"
                            label="Invoice_No"
                            width="120">
                        </el-table-column>
                        <!-- <el-table-column
                            prop="lot"
                            label="Lot"
                            width="120">
                        </el-table-column> -->
                        <el-table-column
                            prop="sizes"
                            label="Sizes"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            label="Ch Mat desc(Chinese material description)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.ChMatDesc"  class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                        
                            label="Color desc(Manual input)"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.ColorDesc"  class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
            
                            label="Roll_No（Manual input）"
                            width="120">
                            <template #default="scope">
                                <el-input type="text" size="mini"  v-model="scope.row.RollNo"  class="elinput" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="MPO_Description"
                            label="MPO Description"
                            width="150">
                        
                        </el-table-column>
                        <el-table-column
                            prop="Custom_Description"
                            label="Custom Description"
                            width="160">
                        
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="Operation"
                            width="380" style="text-align: center;">
                            <template #default="scope">
                                
                                <el-button
                                size="mini"
                                type="primary"
                                class="isfloat"
                                @click="doMarkDN(scope.$index, scope.row)" style="width: 80px;">Mark D/N</el-button>

                                <el-button
                                size="mini"
                                type="success"
                                class="isfloat"
                                @click="doMarkAdJustMent(scope.$index, scope.row)">Mark ADJUSTMENT</el-button>

                                <!-- <el-button
                                size="mini"
                                type="info"
                                class="isfloat"
                                @click="doMarkTaking(scope.$index, scope.row)" style="width: 100px;">Mark Taking</el-button> -->

                                <el-popover
                                placement="right"
                                width="800"
                                trigger="click" ref="pop">
                                    <el-table :data="ctnTable">
                                        <el-table-column width="100" property="ctn" label="Ctn"></el-table-column>
                                        <el-table-column width="100" property="gw" label="GW"></el-table-column>
                                        <el-table-column width="100" property="nw" label="NW"></el-table-column>
                                        <el-table-column width="100" property="length" label="Length"></el-table-column>
                                        <el-table-column width="100" property="width" label="Width"></el-table-column>
                                        <el-table-column width="100" property="height" label="Height"></el-table-column>
                                        <el-table-column width="100" property="ctn_Qty" label="CtnQty"></el-table-column>
                                        <el-table-column width="100" property="cbm" label="CBM"></el-table-column>
                                    </el-table>
                                    <template #reference>
                                        <el-button
                                            size="mini"
                                            type="warning"
                                            class="isfloat"
                                            slot="reference"
                                            @click="doShowCtn(scope.$index, scope.row)" style="width: 80px;margin-left:20px;">Show Ctn</el-button>
                                    </template>
                                    
                                </el-popover>
                            </template>
                        </el-table-column>                
                    
                        
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="Remark" name="Remark">
                    <table id="table3">
                        <tr>
                            <td> 
                                <el-input style="float:right;width: 100px;"
                                    readonly
                                    v-model="input_From">
                                </el-input>
                                <p style="float:right;">From ：</p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                readonly
                                    v-model="input_To">
                                </el-input>
                                <p style="float:right;">To： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                readonly
                                    v-model="input_VIA">
                                </el-input>
                                <p style="float:right;">VIA： </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            
                                <el-input style="float:right;width: 100px;"
                                    type="date"
                                    readonly
                                    v-model="input_ETD">
                                </el-input>
                                <p style="float:right;">ETD： </p>
                            </td>
                            <td>
                            
                                <el-input style="float:right;width: 100px;"
                                    type="date"
                                    readonly
                                    v-model="input_ETA">
                                </el-input>
                                <p style="float:right;">ETA： </p>
                            </td>
                            <td>
                            
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_Vessel">
                                </el-input>
                                <p style="float:right;">Vessel： </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_Mode">
                                </el-input>
                                <p style="float:right;">Mode： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_Container">
                                </el-input>
                                <p style="float:right;">Container： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_VoyNo">
                                </el-input>
                                <p style="float:right;">Voy No.： </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_SealNo">
                                </el-input>
                                <p style="float:right;">Seal No： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_MatContract">
                                </el-input>
                                <p style="float:right;">Mat Contract# ：</p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_BlNo">
                                </el-input>
                                <p style="float:right;">BL No ：</p>
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_Origin">
                                </el-input>
                                <p style="float:right;">Origin ：</p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_Terms">
                                </el-input>
                                <p style="float:right;">Terms： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_FREIGHT">
                                </el-input>
                                <p style="float:right;">FREIGHT： </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_ToCountry">
                                </el-input>
                                <p style="float:right;">To Country： </p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_PayMent">
                                </el-input>
                                <p style="float:right;">PayMent ：</p>
                            </td>
                            <td>
                                
                                <el-input style="float:right;width: 100px;"
                                    type="text"
                                    readonly
                                    v-model="input_InSurance">
                                </el-input>
                                <p style="float:right;">InSurance： </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="float: left;margin-top: 50px;">Shipping Remark：</p>
                                <el-input style="float: left;width:300px;margin-right: 50px;"
                                    type="textarea"
                                    :rows="5"
                                
                                    readonly
                                    v-model="textarea3">
                                </el-input> 
                                
                            </td>
                            <td>
                                <p style="float: left;margin-top: 50px;">Remark：</p>
                                <el-input style="float: left;width:300px;margin-right: 50px;"
                                    type="textarea"
                                    :rows="5"
                                
                                    readonly
                                    v-model="textarea4">
                                </el-input> 
                            </td>
                        </tr>
                    
                    </table>

                </el-tab-pane>
            </el-tabs>
        
        </form>
   
        
        <el-dialog title="Export Excel" v-model="dialogTableVisible" width="80%"  style="height: 500px;" append-to-body  class="fansdialog">
                <exportexcel :packlistno="packlistno" @onevent="getDataExportExcel"></exportexcel>
        </el-dialog>

        <el-dialog title="Carry Packlist" v-model="dialogTableVisiblePackList"  width="80%"  append-to-body class="fansdialog">
                <SelectPackList  @onevent="getOnePackList"></SelectPackList>
        </el-dialog>
       
    </div>
    
</template>

<script>
import axios from 'axios';
import exportexcel from './exportexcel.vue'
import SelectPackList from './SelectPackList.vue'
import Qs from "qs"		//引入qs
import http from '@/http/api'
import { onMounted, ref } from 'vue';

//let serverUrl="https://localhost:44311/api/PackList"

export default{
  name: 'PackList',
  components: { exportexcel,SelectPackList},
  setup(){

    const dialogTableVisiblePackList = ref(false);
    const dialogTableVisible =ref(false);  
    const threePortClick=()=>{
        dialogTableVisiblePackList.value=true
    };
    const exportPackListExcel=()=>{
        dialogTableVisible.value=true
    };
    const multipleTable = ref(null);
    const getMultipleTable = () => {
      //console.log("11111"+multipleTable.value);
    };
    onMounted(() => {
        getMultipleTable();
    });
    return {
        dialogTableVisiblePackList,
        threePortClick,
        dialogTableVisible,
        exportPackListExcel,
        multipleTable
    };

  },
  data() {
      return {
   
        centerDialogVisible: false,
        packlistno:"",
        date:"",
        ccy1:"",
        ccy2:"",
        factory:"",
        preparedby:"",
        TtlCtn:"",
        DocNo:"",
        SCHeading:"",
        TtlNW:"",
        TtlGW:"",
        exportFlag:"未导出",
        fabtrim:"",
        checked: true,
        text1:"",
        text2:"",
        text3:"",
        textarea:"",
        textarea2:"",
        input_From:"",
        input_To:"",
        input_VIA:"",
        input_ETD:"",
        input_ETA:"",
        input_Vessel:"",
        input_Mode:"",
        input_Container:"",
        input_VoyNo:"",
        input_SealNo:"",
        input_MatContract:"",
        input_BlNo:"",
        input_Origin:"",
        input_Terms:"",
        input_FREIGHT:"",
        input_ToCountry:"",
        input_PayMent:"",
        input_InSurance:"",
        textarea3:"",
        textarea4:"",
        activeName:"Summary",
        packlistnoIsShow:true,
        tableData: [],
        multipleSelection: [],
        CtnTables:[],
        ctnTable:[],
        allData:{
            PackNo: this.packlistno,
            PackDate:this.data,
            Ccy: this.ccy1,
            CcyRate:this.ccy2,
            Factory:this.factory,
            PreparedBy:this.preparedby,
            TtlCtn:this.TtlCtn,
            SCHeading_k:this.SCHeading,
            TtlNW_k:this.TtlNW,
            TtlGW_k:this.TtlGW,
            exportFlag_k:this.exportFlag,
            fabtrim_k:this.fabtrim,
            text1_k:this.text1,
            text2_k:this.text2,
            text3_k:this.text3,
            textarea_k:this.textarea,
            textarea2_k:this.textarea2,
            inputFrom:this.input_From,
            inputTo:this.input_To,
            inputVIA:this.input_VIA,
            inputETD:this.input_ETD,
            inputETA:this.input_ETA,
            inputVessel:this.input_Vessel,
            inputMode:this.input_Mode,
            inputContainer:this.input_Container,
            inputVoyNo:this.input_VoyNo,
            inputSealNo:this.input_SealNo,
            inputMatContract:this.input_MatContract,
            inputBlNo:this.input_BlNo,
            inputOrigin:this.input_Origin,
            inputTerms:this.input_Terms,
            inputFREIGHT:this.input_FREIGHT,
            inputToCountry:this.input_ToCountry,
            inputPayMent:this.input_PayMent,
            inputInSurance:this.input_InSurance,
            textarea3_k:this.textarea3,
            textarea4_k:this.textarea4,
               
        }
      }
    },
   
    methods: {
     
      //批量MarkDN 
      PartMarkDN(){
            //找出被勾选的的数据
            // this.tableData.forEach((row)=>{
            //     console.log("row:"+row["Seq"]);
            //    if( row["selection"] == 'true') {
            //         console.log("row:"+row);
            //    }
            // });
            let rowDocNo='';
            
            console.log(this.$refs.multipleTable.selection);
            this.$refs.multipleTable.selection.forEach((row)=>{
                
                if(rowDocNo!=row["DocNo"]){
                    this.doMarkDN(1,row);
                    rowDocNo=row["DocNo"];
                }
                
            });
          
      },
      //批量MarkAdjustment
      PartMarkAdjustment(){
            let rowDocNo='';
            this.$refs.multipleTable.selection.forEach((row)=>{
                
                if(rowDocNo!=row["DocNo"]){
                    this.doMarkAdJustMent(1,row);
                    rowDocNo=row["DocNo"];
                }
                
            });
      },
      getOnePackList(data){
            this.packlistno=data;
            this.dialogTableVisiblePackList=false;
            this.PackListSelect();
      },
      SelectPackListMessage(){
        var packlistno = document.getElementById("packlistNO");
        packlistno.blur();
        this.dialogVisible=true;
      
      },
      getDataExportExcel(data){
        this.exportFlag=data;
      },
      SavePage()
      {   
            console.log(this.tableData);
            let data={
                        PackNo: this.packlistno,
                        PackDate:this.date,
                        Ccy: this.ccy1,
                        CcyRate:this.ccy2,
                        Factory:this.factory,
                        PreparedBy:this.preparedby,
                        TtlCtn:this.TtlCtn,
                        SCHeading_k:this.SCHeading,
                        TtlNW_k:this.TtlNW,
                        TtlGW_k:this.TtlGW,
                        exportFlag_k:this.exportFlag,
                        fabtrim_k:this.fabtrim,
                        text1_k:this.text1,
                        text2_k:this.text2,
                        text3_k:this.text3,
                        textarea_k:this.textarea,
                        textarea2_k:this.textarea2,
                        inputFrom:this.input_From,
                        inputTo:this.input_To,
                        inputVIA:this.input_VIA,
                        inputETD:this.input_ETD,
                        inputETA:this.input_ETA,
                        inputVessel:this.input_Vessel,
                        inputMode:this.input_Mode,
                        inputContainer:this.input_Container,
                        inputVoyNo:this.input_VoyNo,
                        inputSealNo:this.input_SealNo,
                        inputMatContract:this.input_MatContract,
                        inputBlNo:this.input_BlNo,
                        inputOrigin:this.input_Origin,
                        inputTerms:this.input_Terms,
                        inputFREIGHT:this.input_FREIGHT,
                        inputToCountry:this.input_ToCountry,
                        inputPayMent:this.input_PayMent,
                        inputInSurance:this.input_InSurance,
                        textarea3_k:this.textarea3,
                        textarea4_k:this.textarea4,
                        SummaryTable:this.tableData,
                        CtnTables:this.CtnTables
                     }

            http.packlist.SavePage(data).then((res) =>{
                    if(res.data)
                    {
                        this.$notify({
                            title: 'success',
                            message: 'save success',
                            type: 'success'
                        });
                    }else{
                        this.$notify({
                            title: 'error ',
                            message: 'save error',
                            type: 'error'
                        });
                    }

                    
                }).catch((res) =>{
                    
                    this.$notify({
                            title: 'error ',
                            message: 'save error',
                            type: 'error'
                        });
                });     
            // axios({
            //         method:'post',
            //         url:serverUrl+'/SavePages',//服务器url
            //         headers:{"Content-Type":"application/json"},
            //         data: {
            //             PackNo: this.packlistno,
            //             PackDate:this.date,
            //             Ccy: this.ccy1,
            //             CcyRate:this.ccy2,
            //             Factory:this.factory,
            //             PreparedBy:this.preparedby,
            //             TtlCtn:this.TtlCtn,
            //             SCHeading_k:this.SCHeading,
            //             TtlNW_k:this.TtlNW,
            //             TtlGW_k:this.TtlGW,
            //             exportFlag_k:this.exportFlag,
            //             fabtrim_k:this.fabtrim,
            //             text1_k:this.text1,
            //             text2_k:this.text2,
            //             text3_k:this.text3,
            //             textarea_k:this.textarea,
            //             textarea2_k:this.textarea2,
            //             inputFrom:this.input_From,
            //             inputTo:this.input_To,
            //             inputVIA:this.input_VIA,
            //             inputETD:this.input_ETD,
            //             inputETA:this.input_ETA,
            //             inputVessel:this.input_Vessel,
            //             inputMode:this.input_Mode,
            //             inputContainer:this.input_Container,
            //             inputVoyNo:this.input_VoyNo,
            //             inputSealNo:this.input_SealNo,
            //             inputMatContract:this.input_MatContract,
            //             inputBlNo:this.input_BlNo,
            //             inputOrigin:this.input_Origin,
            //             inputTerms:this.input_Terms,
            //             inputFREIGHT:this.input_FREIGHT,
            //             inputToCountry:this.input_ToCountry,
            //             inputPayMent:this.input_PayMent,
            //             inputInSurance:this.input_InSurance,
            //             textarea3_k:this.textarea3,
            //             textarea4_k:this.textarea4,
            //             SummaryTable:this.tableData,
            //             CtnTables:this.CtnTables
            //          },
            //     }).then((res) =>{
            //         if(res.data)
            //         {
            //             this.$notify({
            //                 title: '成功',
            //                 message: '保存成功',
            //                 type: 'success'
            //             });
            //         }else{
            //             this.$notify({
            //                 title: '失败',
            //                 message: '保存失败',
            //                 type: 'error'
            //             });
            //         }

                    
            //     }).catch((res) =>{
                    
            //         this.$notify({
            //                 title: '失败',
            //                 message: '保存失败',
            //                 type: 'error'
            //         });
            //     })      

           
      },
      handleClick(){},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      doMarkDN(index,row) {
        //console.log("MarkDN:"+index, row);
        //对tableData进行过滤 表达式中false就过滤掉，true就留下  ,目的就是要把点击行的DocNo清除
        //再将Mark 回来的数据放到tableData中
        let data = { id:row.DocNo}
        http.packlist.doMarkDN(data).then((res)=>{
                if(res.data!=''){
                    this.tableData=this.tableData.filter(item=>item.DocNo!=row.DocNo);
                    res.data.forEach(element=>{
                                let vote={}
                                vote.Seq=element["seq"];
                                vote.MatKey=element["matKey"];
                                vote.DocNo=element["docNo"];
                                vote.Mat_Code = element["mat_Code"];
                                vote.Mpo_No=element["mpo_No"];
                                vote.uc_Px=element["uc_Px"];
                                vote.Temp_Mat=element["temp_Mat"];
                                vote.Job_No=element["job_No"];
                                vote.Issus_Unit=element["issus_Unit"];
                                vote.Color_Code=element["color_Code"];
                                vote.Color=element["color"];
                                vote.ChnColor=element["chnColor"];
                                vote.sizes=element["sizes"];
                                vote.Invoice_No=element["invoice_No"];
                                vote.MPO_Description=element["mpO_Description"];
                                this.tableData.push(vote);
                    });
                    this.$notify({
                                title: 'success',
                                message: 'Mark DN success',
                                type: 'success'
                    });
                }else{
                    this.$notify({
                            title: 'error',
                            message: 'No DN data',
                            type: 'error'
                    });
                }
                
            }).catch((res)=>{
                this.$notify({
                            title: 'error',
                            message: 'Mark DN error',
                            type: 'error'
                });
            });

        // axios({
        //     url:serverUrl+'/GetMarkDN?id='+row.DocNo,//服务器url
        //     method:"get"
        // }).then((res)=>{
        //         if(res.data!=''){
        //             this.tableData=this.tableData.filter(item=>item.DocNo!=row.DocNo);
        //             res.data.forEach(element=>{
        //                         let vote={}
        //                         vote.Seq=element["seq"];
        //                         vote.MatKey=element["matKey"];
        //                         vote.DocNo=element["docNo"];
        //                         vote.Mat_Code = element["mat_Code"];
        //                         vote.Mpo_No=element["mpo_No"];
        //                         vote.uc_Px=element["uc_Px"];
        //                         vote.Temp_Mat=element["temp_Mat"];
        //                         vote.Job_No=element["job_No"];
        //                         vote.Issus_Unit=element["issus_Unit"];
        //                         vote.Color_Code=element["color_Code"];
        //                         vote.Color=element["color"];
        //                         vote.ChnColor=element["chnColor"];
        //                         vote.sizes=element["sizes"];
        //                         vote.Invoice_No=element["invoice_No"];
        //                         vote.MPO_Description=element["mpO_Description"];
        //                         this.tableData.push(vote);
        //             });
        //             this.$notify({
        //                         title: '成功',
        //                         message: 'Mark DN 成功',
        //                         type: 'success'
        //             });
        //         }else{
        //             this.$notify({
        //                     title: '失败',
        //                     message: '没有 DN  数据',
        //                     type: 'error'
        //             });
        //         }
                
        //     }).catch((res)=>{
        //         this.$notify({
        //                     title: '失败',
        //                     message: 'Mark DN 失败',
        //                     type: 'error'
        //         });
        //     });

            //对table的数据进行排序
            this.tableData=this.tableData.sort((p1,p2)=>{
                return p1.Seq-p2.Seq;
            });

      },
      doMarkAdJustMent(index,row) {
        //console.log(index, row);
        
        //再将Mark 回来的数据放到tableData中
        let data={id:row.DocNo}
        http.packlist.doMarkAdJustMent(data).then((res)=>{
                
                if(res.data!=''){
                    //对tableData进行过滤 表达式中false就过滤掉，true就留下  ,目的就是要把点击行的DocNo清除
                    this.tableData=this.tableData.filter(item=>item.DocNo!=row.DocNo);
                    res.data.forEach(element=>{
                                let vote={}
                                vote.Seq=element["seq"];
                                vote.MatKey=element["matKey"];
                                vote.DocNo=element["docNo"];
                                vote.Mat_Code = element["mat_Code"];
                                vote.Mpo_No=element["mpo_No"];
                                vote.uc_Px=element["uc_Px"];
                                vote.Temp_Mat=element["temp_Mat"];
                                vote.Job_No=element["job_No"];
                                vote.Issus_Unit=element["issus_Unit"];
                                vote.Color_Code=element["color_Code"];
                                vote.Color=element["color"];
                                vote.ChnColor=element["chnColor"];
                                vote.sizes=element["sizes"];
                                vote.Invoice_No=element["invoice_No"];
                                vote.MPO_Description=element["mpO_Description"];
                                this.tableData.push(vote);
                    });
                    this.$notify({
                                title: 'success',
                                message: 'Mark Adjustment success',
                                type: 'success'
                    });    
                }else{
                    this.$notify({
                            title: 'error',
                            message: 'No Adjustment data',
                            type: 'error'
                    });
                }
                
            }).catch((res)=>{
                this.$notify({
                            title: 'error',
                            message: 'Mark Adjustment error',
                            type: 'error'
                });
        });
        // axios({
        //     url:serverUrl+'/GetStkAdj?id='+row.DocNo,//服务器url
        //     method:"get"
        // }).then((res)=>{
                
        //         if(res.data!=''){
        //             //对tableData进行过滤 表达式中false就过滤掉，true就留下  ,目的就是要把点击行的DocNo清除
        //             this.tableData=this.tableData.filter(item=>item.DocNo!=row.DocNo);
        //             res.data.forEach(element=>{
        //                         let vote={}
        //                         vote.Seq=element["seq"];
        //                         vote.MatKey=element["matKey"];
        //                         vote.DocNo=element["docNo"];
        //                         vote.Mat_Code = element["mat_Code"];
        //                         vote.Mpo_No=element["mpo_No"];
        //                         vote.uc_Px=element["uc_Px"];
        //                         vote.Temp_Mat=element["temp_Mat"];
        //                         vote.Job_No=element["job_No"];
        //                         vote.Issus_Unit=element["issus_Unit"];
        //                         vote.Color_Code=element["color_Code"];
        //                         vote.Color=element["color"];
        //                         vote.ChnColor=element["chnColor"];
        //                         vote.sizes=element["sizes"];
        //                         vote.Invoice_No=element["invoice_No"];
        //                         vote.MPO_Description=element["mpO_Description"];
        //                         this.tableData.push(vote);
        //             });
        //             this.$notify({
        //                         title: '成功',
        //                         message: 'Mark Adjustment 成功',
        //                         type: 'success'
        //             });    
        //         }else{
        //             this.$notify({
        //                     title: '失败',
        //                     message: '没有 Adjustment 数据',
        //                     type: 'error'
        //             });
        //         }
                
        //     }).catch((res)=>{
        //         this.$notify({
        //                     title: '失败',
        //                     message: 'Mark Adjustment 失败',
        //                     type: 'error'
        //         });
        //     });

            //对table的数据进行排序
            this.tableData=this.tableData.sort((p1,p2)=>{
                return p1.Seq-p2.Seq;
            });

      },
      doMarkTaking(index, row) {
        //console.log(index, row);
      },
      doShowCtn(index, row) {
        //console.log(index, row);
        var ctn_No=row.ctn_No;
      
        this.ctnTable=[];
        this.CtnTables.forEach(row=>{
            if(ctn_No==row["ctn"]){
                var ctnvote={}
                ctnvote.cbm=row["cbm"];
                ctnvote.ctn=row["ctn"];
                ctnvote.gw=row["gw"];
                ctnvote.nw=row["nw"];
                ctnvote.height=row["height"];
                ctnvote.length=row["length"];
                ctnvote.width=row["width"];
                ctnvote.ctn_Qty=row["ctn_Qty"];
                this.ctnTable.push(ctnvote);
            }
            
        });

      },
      
      PackListSelect(){
        if(this.packlistno=='')
        {
            alert("Mat PackList No can not empty!");
            return;
        }
        let params={
            id:this.packlistno
        }
        http.packlist.packListSelect(params).then((res)=>{
                    console.log(res.data);
                    this.packlistno=res.data["packNo"];
                    this.date=res.data["packDate"];
                    this.ccy1=res.data["ccy"];
                    this.ccy2=res.data["ccyRate"];
                    this.factory=res.data["factory"];
                    this.preparedby=res.data["preparedBy"];
                    this.SCHeading=res.data["scHeading"];
                    this.TtlCtn=res.data["ttlCtn"];
                    this.TtlGW = res.data["ttlGW"];
                    this.TtlNW=res.data["ttlNW"];
                    
                    this.input_From=res.data["frStr"];
                    this.input_BlNo=res.data["blNo"];
                    this.input_Container=res.data["container"];
                    this.input_ETA=res.data["eta"];
                    this.input_ETD=res.data["etd"];
                    this.input_MatContract=res.data["matContract"];
                    this.input_Mode=res.data["mode"];
                    this.input_Origin=res.data["origin"];
                    this.input_SealNo=res.data["sealNo"];
                    this.textarea3=res.data["shippingRemark"];
                    this.textarea4=res.data["remark"];
                    this.input_Terms=res.data["terms"];
                    this.input_ToCountry=res.data["toCountry"];
                    this.input_To=res.data["toStr"];
                    this.input_Vessel=res.data["vessel"];
                    this.input_VoyNo=res.data["voyNo"];
                    this.input_PayMent=res.data["payment"];
                    this.input_VIA=res.data["via"];

                    this.tableData=[];
                    this.CtnTables=[];
                    if(res.data["summaryList"]!=null){
                        res.data["summaryList"].forEach(element=>{
                            let vote={}
                            vote.Seq=element["seq"];
                            vote.SumId=element["sumId"];
                            vote.MatKey=element["matKey"];
                            vote.DocNo=element["docNo"];
                            vote.Mat_Code = element["mat_Code"];
                            vote.Mpo_No=element["mpo_No"];
                            vote.uc_Px=element["uc_Px"];
                            vote.Temp_Mat=element["temp_Mat"];
                            vote.ctn_No=element["ctn_No"];
                            vote.Job_No=element["job_No"];
                            //vote.lot=element["lot"];
                            vote.Issus_Unit=element["issus_Unit"];
                            vote.Color_Code=element["color_Code"];
                            vote.Color=element["color"];
                            vote.ChnColor=element["chnColor"];
                            vote.sizes=element["sizes"];
                            vote.Invoice_No=element["invoice_No"];
                            vote.MPO_Description=element["mpO_Description"];
                            vote.Custom_Description=element["custom_Description"];
                            if(element["ctnInfoList"]!=null)
                            {
                                element["ctnInfoList"].forEach(row=>{
                                    var ctnvote={}
                                    ctnvote.cbm=row["cbm"];
                                    ctnvote.ctn=row["ctn"];
                                    ctnvote.gw=row["gw"];
                                    ctnvote.nw=row["nw"];
                                    ctnvote.height=row["height"];
                                    ctnvote.length=row["length"];
                                    ctnvote.width=row["width"];
                                    ctnvote.ctn_Qty=row["ctn_Qty"];
                                    this.CtnTables.push(ctnvote);
                                });

                            }
                            
                            this.tableData.push(vote);
                        });
                    }
                       
                   
                   this.$notify({
                        title: 'Success',
                        message: 'Import successfully',
                        type: 'success'
                   });
        }).catch((res) =>{
                    
                    alert("No connection to the server, please contact the administrator！");
        });
        // axios({
        //         method:'get',
        //         url:serverUrl+'/GetPackList?id='+this.packlistno,//服务器url
                    
        //         }).then((res) =>{
        //             console.log(res.data);
        //             this.packlistno=res.data["packNo"];
        //             this.date=res.data["packDate"];
        //             this.ccy1=res.data["ccy"];
        //             this.ccy2=res.data["ccyRate"];
        //             this.factory=res.data["factory"];
        //             this.preparedby=res.data["preparedBy"];
        //             this.SCHeading=res.data["scHeading"];
        //             this.TtlCtn=res.data["ttlCtn"];
        //             this.TtlGW = res.data["ttlGW"];
        //             this.TtlNW=res.data["ttlNW"];
                    
        //             this.input_From=res.data["frStr"];
        //             this.input_BlNo=res.data["blNo"];
        //             this.input_Container=res.data["container"];
        //             this.input_ETA=res.data["eta"];
        //             this.input_ETD=res.data["etd"];
        //             this.input_MatContract=res.data["matContract"];
        //             this.input_Mode=res.data["mode"];
        //             this.input_Origin=res.data["origin"];
        //             this.input_SealNo=res.data["sealNo"];
        //             this.textarea3=res.data["shippingRemark"];
        //             this.textarea4=res.data["remark"];
        //             this.input_Terms=res.data["terms"];
        //             this.input_ToCountry=res.data["toCountry"];
        //             this.input_To=res.data["toStr"];
        //             this.input_Vessel=res.data["vessel"];
        //             this.input_VoyNo=res.data["voyNo"];
        //             this.input_PayMent=res.data["payment"];
        //             this.input_VIA=res.data["via"];

        //             this.tableData=[];
        //             this.CtnTables=[];
        //             if(res.data["summaryList"]!=null){
        //                 res.data["summaryList"].forEach(element=>{
        //                     let vote={}
        //                     vote.Seq=element["seq"];
        //                     vote.SumId=element["sumId"];
        //                     vote.MatKey=element["matKey"];
        //                     vote.DocNo=element["docNo"];
        //                     vote.Mat_Code = element["mat_Code"];
        //                     vote.Mpo_No=element["mpo_No"];
        //                     vote.uc_Px=element["uc_Px"];
        //                     vote.Temp_Mat=element["temp_Mat"];
        //                     vote.ctn_No=element["ctn_No"];
        //                     vote.Job_No=element["job_No"];
        //                     //vote.lot=element["lot"];
        //                     vote.Issus_Unit=element["issus_Unit"];
        //                     vote.Color_Code=element["color_Code"];
        //                     vote.Color=element["color"];
        //                     vote.ChnColor=element["chnColor"];
        //                     vote.sizes=element["sizes"];
        //                     vote.Invoice_No=element["invoice_No"];
        //                     vote.MPO_Description=element["mpO_Description"];
        //                     vote.Custom_Description=element["custom_Description"];
        //                     if(element["ctnInfoList"]!=null)
        //                     {
        //                         element["ctnInfoList"].forEach(row=>{
        //                             var ctnvote={}
        //                             ctnvote.cbm=row["cbm"];
        //                             ctnvote.ctn=row["ctn"];
        //                             ctnvote.gw=row["gw"];
        //                             ctnvote.nw=row["nw"];
        //                             ctnvote.height=row["height"];
        //                             ctnvote.length=row["length"];
        //                             ctnvote.width=row["width"];
        //                             ctnvote.ctn_Qty=row["ctn_Qty"];
        //                             this.CtnTables.push(ctnvote);
        //                         });

        //                     }
                            
        //                     this.tableData.push(vote);
        //                 });
        //             }
                       
                   
        //            this.$notify({
        //                 title: '成功',
        //                 message: '导入成功',
        //                 type: 'success'
        //            });
        //         }).catch((res) =>{
                    
        //             alert("没有连接到服务器，请联系管理员！");
        //         })
      },
      exportPackListExcel()
      {

      }
    },
    props:{
        value:false
    }
}

</script>

<style scoped>
p{
    float: right;
}
table{
    margin:0;
    padding:0;
}

.elinput{
    width: 100px;
    float: right;
}
.isfloat{
    float:left;
    width: 140px;
}
.threeButton{
    text-align: right;
}

.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  #table1 td{
    width:400px;
  }
  #save_case{
    position: relative;
    left:20%;
    top:-50px;
  }
  .fansdialog /deep/ .el-dialog__body {
    height: 20vh;
    overflow: auto;
  }
  #divFloot{
    margin:100px,100px,100px,100px;
  }
  #table3 td{
    width:300px;

  }
</style>



