<script>
import {inject, onMounted, ref} from 'vue'


export default {
  methods:{
    predict(){
      let params = {
        'TurbID': '11',
        'startDatetime': '2021-11-01 00:00:00',
        'endDatetime': '2021-11-01 03:45:00'
      }
      this.$http.post('/predict/predict_dfloc', params).then(res => {
        console.log(res)
      })
    }
  },
  setup() {
    const value1 = ref<[Date, Date]>([
      new Date(2000, 10, 10, 10, 10),
      new Date(2000, 10, 11, 10, 10),
    ])
    const value2 = ref('')
    const shortcuts = [
      {
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: 'Last month',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: 'Last 3 months',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ]



    const $echarts = inject('echarts')
    const line = () => {
      const chartDom = document.getElementById('chart');
      const myChart = $echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: 'Distribution of Electricity',
          subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['YD15', 'Electricity']
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
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
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
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
          },
          {
            name: 'YD15',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [200, 320, 125, 260, 300, 330, 560, 570, 370, 350, 310, 490, 450, 600, 600, 750, 600, 1200, 500, 700]
          }
        ]
      };

      option && myChart.setOption(option);
    }
    onMounted(() => {
      // $echarts.init(document.getElementById('chart'))
      line()
    })


    return{
      value1,
      value2,
      shortcuts
    }

  }
}





</script>

<template>
  <el-row>
    <el-col :span="24"><div>功率预测</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="block">
<!--        <span class="demonstration">With shortcuts</span>-->
        <el-date-picker
            v-model="value2"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        />
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-button @click="predict">test</el-button>
      <div id="chart" style="width: 1200px;height:800px;"></div>
    </el-col>
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
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
