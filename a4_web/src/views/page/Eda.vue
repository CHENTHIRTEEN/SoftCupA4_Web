<script>
export default {
  methods:{
    test() {
      const msg = '';
      this.$http.post('/test/').then(res => {
        alert(res.data.message);
        console.log(res);
      })
    }
  }
}
</script>

<template>
  <div>
    <h1>数据可视化</h1>
    <el-row>
      <el-col>
        <h1>测试页面</h1>
      </el-col>
      <el-col>
        <el-button type="primary" @click="test">测试按钮</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
