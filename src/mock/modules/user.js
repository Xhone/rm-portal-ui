/**
 *用户管理模块 
 */

export function save(){
    return{
        url:'user/save',
        type:'post',
        data:{
            "code":200,
            "msg":null,
            "data":1
        }
    }
}

export function batchDelete(){
    return{
        url:'user/delete',
        type:'post',
        data:{
            "code":200,
            "msg":null,
            "data":1
        }
    }
}

export function findPage(params){
    let findPageData={
        "code":200,
        "msg":null,
        "data":{}
    }
    let pageNum=1
    let pageSize=8
    if(params!==null){

    }
    let content=this.getContent(pageNum,pageSize)
        findPageData.data.pageNum=pageNum
        findPageData.data.pageSize=pageSize
        findPageData.data.totalSize=50
        findPageData.data.content=content
    return{
        url:'user/findPage',
        type:'post',
        data:findPageData
    }
}

export function getContent(pageNum,pageSize){
    let content=[]
    for(let i=0;i<pageSize;i++){
        let obj={}
        let index=((pageNum-1)*pageSize)+i+1
        obj.id=index
        obj.name='sin'+index
        obj.password='9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d'
        obj.salt='test'
        obj.email='sin'+index+'@carrywealth.com'
        obj.mobil='18854209645'
        obj.status=1
        obj.deptId=12
        obj.deptName='IT部'
        obj.status=1
        if(i%2===0){
            obj.depId=13
            obj.deptName='市场部'
        }
        obj.creatBy='admin'
        obj.createTime='2023-05-21 08:50:21'
        obj.creatBy='admin'
        obj.createTime='2023-05-21 08:50:21'
        content.push(obj)
    }
}
//查找用户的菜单权限标识集合
export function findPermissions(){
    let permsData={
        "code":200,
        "msg":null,
        "data":[
            null,
            "sys:user:view",
            "sys:menu:delete",
            "sys:dept:edit",
            "sys:dict:edit",
            "sys:dict:delete",
            "sys:menu:add",
            "sys:user:add",
            "sys:log:view",
            "sys:dept:delete",
            "sys:role:edit",
            "sys:role:view",
            "sys:dict:view",
            "sys:user:edit",
            "sys:user:delete",
            "sys:dept:view",
            "sys:dept:add",
            "sys:role:delete",
            "sys:menu:view",
            "sys:menu:edit",
            "sys:dict:add",
            "sys:role:add"
        ]
    }
    return{
        url:'user/findPermissions',
        type:'get',
        data:permsData
    }
}