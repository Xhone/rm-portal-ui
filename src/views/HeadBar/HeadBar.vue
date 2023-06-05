<template>
    <div class="headbar" style="background:#14889A;" :class="collapse?'position-collapse-left':'position-left'">
     <!--导航收缩-->
     <span class="hamburg">
      <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#545c64" text-color="#fff" mode="horizontal">
        <el-menu-item><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
     </span>
    </div>
</template>
<script>
import store from '@/store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Hamburger from "@/components/HamBurger.vue"
export default defineComponent({
  components:{
    Hamburger
  },
  data(){
    return{
      activeIndex:'1',
      langVisible:false
    }
   
  },
  methods:{
    openWindow(url){
      window.open(url);
    },
    onCollapse:function(){
      this.$store.commit('onCollapse')
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapState({
      collapse:state=>state.app.collapse
    })
  }
})
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

.hamburg, .nvabar{
  float: left;
}
.position-left{
  left:200px;
}
.position-collapse-left{
  left:65px;
}
</style>