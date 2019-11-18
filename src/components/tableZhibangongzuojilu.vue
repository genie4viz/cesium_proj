<template>
  <div class="ta1" style="color: #b4d8f3">
    <div class="block" style="margin-bottom: 5px">

        <el-date-picker
          v-model="valuetime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :unlink-panels="true"
          value-format="yyyy/MM/dd HH:00">
        </el-date-picker>
    </div>
    <div  style="float:left;margin-bottom:5px;">
      值班人员:
      <el-select v-model="valuename" :placeholder="this.userName" style="width:100px ;z-index:11;" @change="shurua">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <!--<div type="text" class="chaxun_botton"  :class="{active:seen24hours}"  @click="test()">查询</div>-->
    <el-button type="primary" class="chaxun_botton" @click="test()">查询</el-button>
  <div id="tablew" style="color: #b4d8f3">
    <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
      <table width="100%" >
        <thead style=" text-align:center;" >
        <tr>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">编号</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">提交人</td>
          <td style="width:30%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">提交时间</td>
          <td style="width:30%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">操作</td>
        </tr>
        </thead>
        <tbody class="highlight" style="color: #b4d8f3">
        <tr v-for="(zbjl,index) in arr" :key="index" :class="{active: activeName == zbjl}" @click="kong(zbjl)">
          <td style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{zbjl.evdutycode}}</td>
          <td style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{zbjl.evdutyname}}</td>
          <td style="width:30%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{zbjl.evdutytime}}</td>
          <td style="width:30%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;text-align: center;">
            <div style="width:100%;">
              <div style="display:inline;margin-left: 1px;cursor: pointer" @click="chakan(zbjl.evid,zbjl.evdutyname,zbjl.evdutycontent,zbjl.evcreateid)">查看</div>
              <div v-show="zbjl.evboolean" style="display:inline;margin-left: 1px;cursor: pointer" @click="xiugai(zbjl.evid,zbjl.evdutyname,zbjl.evdutycontent,zbjl.evcreateid)">修改</div>
              <!--<div v-show="zbjl.evboolean" style="display:inline;margin-left: 1px;cursor: pointer" @click="shanchu(zbjl.evid,zbjl.evdutyname,zbjl.evdutycontent,zbjl.evcreateid)">删除</div>-->
            </div>
          </td>
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
 </template>
<script>
  // eslint-disable-next-line
   /* eslint-disable */
 import Element from '../api/element';
 import Paging from '@/components/Paging';// 分页
 import axios from 'axios';
   export default {
     components:{Paging},
     data () {
       return {
         activeName:'',
         options: [],
         pickerOptions: {
           shortcuts: [{
             text: '最近一周',
             onClick(picker) {
               const end = new Date();
               const start = new Date();
               start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
               picker.$emit('pick', [start, end]);
             }
           }, {
             text: '最近一个月',
             onClick(picker) {
               const end = new Date();
               const start = new Date();
               start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
               picker.$emit('pick', [start, end]);
             }
           }, {
             text: '最近三个月',
             onClick(picker) {
               const end = new Date();
               const start = new Date();
               start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
               picker.$emit('pick', [start, end]);
             }
           }]
         },
         valuetime:'',
         valuestart:'',
         valueend:'',
         valuename:'',
         size:5,   // 分页
         total:5,  // 分页
         curPage:1,// 分页
         startnum: 1,// 分页
         endnum: 5,// 分页
         tableData: [],
         arr:[]
       }},
     mounted () {
       axios.get(this.$http.adornUrl('/ywgl/evmanagedutyrec/getDutyNames')).then(res => {
         if (res.data.code === 0) {
           for(let i = 0;i<res.data.list.length;i++) {
             this.options.push(res.data.list[i].name);
           }
         }
       });
       this.test();
     },
     computed:{
       userName: {
         get () { return this.$store.state.user.name }
       },
       userId: {
         get () { return this.$store.state.user.id }
       }
     },
     methods:{
       kong(zbjl){
         this.activeName = zbjl
       },
       shurua(index){
         console.log(index,"rowrow")
         this.value = index;
       },
       chakan(evid,evdutyname,evdutycontent,evcreateid){
         console.log("查看")
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.ue.setContent(decodeURIComponent(evdutycontent))
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowclick = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowchakan = true;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowxiugai = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowshanchu = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.username = evdutyname;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.userid = evcreateid;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.listid = evid
       },
       xiugai(evid,evdutyname,evdutycontent,evcreateid){
         console.log("修改")
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.ue.setContent(decodeURIComponent(evdutycontent))
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowclick = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowchakan = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowxiugai = true;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowshanchu = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.username = evdutyname;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.userid = evcreateid;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.listid = evid
       },
       shanchu(evid,evdutyname,evdutycontent,evcreateid){
         console.log("删除")
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.ue.setContent(decodeURIComponent(evdutycontent))
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowclick = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowchakan = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowxiugai = false;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.allowshanchu = true;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.username = evdutyname;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.userid = evcreateid;
         this.$parent.$refs.yunweiguanlizbjl.$refs.ueditor33.listid = evid
       },
       test(){
         let monthnow,datenow;
         if((new Date().getMonth()+1)<10) {
           monthnow = '0' + (new Date().getMonth() + 1)
         }else{
           monthnow = (new Date().getMonth() + 1)
         }
         if(new Date().getDate()<10) {
           datenow = '0' + new Date().getDate()
         }else{
           datenow = new Date().getDate()
         }
         let timenow = new Date().getFullYear() + '-' + monthnow + '-' + datenow;
         if(!this.valuetime){
           this.valuestart = '';
           this.valueend = '';
         }else{
           this.valuestart = this.valuetime[0];
           this.valueend = this.valuetime[1];
         }
         axios.get(this.$http.adornUrl('/ywgl/evmanagedutyrec/getDutyList?starttime=' + this.valuestart + '&endtime=' + this.valueend + '&evdutyname=' + this.valuename)).then(res => {
           if (res.data.code === 0) {
             this.arr = [];
             this.tableData = [];
             for(let i = 0;i < res.data.list.length;i++){
               this.tableData.push(res.data.list[i]);
               //if(this.tableData[i].evdutyname == this.userName&&this.tableData[i].evdutytime.toString().substr(0,10) == timenow){
               if(this.tableData[i].evdutyname == this.userName){
                 this.tableData[i].evboolean = true;
               }else{
                 this.tableData[i].evboolean = false;
               }
             };
             console.log(this.userName,timenow,"userNameuserNameuserName")
           }
           this.arr = this.tableData.slice(0,5);
           this.total = this.tableData.length;
           this.curPage = 1;
           this.startnum = 1;
           this.endnum = 5;
         });
       },
        onPageChange:function(page){ // 分页
          this.curPage = page.curPage;
          this.arr = [];
          this.startnum = (this.curPage - 1) * 5 + 1;
          this.endnum = this.curPage * 5;
          if(this.endnum > this.total){
            this.endnum = this.total;
          }
         this.arr = this.tableData.slice(this.startnum - 1,this.endnum);
       },
     }
   }
 </script>
 <style scoped>
   .active {
     background-color: #b4d8f3;
     color: #000;
   }
   .ta1{
     -webkit-user-select:none;/*文字不可选中*/
     -moz-user-select:none;
     -ms-user-select:none;
     user-select:none;
   }
   #tablew{
     width:100%;
     right:0px;
     bottom:170px;
     margin-top: 10px;
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
   .chaxun_botton{

     float: right;

   }

 </style>
