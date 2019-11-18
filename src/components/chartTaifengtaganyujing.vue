<template>
  <div id="myChart50" ></div>
</template>
<script>
// eslint-disable-next-line
  /* eslint-disable */
import axios from 'axios';
import bus from '../assent/eventBus';
  export default {
    name: 'chartTaifengtaganyujing',
      data(){
          return{
            a:null,
            b:null,
            timess:{id:'',name:''},
            qiwenzhandian:[],
            hengzuobiao:[],
            myChart:null
          }
      },
    mounted () {
      let _this=this;
      
      axios.get(_this.$http.adornUrl('/generator/evdatajcdsjyj/historyEvloopYjList')).then(res => {
        if (res.data.code === 0) {
          
          let detail = res.data.evloopList;
          for (var j in detail) {
            _this.hengzuobiao.push(detail[j].evvoltage)
          }
          _this.drawLine()
          // console.log(detail,'time')
        };
      });

    },
    created () {

      let _this=this
      bus.$on("time", function (a,b) {
        _this.a=a
        _this.b=b
      })
      bus.$on('draw_taifengtaganyujing_table', function () {
        _this.qiwenzhandian=[]
        
        axios.get(_this.$http.adornUrl('/generator/evdatajcdsjyj/historyEvloopYjList?startTime='+_this.a+'&endTime='+_this.a)).then(res => {
          if (res.data.code === 0) {
            let detail = res.data.evloopList;
            // console.log(res.data.evloopList,"evloopList")
            for (var j in detail) {
              _this.qiwenzhandian.push(detail[j].yjCount)
            }
          };
        });
      })
      bus.$on('clearTime', function () {
        _this.qiwenzhandian=[]
      })
      //this.getyf ()
      //this.getFire();
    },
      watch: {
          //观察option的变化
        qiwenzhandian:{
          handler(c, oldValue){

            this.myChart.setOption({
              title: {
              },
              dataZoom: [
                {
                  type: 'inside',
                  show: false,
                  xAxisIndex: [0],
                  zoomLock:true,
                  startValue:0,
                  endValue:7
                },
              ],
              grid: {
                top: '5%',
                left: '2%',
                right: '2%',
                bottom: '5%',
                containLabel: true
              },
              calculable: true,
              tooltip : {
                trigger: 'axis'
              },
              xAxis: [
                {
                  splitLine: {
                    show: false},//去除网格分割线
                  axisLine: {
                    lineStyle: {
                      type: 'solid',
                      color: '#3B495F',//轴线的颜色
                      width: '1'//坐标线的宽度
                    },
                    axisTick: {//刻度
                      show: false//不显示刻度线
                    },
                  },
                  //坐标轴刻度标签
                  axisLabel: {
                    interval:0,
                    margin: 20,
                    color: "#fff"
                  },
                  splitLine: {
                    show: false//去掉分割线
                  },
                  type: 'category',
                  data: this.hengzuobiao
                }
              ],
              yAxis: [
                {
                  axisLabel : {
                    formatter: '{value}',
                    color: "#fff"
                  },
                  type: 'value',
                  axisLine: {//线
                    show: false
                  },
                  axisTick: {//刻度
                    show: false
                  },
                  minInterval: 5,//标值的最小间隔
                  splitLine: {
                    lineStyle: {
                      color: ['#3B495F'],//分割线的颜色
                    }
                  }
                }
              ],

              series: [
                {
                  name: '个数',
                  type: 'bar',
                  data: c,
                  markPoint: {
                  },
                  markLine: {
                  },
                  itemStyle:{
                    normal: {
                      color: '#8DBFF4',//设置柱子颜色
                      label: {
                        show: true,//柱子上显示值
                        position: 'insideTop',//值在柱子上方显示
                        distance:10,
                        rotate: 90,
                        textStyle: {
                          textBorderColor:'#000',
                          color: '#fff',//值得颜
                          verticalAlign: 'middle'
                        }
                      }
                    }
                  },
                  barWidth: 30//设置柱子宽度，单位为px
                },
              ]  },true)
          },deep: true}
      },
    methods: {
      drawLine () {
        let _this = this;
        // console.log("opjpojipipi",_this.hengzuobiao)
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart50'))
        // 绘制图表
        this.myChart.setOption({
          title: {
          },
          dataZoom: [
            {
              type: 'inside',
              show: false,
              xAxisIndex: [0],
              zoomLock:true,
              startValue:0,
              endValue:7
            },
          ],
          grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
          },
          calculable: true,
          tooltip : {
            trigger: 'axis'
          },
          xAxis: [
            {
              splitLine: {
                show: false},//去除网格分割线
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#3B495F',//轴线的颜色
                  width: '1'//坐标线的宽度
                },
                axisTick: {//刻度
                  show: false//不显示刻度线
                },
              },
              //坐标轴刻度标签
              axisLabel: {
                interval:0,
                margin: 20,
                color: "#fff"
              },
              splitLine: {
                show: false//去掉分割线
              },
              type: 'category',
              data: this.hengzuobiao
            }
          ],
          yAxis: [
            {
              axisLabel : {
                formatter: '{value}',
                color: "#fff"
              },
              type: 'value',
              axisLine: {//线
                show: false
              },
              axisTick: {//刻度
                show: false
              },
              minInterval: 5,//标值的最小间隔
              splitLine: {
                lineStyle: {
                  color: ['#3B495F'],//分割线的颜色
                }
              }
            }
          ],

          series: [
            {
              name: '个数',
              type: 'bar',
              data: this.qiwenzhandian,
              markPoint: {
              },
              markLine: {
              },
              itemStyle:{
                normal: {
                  color: '#8DBFF4',//设置柱子颜色
                  label: {
                    show: true,//柱子上显示值
                    position: 'insideTop',//值在柱子上方显示
                    distance:10,
                    rotate: 90,
                    textStyle: {
                      textBorderColor:'#000',
                      color: '#fff',//值得颜
                      verticalAlign: 'middle'
                    }
                  }
                }
              },
              barWidth: 30//设置柱子宽度，单位为px
            },
          ]  },true)
      }
    }
  }
</script>
<style>
  #myChart50{
    width: 100%;
    height: 100%;
    font-size: 10px;
    color: #b4d8f3;
    opacity:1.0;
  }
</style>
