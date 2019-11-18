<template>
  <div id="yumweiguanli_yujinxinxi" style="float:left;width:100%;height:1000px;margin-top:3.1%; ;border:0px red solid;display-inside:block">

    <ueditor ref="ueditor" style="width:100%;"></ueditor><br/><br/><br/>
    <!--<ueditor11 style="width:100%;"></ueditor11><br/><br/><br/>
    <ueditor22 style="width:100%;"></ueditor22>-->

  </div>
</template>
<script>
  import bus from '../assent/eventBus';
  import Element from '../api/element';
  import axios from 'axios';
  import ueditor from '../views/demo/ueditor';
  import ueditor11 from '../views/demo/ueditor11';
  import ueditor22 from '../views/demo/ueditor22';
  export default{
    components:{ueditor,ueditor11,ueditor22},
    data(){
      return{

    }
    },
    methods:{

    }
  }
</script>
<style>

</style>
