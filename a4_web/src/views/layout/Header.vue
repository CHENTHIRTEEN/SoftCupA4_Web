<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import dayjs from "dayjs";

export default {
  props:['isClose'],
  emits:['change'],
  setup(props, {emit}){
    let time = ref(null)

    const change = () => {
      emit('change')
    }

    onMounted(() => {
      // let time = new Date()
      // console.log(time)
      // time.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      setInterval(() => {
        time.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      })
    })

    return{
      change,
      time
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="icon">
      <el-icon v-if="isClose" @click="change"><Expand /></el-icon>
      <el-icon v-else @click="change"><Fold /></el-icon>
    </div>
    <div class="right">
      <div class="time">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.head-text{
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.header{
  height: 50px;
  display: flex;
  .icon{
    font-size: 24px;
    flex: 1;
    i{
      cursor: pointer;
    }
  }
}

.right{
  float: right;
  //padding-left: 20px;
  padding-right: 20px;
  //font-size: 16px;
  .time{
    font-size: 20px;
  }
}
</style>
