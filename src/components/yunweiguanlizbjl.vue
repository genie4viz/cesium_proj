<template>
  <div  style="float:left;width:100%;height:1000px;margin-top:3.1%;overflow: auto;border:0px red solid;display-inside:block">

    <ueditor33 ref="ueditor33" style="width:100%;height:400px;"></ueditor33><br/><br/>

  </div>
</template>
<script>
  import bus from '../assent/eventBus';
  import Element from '../api/element';
  import axios from 'axios';
  import ueditor from '../views/demo/ueditor';
  import ueditor11 from '../views/demo/ueditor11';
  import ueditor22 from '../views/demo/ueditor22';
  import ueditor33 from '../views/demo/ueditor33';
  export default{
    components:{ueditor,ueditor11,ueditor22,ueditor33},
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
