<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
  >
    <el-menu-item index="/home/eda">
      <el-icon><FolderChecked /></el-icon>
      <template #title>数据概览</template>
    </el-menu-item>
    <el-menu-item index="/home/power" >
      <el-icon><document /></el-icon>
      <template #title>功率预测</template>
    </el-menu-item>
    <el-menu-item index="/home/upload">
      <el-icon><setting /></el-icon>
      <template #title>文件上传</template>
    </el-menu-item>
  </el-menu>
</template>


<script>
import {ref} from "vue";
import {Document, Setting, FolderChecked} from "@element-plus/icons-vue";

export default {
  components: {
    Document,
    Setting,
    FolderChecked
  },
  setup(){
    const isCollapse = ref(false)
    return {
      isCollapse
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
