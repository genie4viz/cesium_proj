<template>
  <div class="ta1" style="color: #b4d8f3">
    <div style="margin-bottom: 5px">
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
    <!--<div type="text" class="chaxun_botton"  :class="{active:seen24hours}"  @click="test()">查询</div>-->
    <el-button type="primary" @click="test()">查询</el-button>
  <div id="tablew" style="color: #b4d8f3">
    <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
      <table width="100%" >
        <thead style=" text-align:center;" >
        <tr>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">提交人</td>
          <td style="width:30%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">提交时间</td>
          <td style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;">状态</td>
          <td style="width:30%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">操作</td>
        </tr>
        </thead>
        <tbody class="highlight" style="color: #b4d8f3">
        <tr v-for="(yjxx,index) in arr" :key="index" :class="{active: activeName == yjxx}" @click="kong(yjxx)">
          <td style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{yjxx.idname}}</td>
          <td style="width:30%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{yjxx.evcreatetime}}</td>
          <td style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">{{yjxx.evstate}}</td>
          <td style="text-align:center; width:30%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">
            <div v-show="yjxx.chakan" style="display:inline-block;margin-left: 3px" @click="chakan(yjxx.evcontent1,yjxx.evcontent2,yjxx.evcreateid,yjxx.evreviewid,yjxx.evpublishid)">查看</div>
            <div v-show="yjxx.xiugai" style="display:inline-block;margin-left: 3px" @click="xiugai(yjxx.evcontent1,yjxx.evcontent2,yjxx.evcreateid,yjxx.evreviewid,yjxx.evpublishid,yjxx.evid)">修改</div>
            <div v-show="yjxx.shenhe" style="display:inline-block;margin-left: 3px" @click="xiugai(yjxx.evcontent1,yjxx.evcontent2,yjxx.evcreateid,yjxx.evreviewid,yjxx.evpublishid,yjxx.evid)">审核</div>
            <div v-show="yjxx.fabu" style="display:inline-block;margin-left: 3px" @click="xiugai(yjxx.evcontent1,yjxx.evcontent2,yjxx.evcreateid,yjxx.evreviewid,yjxx.evpublishid,yjxx.evid)">发布</div>
            <div v-show="yjxx.shanchu" style="display:inline-block;margin-left: 3px" @click="shanchu(yjxx.evcontent1,yjxx.evcontent2,yjxx.evcreateid,yjxx.evreviewid,yjxx.evpublishid,yjxx.evid)">删除</div>
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
         peoplelist:[],
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
         valuename:this.$store.state.user.name,
         type:1,
         size:5,   // 分页
         total:5,  // 分页
         curPage:1,// 分页
         startnum: 1,// 分页
         endnum: 5,// 分页
         tableData: [],
         arr:[]
       }},
     mounted () {
       axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/getUserNames')).then(res => {
         if (res.data.code === 0) {
           for(let i = 0;i<res.data.list.length;i++) {
             this.options.push(res.data.list[i].name);
             this.peoplelist.push(res.data.list[i]);
           }
           this.test();
         }
       });

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
       kong(yjxx){
         this.activeName = yjxx
       },
       shurua(index){
         console.log(index,"rowrow")
         this.value = index;
       },
       chakan(evcontent1,evcontent2,evcreateid,evreviewid,evpublishid){
         console.log("查看")
         if(!evcontent2){
           evcontent2 = evcontent1
         }
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.textarea = evcontent2;
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.chushihua()
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.chakanshow = true;
       },
       xiugai(evcontent1,evcontent2,evcreateid,evreviewid,evpublishid,evid){
         console.log("修改")
         if(!evcontent2){
           evcontent2 = evcontent1
         }
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.textarea = evcontent2;
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.evid = evid;
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.chushihua()
         if(this.userId == evpublishid){
           this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.qvfabushow = true;
         }else if(this.userId == evreviewid){
           this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.quanxian = true;
           this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.fabushow = true;
         }else if(this.userId == evcreateid){
           this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.quanxian = true;
           this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.shenheshow = true;
         }
       },
       shanchu(evcontent1,evcontent2,evcreateid,evreviewid,evpublishid,evid){
         console.log("删除")
         if(!evcontent2){
           evcontent2 = evcontent1
         }
         //this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.textarea = evcontent2;
         //this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.chushihua()
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.evid = evid;
         //this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.shanchushow = true;
         this.$parent.$refs.yunweiguanliyjxxfb.$refs.ueditor.gotoshanchu();
       },
       test(){
         if(!this.valuetime){
           this.valuestart = '';
           this.valueend = '';
         }else{
           this.valuestart = this.valuetime[0];
           this.valueend = this.valuetime[1];
         }
         axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/getAlertList?starttime=' + this.valuestart + '&endtime=' + this.valueend + '&type=' + this.type + '&userid=' + this.userId)).then(res => {
           if (res.data.code === 0) {
             this.arr = [];
             this.tableData = [];
            //  console.log(this.peoplelist)
             for(let i = 0;i < res.data.list.length;i++){
               switch(res.data.list[i].evstate) {
                 case 0:
                   res.data.list[i].evstate = '已保存';
                   if(this.userId == res.data.list[i].evcreateid){
                     res.data.list[i].chakan = true;
                     res.data.list[i].xiugai = true;
                     res.data.list[i].shenhe = false;
                     res.data.list[i].fabu = false;
                     res.data.list[i].shanchu = true;
                   }
                   break;
                 case 1:
                   res.data.list[i].evstate = '待审核';
                   if(this.userId == res.data.list[i].evreviewid){
                     res.data.list[i].chakan = true;
                     res.data.list[i].xiugai = false;
                     res.data.list[i].shenhe = true;
                     res.data.list[i].fabu = false;
                     res.data.list[i].shanchu = true;
                   }else if(this.userId == res.data.list[i].evcreateid){
                   res.data.list[i].chakan = true;
                   res.data.list[i].xiugai = false;
                   res.data.list[i].shenhe = false;
                   res.data.list[i].fabu = false;
                   res.data.list[i].shanchu = true;
                 }
                   break;
                 case 2:
                   res.data.list[i].evstate = '待发布';
                   if(this.userId == res.data.list[i].evpublishid){
                     res.data.list[i].chakan = true;
                     res.data.list[i].xiugai = false;
                     res.data.list[i].shenhe = false;
                     res.data.list[i].fabu = true;
                     res.data.list[i].shanchu = true;
                   }else if(this.userId == res.data.list[i].evreviewid){
                     res.data.list[i].chakan = true;
                     res.data.list[i].xiugai = false;
                     res.data.list[i].shenhe = false;
                     res.data.list[i].fabu = false;
                     res.data.list[i].shanchu = false;
                   }else if(this.userId == res.data.list[i].evcreateid){
                     res.data.list[i].chakan = true;
                     res.data.list[i].xiugai = false;
                     res.data.list[i].shenhe = false;
                     res.data.list[i].fabu = false;
                     res.data.list[i].shanchu = false;
                   }
                   break;
                 case 3:
                   res.data.list[i].evstate = '已发布';
                   res.data.list[i].chakan = true;
                   res.data.list[i].xiugai = false;
                   res.data.list[i].shenhe = false;
                   res.data.list[i].fabu = false;
                   res.data.list[i].shanchu = false;
                   break;
               }
               for(let j = 0;j < this.peoplelist.length;j++){
                 if(res.data.list[i].evcreateid == this.peoplelist[j].user_id){
                   res.data.list[i].idname = this.peoplelist[j].username
                 }
               }
               this.tableData.push(res.data.list[i]);
             };
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
     padding: 0 10px;
     height: 29px;
     background-color: rgb(50,120,178);
     float: right;
     margin-top: 5px;
     margin-right: 20px;
     line-height: 28px;
     border-radius: 4px;
   }
   .chaxun_botton.active{
     background-color:blue;
     color: white;
   }
 </style>
