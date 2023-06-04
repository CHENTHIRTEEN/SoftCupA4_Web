<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="float-left">
          <Menu></Menu>
        </el-aside>
        <el-main width="float">
          <div class="p-4 bg-gray-50 min-h-screen">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Menu from "../../components/Menu.vue"
export default {
  components:{
    Header,
    Menu
  }
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
