<template>
  <div class="ta1" style="color: #b4d8f3">
    <div style="margin-bottom: 5px;font-size: 16px;margin-left: 150px;line-height:30px ">线路查询</div>
    <font style=" float:left;position:relative;margin-top: 5px;margin-bottom: 5px;">电压等级：</font>
    <el-select
      size="mini"
      v-model="value"
      placeholder="请选择"
      style="float:left;position:relative;width:90px ;z-index:11;margin-bottom:5px;"
      @change="shurua"
    >
      <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <font style="float:left;position:relative;margin-top: 5px;margin-left: 5px">线路名称：</font>
    <el-col :span="12" style="width: 100px;float: left;position:relative;margin-bottom:5px;">
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
    <!--<el-button size="mini" style="color: #000000;margin-left: 5px" @click="chaxun1">查询</el-button>-->
    <div id="tablesb2" style="color: #b4d8f3;margin-top: 6px">
      <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
        <table width="100%" cellspacing="0" class="out_tabel">
          <thead style=" text-align:center;">
            <tr>
              <td
                style="width:5%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              ></td>
              <td
                style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >线路名称</td>
              <td
                style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >电压等级</td>
              <td
                style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >杆塔数量</td>
              <!--<td  style="width:20%;">日期</td>
              <td  style="width:25%;">播放控制</td>-->
            </tr>
          </thead>
          <tbody
            id="oddNum1"
            style="color: #b4d8f3"
            v-for="(xianluitem,index) in list"
            :key="index"
          >
            <tr
              class="aaa"
              @click="el_tower_on_line_selected(index,xianluitem)"
              :class="{active: activeName == xianluitem}"
            >
              <td style="width:5%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2">
                <el-button
                  class="child"
                  v-if="!xianluitem[3]"
                  icon="el-icon-arrow-down"
                  style="background-color: inherit;border:0px;color:#69ABE2;padding: 0px;width:100%"
                  size="mini"
                  
                ></el-button>
                <el-button
                  class="child"
                  v-if="xianluitem[3]"
                  icon="el-icon-arrow-up"
                  style="background-color: inherit;border:0px;color:#69ABE2 ;padding: 0px;width:100%"
                  size="mini"
                  
                ></el-button>
              </td>
              <td
                style="width:17%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[0]}}</td>
              <td
                style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{xianluitem[1]}}</td>
              <td
                style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >{{xianluitem[4]}}</td>
            </tr>
            <tr v-if="xianluitem[3]" style="background-color: #042134;">
              <td colspan="4" class="inner_tabel">
                <table width="100%" cellspacing="0">
                  <thead style=" text-align:center;">
                    <tr>
                      <td style="width:23.8%;height:30px;">塔杆号</td>
                      <td style="width:22%;">塔型</td>
                      <td style="width:16%;">档距</td>                     
                    </tr>
                  </thead>
                  <tbody id="oddNum2" class="highlight">
                    <tr
                      v-for="(xianluitem,index) in towers1"
                      :key="index"
                      @click="tower_selected(xianluitem,index)"
                      :class="{active: activeName1 == xianluitem}"
                    >
                      <td>{{xianluitem[3]}}</td>
                      <td>{{xianluitem[7]}}</td>
                      <td></td>                     
                    </tr>
                  </tbody>
                </table>
                <Paging
                  @change="onPageChange1"
                  :page-size="size1"
                  :total="total1"
                  layout="jumper,total"
                  :current-page="curPage1"
                  :startnum="startnum1"
                  :endnum="endnum1"
                />
                <!--分页-->
              </td>
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
  props:{
      clickable: Boolean,      
  },
  components: { Paging },
  data() {
    return {
      activeName: "",
      isOpenedItem: false,
      activeName1: "",
      tg7: [],
      shuru3: "",
      panduan: true,
      towers1: [],
      towers: [],
      xianlu: "",
      zhankai: false,
      tg1: [],
      tg2: [],
      tg3: [],
      tg4: [],
      tg5: [],
      tg6: [],
      tg7: [],
      tg8: [],
      jianyi1: [],
      jianyi2: [],
      jianyi3: [],
      jianyi4: [],
      jianyi5: [],
      jianyi6: [],
      jianyi7: [],
      jianyi8: [],
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
      size1: 6, // 分页
      total1: 6, // 分页
      curPage1: 1, // 分页
      startnum1: 1, // 分页
      endnum1: 6, // 分页
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
      arr: [],
      qiehuan: false,
      apiData:{}
    };
  },
  created() {
    //this.getFire();
  },
  mounted() {
    this.getyf();
    let _this = this;
    bus.$on("selectItemOftableXianluchaxun", function(tower_evid) {      
      let index = -1;
      for (let i = 0; i < _this.towers.length; i++) {
        let row = _this.towers[i];
        if (row[1] == tower_evid) {
          index = i;
          break;
        }
      }
      if (index >= 0) { 
        _this.selectItem(index);
      }
    });
  },
  computed: {
    list: function() {
      let _this = this;
      this.arr = [];
      if (this.shuru === "") {
        this.arr = this.tableData;
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i][0].indexOf(this.shuru) !== -1) {
            this.arr.push(this.tableData[i]);
          }
        }
      }

      this.total = this.arr.length;
      this.arr = this.arr.slice(this.startnum - 1, this.endnum);
      if (this.qiehuan === true) {
        let page = { curPage: 1 };
        _this.onPageChange2(page);
        _this.qiehuan = false;
      }
      // console.log(this.arr,"this.arr")
      return this.arr;
    }
  },
  watch: {
    shuru: {
      handler(c, oldValue) {
        this.startnum = 1;
        this.endnum = 5;
        this.curPage = 1;
      },
      deep: true
    }
  },
  methods: {
    tower_selected(xianluitem, index) {
      // if (this.clickable == false) {
      //   return;
      // }
      console.log('pressed el tower@!!', xianluitem)
      this.activeName1 = xianluitem;
      bus.$emit("tableXianluchaxun_show_el_tower_info", xianluitem, (this.curPage1 - 1) * 6 + index);
    },
    shurua(index) {
      this.shuru = "";
      this.shuru1 = "";
      this.qiehuan = true;
      this.shuru1 = "";
      //  console.log(index,"rowrow")
      if (index === "35kV") {
        this.tableData = [];
        this.tableData = this.tg1;
        this.restaurants = this.jianyi1;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      } else if (index === "110kV") {
        this.tableData = this.tg2;
        this.restaurants = this.jianyi2;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      } else if (index === "220kV") {
        this.tableData = this.tg3;
        this.restaurants = this.jianyi3;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      } else if (index === "500kV") {
        this.tableData = this.tg4;
        this.restaurants = this.jianyi4;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      } else if (index === "±500kV") {
        this.tableData = this.tg5;
        this.restaurants = this.jianyi5;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      } else if (index === "±800kV") {
        this.tableData = [];
        this.tableData = this.tg6;
        this.restaurants = this.jianyi6;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;          
        }
      } else if (index === "1000kV") {
        this.tableData = [];
        this.tableData = this.tg7;
        this.restaurants = this.jianyi7;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;          
        }
      } else {
        this.tableData = [];
        this.tableData = this.tg8;
        this.restaurants = this.jianyi8;
        for (let i = 0; i < this.arr.length; i++) {
          this.arr[i][3] = false;
        }
      }

    },
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
      console.log(item);
    },
    selectItem: function(index) {
      let page = Math.floor(index / 6) + 1;
      let tr_index = index % 6;
      this.onPageChange1({curPage: page});
      this.activeName1 = this.towers1[tr_index];
    },
    onPageChange2: function(page) {
      // 分页

      this.curPage = page.curPage;
      this.arr = [];
      this.startnum = (this.curPage - 1) * 5 + 1;
      this.endnum = this.curPage * 5;
      if (this.endnum > this.total) {
        this.endnum = this.total;
      }
      this.arr = this.tableData.slice(this.startnum - 1, this.endnum);
      console.log(
        page,
        this.startnum,
        this.endnum,
        this.arr,
        this.curPage,
        this.total
      );
    },
    onPageChange: function(page) {
      // 分页      
      this.curPage = page.curPage;
      this.arr = [];
      this.startnum = (this.curPage - 1) * 5 + 1;
      this.endnum = this.curPage * 5;
      if (this.endnum > this.total) {
        this.endnum = this.total;
      }
      this.arr = this.tableData.slice(this.startnum - 1, this.endnum);
    },
    onPageChange1: function(page) {
      // 分页
      // console.log(page)

      this.curPage1 = page.curPage;
      this.towers1 = [];
      this.startnum1 = (this.curPage1 - 1) * 6 + 1;
      this.endnum1 = this.curPage1 * 6;
      if (this.endnum1 > this.total1) {
        this.endnum1 = this.total1;
      }
      this.towers1 = this.towers.slice(
        this.startnum1 - 1,
        this.endnum1
      );
      // console.log(this.curPage1, "  this.total1   this.total1 ");
    },
    quanbu() {
      this.shuru = "";

      bus.$emit("aaaa", "");
    },
    chaxun1() {
      //bus.$emit('chaxun',_this.jingdu,_this.weidu)

      this.shuru = this.shuru1;
      this.shuru3 = "1";
      this.shuru1 = "";
    },
    chaxun() {
      let _this = this;
      _this.shuru = "jashdjksahdsahkjdsak";
      //   bus.$emit('chaxun',_this.jingdu,_this.weidu)
    },    
    el_tower_on_line_selected(index, item) {
      
      if(this.activeName == item){
        item[3] = !item[3];
        return;
      }

      bus.$emit("start_draw_all_el_towers");

      this.activeName = item;
      //load subitems data      
      this.panduan = !this.panduan;
      this.startnum1 = 1;
      this.endnum1 = 6;
      this.curPage1 = 1;
      let _this = this;
      
      _this.arr = _this.tableData.slice(_this.startnum - 1, _this.endnum);
      // console.log(a)
      if (_this.apiData[item[2]]){
        _this.drawTowers(_this.apiData[item[2]], index);
      }else{
        this.$http({
          url: this.$http.adornUrl(
            "/zhyj/eveenginetowerinfo/getAllTowerByLoop?lineid=" + item[2]
          ),
          method: "get",
          params: this.$http.adornParams()
        }).then(res => {
          console.log('res from getAllTowerByLoop', res);
          _this.apiData[item[2]] = res.data.towerList;
          _this.drawTowers(_this.apiData[item[2]], index);
        });
      }
    },
    drawTowers(towerList, index){
      this.towers = [];
      for (var i = 0; i < towerList.length; i++) {
        this.towers.push({
          [0]: towerList[i].xzq,
          [1]: towerList[i].evid,
          [2]: towerList[i].evloopname,
          [3]: towerList[i].towernumber,
          [4]: towerList[i].evvoltage,
          [5]: towerList[i].lat,
          [6]: towerList[i].lng,
          [7]: towerList[i].simpletype,
          [8]: towerList[i].typename
        });
      }
      this.total1 = this.towers.length;
      this.towers1 = this.towers.slice(0, 6);
      // 
    
      for (let i = 0; i < this.arr.length; i++) {
        if (i === index) {
          this.arr[i][3] = !this.arr[i][3];
        } else {
          this.arr[i][3] = false;
        }
      }
      
      bus.$emit("tableXianluchaxun_draw_all_el_towers", towerList);
    },
    getyf() {
      let _this = this;
      if(this.tableData.length > 0) return;
      this.$http({
        url: this.$http.adornUrl("/zhyj/eveenginetowerinfo/getAllLineList"),
        method: "get",
        params: this.$http.adornParams()
      }).then(res => {
        for (var i = 0; i < res.data.lineList.length; i++) {
          if (res.data.lineList[i].evvoltage === "35kV") {
            this.jianyi1.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg1.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "100kV") {
            this.jianyi2.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg2.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "220kV") {
            this.jianyi3.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg3.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "500kV") {
            this.jianyi4.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg4.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "±500kV") {
            this.jianyi5.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg5.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "±800kV") {
            this.jianyi6.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg6.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (res.data.lineList[i].evvoltage === "1000kV") {
            this.jianyi7.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg7.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }
          if (
            res.data.lineList[i].evvoltage === "±800kV" ||
            res.data.lineList[i].evvoltage === "1000kV"
          ) {
            this.jianyi8.push({
              value: res.data.lineList[i].evloopname
            });
            this.tg8.push({
              [0]: res.data.lineList[i].evloopname,
              [1]: res.data.lineList[i].evvoltage,
              [2]: res.data.lineList[i].evid,
              [3]: false,
              [4]: res.data.lineList[i].towerCount
              //            [4]: res.lineList[i].lat,
              //            [5]: Number(res.lineList[i].evspeed),
              //            [6]: res.lineList[i].evtowernumber,
              //            [7]:res.lineList[i].evid,
            });
          }

          let _this = this;
          this.tableData = this.tg8;
          this.restaurants = this.jianyi8;
        }

        //console.log(_this.arr)
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
#tablesb2 {
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
.aaa:hover {
  background-color: #b4d8f3;
  color: black;
}
.out_tabel {
  line-height: 23px;
}
.inner_tabel {
  padding-bottom: 10px;
  border: 1px dotted #69abe2;
  border-top: initial;
}
.inner_tabel .paging {
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
}
.inner_tabel .page-list {
  float: right;
}
.inner_tabel table td {
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  line-height: 23px;
}
.bgRed {
  background-color: #b4d8f3;
  color: black;
}
.backcolor1 {
  color: #3b4249;
  background-color: #ffffff;
}
.backcolor_font1 {
}
.backcolor2 {
  color: #000000;
  background-color: #000000;
}
.backcolor_font2 {
}
</style>

