<script>
import {ElNotification} from "element-plus";
import {getCurrentInstance, inject, ref} from 'vue'
import * as $echarts from "echarts";

let myChart;
export default {
  data(){
    return{
      options:[],
      value1:[],
      // startDate:'',
      // endDate:'',
      // startTime:'',
      // endTime:''
    }
  },
  mounted() {
    this.$http.get('/predict/showframlist').then(res => {
      this.options = res.data.data
      // for (const resKey in this.options) {
      //   console.log(this.options[resKey])
      // }
    })
  },
  methods:{
    draw(time, data1, data2){
      if (myChart != null && myChart !== "" && myChart !== undefined) {
        myChart.dispose();//销毁
      }
      const chartDom = document.getElementById('chart');
      myChart = $echarts.init(chartDom);
      let option;

      option = {
          title: {
            text: '功率预测',
            // subtext: 'Fake Data'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['YD15', 'ROUND(A.POWER,0)']
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100,
              xAxisIndex: [0, 1]
            }
            // {
            //   type: 'inside',
            //   realtime: true,
            //   start: 30,
            //   end: 70,
            //   xAxisIndex: [0, 1]
            // }
          ],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            // data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
            data: time
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          series: [
            {
              name: 'ROUND(A.POWER,0)',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: data1
              // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
            },
            {
              name: 'YD15',
              type: 'line',
              smooth: true,
              // prettier-ignore
              // data: [200, 320, 125, 260, 300, 330, 560, 570, 370, 350, 310, 490, 450, 600, 600, 750, 600, 1200, 500, 700]
              data: data2
            }
          ]
        };

      option && myChart.setOption(option);
    },
    dateprocess(a){
      let date = new Date(a);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      h = h < 10 ? ('0' + h) : h;
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '-' + m + '-' + d+' '+h+':'+minute + ':00';
    },
    predict(TurbID, startDatetime, endDatetime){
      let start = this.dateprocess(startDatetime)
      let end = this.dateprocess(endDatetime)
      let params = {
        'TurbID': TurbID,
        'startDatetime': start,
        'endDatetime': end
      }
      console.log(params)
      this.$http.post('/predict/predict_dfloc', params).then((res) => {
        console.log(res)
        if (res.data.code === 100) {
          ElNotification({
            title:'出错了捏',
            message: res.data.message,
            type:'warning',
            offset: 100,
            duration:1500
          })
        }
        if (res.data.code === 200) {
          const time = res.data.data.DATATIME
          const data1 = res.data.data.YD15
          const data2 = res.data.data.ROUND
          // console.log(time)
          // console.log(data1)
          // console.log(data2)
          this.draw(time, data1, data2)
        }

      })
    },
    disabledDate(time){
      const minTime = parseInt(new Date(this.value1[0]).getTime() / 1000);
      const maxTime = parseInt(new Date(this.value1[1]).getTime() / 1000);
      // console.log(minTime)
      // console.log(maxTime)
      // console.log(time.getTime())
      return time.getTime() < minTime - 24*3600000|| time.getTime() > maxTime;
    },

    show(value) {
      console.log(value)
    },
    setDateRange(id) {
      const param = {
        "TurbID": id
      }
      this.$http.post('/predict/getdatarange', param).then(res => {
        this.value1 = []
        this.value1.push(res.data.start)
        this.value1.push(res.data.end)
      })
      // console.log("=========", this.value1[0])
    }
  },
  setup() {
    // const value1 = ref('')
    const value = ref('')

    const $echarts = inject('echarts')
    const {appContext: {config: {globalProperties: global}}} = getCurrentInstance();
    let params = {
      'TurbID': '11',
      'startDatetime': '2021-11-01 00:00:00',
      'endDatetime': '2021-11-02 00:00:00'
    }
    global.$http.post('/predict/predict_dfloc', params).then((res) => {
      const time = res.data.data.DATATIME
      const data1 = res.data.data.YD15
      const data2 = res.data.data.ROUND
      // console.log(time)
      // console.log(data1)
      // console.log(data2)
      const line = (time, data1, data2) => {
        const chartDom = document.getElementById('chart');
        myChart = $echarts.init(chartDom);
        let option;

        option = {
          title: {
            text: '功率预测',
            // subtext: 'Fake Data'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['YD15', 'ROUND(A.POWER,0)']
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100,
              xAxisIndex: [0, 1]
            }
            // {
            //   type: 'inside',
            //   realtime: true,
            //   start: 30,
            //   end: 70,
            //   xAxisIndex: [0, 1]
            // }
          ],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            // data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
            data: time
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          series: [
            {
              name: 'ROUND(A.POWER,0)',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: data1
              // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
            },
            {
              name: 'YD15',
              type: 'line',
              smooth: true,
              // prettier-ignore
              // data: [200, 320, 125, 260, 300, 330, 560, 570, 370, 350, 310, 490, 450, 600, 600, 750, 600, 1200, 500, 700]
              data: data2
            }
          ]
        };

        option && myChart.setOption(option);
      }

      line(time, data1, data2)
    })
    return{
      value,
      // value1,
    }

  }
}





</script>

<template>
  <el-row>
    <el-col :span="24"><div>功率预测</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
      <el-date-picker
          v-model="value1"
          type="datetimerange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
      />
    </el-col>
    <el-col :span="8">
      <el-select v-model="value" clearable placeholder="Select" @change="setDateRange(value)">
        <el-option
            v-for="item in options"
            :key="item.substring(0, 2)"
            :label="item"
            :value="item.substring(0, 2)"
        />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-button type="success" @click="predict(value, value1[0], value1[1])">确认</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5"></el-col>
    <el-col :span="12">
      <div id="chart" style="width: 1200px;height:800px;"></div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.block {
  padding: 0 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block{
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
