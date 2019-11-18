<template>
  <div class="ta1" style="color: #b4d8f3">
    <div style="color: white;height:30px;margin-left:2px;margin-right: 3px;text-align:center;">
      <div type="text" class="qiehuan_botton"  :class="{active:seendqhours}"  @click="shurua3">当前</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen24hours}"  @click="shurua">24h</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen48hours}" @click="shurua1">48h</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen72hours}" @click="shurua2">72h</div>
    </div>
    <!--<el-button @click="shurua3" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">当前
    </el-button>
    <el-button @click="shurua" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">24
    </el-button>
    <el-button @click="shurua1" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">48
    </el-button>
    <el-button @click="shurua2" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">72
    </el-button>-->

    <div style="line-height: 36px;font-size:16px;color: #b4d8f3;margin-top: 5%;text-align: center;">预警信息列表</div>
  <div id="table1111" style="color: #b4d8f3">
    <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
      <table width="100%" >
        <thead style=" text-align:center;" >
        <tr>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">电压等级</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">线路名称</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">杆塔名称</td>
          <td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">预警等级</td>
          <td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">风速</td>
          <!--<td  style="width:20%;">日期</td>


          <td  style="width:25%;">播放控制</td>-->
        </tr>
        </thead>
        <tbody class="highlight" style="color: #b4d8f3">
        <div v-show="zwsj" style="color: #b4d8f3;margin-top: 10%">暂无数据</div>
        <tr v-for="(tower_item, index) in arr" :key="index" @click="select_predict_main_tower(index,tower_item)" :class="{active: activeName == tower_item}">
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower_item[1]}}</td>
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower_item[0]}}</td>
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower_item[7]}}</td>
          <td   style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower_item[3]}}</td>
          <td   style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2">{{tower_item[4]}}</td>
          <!-- <td>
             <button @click="bofang">播放</button>
           </td>-->
        </tr>
        </tbody>
      </table>

   </div>
    <Paging
      @change="onPageChange"
      :page-size="size"
      :total="total"
      layout="jumper,total"
      :current-page="curPage"
      :startnum="startnum"
      :endnum="endnum"
    /><!--分页-->
  </div>
  </div>
 </template>
<script>// eslint-disable-next-line
   /* eslint-disable */
 import bus from '../assent/eventBus';
 import Element from '../api/element';
import Paging from '@/components/Paging';
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
// 分页
   export default {
     props:{
      clickable: Boolean,      
      },
     components:{
       ElInput,
       Paging},
     data () {
       return {
         activeName:'',
         seendqhours:true,
         seen24hours:false,
         seen48hours:false,
         seen72hours:false,
         zwsj:false,
         value:'',
         value2:'',
         value3:'',
         options1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
         options2: [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
         options3: [49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72],
         size:5,   // 分页
         total:5,  // 分页
         curPage:1,// 分页
         startnum: 1,// 分页
         endnum: 5,// 分页
         shuru:'',
         shuru1:'',
         tableData: [],
         towers:[],
         jingdu:null,
         weidu:null,
         arr:[]
       }},
     mounted () {
        this.getyf ('0')
        let _this = this;
        bus.$on("selectItemOftableZhongyaotongdaoxianlu", function(tower_evtowerid) {      
          let index = -1;
          
          for (let i = 0; i < _this.tableData.length; i++) {
            let row = _this.tableData[i];
            if (row[2] == tower_evtowerid) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            _this.selectItem(index);
          }else{
            _this.activeName = '';
          }
        });

     },
     computed:{
     },
     methods:{
        selectItem: function(index) {
          let page = Math.floor(index / 5) + 1;
          let tr_index = index % 5;
          this.onPageChange({curPage: page});
          this.activeName = this.arr[tr_index];
        },
       shurua3(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=true;
         this.seen24hours=false;
         this.seen48hours=false;
         this.seen72hours=false;
         this.value=''
         this.value2=''
         this.value3=''
         // bus.$emit('select_predict_main_tower',a[5],a[6])
         this.getyf ('0')
       },
       shurua(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=true;
         this.seen48hours=false;
         this.seen72hours=false;
         // bus.$emit('select_predict_main_tower',a[5],a[6])
         this.getyf ("24")
       },
       shurua1(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=false;
         this.seen48hours=true;
         this.seen72hours=false;
         // bus.$emit('select_predict_main_tower',a[5],a[6])
         this.getyf ("48")
       },
       shurua2(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=false;
         this.seen48hours=false;
         this.seen72hours=true;
         // bus.$emit('select_predict_main_tower',a[5],a[6])
         this.getyf ("72")
       },
       select_predict_main_tower(index, tower){
          if(this.clickable == false) return;
          bus.$emit("start_draw_all_el_towers");
          
          this.activeName = tower;
          Element.getAllRelativeTowerByTowerId(tower[2]).then(res => {
            
            bus.$emit('tableZhongyaotongdaoxianlu_select_predict_towers_in_line', res, tower); //res: towerList
            console.log("tableZhongyaotongdaoxianlu_select_predict_towers_in_line", res);
          });
       },

        onPageChange:function(page){ // 分页
         // console.log(page)
         this.curPage = page.curPage;
         this.arr = [];
          this.startnum = (this.curPage - 1) * 5 + 1;
          this.endnum = this.curPage * 5;
          if(this.endnum > this.total){
            this.endnum = this.total;
          }
         this.arr = this.tableData.slice(this.startnum - 1,this.endnum);
         console.log(this.arr)
       },
       getyf(a){
         let _this=this
         this.tableData=[]
         Element.gezyxl(a).then(res => {
           this.towers = [];
              console.log(res,"predict tower ressult!")
              for (var i = 0; i < res.length; i++) {
                this.tableData.push({
                  [0]: res[i].evloopname,
                  [1]: res[i].evvoltage,
                  [2]: res[i].evtowerid,
                  [3]: res[i].zytdyjdj,
                  [4]: res[i].fs,
                  [5]: res[i].lng,
                  [6]: res[i].lat,
                  [7]: res[i].towernumber,
                  [8]: res[i].xzq,                
                  [9]: res[i].evlastmonitortime,
                  [10]: res[i].simpletype,
                  [11]: res[i].typename
                })

              if(res[i].zytdyjdj==="黄色预警"){
                this.towers.push({
                  evlastmonitortime:res[i].evlastmonitortime,
                  lng: res[i].lng,
                  lat: res[i].lat,
                  text:res[i].evloopname+res[i].towernumber,
                  evloopname:res[i].evloopname,
                  evvoltage:res[i].evvoltage,
                  evtowerid:res[i].evtowerid,
                  zytdyjdj:res[i].zytdyjdj,
                  fs:res[i].fs,
                  weizhi:res[i].xzq,
                  bgImg:'static/images/huangyj.png',
                  simpletype: res[i].simpletype,
                  typename: res[i].typename,
                })
              }else   if(res[i].zytdyjdj==="红色预警"){
                this.towers.push({
                  evlastmonitortime:res[i].evlastmonitortime,
                  lng: res[i].lng,
                  lat: res[i].lat,
                  text:res[i].evloopname+res[i].towernumber,
                  evloopname:res[i].evloopname,
                  evvoltage:res[i].evvoltage,
                  evtowerid:res[i].evtowerid,
                  zytdyjdj:res[i].zytdyjdj,
                  weizhi:res[i].xzq,
                  fs:res[i].fs,
                  bgImg:'static/images/hongyj.png',
                  simpletype: res[i].simpletype,
                  typename: res[i].typename,
                })
              }
              else if(res[i].zytdyjdj==="橙色预警"){
                this.towers.push({
                  evlastmonitortime:res[i].evlastmonitortime,
                  lng: res[i].lng,
                  lat: res[i].lat,
                  text:res[i].evloopname+res[i].towernumber,
                  evloopname:res[i].evloopname,
                  evvoltage:res[i].evvoltage,
                  evtowerid:res[i].evtowerid,
                  zytdyjdj:res[i].zytdyjdj,
                  weizhi:res[i].xzq,
                  fs:res[i].fs,
                  bgImg:"static/images/chengyj.png",
                  simpletype: res[i].simpletype,
                  typename: res[i].typename,
                })
              }
              else if(res[i].zytdyjdj==="蓝色预警"){
                this.towers.push({
                  evlastmonitortime:res[i].evlastmonitortime,
                  lng: res[i].lng,
                  lat: res[i].lat,
                  text:res[i].evloopname+res[i].towernumber,
                  evloopname:res[i].evloopname,
                  evvoltage:res[i].evvoltage,
                  evtowerid:res[i].evtowerid,
                  weizhi:res[i].xzq,
                  zytdyjdj:res[i].zytdyjdj,
                  fs:res[i].fs,
                  bgImg:"static/images/lanyj.png",
                  simpletype: res[i].simpletype,
                  typename: res[i].typename,
                })
              }
            }      
            _this.total = _this.tableData.length
            _this.arr = _this.tableData.slice(0,5);
            bus.$emit('tableZhongyaotongdaoxianlu_draw_predict_main_towers', this.towers);
            console.log("tableZhongyaotongdaoxianlu_draw_predict_main_towers");
            if(this.arr.length == 0){
              this.zwsj = true;
            }else {
              this.zwsj = false;
            }
          });



       },
     }
   }
 </script>
 <style>
   .active {
     background-color: #b4d8f3;
     color: #000;
   }
   .qiehuan_botton{
     padding: 0 7px;
     height: 40px;
     width:70px;
     background-color: rgb(50,120,178);
     float: left;
     margin-left: 2px;
     line-height: 40px;
     border-radius: 4px;
   }
   .qiehuan_botton.active{
     background-color:blue;
     color: white;
   }
   #table1111{
     width:100%;
     height:170px;
     right:0px;
     bottom:170px;
     z-index:10;
     /*max-width: 400px;*/
   }
   .paging{
     margin-top: 20px;
   }

   .highlight tr:hover{
     background-color: #b4d8f3;
     color: black;
   }
 </style>
