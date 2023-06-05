<template>
    <div id="rm-container"></div>
</template>
<script>
var imgUrl=require("@/assets/logo.gif")
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

export default defineComponent({
    components: {

    },
    data() {
        return {
            allTabs: true,
            leftTabs: true,
            rightTabs: true,
            otherTabs: true,
            menuLeft: 0,
            menuTop: 0,
        }
    },
    setup(props, context) {
        //获取全局属性和方法
        const { proxy } = getCurrentInstance();

        //菜单导航默认宽度
        const menuWidth = ref(200);
        const contextMenuVisible = ref(false);
        const IsCollapse = ref(false);
        const theme_color = ref([
            { name: "dark", color: "#272929" },
            { name: "blue", color: "rgb(45, 140, 240)" },
            { name: "blue2", color: "rgb(45, 140, 240)", leftColor: "#0068d6" },
            { name: "red", color: "rgb(237, 64, 20)" },
            { name: "red2", color: "rgb(237, 64, 20)", leftColor: "#a90000" },
            { name: "orange", color: "#ff9900" },
            { name: "orange2", color: "#ff9900", leftColor: "rgb(232 141 5)" },
            { name: "green", color: "rgb(25, 190, 107)" },
            { name: "green2", color: "rgb(25, 190, 107)", leftColor: "#019e4f" },
            { name: "white", color: "#fff" },
        ])
    }
});
</script>
<style lang="less" scoped>
.rm-container .rm-path ::v-deep(.el-tabs_content) {
    padding: 0px;
}

.contextMenu {
    width: 120px;
    margin: 0;
    border: 1px solid #eaeaea;
    background: #fff;
    z-index: 30000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgb(182 182 182 / 20%);

    i,
    button {
        font-size: 14px !important;
    }
}

.contextMenu li {
    margin: 0px;
    padding: 5px 17px;
}

.contextMenu li:hover {
    background: #fafafa;
    cursor: pointer;
}

.contextMenu li button {
    color: #626060;
    font-size: 14px;
    letter-spacing: 1px;
}

.el-tabs.el-tabs--top.el-tabs--border-card.header-navigation>.el-tabs__header .el-tabs__item:last-child,
.el-tabs--top.el-tabs--border-card.header-navigation>.el-tabs__header .el-tabs__item:nth-child(2) {
    padding: 0;
}

.header-navigation ::v-deep(.el-tabs__item.is-top) {
    padding: 0 15px;
}
</style>
<style>
.horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
}
</style>