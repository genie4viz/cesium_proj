<template>
  <div class="mod-demo-ueditor">
<div>
  <div style="margin-top:25px;width: 100%;max-height:20px;float:left;display:inline">


  </div>
<div id="11111111111111"  >


  </div>
</div>

    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 90%; height: 160px;margin-top:0px;">请输入：</script>

    <!-- 获取内容 -->

    <p><el-button    style="float:right;margin-right:20%;padding-top:2px;pading-left:2px;width: 120px;text-align:center; height: 20px; border-width: 0px; border-radius: 4px; background: rgb(50,120,178); cursor: pointer; outline: 1px; font-family: Microsoft YaHei; color: white; font-size: 13px; box-shadow: 0 1px 2px #1E90FF inset,0 -1px 0 #a8abae inset;"  @click="getContent()">邮件发送</el-button></p>
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
  import ueditor from 'ueditor'
  export default {
    data () {
      return {
        ue: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`,
        ueContent: '',
        dialogVisible: false,
        seenduanqiyujing:true,
        seenzhongqiyujing:false,
      }
    },
    mounted () {
      this.ue = ueditor.getEditor(this.ueId, {
        // serverUrl: '', // 服务器统一请求接口路径
        //zIndex: 3000
      })
    },
    methods: {
      getContent () {
        this.dialogVisible = true
        this.ue.ready(() => {
          this.ueContent = this.ue.getContent()
        })
      },
      ywglyj_dq(){
        this.seenduanqiyujing=true;
        this.seenzhongqiyujing=false;
        console.log(123456)
      },
      ywglyj_zq(){
        this.seenduanqiyujing=false;
        this.seenzhongqiyujing=true;
      },
    }
  }
</script>

<style lang="scss">
  .mod-demo-ueditor {
    position: relative;
    z-index: 510;

  }
  /*.ywgl_yj{
    width:40.5%;
    height:30px;
    background-color:#F0E00B;
  }*/
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
