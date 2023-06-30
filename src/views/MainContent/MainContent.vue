<template>
    <div id="main-container" class="main-container" :class="collapse ? 'position-collapse-left' : 'position-left'">
        <div class="tab-container">
            <el-tabs class="tabs" :class="collapse ? 'position-collapse-left' : 'position-left'"
                v-model="mainTabsActiveName" :closable="true" type="card" @tab-click="selectedTabHandle"
                @tab-remove="removeTabHandle">
                <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
                    <div style="font-size: 20px;width: 50px;"><i class="el-icon-arrow-down"></i></div>

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tabsCloseCurrentHandle">close current tab</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseOtherHandle">close other tab</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseAllHandle">close all tab</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">refresh</el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>
                <el-tab-pane v-for="item in mainTabs" :key="item.name" :label="item.title" :name="item.name">
                    <span slot="label"><i :class="item.icon" />{{ item.title }}</span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--主内容区域-->
        <div class="main-content">
            <el-main>
                <!-- <router-view/> -->
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" :key="$route.name"
                            v-if="!$route.meta || ($route.meta && !$route.meta.hasOwnProperty('keepAlive'))" />
                    </keep-alive>
                    <component :is="Component" :key="$route.name"
                        v-if="$route.meta && $route.meta.hasOwnProperty('keepAlive')" />
                </router-view>
            </el-main>

        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import store from '@/store'
export default defineComponent({
    name: 'MainContent',
    computed: {
        mainTabs: {
            get() { return store.state.tab.mainTabs },
            set(val) { store.commit('updateMainTabs', val) }
        },
        mainTabsActiveName: {
            get() { return store.state.tab.mainTabsActiveName },
            set(val) { store.commit('updateMainTabsActiveName', val) }
        }
    },
    ...mapState({
        collapse: state => state.app.collapse,
    }),
    methods: {
        selectedTabHandle(tab) {
            tab = this.mainTabs.filter(item => item.name === tab.name);
            if (tab.length >= 1) {
                this.$router.push({ name: tab[0].name })
            }
        },
        removeTabHandle(tabName) {
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
            if (this.mainTabs.length >= 1) {
                if (tabName === this.mainTabsActiveName) {
                    this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1], name }, () => {
                        this.mainTabsActiveName = this.$route.name
                    })
                }
            } else {
                this.$router.push('/');
            }
        },
        //关闭当前标签
        tabsCloseCurrentHandle() {
            this.removeTabHandle(this.mainTabsActiveName);
        },
        //关闭其他
        tabsCloseOtherHandle() {
            this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName);
        },
        //关闭全部
        tabsCloseAllHandle() {
            this.mainTabs = [];
            this.$router.push('/')
        },
        //刷新当前标签
        tabsRefreshCurrentHandle() {
            var temp = this.mainTabsActiveName;
            this.removeTabHandle(temp);
            this.$nextTick(() => {
                this.$router.push({ name: temp });
            })
        }
    },
})
</script>
<style lang="less" scoped>
.main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;

    // background: rgba(56, 5, 114, 0.5);
    .tabs {
        position: fixed;
        top: 60px;
        right: 50px;
        padding-left: 0px;
        padding-right: 2px;
        z-index: 1020;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background: rgb(255, 253, 255);
        border-color: rgba(200, 206, 206, 0.5);
        // border-left-width: 1px;
        // border-left-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .tabs-tools {
        position: fixed;
        top: 60px;
        right: 0;
        z-index: 1020;
        height: 40px;
        // padding: 0 10px;
        font-size: 14px;
        line-height: 40px;
        cursor: pointer;
        border-color: rgba(200, 206, 206, 0.5);
        border-left-width: 1px;
        border-left-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        background: rgba(255, 255, 255, 1);
    }

    .tabs-tools:hover {
        background: rgba(200, 206, 206, 1);
    }

    .main-content {
        position: absolute;
        top: 45px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        padding: 5px;
        // background: rgba(209, 212, 212, 0.5);
    }
}

.position-left {
    left: 200px;
}

.position-collapse-left {
    left: 65px;
}
</style>