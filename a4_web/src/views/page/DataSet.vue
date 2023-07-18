<script>
import {UploadFilled} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
export default {
  methods:{
    uploadSuccess(res, file, fileList) {
      ElNotification({
        title:'上传成功',
        message: res.message,
        type:'success',
        offset: 100,
        duration:1500
      })
    },
    uploadError(res, file, fileList) {
      ElNotification({
        title:'上传失败',
        message: res.message,
        type:'error',
        offset: 100,
        duration:1500
      })
    }
  },
  setup(){

  }
}
</script>

<template>
  <el-row>
    <el-col>
      <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:8000/predict/upload"
          multiple
          accept="csv"
          :on-success="this.uploadSuccess"
          :on-error="this.uploadError"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖拽至此 或 <em>单击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            .csv、.xslx
          </div>
        </template>
      </el-upload>
    </el-col>

  </el-row>
  <el-row>

  </el-row>
</template>

<style scoped>

</style>
