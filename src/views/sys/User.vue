<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="account"></el-input>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" class="el-icon-search" @click="search">Search</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd"> <el-icon>
                            <Plus />
                        </el-icon>Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--表格内容栏-->
        <el-table :data="userData" border style="width: 100%;">
            <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>
            <el-table-column label="ID" prop="id"> </el-table-column>
            <el-table-column label="UserName" prop="userName"></el-table-column>
            <el-table-column label="Telephone" prop="tel"></el-table-column>
            <el-table-column label="Email" prop="email"></el-table-column>
            <el-table-column label="Operation">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增编辑界面-->
        <el-dialog :title="operation ? '新增' : '编辑'" width="40%" v-model="dialogVisible" :show-close="false"
            :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
                label-position="right">
                <el-form-item label="ID" prop="id" v-if="false">
                    <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="UserName" prop="userName">
                    <el-input v-model="dataForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="NTID" prop="ntid">
                    <el-input v-model="dataForm.ntid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="dataForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Telephone" prop="tel">
                    <el-input v-model="dataForm.tel" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div>
                <el-button :size="size" @click="dialogVisible = false">cacel</el-button>
                <el-button :size="size" type="primary" @click.native="submitForm">submit</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import http from '@/http/api'
import store from '@/store'
import { format } from "@/util/datetime"
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'user',
    setup(props, ctx) {
        const filters = ref({
            name: ''
        })
        const userData = ref([{
            id: 0,
            userName: '',
            deptId: 0,
            title: '',
            level: '',
            ntid: '',
            tel: '',
            email: '',
            createBy: '',
            createDate: ''
        }]);


        return {
            filters,
            userData,

        }
    },
    data() {
        return {
            size: 'normal',

            showBatchDelete: true,
            showOperation: true,
            columns: [],
            filterColumns: [],
            pageRequest: { pageNum: 1, pageSize: 10 },
            pageResult: {},

            operation: false, // true:新增, false:编辑
            dialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            dataFormRules: {
                userName:
                    { required: true, message: 'please enter userName', trigger: 'blur' },
                password: { required: true, message: 'please enter password', trigger: 'blur' },
                ntid: { required: true, message: 'please enter NTID', trigger: 'blur' },

            },
            // 新增编辑界面数据
            dataForm: {
                id: 0,
                userName: '',
                password: '123456',
                deptId: 1,
                title: '',
                level: '',
                ntid: '',
                tel: "",
                email: '',
                createBy: '',
                createDate: '',
                modifier:'',
                modifyDate:''
            },
            deptData: [],
            deptTreeProps: {
                label: 'name',
                children: 'children'
            },
            roles: []
        }
    },
    methods: {

        search: function () {
            let params = {
                userName: this.filters.name
            }


            http.user.getUser(params).then((res) => {
                this.userData = res.data;


            }).catch((error) => {

            })
        },

        handleDelete: function (row) {

            let params = { id: row["id"] };

            http.user.deleteUser(params).then((res) => {

                http.user.getAll().then((res) => {
                    this.userData = res.data
                })

                this.$message({ message: '操作成功', type: 'success' })
            }).catch((error) => {
                this.$message({ message: '操作失败, ' + error, type: 'error' })
            })


            return;
            axios.delete('https:/localhost:44311/api/User/Delete', { params: { id: 22 } }).then((res) => {

            }).catch((error) => {
                this.$message({ message: '操作失败, ' + error, type: 'error' })
            })


        },
        // 显示新增界面
        handleAdd: function () {
            this.dialogVisible = true
            this.operation = true
            this.dataForm = {
                id: 0,
                userName: '',
                password: '123456',
                deptId: 1,
                title: '',
                level: '',
                ntid: '',
                tel: "",
                email: '',
                createBy: '',
                createDate: new Date()

            }

        },
        // 显示编辑界面
        handleEdit: function (params) {
            this.dialogVisible = true
            this.operation = false
            this.dataForm = Object.assign({}, params)

        },
        // 编辑
        submitForm: function () {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        //this.editLoading = true


                        if (this.operation) {
                            let data = {

                                userName: this.dataForm.userName,
                                password: this.dataForm.password,
                                detpId: this.dataForm.detpId,
                                title: this.dataForm.title,
                                level: this.dataForm.level,
                                ntid: this.dataForm.ntid,
                                tel: this.dataForm.tel,
                                email: this.dataForm.email,
                                createBy: store.state.userInfo,
                                createDate: this.dataForm.createDate,
                                modifier:'',
                                modifyDate:null,
                            }
                            http.user.save(data).then((res) => {
                                //this.editLoading = false


                                if (res.data == 200) {

                                    http.user.getAll().then((res) => {
                                        this.userData = res.data
                                    })

                                    this.$message({ message: '操作成功', type: 'success' })
                                    this.dialogVisible = false
                                    this.$refs['dataForm'].resetFields()
                                } else {
                                    this.$message({ message: '操作失败, ' + res.msg, type: 'error' })
                                }
                                //this.findPage(null)
                            })
                        } else {
                            let data = {
                                id:this.dataForm.id,
                                userName: this.dataForm.userName,
                                password: this.dataForm.password,
                                detpId: this.dataForm.detpId,
                                title: this.dataForm.title,
                                level: this.dataForm.level,
                                ntid: this.dataForm.ntid,
                                tel: this.dataForm.tel,
                                email: this.dataForm.email,
                                createBy:this.dataForm.createBy,
                                createDate:this.dataForm.createDate,
                                modifier: store.state.userInfo,
                                modifyDate: new Date()
                            }
                            http.user.putUser(data).then((res) => {
                                //this.editLoading = false


                                if (res.data == 200) {

                                    http.user.getAll().then((res) => {
                                        this.userData = res.data
                                    })

                                    this.$message({ message: '操作成功', type: 'success' })
                                    this.dialogVisible = false
                                    this.$refs['dataForm'].resetFields()
                                } else {
                                    this.$message({ message: '操作失败, ' + res.msg, type: 'error' })
                                }

                            })
                        }

                    })
                }
            })
        },

        // 时间格式化
        dateFormat: function (row, column, cellValue, index) {
            return format(row[column.property])
        },

        // 处理表格列过滤显示
        initColumns: function () {
            this.columns = [
                { prop: "id", label: "ID", minWidth: 50 },
                { prop: "userName", label: "Account", minWidth: 120 },
                { prop: "tel", label: "Telephone", minWidth: 100 },
                { prop: "email", label: "Email", minWidth: 120 },


                // {prop:"createBy", label:"创建人", minWidth:120},
                // {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
                // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
                // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
            ]
            this.filterColumns = JSON.parse(JSON.stringify(this.columns));
        }
    },
    mounted() {
        //this.findDeptTree()
        //this.initColumns()
        http.user.getAll().then((res) => {
            this.userData = res.data;
        }).catch((error) => {

        })
    }
}) 
</script>
  
<style scoped></style>