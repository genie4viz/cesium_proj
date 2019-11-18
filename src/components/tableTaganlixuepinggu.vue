<template>
  <div class="ta1" style="color: #b4d8f3;margin-bottom:15px">
    <div  style="float:left;margin-bottom:5px;">
    风速:
    <el-select v-model="value" placeholder="风速" style="width:100px ;z-index:11;"   @change="shurua">
      <el-option
        v-for="item in options1"
        :key="item"
        :label="item+'m/s'"
        :value="item"
       >
      </el-option>
    </el-select>
    </div>
    <div   style="float:left;margin-left:3px;">
    线路名称:
    <el-select v-model="value2" placeholder="请选择" style="width:120px;z-index:11;"  @change="shurua1">
      <el-option
        v-for="item in chartGQTWTJ "
        :key="item.x"
        :label="item.y"
        :value="item.x"
      >
      </el-option>
    </el-select>
    </div>
    <div   class="clearfix"  style="width:100%;">
      <div   style="line-height: 36px;font-size:16px;color: #b4d8f3;margin-top: 5%;text-align: center;">重要通道线路杆塔列表</div>
  <div id="tablegt" style="color: #b4d8f3">
    <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
      <table width="100%" >
        <thead style=" text-align:center;" >
        <tr>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">线路名称</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">杆塔编号</td>
          <td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">位置</td>
          <!--<td  style="width:20%;">日期</td>


          <td  style="width:25%;">播放控制</td>-->
        </tr>
        </thead>
        <tbody class="highlight" style="color: #b4d8f3">
        <tr v-for="(tower, index) in arr" :key="index" @click="select_tower(index, tower)" :class="{active: activeName == tower}">
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower[0]}}</td>
          <td   style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{tower[1]}}</td>
          <td   style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2">{{tower[2]}}</td>
          <!-- <td>
             <button @click="bofang">播放</button>
           </td>-->
        </tr>
        </tbody>
      </table>

     </div>
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
         fqdt:'风偏预警',
         a:'20',
         b:'',
         value:'20m/s',
         value2:'',
         value3:'',
         options1: [20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60],
         options2: [],
         options3: [],
         size:5,   // 分页
         total:5,  // 分页
         curPage:1,// 分页
         startnum:1,// 分页
         endnum: 20,// 分页
         shuru:'',
         shuru1:'',
         tableData: [],
         fire:[],
         jingdu:null,
         weidu:null,
         arr:[],
         chartGQTWTJ:[],
         chartGDYDJTWTJ:[],
         towers: [],
         prevItem: null,

         }},
     mounted () {
       let _this = this;
       bus.$on("selectItemOftableTaganlixuepinggu", function(tower_evid) {      
        let index = -1;
        for (let i = 0; i < _this.tableData.length; i++) {
          let row = _this.tableData[i];
          if (row[3] == tower_evid) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          _this.selectItem(index);
        }
      });
       this.$http({
         url: this.$http.adornUrl('/zhyj/eveenginetowerinfo/getAllLineList'),
         method: 'get',
         params: this.$http.adornParams()
       }).then(res => {
         for (var i = 0; i < res.data.lineList.length; i++) {
            if(res.data.lineList[i].evvoltage==='±800kV'||res.data.lineList[i].evvoltage==='1000kV'){
             _this.chartGQTWTJ.push({
              x:res.data.lineList[i].evid,
              y:res.data.lineList[i].evloopname})
             _this.chartGDYDJTWTJ.push(res.data.lineList[i].evid)
            }
         }
         this.b = _this.chartGQTWTJ[0].x;
         this.value2 =_this.chartGQTWTJ[0].y;
        //  console.log(this.b)
        //  console.log(this.value2)
         this.getyf();
       });
      },
     computed:{
     },
     methods:{
       selectItem: function(index) {
        let page = Math.floor(index / 20) + 1;
        let tr_index = index % 20;
        this.onPageChange({curPage: page});
        this.activeName = this.arr[tr_index];
      },
       shurua(index){         
         var a = index + "";
         this.a=a
         // bus.$emit('select_tower',a[5],a[6])
        // this.getyf ()
       },
       shurua1(index){
         if(this.clickable == false) return;
          bus.$emit("start_draw_all_el_towers");
         this.startnum=1
         this.endnum=20
         this.curPage=1

         var a = index + "";
        //  console.log(a,"rowrow")
         this.b=a
         // bus.$emit('select_tower',a[5],a[6])
         this.getyf ()
       },
       select_tower(index, item){
         if(this.clickable == false) return;
          // bus.$emit("start_draw_all_el_towers");
          this.activeName = item;
          // 0: "安兰II线"
          // 1: "1_SDJC-51"
          // 2: "湖州"
          // 3: 201136
          // 4: 30
          // 5: "119.806319"
          // 6: "30.737467"
         bus.$emit('tableTaganlixuepinggu_show_el_tower_physics', item, (this.curPage - 1) * 20 + index);
       },
        onPageChange:function(page){ // 分页
         // console.log(page)
         this.curPage = page.curPage;
         this.arr = [];
          this.startnum = (this.curPage - 1) * 20 + 1;
          this.endnum = this.curPage * 20;
          if(this.endnum > this.total){
            this.endnum = this.total;
          }
         this.arr = this.tableData.slice(this.startnum - 1, this.endnum);
        //  console.log(this.arr)
       },
       getyf(){
         let _this = this;
         this.tableData = [];         
         Element.gegtlx(this.b).then(res => {
           this.towers = res;
           for (var i = 0; i < res.length; i++) {
             this.tableData.push({
               [0]: res[i].evloopname,
               [1]: res[i].towernumber,
               [2]: res[i].xzq,
               [3]: res[i].evid,
               [4]: res[i].gtfs,
               [5]: res[i].lng,
               [6]: res[i].lat,
               [7]: res[i].evvoltage,
               [8]: res[i].simpletype,
               [9]: res[i].typename
             })
           }
           _this.total = _this.tableData.length
           _this.arr = _this.tableData.slice(0,20);
          bus.$emit('tableTaganlixuepinggu_draw_all_el_towers', res);
          //  bus.$emit('tqtd',this.fire)
         });
       }
     }
   }
 </script>
 <style>
   .active {
     background-color: #b4d8f3;
     color: #000;
   }
   #tablegt{
     width:100%;
     height:70%;
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
