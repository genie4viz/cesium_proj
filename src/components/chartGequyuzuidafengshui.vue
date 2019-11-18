<template>
  <div id="mychart3" ></div>
</template>
<script>
// eslint-disable-next-line
  /* eslint-disable */
  import axios from 'axios';
  export default {
    name: 'chartGequyuzuidafengshui',
    props:{
      datadq: Array,
      datadqchengshi: Array,
    },
    data(){
      return{
        mychart3:null,
        datadqa:[],
        datadqb:[],
      }
    },
    mounted () {
      this.datadqa = [];
      this.datadqa = this.datadq;
      this.datadqb = [];
      this.datadqb = this.datadqchengshi;
      this.drawLine()

    },
    created () {

      //this.getyf ()
      //this.getFire();
    },
    watch: {
      datadq:function () {
      this.datadqa = [];
      this.datadqa = this.datadq;
      this.datadqb = [];
      this.datadqb = this.datadqchengshi;
      this.drawLine();
    },

      //观察option的变化
      datadqchengshi:function () {
        this.datadqa = [];
        this.datadqa = this.datadq;
        this.datadqb = [];
        this.datadqb = this.datadqchengshi;
        this.mychart3.setOption({
          title: {
          },
          grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
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
          calculable: true,
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
              data: this.datadqb
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
              minInterval: 2.5,//标值的最小间隔
              maxInterval: 2.5,
              splitLine: {
                lineStyle: {
                  color: ['#3B495F'],//分割线的颜色
                }
              }
            }
          ],
          tooltip : {
            trigger: 'axis'
          },
          series: [
            {
              name: '降水量',
              type: 'bar',
              data: this.datadqa,
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
                    rotate: 90,
                    textStyle: {
                      textBorderColor:'#000',
                      color: '#fff',//值得颜色
                      verticalAlign: 'middle'
                    }
                  }
                }
              },
              barWidth: 18//设置柱子宽度，单位为px
            },
          ]  },true)
      }
    },
    methods: {
      drawLine () {
        let _this=this
        console.log("bank4 ");
        // 基于准备好的dom，初始化echarts实例
        this.mychart3 = this.$echarts.init(document.getElementById('mychart3'))
        // 绘制图表
        this.mychart3.setOption({
          title: {


          },
          grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
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
          calculable: true,
          xAxis: [
            { splitLine:
              {show: false},
              axisLine: {
                lineStyle: {
                  color: '#3B495F',
                }
              },

              axisLabel: {
                interval:0,
                margin: 20,
                textStyle: {
                  color: '#fff',//坐标值的具体的颜色
                }
              },
              splitLine: {
                show: false//去掉分割线
              },
              backgroundColor: '#fff',//图得背景色
              type: 'category',
              data: this.datadqb
            },
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
              minInterval: 2.5,//标值的最小间隔
              maxInterval: 2.5,
              splitLine: {
                lineStyle: {
                  color: ['#3B495F'],//分割线的颜色
                }
              }
            }
          ],
          tooltip : {
            trigger: 'axis'
          },
          series: [
            {
              name: '降水量',
              type: 'bar',
              data: _this.datadqa,
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
                      color: '#fff',//值得颜色
                      verticalAlign: 'middle'
                    }
                  }
                }
              },
              barWidth: 18//设置柱子宽度，单位为px
            },
          ]
        })
      }
    }
  }
</script>
<style>
  #mychart3{
    width: 100%;
    height: 40%;
    background-color: #3B495F;
    font-size: 10px;
    color: #b4d8f3;
    opacity:1.0;
  }
</style>
