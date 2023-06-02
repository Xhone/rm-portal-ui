<template>
    <div class="headbar" style="background:#14889A" :class="position-left">
       <el-header></el-header>
    </div>
</template>
<script>
</script>
<style lang="less" scoped>
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}


</style>