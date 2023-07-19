<script>
import {Delete, UploadFilled} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import {getCurrentInstance} from "vue";

export default {
  computed: {
    Delete() {
      return Delete
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  beforeMount() {
   this.$http.post('/predict/frammanage').then(res => {
      this.tableData = res.data.data
    })
  },
  methods:{
    deletefile(id){
      let param = {
        "id": id
      }
      this.$http.post('/predict/deletefile', param).then(res => {
        if(res.data.code === 200) {
          ElNotification({
            title:'删除成功',
            message: res.data.message,
            type:'success',
            offset: 100,
            duration:1500
          })
        }
        if(res.data.code === 100) {
          ElNotification({
            title:'删除失败',
            message: res.data.message,
            type:'error',
            offset: 100,
            duration:1500
          })
        }
      })
      this.$http.post('/predict/frammanage').then(res => {
        this.tableData = res.data.data
      })
    },
    uploadSuccess(res, file, fileList) {
      ElNotification({
        title:'上传成功',
        message: res.message,
        type:'success',
        offset: 100,
        duration:1500
      })
      console.log("file====" + file.name)
      let param = {
        "file": file.name
      }
      this.$http.post('/predict/data_process', param).then(res => {
        if (res.data.code === 100) {
          ElNotification({
            title:'数据预处理失败',
            type:'warning',
            offset: 100,
            duration:1500
          })
        }
        if (res.data.code === 200) {
          ElNotification({
            title:'数据预处理完成',
            type:'success',
            offset: 100,
            duration:1500
          })
        }
      })
      this.$http.post('/predict/frammanage').then(res => {
        this.tableData = res.data.data
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
  <el-row style="display: flex; justify-content: center">
    <el-col :span="16">
      <el-table :data="tableData" style="width: 80%; height: 300px">
        <el-table-column prop="date" label="上传时间" width="250" >
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="风场号" width="180" >
          <template #default="scope">
                <el-tag>{{ scope.row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="文件大小" >
          <template #default="scope">
              <el-tag class="ml-2" type="success">{{ scope.row.size }}MB</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="文件格式" >
          <template #default="scope">
            <el-tag class="ml-4" type="warning">
              {{ scope.row.type}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip
                class="box-item"
                content="删除文件"
                placement="top"
                effect="dark"
            >
              <el-button type="danger" :icon="Delete" circle @click="this.deletefile(scope.row.id)"/>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
