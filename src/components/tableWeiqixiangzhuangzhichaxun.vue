<template>
  <div class="ta1" style="color: #b4d8f3;margin-bottom:15px;padding-top:10px">
    <div style="line-height:34px;font-size: 16px;margin-left:130px;">微气象装置查询</div>
    <font style="float:left;position:relative;margin-top: 5px">电压等级：</font>
    <el-select
      size="mini"
      v-model="value"
      placeholder="请选择"
      style="float:left;position:relative;width:90px ;z-index:11;margin-bottom: 3px;"
      @change="shurua"
    >
      <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <font style="float:left;position:relative;margin-top: 5px;margin-left: 5px">杆塔号：</font>
    <el-col :span="12" style="width: 100px;float: left;position:relative;margin-bottom: 3px;">
      <div class="sub-title"></div>
      <el-autocomplete
        size="mini"
        class="inline-input"
        v-model="shuru"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </el-col>
    <!--<el-button size="mini"style="color: #000000;margin-left: 5px"@click="chaxun1">查询</el-button>-->
    <div id="tablesb1" style="color: #b4d8f3;margin-top: 6px">
      <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
        <table id="yuyu" width="100%">
          <thead style=" text-align:center;">
            <tr>
              <td
                style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >电压等级</td>
              <td
                style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >线路名称</td>
              <td
                style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >杆塔号</td>
              <td
                style="width:25%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >安装日期</td>
              <td
                style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >所在地</td>
              <!--<td  style="width:20%;">日期</td>
              <td  style="width:25%;">播放控制</td>-->
            </tr>
          </thead>
          <tbody class="highlight" style="color: #b4d8f3">
            <tr
              id="oddNum"
              v-for="(xianluitem,index) in list"
              :key="index"
              @click="dianji(index,xianluitem)"
              :class="{active: activeName == xianluitem}"
            >
              <td
                style="width:17%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[9]}}</td>
              <td
                style="width:17%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[0]}}</td>
              <td
                style="width:17%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[6]}}</td>
              <td
                style="width:25%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[8]}}</td>
              <td
                style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >{{xianluitem[10]}}</td>
              <!-- <td>
             <button @click="bofang">播放</button>
              </td>-->
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
    />
    <!--分页-->
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import bus from "../assent/eventBus";
import Element from "../api/element";
import Paging from "@/components/Paging"; // 分页
import $ from "jquery";
export default {
  components: { Paging },
  data() {
    return {
      activeName: "",
      restaurants1: [],
      restaurants2: [],
      restaurants3: [],
      restaurants4: [],
      restaurants5: [],
      restaurants6: [],
      restaurants7: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      options1: [
        "请选择",
        "35kV",
        "110kV",
        "220kV",
        "500kV",
        "±500kV",
        "±800kV",
        "1000kV"
      ],
      value: "",
      arrGoods: [],
      original: true,
      letter: 5,
      tableshow: "",
      restaurants: [],
      size: 5, // 分页
      total: 5, // 分页
      curPage: 1, // 分页
      startnum: 1, // 分页
      endnum: 5, // 分页
      shuru: "",
      shuru1: "",
      tableData: [],
      fire: [],
      jingdu: null,
      weidu: null,
      arr: []
    };
  },
  created() {
    //this.getFire();
  },
  mounted() {
    this.getyf();
  },
  computed: {
    list: function() {
      let _this = this;
      this.arr = [];
      //
      _this.fire = [];

      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i][6].indexOf(this.shuru) !== -1) {
          this.arr.push(this.tableData[i]);
          this.fire.push({
            lon: this.tableData[i][3],
            lat: this.tableData[i][4]
          });
        }
      }
      this.total = this.arr.length;
      this.arr = this.arr.slice(this.startnum - 1, this.endnum);
      // bus.$emit('increment1',_this.fire)
      return this.arr;
    }
  },
  watch: {
    shuru: {
      handler(c, oldValue) {
        this.startnum = 1;
        this.endnum = 5;
        this.curPage = 1;
        console.log(this.curPage, "this.curPagethis.curPagethis.curPage");
      },
      deep: true
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        );
      };
    },
    handleSelect(item) {
      this.shuru = item.value.split("-")[1];
    },
    onPageChange: function(page) {
      // 分页
      // console.log(page)
      //  console.log(document.getElementsByClassName("backcolor")," document.getElementsByClassName")
      // test.className = 'skin2';

      //     document.getElementsByClassName("backcolor").style.cssText = "color:#69A8E2";
      this.curPage = page.curPage;
      this.arr = [];
      this.startnum = (this.curPage - 1) * 5 + 1;
      this.endnum = this.curPage * 5;
      if (this.endnum > this.total) {
        this.endnum = this.total;
      }
      this.arr = this.tableData.slice(this.startnum - 1, this.endnum);
      console.log(this.arr);
    },
    quanbu() {
      this.shuru = "";

      bus.$emit("aaaa", "");
    },
    chaxun1() {
      //bus.$emit('chaxun',_this.jingdu,_this.weidu)

      this.shuru = this.shuru1;      
      this.shuru1 = "";
    },
    chaxun() {
      let _this = this;
      _this.shuru = "jashdjksahdsahkjdsak";
      bus.$emit("chaxun", _this.jingdu, _this.weidu);
    },
    dianji(index, xianluitem) {
      this.activeName = xianluitem;
      bus.$emit("tableWeiqixiangzhuangzhichaxun_draw_micro_tower_info", xianluitem);
      // this.$http({
      //   url: this.$http.adornUrl(
      //     "/fcjc/evdatamicroclimatesite/getLastMonitorData?evid=" + xianluitem[7]
      //   ),
      //   method: "get",
      //   params: this.$http.adornParams()
      // }).then(res => {
      //   // console.log("lijljoljjl", res.data.evdataMicroclimatesite, a, true);
      //   bus.$emit("table2_draw_micro_tower_info", xianluitem, res.data.evdataMicroclimatesite, true);
      // });
    },
    shurua(index) {
      if (index === "35kV") {
        this.tableData = this.tableData1;
        this.restaurants = this.restaurants1;
        
      } else if (index === "110kV") {
        this.tableData = this.tableData2;
        this.restaurants = this.restaurants2;
      } else if (index === "220kV") {
        this.tableData = this.tableData3;
        this.restaurants = this.restaurants3;
      } else if (index === "500kV") {
        this.tableData = this.tableData4;
        this.restaurants = this.restaurants4;
      }else if (index === "±500kV") {
        this.tableData = this.tableData5;
        this.restaurants = this.restaurants5;
      } else if (index === "±800kV") {
        this.tableData = this.tableData6;
        this.restaurants = this.restaurants6;
      } else if (index === "1000kV") {
        this.tableData = this.tableData7;
        this.restaurants = this.restaurants7;
      } else {
        this.tableData = this.tableData8;
        this.restaurants = this.restaurants8;
      }
    },
    getyf() {
      let _this = this;
      this.tableData = [];
      Element.getFire().then(res => {
        this.fire = [];
        for (var i = 0; i < res.length; i++) {
          this.restaurants7.push({
            value: res[i].evpowerlinename + "-" + res[i].evtowernumber
          });
          this.tableData7.push({
            [0]: res[i].evpowerlinename,
            [1]: res[i].evsiteid,
            [3]: res[i].lng,
            [4]: res[i].lat,
            [5]: Number(res[i].evspeed),
            [6]: res[i].evtowernumber,
            [7]: res[i].evid,
            [8]: res[i].evstarttime.split(" ")[0],
            [9]: res[i].evvoltagelevel,
            [10]: res[i].xzq
          });
          if (res[i].evvoltagelevel === "35kV") {
            this.restaurants1.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData1.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "100kV") {
            this.restaurants2.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData2.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "220kV") {
            this.restaurants3.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData3.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "500kV") {
            this.restaurants4.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData4.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "±500kV") {
            this.restaurants5.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData5.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "±800kV") {
            this.restaurants6.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData6.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
          if (res[i].evvoltagelevel === "1000kV") {
            this.restaurants7.push({
              value: res[i].evpowerlinename + "-" + res[i].evtowernumber
            });
            this.tableData7.push({
              [0]: res[i].evpowerlinename,
              [1]: res[i].evsiteid,
              [3]: res[i].lng,
              [4]: res[i].lat,
              [5]: Number(res[i].evspeed),
              [6]: res[i].evtowernumber,
              [7]: res[i].evid,
              [8]: res[i].evstarttime.split(" ")[0],
              [9]: res[i].evvoltagelevel,
              [10]: res[i].xzq
            });
          }
        }
        this.tableData8 = [];
        this.tableData8 = this.tableData8.concat(this.tableData7);
        this.tableData8 = this.tableData8.concat(this.tableData6);
        this.tableData8 = this.tableData8.concat(this.tableData5);
        this.tableData8 = this.tableData8.concat(this.tableData4);
        this.tableData8 = this.tableData8.concat(this.tableData3);
        this.tableData8 = this.tableData8.concat(this.tableData2);
        this.tableData8 = this.tableData8.concat(this.tableData1);
        let _this = this;
        this.tableData = this.tableData8;
        // this.restaurants = this.loadAll();
        this.restaurants = this.restaurants8;        
      });
    }
  }
};
</script>
 <style>
.active {
  background-color: #b4d8f3;
  color: #000;
}
#tablesb1 {
  width: 100%;
  right: 0px;
  bottom: 170px;
  z-index: 10;
  overflow: auto;
}
#table5 {
  width: 100%;
  height: 50px;
  right: 0px;
  bottom: 0px;
  z-index: 10;

  max-width: 400px;
}
#table6 {
  width: 100%;
  height: 20px;
  right: 0px;
  bottom: 0px;
  z-index: 11;

  max-width: 400px;
}
.backcolor {
  color: #3b4249;
  background-color: #ffffff;
}
.backcolor_font {
}
.highlight tr:hover {
  background-color: #b4d8f3;
  color: black !important;
}
</style>
