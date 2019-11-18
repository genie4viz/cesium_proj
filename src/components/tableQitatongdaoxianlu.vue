<template>
  <div class="ta1" style="color: #b4d8f3">
    <div @click="shuruafp" class="fpdt":class="{active:seenfp}">风偏
    </div>
    <div @click="shuruadt" class="fpdt" :class="{active:seendt}">倒塔
    </div>
    <div style="color: white;height:30px;margin-left:0px;margin-right: 3px;text-align:center;">
      <div type="text" class="qiehuan_botton"  :class="{active:seendqhours}"  @click="shuruadq" style="margin-bottom: 3px; ">当前</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen24hours}"  @click="shurua">24h</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen48hours}" @click="shurua1">48h</div>
      <div type="text" class="qiehuan_botton"  :class="{active:seen72hours}" @click="shurua2">72h</div>
    </div>
    <!--<el-button @click="shuruadq" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">当前
    </el-button>
    <el-button @click="shurua" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">24
    </el-button>
    <el-button @click="shurua1" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">48
    </el-button>
    <el-button @click="shurua2" style="  border: 1px solid rgb(50,120,178)!important;background-color:rgb(50,120,178);color:#FFFFFF">72
    </el-button>-->
    <div class="clearfix" style="background:#364359;width: 100%;height: 600px;font-size: 18px;color: white;overflow: hidden;">

      <div style="line-height: 36px;font-size:18px;color: #b4d8f3;text-align: center;">各电压等级{{ fqd }}塔位统计</div>
      <chartGedianyadengjitaweitongji v-bind:chartGDYDJTWTJ="chartGDYDJTWTJ"></chartGedianyadengjitaweitongji>
      <br/>
      <div style="line-height: 36px;font-size:18px;color: #b4d8f3;text-align: center;">各区{{ fqd }}塔位统计</div>
      <chartGequtaweitongji v-bind:chartGQTWTJ="chartGQTWTJ"></chartGequtaweitongji>
    </div>
    <div style="line-height: 36px;font-size:16px;color: #b4d8f3;margin-top: 5%;text-align: center;margin-top:5px;">预警信息列表</div>
  <div id="table1111" style="color: #b4d8f3">
    <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
      <table width="100%" >
        <thead style=" text-align:center;" >
        <tr>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">电压等级</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">线路名称</td>
          <td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">杆塔名称</td>
          <td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">{{fqdt}}</td>
          <!--<td  style="width:20%;">日期</td>


          <td  style="width:25%;">播放控制</td>-->
        </tr>
        </thead>
        <tbody class="highlight" style="color: #b4d8f3">
        <tr v-for="(tower,index) in arr" :key="index" @click="select_qita_tower_online(index,tower)" :class="{active: activeName == tower}">
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower[1]}}</td>
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower[0]}}</td>
          <td   style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower[2]}}</td>
          <td   style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2">{{tower[3]}}</td>
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
import chartGequtaweitongji from '@/components/chartGequtaweitongji'
import chartGedianyadengjitaweitongji from '@/components/chartGedianyadengjitaweitongji'
// 分页
   export default {
     props:{
      clickable: Boolean,      
      },
     components:{
       ElInput,
       Paging,chartGequtaweitongji,chartGedianyadengjitaweitongji},
     data () {
       return {
         activeName:'',
         evid:[],
         seendqhours:true,
         seen24hours:false,
         seen48hours:false,
         seen72hours:false,
         seenfp:true,
         seendt:false,

         fqdt:'风偏预警',
         fqd:'风偏',
         a:'',
         b:'',
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
         qitaTowers:[],
         jingdu:null,
         weidu:null,
         arr:[],
         chartGQTWTJ:[],
         chartGDYDJTWTJ:[]

         }},
     mounted () {
       this.a='fp'
       this.b='0'
       this.getyf ();
       let _this = this;
       bus.$on("selectItemOftableQitatongdaoxianlu", function(tower_evid) {      
          let index = -1;
          
          for (let i = 0; i < _this.tableData.length; i++) {
            let row = _this.tableData[i];
            if (row[7] == tower_evid) {
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
       shuruadq(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=true;
         this.seen24hours=false;
         this.seen48hours=false;
         this.seen72hours=false;
         this.b='0'
         this.value=''
         this.value2=''
         this.value3=''
         // bus.$emit('select_qita_tower_online',a[5],a[6])
          this.getyf ()
       },
       shuruafp(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seenfp=true;
         this.seendt=false;

         this.fqdt='风偏预警'
         this.fqd='风偏'
         this.a='fp'
       //  this.b='0'
         this.value=''
         this.value2=''
         this.value3=''
         // bus.$emit('select_qita_tower_online',a[5],a[6])
         this.getyf ()
       },
       shuruadt(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seenfp=false;
         this.seendt=true;

         this.fqdt='倒塔预警'
         this.fqd='倒塔'
          this.a='dt'
       //  this.b='0'
         this.value=''
         this.value2=''
         this.value3=''
         // bus.$emit('select_qita_tower_online',a[5],a[6])
         this.getyf ()
       },
       shurua(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=true;
         this.seen48hours=false;
         this.seen72hours=false;
         this.b="24"
         this.getyf ()
       },
       shurua1(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=false;
         this.seen48hours=true;
         this.seen72hours=false;
         this.b="48"
         // bus.$emit('select_qita_tower_online',a[5],a[6])
         this.getyf ()
       },
       shurua2(){
         this.startnum=1
         this.endnum=5
         this.curPage=1
         this.seendqhours=false;
         this.seen24hours=false;
         this.seen48hours=false;
         this.seen72hours=true;
         this.b="72"
         // bus.$emit('select_qita_tower_online',a[5],a[6])
         this.getyf ()
       },
       select_qita_tower_online(index, tower){
         if(this.clickable == false) return;
          bus.$emit("start_draw_all_el_towers");
        this.activeName = tower;

         Element.getqitaxianlu(tower[8]).then(res => {
           console.log(res, "getqitaxianlu")
           bus.$emit('select_qita_tower_online', tower, res)
         })
       },
      MouseOver(){
        var highlightcolor='#E0F2FE';
        var clickcolor='#ffedd2';

        var source=event.srcElement;
        if (source.tagName=="TD"){
          source=source.parentElement;
          var cells = source.children;
          if (cells[0].style.backgroundColor!=highlightcolor&&cells[0].style.backgroundColor!=clickcolor)
            for(let i=0;i<cells.length;i++){
              cells[i].style.backgroundColor=highlightcolor;
              cells[i].style.color="#000000";
            }
        }
      },
      MouseOut(){
         var highlightcolor='#E0F2FE';
         var clickcolor='#ffedd2';

         var source=event.srcElement;
         if (source.tagName=="TD"){
           source=source.parentElement;
           var cells = source.children;
           if (cells[0].style.backgroundColor!=clickcolor)
             for(let i=0;i<cells.length;i++){
               cells[i].style.backgroundColor="";
               cells[i].style.color="";
             }
         }
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
       getyf(){
         let _this=this
         this.tableData=[]
         this.chartGDYDJTWTJ={x:[],y:[]}
         this.chartGQTWTJ={x:[],y:[]}
         Element.geqtxl(this.a,this.b).then(res => {
           console.log(res,"3-4")
           this.qitaTowers=[]
           let rec=res.yjList
           let rea=res.xzqGroup
           let reb=res.volGroup

           for (var i = 0; i < rea.length; i++) {
             this.chartGQTWTJ.x.push(
               rea[i].cityname
             )
           }
           for (var i = 0; i < rea.length; i++) {
             this.chartGQTWTJ.y.push(
               rea[i].yjCount
             )
           }
           for (var i = 0; i < reb.length; i++) {
             this.chartGDYDJTWTJ.x.push(
               reb[i].evvoltage,
             )
           }
           for (var i = 0; i < reb.length; i++) {
             this.chartGDYDJTWTJ.y.push(
               reb[i].yjCount,
             )
           }           
           for (var i = 0; i < rec.length; i++) {
             this.tableData.push({
               [0]: rec[i].evloopname,
               [1]: rec[i].evvoltage,
               [2]: rec[i].towernumber,
               [3]: rec[i].yjdj,
               [4]: rec[i].evlastmonitortime,
               [5]: rec[i].lng,
               [6]: rec[i].lat,
               [7]: rec[i].evtowerid,
               [8]: rec[i].evid,
               [9]: rec[i].simpletype,
               [10]: rec[i].typename,
             //  [6]: res[i].evtowernumber,
               //[7]:res[i].evid,
             })

             if(rec[i].yjdj==="黄色预警"){
               this.qitaTowers.push({
                 lon: rec[i].lng,
                 lat: rec[i].lat,
                 text:rec[i].evloopname+rec[i].towernumber,
                 evloopname:rec[i].evloopname,
                 evvoltage:rec[i].evvoltage,
                 weizhi:rec[i].xzq,
                 yjdj:rec[i].yjdj,
                 towernumber:rec[i].towernumber,
                 evlastmonitortime:rec[i].evlastmonitortime,
                 evtowerid: rec[i].evtowerid,
                 evid: rec[i].evid,
                 bgImg:'static/images/huangyj.png',
                 simpletype: rec[i].simpletype,
                 typename: rec[i].typename,
               })
             }else   if(rec[i].yjdj==="红色预警"){
               this.qitaTowers.push({
                 lon: rec[i].lng,
                 lat: rec[i].lat,
                 text:rec[i].evloopname+rec[i].towernumber,
                 evloopname:rec[i].evloopname,
                 evvoltage:rec[i].evvoltage,
                 weizhi:rec[i].xzq,
                 yjdj:rec[i].yjdj,
                 towernumber:rec[i].towernumber,
                 evlastmonitortime:rec[i].evlastmonitortime,
                 evtowerid: rec[i].evtowerid,
                 evid: rec[i].evid,
                 bgImg:'static/images/hongyj.png',
                 simpletype: rec[i].simpletype,
                 typename: rec[i].typename,
               })
             }
             else   if(rec[i].yjdj==="橙色预警"){
               this.qitaTowers.push({
                 lon: rec[i].lng,
                 lat: rec[i].lat,
                 text:rec[i].evloopname+rec[i].towernumber,
                 evloopname:rec[i].evloopname,
                 evvoltage:rec[i].evvoltage,
                 weizhi:rec[i].xzq,
                 yjdj:rec[i].yjdj,
                 towernumber:rec[i].towernumber,
                 evlastmonitortime:rec[i].evlastmonitortime,
                 evtowerid: rec[i].evtowerid,
                 evid: rec[i].evid,
                 bgImg:"static/images/chengyj.png",
                 simpletype: rec[i].simpletype,
                 typename: rec[i].typename,
               })
             }
             else if(rec[i].yjdj==="蓝色预警"){
               this.qitaTowers.push({
                 lon: rec[i].lng,
                 lat: rec[i].lat,
                 text:rec[i].evloopname+rec[i].towernumber,
                 evloopname:rec[i].evloopname,
                 evvoltage:rec[i].evvoltage,
                 weizhi:rec[i].xzq,
                 yjdj:rec[i].yjdj,
                 towernumber:rec[i].towernumber,
                 evlastmonitortime:rec[i].evlastmonitortime,
                 evtowerid: rec[i].evtowerid,
                 evid: rec[i].evid,
                 bgImg:"static/images/lanyj.png",
                 simpletype: rec[i].simpletype,
                 typename: rec[i].typename,
               })
             }
           }           
           _this.total = _this.tableData.length
           _this.arr = _this.tableData.slice(0,5);           
           bus.$emit('draw_qita_towers', this.qitaTowers)
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
   .fpdt{
     width:50%; background-color: rgb(50,120,178);margin-top:3%;margin-left:0px;margin-bottom:1%;text-align:center;line-height:180%; float:left;
     color: white;
     border-radius:4px;
   }
   .fpdt.active{
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

   .qiehuan_botton{
     padding: 0 7px;
     height: 40px;
     background-color: rgb(50,120,178);
     float: left;
     margin-left: 2px;
     line-height: 28px;
     width:70px;
     line-height:40px;
     border-radius:4px;
   }
   .qiehuan_botton.active{
     background-color:blue;
     color: white;
   }
 </style>
