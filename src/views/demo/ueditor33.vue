<template>
  <div class="mod-demo-ueditor">
<div>
  <div style="margin-top:25px;width: 100%;max-height:20px;float:left;display:inline">


  </div>
<div id="11111111111111"  >


  </div>
</div>

    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 300px;margin-top:0px;">请输入：</script>

    <!-- 获取内容 -->
    <div style="margin-top:10px;">
      <div style="float:left;    line-height: 36px;">
      <font style="float:left;margin-left:0px;margin-top:5px;color:white;font-color:12px;">编号</font>
      <el-input id="zhibanbianhao" style="float:left:margin-left:2px;margin-top:5px;width:100px;height:18px;margin-left:10px"/>
      </div>
      <div style="float:left;    line-height: 36px;">
      <font style="float:left;margin-left:10px;margin-top:5px;color:white;font-color:12px;">值班人员</font>
      <el-input id="zhibanrenyuan" :value="username" style="float:left:margin-left:2px;margin-top:5px;width:100px;height:18px;margin-left:10px"/>
      </div>
      <el-button  v-show="allowclick" type="primary" style="float:right;margin-right:0%;padding-top:4px;pading-left:2px;width: 120px;text-align:center; height: 36px;line-height: 22px;"  @click="getContent()">保存值班日志</el-button>
      <el-button  v-show="allowchakan" type="primary" style="float:right;margin-right:0%;padding-top:2px;pading-left:2px;width: 120px;text-align:center; height: 36px; line-height: 22px;"  @click="checkchakan()">取消查看</el-button>
      <el-button  v-show="allowxiugai" type="primary" style="float:right;margin-right:0%;padding-top:2px;pading-left:2px;width: 120px;text-align:center; height: 36px;line-height: 22px;"  @click="checkxiugai()">确认修改</el-button>
      <el-button  v-show="allowshanchu" type="primary" style="float:right;margin-right:0%;padding-top:2px;pading-left:2px;width: 120px;text-align:center; height: 36px;line-height: 22px;"  @click="checkshanchu()">确认删除</el-button>
      </div>
    <el-dialog
      title="内容"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      {{ ueContent }}
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import ueditor from 'ueditor';
  import $ from 'jquery';
  import axios from 'axios';
  export default {
    data () {
      return {
        username:this.$store.state.user.name,
        userid:'',
        listid:'',
        allowclick:true,
        allowchakan:false,
        allowxiugai:false,
        allowshanchu:false,
        ue: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`,
        ueContent: '',
        zbryname: '',
        zbryid: '',
        dialogVisible: false,
      }
    },
    mounted () {
      this.ue = ueditor.getEditor(this.ueId, {
    toolbars: [
      ['fullscreen', 'source', 'undo', 'redo','bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
    ]
        // serverUrl: '', // 服务器统一请求接口路径
        //zIndex: 3000
      })
      this.ue.ready(function () {
        $(".edui-editor-messageholder.edui-default").css({ "visibility": "hidden" });
      })
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
      checkchakan(){
        this.ue.setContent('请输入:');
        this.ueContent='';
        this.allowchakan = false;
        this.allowclick = true;
        this.username = '';
        this.userid = '';
        this.listid='';
      },
      checkxiugai(){
        this.ue.ready(() => {
          this.ueContent = encodeURIComponent(this.ue.getContent())//获取输入内容
          this.zbryname = $("#zhibanrenyuan").val();// 值班人员
          let _this = this;
          // 上传
          if(this.zbryname == ''){
            alert("请填写值班人员");
          }else{
            $.ajax({
              url:main.$http.adornUrl("/ywgl/evmanagedutyrec/updateDuty"),
              type:"post",
              data:{"evdutyname":this.zbryname,
                "evdutycontent":this.ueContent,
                "evid":this.listid},
              dataType:"json",
              success:function(data){
                alert("修改成功");
                _this.ue.setContent('请输入:');
                this.ueContent='';
                this.allowshanchu = false;
                this.allowclick = true;
                this.zbryname = '';
                this.zbryid = '';
                this.listid='';
                _this.$parent.$parent.$refs.tgtablezb.test()
              },
              error:function(data){
                alert("修改失败");
              }
            });
          }
        })
      },
      checkshanchu(){
        this.ue.ready(() => {
          axios.get(this.$http.adornUrl('/ywgl/evmanagedutyrec/deleteDuty?evid=' + this.listid)).then(res => {
            if (res.data.result === 1) {
              alert("删除成功");
              this.ue.setContent('请输入:');
              this.ueContent='';
              this.allowshanchu = false;
              this.allowclick = true;
              this.zbryname = '';
              this.zbryid = '';
              this.listid='';
              this.$parent.$parent.$refs.tgtablezb.test()
            }else{
              alert("删除失败");
            }
          });
        })
      },
      getContent () {
        this.ue.ready(() => {
          this.ueContent = encodeURIComponent(this.ue.getContent())//获取输入内容
          this.zbryname = $("#zhibanrenyuan").val();// 值班人员
          this.zbryid = $("#zhibanbianhao").val();// 值班人员id
          let _this = this;
          // 上传
          if(this.zbryname == ''){
            alert("请填写值班人员");
          }else if(this.zbryid == ''){
            alert("请填写编号");
          }else{
            $.ajax({
              url:main.$http.adornUrl("/ywgl/evmanagedutyrec/saveDuty"),
              type:"post",
              data:{"evdutyname":this.zbryname,
                "evdutycontent":this.ueContent,
                "evcreateid":this.userId,
                "evdutycode":this.zbryid},
              dataType:"json",
              success:function(data){
                alert("上传成功");
                _this.ue.setContent('请输入:');
                this.ueContent='';
                this.allowshanchu = false;
                this.allowclick = true;
                this.zbryname = '';
                this.zbryid = '';
                this.listid='';
                _this.$parent.$parent.$refs.tgtablezb.test()
              },
              error:function(data){
                alert("上传失败");
              }
            });
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .mod-demo-ueditor {
    position: relative;
    z-index: 510;

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

  .el-input--medium .el-input__inner {

    /* line-height: 36px; */
  }
</style>
