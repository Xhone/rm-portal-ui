<template>
    <div id="rm-container" :class="['rm-theme-' + theme]">
        <div class="rm-aside" :style="{ width: menuWidth + 'px' }">
            <div class="header" :style="{ width: menuWidth - 1 + 'px' }">
                <img v-show="!isCollapse" :src="logo" />
                <i @click="toggleLeft" class="el-icon-s-fold collapse-menu" />

            </div>
            <div class="rm-menu">
                <el-scrollbar style="height: 100%;">
                    <RMMenu :currentMenuId="currentMenuId" :on-select="onSelect" :enable="true" :open-select="false"
                        :isCollapse="isCollapse" :list="menuOptions"></RMMenu>
                </el-scrollbar>
            </div>
        </div>
        <div class="rm-container" :style="{ left: menuWidth - 1 + 'px' }">
            <div class="rm-header">
                <div class="project-name">RM Portal</div>
                <div class="header-text"></div>
                <div class="header-info">
                    <div class="user">
                        <span>{{ userName }}</span>
                        <span id="index-date"></span>
                    </div>
                    <!-- <div class="settings">
                        <i
                        style="font-size: 20px;"
                        class="el-icon-s-tools"
                        @click="drawerModel=true"
                        />
                    </div> -->
                </div>
            </div>
        </div>
        <el-drawer title="select theme" v-model="drawerModel" direction="rtl" destroy-on-close>
            <div class="theme-selector">
                <div @click="changeTheme(item.name)" class="item" v-for="(item, index) in theme_color" :key="index"
                    :style="{ background: item.color }">
                    <div v-show="item.leftColor" :style="{ background: item.leftColor }" style="height: 100%;width: 20px;"
                        class="t-left"></div>
                    <div class="t-right"></div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<style lang="less" scoped>
@import "./index/index.less";
</style>
<script>
var imgUrl = require("@/assets/logo.gif");
var $interval;
var $indexDate;

import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import loading from "@/components/basic/RouterLoading.vue"
import RMMenu from "@/components/basic/RMElementMenu.vue"
export default defineComponent({
    components: {
        loading,
        RMMenu,
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
        const isCollapse = ref(false);
        const drawerModel = ref(false);
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
        ]);

        const selectId = ref("1");
        //[首页]标签序号(当前右键选中的菜单)
        const selectMenuIndex = ref("0");
        const currentMenuId = ref(0);
        const userName = ref("--");
        //const userInfo = ref({});
        const visibleItem = reactive({
            left: false,
            right: false,
            all: false,
            other: false,
        })
        const logo = ref(imgUrl);
        const theme = ref("blue2");
        const menuOption = ref([]);
        const permissionInited = ref(false);
        let _config = getCurrentInstance().appContext.config.globalProperties;

        const toggleLeft = () => {
            isCollapse.value = !isCollapse.value;
            menuWidth.value = isCollapse.value ? 63 : 200;
        }

        _config.menu = {
            show() {
                toggleLeft();
            },
            hide() {
                toggleLeft();
            }
        };

        const changeTheme = (name) => {
            if (theme.value != name) {
                theme.value = name;
            }
            localStorage.setItem("rm_theme", name);
        };

        const open = (item, useRoute) => {

        };

        const close = (path) => {

        };
        const getSelectMenuName = (id) => {
            return menuOption.value.find(function (x) {
                return x.id = id;
            });

        }
        const onSelect = (treeId) => {
            var item = getSelectMenuName(treeId);
            open(item, false);
        }
        /**
         * 系统创建开始
         */
        const created = () => {
            let _theme = localStorage.getItem("rm_theme");
            if (_theme) {
                theme.value = _theme;
            }

            Object.assign(_config.$tabs, { open: open, close: close })
        };
        created();
        return {
            menuWidth,
            isCollapse,
            drawerModel,
            theme_color,
            userName,
            selectId,
            selectMenuIndex,
            onSelect,
            logo,
            theme,
            menuOption,
            permissionInited,
            changeTheme,
            toggleLeft,
            contextMenuVisible,
            visibleItem,
            currentMenuId,

        };
    },
    mounted() {
        let _date = showTime();
        $indexDate = document.getElementById("index-date");
        $indexDate.innerText = _date;
        $interval = setInterval(function () {
            $indexDate.innerText = showTime();
        }, 1000);
    },
    destroyed() {
        $this = null;
        clearInterval($interval);
    },
});

const week = new Array(
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"

);
function showTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();

    return (
        year +
        "." +
        (month < 10 ? "0" + month : month) +
        "." +
        (day < 10 ? "0" + day : day) +
        "" +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (second < 10 ? "0" + second : second) +
        " " +
        (week[date.getDay() - 1] || week[6])
    );
}

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