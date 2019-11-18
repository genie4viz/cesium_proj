<template>
  <div class="ta1" style="color: #b4d8f3;width:95%">
    <div id="table50" style="color: #b4d8f3;margin-top:5%;">
      <div style="color: white;height:30px;margin-left:2px;margin-right: 3px;text-align:center;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">
      <div type="text" class="qiehuan_botton1"  :class="{active:seen24hours}"  @click="pan">24h</div>
      <div type="text" class="qiehuan_botton1"  :class="{active:seen48hours}" @click="pan1">48h</div>
      <div type="text" class="qiehuan_botton1"  :class="{active:seen72hours}" @click="pan2">72h</div>
    </div>
      <div class="tyhoon-list-wrap" style="color: black">
        <div style="color: #b4d8f3;text-align: center;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;margin-left: 2px;margin-right: 3px;line-height:30px">线路预警</div>
      <table style="width:100%;color: #b4d8f3;">
        <thead>
        <tr  style="border-style:dashed; border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;">
          <td style="width:20%;height:30px;text-align:center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">电压等级</td>
          <td style="width:20%;height:30px;text-align:center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">蓝色预警</td>
          <td style="width:20%;height:30px;text-align:center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">黄色预警</td>
          <td style="width:20%;height:30px;text-align:center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">橙色预警</td>
          <td style="width:20%;height:30px;text-align:center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">红色预警</td>
          <!--<td  style="width:20%;">日期</td>
          <td  style="width:25%;">播放控制</td>-->
        </tr>
        </thead>
        <tbody class="highlight">
        <tr v-for="(typhoonitem,index) in tableDate" :key="index" :class="{active: activeName == typhoonitem}" @click="kong(typhoonitem)">
          <td   style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;">{{typhoonitem[0]}}</td>
          <td   style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;">{{typhoonitem[1]}}</td>
          <td   style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;">{{typhoonitem[2]}}</td>
          <td   style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;">{{typhoonitem[3]}}</td>
          <td   style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">{{typhoonitem[4]}}</td>
          <!-- <td>
             <button @click="bofang">播放</button>
           </td>-->
        </tr>
        </tbody>
      </table>
     </div>
   </div>
  </div>
 </template>
<script>// eslint-disable-next-line
   /* eslint-disable */
 import bus from '../assent/eventBus';
 import Element from '../api/element';
import axios from 'axios';
   export default {
     data () {
       return {
         activeName:'',
         detail1:[],
         detail2:[],
         detail3:[],
         panduan:'24',
         shuru:'',
         shuru1:'',
         tableDate: [],
         tableData: [],
         tableData1:[],
         tableData2:[],
         fire:[],
         jingdu:null,
         weidu:null,
         seen24hours:true,
         seen48hours:false,
         seen72hours:false,
       }},

     created () {
       let _this=this
       axios.get(_this.$http.adornUrl('/generator/evdatajcdsjyj/presentEvloopYjList')).then(res => {
         if (res.data.code === 0) {
           let detail1 = res.data.evloopList[0].yjList;
           let detail2 = res.data.evloopList[1].yjList
           let detail3 = res.data.evloopList[2].yjList
           this.chaxun(detail1,detail2,detail3)



         };
       });
       //this.getyf ()
       //this.getFire();
     },
     methods:{
       kong(typhoonitem){
         this.activeName = typhoonitem
       },
     pan(a){
       this.tableDate=this.tableData;
       this.seen24hours=true;
       this.seen48hours=false;
       this.seen72hours=false;
       },

     pan1(a){
       this.tableDate=this.tableData1;
       this.seen24hours=false;
       this.seen48hours=true;
       this.seen72hours=false;
       },
pan2(a){
  // console.log("kl;jjkl;jk",a)
  this.tableDate=this.tableData2;
  this.seen24hours=false;
  this.seen48hours=false;
  this.seen72hours=true;
  },
chaxun(etail1,etail2,etail3){
      this.detail1=etail1
  this.detail2=etail2
  this.detail3=etail3
  let _this=this


  for(let i=0;i<_this.detail1.length;i++){
    _this.tableData.push({
      [0]:_this.detail1[i].evvoltage,
      [1]:_this.detail1[i].blue,
      [2]:_this.detail1[i].yellow,
      [3]:_this.detail1[i].orange,
      [4]:_this.detail1[i].red
    })
  }
    for(let i=0;i<_this.detail2.length;i++){
      _this.tableData1.push({
        [0]:_this.detail2[i].evvoltage,
        [1]:_this.detail2[i].blue,
        [2]:_this.detail2[i].yellow,
        [3]:_this.detail2[i].orange,
        [4]:_this.detail2[i].red
      })
    }

    for (let i = 0; i < _this.detail3.length; i++) {
      _this.tableData2.push({
        [0]: _this.detail3[i].evvoltage,
        [1]: _this.detail3[i].blue,
        [2]: _this.detail3[i].yellow,
        [3]: _this.detail3[i].orange,
        [4]: _this.detail3[i].red
      })
    }
// console.log(_this.tableData2,_this.tableData1,_this.tableData)
  this.tableDate=this.tableData

},
     }
   }
 </script>
 <style>
   .active {
     background-color: #b4d8f3;
     color: #000;
   }
   .highlight tr:hover{
     background-color: #b4d8f3;
     color: black;
   }
   .qiehuan_botton1{
     padding: 0 7px;
     height: 29px;
     background-color: rgb(50,120,178);
     float: left;
     margin-left: 2px;
     line-height: 28px;
     border-radius: 4px;
   }
   .qiehuan_botton1.active{
     background-color:blue;
     color: white;
   }
   #table50{
     width:100%;
     height:300px;
     right:0px;
     bottom:170px;
     z-index:10;
   }
   #table5{
     width:100%;
     height:50px;
     right:0px;
     bottom:0px;
     z-index:10;
     max-width: 400px;
   }
   #table6{
     width:100%;
     height:20px;
     right:0px;
     bottom:0px;
     z-index:11;
     max-width: 400px;
   }
 </style>
