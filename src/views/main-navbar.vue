<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType" >

    <div class="site-navbar__body clearfix">
      <img id="aa" :src="img1" class="topbutton" @click="goRoute('1')">
      <img id="bb" :src="img2" class="topbutton" @click="goRoute('2')">
      <img id="cc" :src="img3" class="topbutton" @click="goRoute('3')">
      <img id="dd" :src="img4" class="topbutton" @click="goRoute('4')">
      <img id="ee" :src="img5" class="topbutton" @click="goRoute('5')">
      <div style="float:right;height:50px;margin-right:3%">
       <!-- <img src="static/images/xinxi.png" style="cursor: pointer ;float:left;width: 20px;margin-left: 10px;margin-right:20px;margin-top: 5%">-->
        <div style="float:left" @click="goRoute('5')">
          <img src="static/images/renwu.png" style="cursor: pointer ;float:left;width: 20px;margin-left: 10px;margin-top: 13%">
          <div  style="cursor: pointer;color:rgb(8,152,196);font-size:14px;float:left;width: 50px;margin-left: 2px;margin-top:13%" :alt="userName">{{ userName }}</div>
        </div>
        <div style="float:left"  @click="logoutHandle">
          <img src="static/images/dengchu.png" style="cursor: pointer ;float:left;width: 20px;margin-left: 10px;margin-top: 13%">
          <div  style="cursor: pointer;color:rgb(8,152,196);font-size:14px;float:left;width: 50px;margin-left: 2px;margin-top: 13%">注销</div>
        </div>
      </div>
      <!--<div  style="color:rgb(8,152,196)"  class="topbutton" @click="updatePasswordHandle">修改密码</div>-->
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        img1:'static/pages/img/xinxizonglan.png',
        img2:'static/pages/img/fengchangjiance11.png',
        img3:'static/pages/img/zaihaiyujing11.png',
        img4:'static/pages/img/yunweiguangli11.png',
        img5:'static/pages/img/yonghuzhongxin11.png'
      }
    },
    components: {
      UpdatePassword
    },
    mounted() {
      let type=this.$route.path
      if(type==="/ccc/sys-user"){
        this.$nextTick(() => {
            this.$store.commit('common/updateSidebarDisplay', true)
            this.$parent.conLeft = 230
            this.img5="static/pages/img/yonghuzhongxin.png";
            this.img1='static/pages/img/xinxizonglan11.png';
            this.img2='static/pages/img/fengchangjiance11.png';
            this.img3='static/pages/img/zaihaiyujing11.png';
            this.img4='static/pages/img/yunweiguangli11.png';
        })
      }      
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      userId: {
        get () { return this.$store.state.user.id }
      }
    },
    methods: {
      //跳转页面
      goRoute(key){
        let _this = this;
         // key等于5显示侧边栏，否则隐藏
        _this.$store.commit('common/updateSidebarDisplay', true)
        _this.$store.commit('common/updateMenuIndex', key)
        if (key === '5') {
          
          _this.$parent.conLeft = 230
          _this.$router.push({ name: 'sys-user' })
          _this.$store.commit('common/updateSidebarDisplay', true)
        } else {
          // this.tempWidthStatus = false
          _this.$router.push({ name: 'home' })
          _this.$store.commit('common/updateSidebarDisplay', false)
          _this.$parent.conLeft = 0
        }
        //重置按钮
        {
          _this.img1='static/pages/img/xinxizonglan11.png',
          _this.img2='static/pages/img/fengchangjiance11.png',
          _this.img3='static/pages/img/zaihaiyujing11.png',
          _this.img4='static/pages/img/yunweiguangli11.png',
          _this.img5='static/pages/img/yonghuzhongxin11.png'
        }
        switch (key){
          case '1':
            _this.img1="static/pages/img/xinxizonglan.png"
            _this.$nextTick(() => {              
              _this.$parent.$refs.content.$refs.content.main_navbar_xinxizonglan()
            });
          break;
          case '2':
            _this.img2="static/pages/img/fengchangjiance.png"
            _this.$nextTick(() => {
              _this.$parent.$refs.content.$refs.content.main_navbar_fengchangjiance()
            });
          break;
          case '3':
            _this.img3="static/pages/img/zaihaiyujing.png"
            _this.$nextTick(() => {
              _this.$parent.$refs.content.$refs.content.main_navbar_zaihaiyujing()
            });
          break;
          case '4':
            _this.img4="static/pages/img/yunweiguanli.png"
            _this.$nextTick(() => {
              _this.$parent.$refs.content.$refs.content.main_navbar_yunweiguanli()
            });
          break;
          case '5':
            _this.img5="static/pages/img/yonghuzhongxin.png"
          break;
        }
      },

      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style >
  .topbutton{
    float:left;
    width:120px;
  }
  .site-navbar{
    background-color:initial;
    padding-top: 15px;
    -webkit-user-select:none;/*文字不可选中*/
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .site-navbar__body{
    background-color: initial;
    margin-left:  29%;
  }
  .site-content > .el-tabs > .el-tabs__header{
    background-color: #132740;
  }

  .site-content > .el-tabs > .el-tabs__content > .site-tabs__tools{
    top: 53px;
    right: 5px;
  }
  .site-sidebar--dark .site-sidebar__menu.el-menu, .site-sidebar--dark > .el-menu--popup, .site-sidebar--dark-popper .site-sidebar__menu.el-menu, .site-sidebar--dark-popper > .el-menu--popup{
    background-color: initial;
  }
  .site-sidebar--dark, .site-sidebar--dark-popper{
    background-color: initial;
  }
  body{
    background-image: url(~@/assets/img/waikuang.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: rgb(23, 39, 62);
    position:fixed;
  }
  .site-content__wrapper{
    background: inherit
  }
</style>
