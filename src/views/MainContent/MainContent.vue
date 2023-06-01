<template>
    <div id="main-container" class="main-container" :class="position-left">
    <div class="tab-container"></div>
    <!--主内容区域-->
    <div class="main-content">
    <keep-alive>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </keep-alive>
    </div>
    </div>
</template>
<script></script>
<style lang="less" scoped>

</style>