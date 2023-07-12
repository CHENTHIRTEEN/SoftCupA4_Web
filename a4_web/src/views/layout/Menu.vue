<script>
import {ref} from "vue";
import {useRoute} from "vue-router";

export default {
  props:['isClose'],
  setup() {
    // const isCollapse = ref(false)

    const route = useRoute()
    console.log(route)

    return{
      // isCollapse,
      route
    }
  }
}
</script>

<template>
  <el-menu
      default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="isClose"
      router
  >
    <el-menu-item>
      <el-icon><Lightning /></el-icon>
      <template #title>龙源风电预测系统</template>
    </el-menu-item>
    <el-menu-item index="homePage">
      <el-icon><document /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
<!--    <el-menu-item index="power">-->
<!--      <el-icon><document /></el-icon>-->
<!--      <template #title>Navigator Three</template>-->
<!--    </el-menu-item>-->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Timer /></el-icon>
        <span>数据页面</span>
      </template>
        <el-menu-item index="power">
          <el-icon><Sunrise /></el-icon>功率预测
        </el-menu-item>
        <el-menu-item index="eda">
          <el-icon><DataLine /></el-icon>数据可视化
        </el-menu-item>
        <el-menu-item index="showError">
          <el-icon><Coordinate /></el-icon>异常数据展示
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Files /></el-icon>
        <span>数据管理</span>
      </template>
      <el-menu-item index="upload">
        <el-icon><SetUp /></el-icon>数据集上传
      </el-menu-item>
      <el-menu-item index="list">
        <el-icon><Goods /></el-icon>数据集列表
      </el-menu-item>
    </el-sub-menu>
<!--    <el-menu-item index="upload">-->
<!--      <el-icon><setting /></el-icon>-->
<!--      <template #title>Navigator Four</template>-->
<!--    </el-menu-item>-->
  </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  border-left: none;
}
</style>
