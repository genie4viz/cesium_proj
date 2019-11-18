<template>
  <div class="baogao_frame" style="color: #000; margin-left:20%; margin-right:20%; padding:20px">
    <h1 style='color:red'>国家电网公司台风灾害预警报告</h1>
    <h4 style='font-weight:normal'>第&nbsp;(&nbsp;<input id='doc_no'>&nbsp;)号</h4>
    <input :value="publishDate">
    <h4 style='font-weight:normal'>电网台风灾害中期预</h4>
    <h2 style='font-weight:normal;text-align:left;'>一、台风天气过程分析</h2>
    <textarea :value="processAnalysis" style='font-size: 14pt;resize:none;width:100%' rows='10'></textarea>
    <div>
      <h4 style='font-weight:normal;display:inline'>台风路径图片：</h4>
      <button  class='button' @click="upload_screenshot">选择图片</button>      
      <br>
      <input type="file" id='pic_uploader' accept="image/gif, image/jpg, image/jpeg, image/png" @change='uploadImage' style='display:none'>
      <div style='justifyContent:center;display:flex'>
        <img :src="previewImage" class="uploading-image" />
      </div>
    </div>
    <h2 style='font-weight:normal;text-align:left;'>二、台风气象预报</h2>
    <textarea :value="suggestion" style='font-size: 14pt;resize:none;width:100%' rows='10' ></textarea>
    <h4 style='font-weight:normal'>风速和降水预报数据详见表1和表2。</h4>
    <h4 style='font-weight:normal'>表1 预报风速列表</h4>
    <div style='display: flex;justify-content:center'>
      <table border='1' style='width:100%;border-collapse: collapse;'>        
        <thead style=" text-align:center;">
          <tr>
            <td style='padding:6px'>序号</td>
            <td style='padding:6px'>地区</td>
            <td style='padding:6px'>24h最大风速(m/s)</td>
            <td style='padding:6px'>25~48h最大风速(m/s)</td>
            <td style='padding:6px'>49~72h最大风速(m/s)</td>            
          </tr>
        </thead>
        <tbody class="highlight" style=" text-align:center;">
          <tr v-for="(city_info, index) in dataList" :key="index">
            <td style='padding:6px'>{{city_info.cityCode}}</td>
            <td style='padding:6px'>{{city_info.cityName}}</td>
            <td style='padding:6px'>{{city_info.maxWspdDay1}}</td>
            <td style='padding:6px'>{{city_info.maxWspdDay2}}</td>
            <td style='padding:6px'>{{city_info.maxWspdDay3}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 style='font-weight:normal'>表2 预报日累计降水量列表</h4>
    <div style='display: flex;justify-content:center'>
      <table border='1' style='width:100%;border-collapse: collapse;'>
        <thead>
          <tr>
            <td style='padding:6px'>序号</td>
            <td style='padding:6px'>地区</td>
            <td style='padding:6px'>24h最大累计降水量(mm)</td>
            <td style='padding:6px'>48h最大累计降水量(mm)</td>
            <td style='padding:6px'>72h最大累计降水量(mm)</td>
          </tr>
        </thead>
        <tbody class="highlight" style=" text-align:center;">
          <tr v-for="(city_info, index) in dataList" :key="index">
            <td style='padding:6px'>{{city_info.cityCode}}</td>
            <td style='padding:6px'>{{city_info.cityName}}</td>
            <td style='padding:6px'>{{city_info.rainDay1}}</td>
            <td style='padding:6px'>{{city_info.rainDay2}}</td>
            <td style='padding:6px'>{{city_info.rainDay3}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 style='font-weight:normal;text-align:left;'>三、电网台风灾害预警</h2>
    <textarea :value="warning" style='font-size: 14pt;resize:none;width:100%' rows='10'></textarea>
    <h2 style='font-weight:normal;text-align:left;'>四、建议措施</h2>
    <textarea :value="weatherPredict" style='font-size: 14pt;resize:none;width:100%' rows='10'></textarea>
    <br>
    <br>
    <button class='button' @click="sendReport">生成预警报告</button>
    <br>
    <br>
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import bus from "../assent/eventBus";
import axios from 'axios';
import $ from "jquery";

export default {    
  data() {
    return {      
      dataList: [],
      publishDate: '',
      processAnalysis: '',
      suggestion: '',
      warning: '',
      weatherPredict: '',
      yyyyMMddxx: '',
      yyyyMMddHHmm: '',
      base64_imgTyphoonPath: '',
      base64_imgRain: '',
      base64_imgMaxWspd: '',
      previewImage: null
    };
  },
  created() {
    axios.get(this.$http.adornUrl('/generator/report/getReportMsg')).then(res => {
      if (res.data.code === 0) {        
        this.dataList = res.data.reportContent.wspdRainXzqList;        
        this.processAnalysis = this.getPrecorrection(res.data.reportContent.processAnalysis);        
        this.publishDate = res.data.reportContent.publishDate;
        this.suggestion = this.getPrecorrection(res.data.reportContent.suggestion);
        this.warning = this.getPrecorrection(res.data.reportContent.warning);
        this.weatherPredict = this.getPrecorrection(res.data.reportContent.weatherPredict);
        this.yyyyMMddxx = res.data.reportContent.yyyyMMddxx;
        this.yyyyMMddHHmm = res.data.reportContent.yyyyMMddHHmm;
      };
    });
    
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getPrecorrection(str){      
      var re = new RegExp('<w:br />', 'g');
      return str.replace(re, `\n`);
    },
    upload_screenshot(){      
      $('#pic_uploader').trigger('click');      
    },
    uploadImage(e){
        const image = e.target.files[0];
        this.image_urls = image;
        console.log(image, 'urls')
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
            this.previewImage = e.target.result;
        };
        this.base64_imgTyphoonPath = reader.result;
        
    },
    sendReport(){ 
      axios.get(this.$http.adornUrl('/generator/report/warningWordReportCreate?yyyyMMddxx=' 
        + this.yyyyMMddxx + '&yyyyMMddHHmm=' + this.yyyyMMddHHmm + '&suggestion=' + this.suggestion +
        '&warning=' + this.warning + '&weatherPredict=' + this.weatherPredict + '&processAnalysis=' + this.processAnalysis +
        '&imgTyphoonPath=' + this.base64_imgTyphoonPath + '&imgMaxWspd=' + '&imgRain='
      )).then(res => {
        console.log(res, 'created result')
      });
    }
  }
};
</script>
 <style>
   .uploading-image{
     display:flex;
   }
  .button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
 </style>
