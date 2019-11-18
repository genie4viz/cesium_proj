<template>
<div class="mod-demo-ueditor">
  <div>
    <div style="margin-top:25px;width: 100%;max-height:20px;float:left;display:inline">
      <div  id="1" class="ywgl_yj" :class="{active:seenduanqiyujing}"  @click="ywglyj_dq" style="float:left;font-size:20px;text-align:center;line-height:35px;">短期预警</div>
      <div  id="2" class="ywgl_yj" :class="{active:seenzhongqiyujing}" @click="ywglyj_zq"  style="float:left;margin-left:1%;font-size:20px;text-align:center;line-height:35px;">中期预警</div>
    </div>
  <div id="11111111111111"  >
    <div  id="4"style=" width:40.3%;height:40px;margin-left:50%;;color:#FAA40F;font-size:20px;right:0px;"></div>
    <marquee direction=left style="width:100%;height:40px;margin-left:0%;;color:#F0E00B;font-size:20px;margin-top:20px;">
      距离下次预警信息发布两小时 距离下次预警信息发布四小时
    </marquee>
    </div>
  </div>
    <el-input
      type="textarea"
      :rows="16"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  <div style="float:left; line-height: 36px;margin-top:10px;">
    <font style="float:left;margin-left:0px;margin-top:5px;color:white;font-color:12px;">编号</font>
    <el-input id="yujingbianhao" style="float:left:margin-left:2px;margin-top:5px;width:100px;height:18px;margin-left:10px"/>
  </div>
  <el-dialog
    title="提交:"
    :visible.sync="dialogVisible"
    width="30%"
    :modal="false">
    <div v-if="quanxian" style="">
      <div style="margin-top: 10px;margin-bottom: 10px"><div v-show="shenheshow" style="display: inline">审核人:</div><div v-show="fabushow" style="display: inline">发布人:</div>
      <el-select v-model="value" placeholder="请选择" style="width:100px;z-index:11;margin-top:10px;margin-left: 5px" @change="shurua">
        <el-option
          v-for="item in options"
          :key="item.username"
          :label="item.username"
          :value="item.user_id"
        >
        </el-option>
      </el-select>
      </div>
      <br>
      内容预览：<div>{{textarea}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="gotogoto()">确 定</el-button>
  </span>
  </el-dialog>
  <el-button v-show="shenheshow" type="primary" style="float:right;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 36px;margin-top: 10px;line-height: 22px;" @click="bianhaojiancha()">提交审核</el-button>
  <el-button v-show="fabushow" type="primary" style="float:right;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 36px;margin-top: 10px;line-height: 22px;" @click="bianhaojiancha()">提交发布</el-button>
  <el-button v-show="qvfabushow" type="primary" style="float:right;padding-top:5px;pading-left:2px;width: 120px;text-align:center;height: 36px;margin-top: 10px;line-height: 22px; " @click="qvfabu()">发布</el-button>
  <el-button v-show="baocunshow" type="primary" style="float:right;margin-right:1%;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 36px;margin-top: 10px;line-height: 22px; " @click="gotobaocun()">保存</el-button>
  <el-button v-show="chakanshow" type="primary" style="float:right;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 36px;margin-top: 10px;line-height: 22px; " @click="gotochakan()">取消查看</el-button>
  <el-button v-show="xiugaishow" type="primary" style="float:right;margin-right:1%;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 25px; " @click="gotoxiugai()">确认修改</el-button>
  <el-button v-show="shanchushow" type="primary" style="float:right;padding-top:5px;pading-left:2px;width: 120px;text-align:center; height: 25px; " @click="gotoshanchu()">确认删除</el-button>
</div>
</template>

<script>
  import $ from 'jquery';
  import axios from 'axios';
  export default {
    data () {
      return{
        zbryid:'',
        dialogVisible:false,
        shenheshow: true,
        fabushow: false,
        qvfabushow: false,
        baocunshow: true,
        chakanshow: false,
        shanchushow: false,
        xiugaishow: false,
        quanxian: true,
        type: 1,
        evid: 0,
        textarea: '',
        options: [],
        value:'',
        seenduanqiyujing:true,
        seenzhongqiyujing:false,
      }
    },
    mounted () {
      axios.get(main.$http.adornUrl('/ywgl/evmanagealertrec/getUserNames')).then(res => {
        if (res.data.code === 0) {
          for(let i = 0;i<res.data.list.length;i++) {
            this.options.push(res.data.list[i]);
            // console.log(res.data.list[i].username)
          }
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
    methods: {
      chushihua(){
        this.shenheshow = false;
        this.fabushow = false;
        this.qvfabushow = false;
        this.baocunshow = false;
        this.chakanshow = false;
        this.xiugaishow = false;
        this.shanchushow = false;
        this.dialogVisible = false;
        this.quanxian = true;
      },
      shurua(index){
        this.value = index;
      },
      bianhaojiancha(){
        this.zbryid = $("#yujingbianhao").val()
        if(this.zbryid == ''&&this.evid == 0&&this.shenheshow == true){
          alert("请填写编号")
        }else{
          this.dialogVisible = true
        }
      },
      gotogoto(){
        if(this.value == ''&&this.shenheshow == true){
          alert("请选择审核人")
        }else if(this.value == ''&&this.fabushow == true){
          alert("请选择发布人")
        }else if(this.fabushow == true){
          this.gotofabu();
        }else if(this.shenheshow == true){
          this.gotoshenhe();
        }
      },
      gotoshenhe(){
        this.dialogVisible = false
        // console.log("提交审核")
        if(this.evid===0){
          this.zbryid = $("#yujingbianhao").val()
          axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/saveAlert?content=' + this.textarea + '&evreviewid=' + this.value + '&userid=' + this.userId + '&type=' + this.type + '&evalertcode=' +  this.zbryid)).then(res => {
            if(res.data.code == 500){
              alert(res.data.msg);
            }else if (res.data.result === 1) {
              alert("提交成功");
              this.$parent.$parent.$refs.tgtableyj.test();
              this.gotochakan();
            }else{
              alert("提交失败");
            }
          })
        }else{
          axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/updateAlert?evid=' + this.evid + '&evreviewid=' + this.value + '&evstate=1')).then(res => {
            if (res.data.result === 1) {
              alert("提交成功");
              this.$parent.$parent.$refs.tgtableyj.test();
              this.gotochakan();
            }else{
              alert("提交失败");
            }
          })
        }
      },
      gotofabu(){
        this.dialogVisible = false
        console.log("提交发布")
        axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/updateAlert?evid=' + this.evid + '&evcontent2=' + this.textarea + '&evpublishid=' + this.value +  '&evstate=2')).then(res => {
          if (res.data.result === 1) {
            alert("提交成功");
            this.$parent.$parent.$refs.tgtableyj.test();
            this.gotochakan();
          }else{
            alert("提交失败");
          }
        })
      },
      qvfabu(){
        console.log("发布")
        axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/updateAlert?evid=' + this.evid +  '&evstate=3')).then(res => {
          if (res.data.result === 1) {
            alert("发布成功");
            this.$parent.$parent.$refs.tgtableyj.test();
            this.gotochakan();
          }else{
            alert("发布失败");
          }
        })
      },
      gotoxiugai(){
        console.log("修改")
        axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/updateAlert?evid=' + this.evid + '&evcontent1=' + this.textarea)).then(res => {
          if (res.data.result === 1) {
            alert("修改成功");
            this.$parent.$parent.$refs.tgtableyj.test();
            this.gotochakan();
          }else{
            alert("修改失败");
          }
        })
      },
      gotobaocun(){
        console.log("保存")
        this.zbryid = $("#yujingbianhao").val()
        if(this.zbryid == ''){
          alert("请填写编号");
        }else{
          axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/saveAlert?content=' + this.textarea + '&userid=' + this.userId + '&type=' + this.type + '&evalertcode=' +  this.zbryid)).then(res => {
            if(res.data.code == 500){
              alert(res.data.msg);
            }else if (res.data.result === 1) {
              alert("保存成功");
              this.$parent.$parent.$refs.tgtableyj.test();
              this.gotochakan();
            }else{
              alert("保存失败");
            }
          })
        }
      },
      gotochakan(){
        console.log("取消查看")
        this.chushihua();
        this.shenheshow = true;
        this.baocunshow = true;
        this.quanxian = true;
        this.textarea = '';
        this.evid = 0;
      },
      gotoshanchu(){
        var r=confirm("确认删除该条信息？")
        if (r==true)
        {
          axios.get(this.$http.adornUrl('/ywgl/evmanagealertrec/deleteAlert?evid=' + this.evid)).then(res => {
            if (res.data.result === 1) {
              alert("删除成功");
              this.$parent.$parent.$refs.tgtableyj.test();
              this.gotochakan();
            }else{
              alert("删除失败");
            }
          })
        }
        else
        {
          return
        }
      },
      ywglyj_dq(){
        this.seenduanqiyujing=true;
        this.seenzhongqiyujing=false;
        this.type = 1;
        this.$parent.$parent.$refs.tgtableyj.type = 1;
      },
      ywglyj_zq(){
        this.seenduanqiyujing=false;
        this.seenzhongqiyujing=true;
        this.type = 2;
        this.$parent.$parent.$refs.tgtableyj.type = 2;
      },
    }
  }
</script>

<style lang="scss">
  .el-dialog__body{
    padding-top: 0px !important;
  }
  .mod-demo-ueditor {
    position: relative;
    z-index: 510;
  }
  .ywgl_yj{
    width:49.5%;
    height:30px;
    background-color:#F0E00B;
  }
  .ywgl_yj.active{
    background-color:#FAA40F;
  }
  .button1216 { /* 按钮美化 */
    width: 160px; /* 宽度 */
    height: 30px; /* 高度 */
    border-width: 0px; /* 边框宽度 */
    border-radius: 4px; /* 边框半径 */
    background: rgb(50,120,178); /* 背景颜色 */
    cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
    outline: 1px; /* 不显示轮廓线 */
    font-family: Microsoft YaHei; /* 设置字体 */
    color: white; /* 字体颜色 */
    font-size: 17px; /* 字体大小 */
    box-shadow: 0 1px 2px #1E90FF inset,0 -1px 0 #a8abae inset;
  }
  .button1216:hover { /* 鼠标移入按钮范围时改变颜色 */
    background: rgb(50,120,178);
  }


</style>
