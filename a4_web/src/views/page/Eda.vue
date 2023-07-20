<script>
import * as $echarts from 'echarts'
import ecStat from 'echarts-stat';
import {getCurrentInstance, onMounted, ref} from "vue";

let myChart;
export default {
  methods:{
    draw(data){
      if (myChart != null && myChart !== "" && myChart !== undefined) {
        myChart.dispose();//销毁
      }
      const chartDom = document.getElementById('main');
      myChart = $echarts.init(chartDom);
      let option;
      // See https://github.com/ecomfe/echarts-stat
      $echarts.registerTransform(ecStat.transform.regression);

      option = {
        dataset: [
          {
            source: this.data
          },
          {
            transform: {
              type: 'ecStat:regression',
              config: { method: 'polynomial', order: 3 }
            }
          }
        ],
        title: {
          text: '18 companies net profit and main business income (million)',
          subtext: 'By ecStat.regression',
          sublink: 'https://github.com/ecomfe/echarts-stat',
          left: 'center',
          top: 16
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          splitNumber: 20
        },
        yAxis: {
          min: -40,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter'
          },
          {
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 }
          }
        ]
      };

      option && myChart.setOption(option);

    },
    scatter(TurbID, value1, value2){
      let params = {
        'TurbID': TurbID,
        'value1': value1,
        'value2': value2
      }
      this.$http.post('/predict/scatter', params).then(res => {
        // console.log(params)
        this.data = res.data.data
        // console.log(this.data)
        this.draw(this.data)
      })
    }
  },
  data(){
    return{
      options:[],
      options1: [
        {
          value: 'WINDSPEED',
          label: 'WINDSPEED',
        },
        {
          value: 'PREPOWER',
          label: 'PREPOWER',
        },
        {
          value: 'WINDDIRECTION',
          label: 'WINDDIRECTION',
        },
        {
          value: 'TEMPERATURE',
          label: 'TEMPERATURE',
        },
        {
          value: 'HUMIDITY',
          label: 'HUMIDITY',
        },
        {
          value: 'PRESSURE',
          label: 'PRESSURE',
        },
        {
          value: 'ROUND(A.WS,1)',
          label: 'ROUND(A.WS,1)',
        },
        {
          value: 'ROUND(A.POWER,0)',
          label: 'ROUND(A.POWER,0)',
        },
        {
          value: 'YD15',
          label: 'YD15',
        },
      ],
      options2: [
        {
          value: 'WINDSPEED',
          label: 'WINDSPEED',
        },
        {
          value: 'PREPOWER',
          label: 'PREPOWER',
        },
        {
          value: 'WINDDIRECTION',
          label: 'WINDDIRECTION',
        },
        {
          value: 'TEMPERATURE',
          label: 'TEMPERATURE',
        },
        {
          value: 'HUMIDITY',
          label: 'HUMIDITY',
        },
        {
          value: 'PRESSURE',
          label: 'PRESSURE',
        },
        {
          value: 'ROUND(A.WS,1)',
          label: 'ROUND(A.WS,1)',
        },
        {
          value: 'ROUND(A.POWER,0)',
          label: 'ROUND(A.POWER,0)',
        },
        {
          value: 'YD15',
          label: 'YD15',
        },
      ],
      data: []
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
  setup(){
    const value = ref('01号风场')
    const value1 = ref('YD15')
    const value2 = ref('YD15')

    const {appContext: {config: {globalProperties: global}}} = getCurrentInstance();
    let params = {
      'TurbID': '19',
      'value1': 'WINDSPEED',
      'value2': 'YD15'
    }

    global.$http.post('/predict/scatter', params).then(res => {
      // console.log(res.data.data)
      const scatter = (data) => {
        const chartDom = document.getElementById('main');
        myChart = $echarts.init(chartDom);
        let option;
        // See https://github.com/ecomfe/echarts-stat
        $echarts.registerTransform(ecStat.transform.regression);
        option = {
          dataset: [
            {
              source: data
            },
            {
              transform: {
                type: 'ecStat:regression',
                config: { method: 'polynomial', order: 3 }
              }
            }
          ],
          title: {
            text: '数据分布关系散点图',
            subtext: '',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center',
            top: 16
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            splitNumber: 20
          },
          yAxis: {
            min: -40,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          series: [
            {
              name: 'scatter',
              type: 'scatter'
            },
            {
              name: 'line',
              type: 'line',
              smooth: true,
              datasetIndex: 1,
              symbolSize: 0.1,
              symbol: 'circle',
              label: { show: true, fontSize: 16 },
              labelLayout: { dx: -20 },
              encode: { label: 2, tooltip: 1 }
            }
          ]
        };

        option && myChart.setOption(option);
      }
      scatter(res.data.data)
    })

    return{
      value,
      value1,
      value2
    }
  }
}
</script>

<template>
  <div>
<!--    <h1>数据可视化</h1>-->
    <el-row>
      <el-col :span="1">
        <a>数据1:</a>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value1" placeholder="Select" @change="this.scatter(value.substring(0, 2), value1, value2)">
          <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="1">
        <a>数据2：</a>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value2" placeholder="Select" @change="this.scatter(value.substring(0, 2), value1, value2)">
          <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="1"><a>风场号:</a></el-col>
      <el-col :span="4">
        <el-select v-model="value" clearable placeholder="Select" @change="this.scatter(value.substring(0, 2), value1, value2)">
          <el-option
              v-for="item in options"
              :key="item.substring(0, 2)"
              :label="item"
              :value="item.substring(0, 2)"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col><a>数据可视化</a></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"></el-col>
      <el-col :span="24">
        <div id="main" style="width: 1200px;height:800px;"></div>
      </el-col>
      <el-col :span="6">

      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
