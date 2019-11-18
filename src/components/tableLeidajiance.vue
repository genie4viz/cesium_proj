<template>
  <div class="ta1" style="color: #b4d8f3">
    <div>
      <div class="clearfix title">数据通道</div>
      <div class="leidawaikaung">
        <el-tree
          icon-class="tree_icon"
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          style="background-color: inherit;color: #b4d8f3"
          default-expand-all
        ></el-tree>
      </div>
    </div>
    <div style="height: 150px;margin-top:20px">
      <div class="clearfix title">雷达类别</div>
      <div class="leidawaikaung">
        <el-radio class="leidalb" v-model="radio_radar_type" @change="radar_type" label="dbz">强度</el-radio>
        <el-radio class="leidalb" v-model="radio_radar_type" @change="radar_type" label="undbz">无抑制强度</el-radio>
        <el-radio class="leidalb" v-model="radio_radar_type" @change="radar_type" label="vel">速度</el-radio>
        <el-radio class="leidalb" v-model="radio_radar_type" @change="radar_type" label="sw">谱宽</el-radio>
      </div>
    </div>
    <div style="height: 200px;">
      <div class="clearfix title">雷达层数</div>
      <div class="leidawaikaung">
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="1">层1</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="2">层2</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="3">层3</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="4">层4</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="5">层5</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="6">层6</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="7">层7</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="8">层8</el-radio>
        <el-radio class="leidacs" v-model="radio_radar_level" @change="radar_level" label="9">层9</el-radio>
      </div>
    </div>
    <div style="height: 200px;">
      <div class="block" style="margin-bottom: 5px;margin-left: 12px">
        <el-date-picker
          :unlink-panels="true"
          value-format="yyyy/MM/dd HH:00"
          @change="test()"
          v-model="value5"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>

      <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
        <table width="100%">
          <thead style=" text-align:center;">
            <tr style="width: 100%">
              <td
                style="width:40%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2"
              >日期</td>
              <td
                style="width:60%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right: 1px dotted"
              >数据列表</td>
            </tr>
          </thead>
          <tbody class="highlight" style="color: #b4d8f3">
            <tr
              style="width: 100%"
              v-for="(item,index) in arr"
              :key="index"
              @click="shujv(index,item)"
              :class="{active: activeName == item}"
            >
              <td
                style="width:40%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:0px dotted #69ABE2"
              >{{item.time}}</td>
              <td
                style="width:60%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:0px dotted #69ABE2;border-right: 1px dotted"
              >{{item.evfilename}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paging
        @change="onPageChange"
        :page-size="size"
        :total="total"
        layout="jumper,total"
        :current-page="curPage"
        :startnum="startnum"
        :endnum="endnum"
      />
      <!--分页-->
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import bus from "../assent/eventBus";
import Element from "../api/element";
import Paging from "@/components/Paging"; // 分页
import axios from "axios";
import VueLodash from "vue-lodash";
export default {
  components: { Paging },
  data() {
    return {
      activeName: "",
      ttime: "",
      fa: false,
      arr: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      letter: 5,
      tableshow: "",
      size: 5, // 分页
      total: 5, // 分页
      curPage: 1, // 分页
      startnum: 1, // 分页
      endnum: 5, // 分页
      value5: "",
      time0: "",
      valuestart: "",
      valueend: "",
      valuename: "",
      zhandianming: "",
      suoyouleida: [],
      wenjiancanshu: [],
      wenjianming: "",
      cur_leida: null,
      shujvliebiao: [],
      wenjian: "",
      ldlb: "dbz",
      ldcs: "1",
      radio_radar_type: "dbz",
      radio_radar_level: "1",
      radar_detail_info: [],
      data: [
        {
          label: "雷达站点列表",
          children: []
        }
      ],

      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    let _this = this;
    return this.$http({
      url: this.$http.adornUrl("/fcjc/evmonitorthundersite/getThunderlist"),
      method: "get",
      params: this.$http.adornParams()
    }).then(res => {
      console.log("getThunderList", res);
      // for (let i = 0; i < res.data.list.length; i++) {
      for (let i = 0; i < 1; i++) {
        _this.data[0].children.push({ label: res.data.list[i].evid });
      }
      // for (let i = 0; i < res.data.list.length; i++) {
      for (let i = 0; i < 1; i++) {
        _this.suoyouleida.push({
          evid: res.data.list[i].evid,
          evsitename: res.data.list[i].evsitename,
          lng: res.data.list[i].lng,
          lat: res.data.list[i].lat
        });
      }
      _this.cur_leida = _this.suoyouleida[0];
      _this.wenjian = _this.data[0].children[0].label;
      _this.getleidaFiles(_this.cur_leida.evid);
      _this.getRadarDataByType(_this.radio_radar_type, _this.radio_radar_level, _this.cur_leida);//updated 3-25
    });
  },
  computed: {},
  methods: {
    onPageChange: function(page) {
      // 分页
      // console.log(page)
      this.curPage = page.curPage;
      this.arr = [];
      this.startnum = (this.curPage - 1) * 5 + 1;
      this.endnum = this.curPage * 5;
      if (this.endnum > this.total) {
        this.endnum = this.total;
      }
      this.arr = this.wenjiancanshu.slice(this.startnum - 1, this.endnum);
      // console.log(this.arr);
    },  
    handleNodeClick(data) {
      // console.log(data, "node data")      
      for(let i = 0; i < this.suoyouleida.length; i++){
        if(this.suoyouleida[i].evid === data.label){
          this.cur_leida = this.suoyouleida[i];
          break;
        }
      }
      this.startnum = 1;
      this.endnum = 5;
      this.curPage = 1;
      if (!data.children) {
        this.wenjian = data.label;
        // this.getRadarDataByType(this.radio_radar_type, this.radio_radar_level, this.cur_leida);
      }
      this.getleidaFiles(this.cur_leida.evid);
      this.getRadarDataByType(this.radio_radar_type, this.radio_radar_level, this.cur_leida);
    },
    shujv(index, row) {
      this.activeName = row;
      this.wenjianming = row.evfilename;
      this.time0 = row.time;
      //  console.log(this.wenjianming,this.time0,"indexindexindex")
      // this.getyf();
    },
    radar_type(index) {      
      this.getRadarDataByType(this.radio_radar_type, this.radio_radar_level, this.cur_leida);

      // // console.log(index,"indexindexindex")
      this.ldlb = index;
      // this.getyf();
    },
    radar_level(index) {
      this.getRadarDataByType(this.radio_radar_type, this.radio_radar_level, this.cur_leida);
      this.ldcs = index;
      // this.getyf();
    },
    
    getRadarDataByType:_.debounce(function(type, level, leida){      
      // bus.$emit("showLoadingRadar");
      console.log(leida.evid + ":" + type + ":" + level);
      this.$http({
        url: this.$http.adornUrl("generator/ReadFile/getRadarDataByType?evid=" + leida.evid + "&type=" + type + "&level=" + level),
        method: "get",
        params: this.$http.adornParams()
      }).then(res => {
        console.log("radarDatabyType", res);
        if(res.data.code == 0){
          console.log(res.data, "from json api");
          this.radar_detail_info = res.data.result.data;
          let angle = res.data.result.angle;
          let step = res.data.result.step;
          bus.$emit("showRadarByType", this.radar_detail_info, angle, step, type, leida);
        }     
        else{
          alert("未找到雷达数据");
          bus.$emit("hideloadingData");
        }   
      });
    }, 500),
    getleidaFiles(evid){
      let _this = this;
      this.$http({
        url: this.$http.adornUrl("fcjc/evmonitorthundersite/getThunderFilelist?evid=" + evid),
        method: "get",
        params: this.$http.adornParams()
      }).then(res => {
        console.log("getRadar file list", res);
        if(res.data.code == 0){
          _this.shujvliebiao = [];
          _this.wenjiancanshu = [];
          for (let i = 0; i < res.data.files.length; i++) {
            _this.shujvliebiao.push(res.data.files[i].evfilename);
            _this.wenjiancanshu.push({
              evid: res.data.files[i].evid,
              evfilename: res.data.files[i].evfilename,
              time: res.data.files[i].evmonitortime
            });
          }
          this.total = this.wenjiancanshu.length;
          this.arr = this.wenjiancanshu.slice(this.startnum - 1, this.endnum);
          _this.wenjianming = _this.shujvliebiao[0];
          _this.time0 = _this.wenjiancanshu[0].time;        
        }
      });
    },
    
    // getleida() {
    //   let ttime = this.value5;
    //   if (!this.value5) {
    //     ttime = ["", ""];
    //   }

    //   let _this = this;
    //   let statime = ttime[0];
    //   let endtime = ttime[1];
    //   //       console.log(statime,endtime,"endtime")
    //   Element.getleida(this.wenjian, statime, endtime).then(res => {
    //     //
    //     _this.shujvliebiao = [];
    //     _this.wenjiancanshu = [];
    //     for (let i = 0; i < res.length; i++) {
    //       _this.shujvliebiao.push(res[i].evfilename);
    //       _this.wenjiancanshu.push({
    //         evid: res[i].evid,
    //         evfilename: res[i].evfilename,
    //         time: res[i].evmonitortime
    //       });
    //     }
    //     this.total = this.wenjiancanshu.length;
    //     this.arr = this.wenjiancanshu.slice(this.startnum - 1, this.endnum);
    //     _this.wenjianming = _this.shujvliebiao[0];
    //     _this.time0 = _this.wenjiancanshu[0].time;

    //     _this.getyf();
    //   });
    // }
  }
};
</script>
 <style>
.active {
  background-color: #b4d8f3;
  color: #000;
}
.leidalb {
  width: 40%;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  color: #b4d8f3;
}
.leidacs {
  width: 20%;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  color: #b4d8f3;
}
.leidawaikaung {
  border: 1px solid #b4d8f3;
}
.is-current > div:first-child {
  background-color: #f5f7fa;
}

.el-tree-node__content .el-tree-node__label {
  background: url("~@/assets/img/icon_radar.png") no-repeat;
  padding-left: 20px;
  background-size: 16px;
}
.el-tree-node__children .el-tree-node__label {
  background-image: url("~@/assets/img/rhombus.png");
}
.highlight tr:hover {
  background-color: #b4d8f3;
  color: black;
}
</style>
