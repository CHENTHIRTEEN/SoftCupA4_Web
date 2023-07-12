<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="menu">
        <Menu :isClose="isClose"/>
      </el-aside>
      <el-container class="content" :class="{active:isClose}">
        <el-header><Header :isClose="isClose" @change="change"/></el-header>
        <el-main><Content/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from './Menu.vue';
import Content from "./Content.vue";
import Header from "./Header.vue";
import {ref} from "vue";
export default {
  components:{
    Content,
    Menu,
    Header
  },
  setup() {
    let isClose = ref(false)
    const change = () => {
      isClose.value = !isClose.value
    }
    return{
      isClose,
      change
    }
  }
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.content{
  padding-left: 200px;
}
.active{
  padding-left: 64px;
}
</style>
