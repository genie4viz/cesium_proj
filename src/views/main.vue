<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar ref="navbar"/>
      <main-sidebar v-if="sidebarVisible" />
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px','margin-left': conLeft + 'px'}">
        <main-content ref="content"/>
      </div>
    </template>
  </div>
</template>

<script>
  import MainNavbar from './main-navbar'
  import MainSidebar from './main-sidebar'
  import MainContent from './main-content'
  export default {
    data () {
      return {
        loading: true,
        //sidebarVisible: false,
        conLeft: 0
      }
    },
    components: {
      MainNavbar,
      MainSidebar,
      MainContent
    },
    computed: {
      sidebarVisible:{
        get () { return this.$store.state.common.sidebarDisplay }
      },
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      },
      documentClientWidth: {
        get () { return this.$store.state.common.documentClientWidth },
        set (val) { this.$store.commit('common/updateDocumentClientWidth', val) }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      userId: {
        get () { return this.$store.state.user.id },
        set (val) { this.$store.commit('user/updateId', val) }
      },
      userName: {
        get () { return this.$store.state.user.name },
        set (val) { this.$store.commit('user/updateName', val) }
      }
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
      this.resetDocumentClientHeight()
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.documentClientHeight = document.documentElement['clientHeight']
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight']
        }
      },
      // 获取当前管理员信息
      getUserInfo () {
        let _this = this;
        this.$http({
          url: this.$http.adornUrl('/sys/user/info'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            _this.loading = false
            _this.userId = data.user.userId
            _this.userName = data.user.username
          }
        })
      }
    }
  }
</script>
<style scoped>
</style>
