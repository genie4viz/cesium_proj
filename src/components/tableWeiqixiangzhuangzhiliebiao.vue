<template>
  <div class="ta1" style="color: #b4d8f3">
    <div id="tablew" style="color: #b4d8f3">
      <div class="tyhoon-list-wrap" style="color: black; text-align:center;">
        <table width="100%">
          <thead style=" text-align:center;">
            <tr>
              <td
                style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >线路名称</td>
              <td
                style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
              >塔杆号</td>
              <td
                style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >风速</td>
              <!--<td  style="width:20%;">日期</td>
              <td  style="width:25%;">播放控制</td>-->
            </tr>
          </thead>
          <tbody class="highlight" style="color: #b4d8f3">
            <tr
              v-for="(tower_item,index) in list"
              :key="index"
              @click="dianji(index,tower_item)"
              :class="{active: activeName == tower_item}"
            >
              <td
                style="width:17%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{tower_item[0]}}</td>
              <td
                style="width:20%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2"
              >{{tower_item[6]}}</td>
              <td
                style="width:15%;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
              >{{tower_item[5]}}</td>
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
export default {
  props: ["tableshow"],
  components: { Paging },
  data() {
    return {
      activeName: "",
      arrGoods: [],
      original: true,
      letter: 5,
      // tableshow: "",
      size: 5, // 分页
      total: 5, // 分页
      curPage: 1, // 分页
      startnum: 1, // 分页
      endnum: 5, // 分页
      shuru: "",
      shuru1: "",
      tableData: [],
      micro_towers: [],
      jingdu: null,
      weidu: null,
      arr: []
    };
  },
  mounted() {
    this.getyf();
    let _this = this;
    bus.$on("selectItemOftableWeiqixiangzhuangzhiliebiao", function(selected_mtower) {
      let index = -1;
      for (let i = 0; i < _this.arrGoods.length; i++) {
        let row = _this.arrGoods[i];
        if (
          row[7] == selected_mtower.evid &&
          row[0] == selected_mtower.evpowerlinename &&
          row[6] == selected_mtower.evtowernumber
        ) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        _this.selectItem(index);
      }
    });
  },

  watch: {
    tableshow: {
      handler(c) {//2-1 relationship
        if (c === true) {
          bus.$emit("tableWeiqixiangzhuangzhiliebiao_nanjing_micro_tower", this.micro_towers);
        }
      },
      deep: true
    }
  },
  computed: {
    list: function() {
      var _this = this;
      // 筛选
      this.arrGoods = [];
      for (var i = 0; i < this.tableData.length; i++) {
        // 如果匹配成功, 向空数组添加数据
        _this.arrGoods.push(this.tableData[i]);
      }

      // 升序降序排列
      // false:升序  true:降序
      if (this.letter != "") {
        _this.arrGoods.sort(function(a, b) {          
          if (_this.original) {
            return b[_this.letter] - a[_this.letter];
          } else {
            return a[_this.letter] - b[_this.letter];
          }
        });
      }
      this.total = this.arrGoods.length;
      this.arr = this.arrGoods.slice(this.startnum - 1, this.endnum);
      return _this.arr;
    }
  },
  methods: {
    
    dianji(index, a) {
      this.activeName = a;      
      this.$http({
        url: this.$http.adornUrl(
          "/fcjc/evdatamicroclimatesite/getLastMonitorData?evid=" + a[7]
        ),
        method: "get",
        params: this.$http.adornParams()
      }).then(res => {
        bus.$emit("tableWeiqixiangzhuangzhiliebiao_draw_micro_tower_info", a, res.data.evdataMicroclimatesite);
      });
    },
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
      this.arr = this.arrGoods.slice(this.startnum - 1, this.endnum);      
    },
    selectItem: function(index) {
      let page = Math.floor(index / 5) + 1;
      let tr_index = index % 5;
      this.onPageChange({curPage: page});
      this.activeName = this.arr[tr_index];
    },
    getyf() {
      let _this = this;
      _this.tableData = [];
      Element.getFire().then(res => {
        // console.log(res,"from element.js ");
        _this.micro_towers = [];
        for (var i = 0; i < res.length; i++) {
          _this.tableData.push({
            [0]: res[i].evpowerlinename,
            [1]: res[i].evsiteid,
            [3]: res[i].lng,
            [4]: res[i].lat,
            [5]: Number(res[i].evspeed),
            [6]: res[i].evtowernumber,
            [7]: res[i].evid
          });
          _this.micro_towers.push({
            lon: res[i].lng,
            lat: res[i].lat,
            text: res[i].evtowernumber,
            evpowerlinename: res[i].evpowerlinename,
            evsiteid: res[i].evsiteid,
            evid: res[i].evid,
            evtowernumber: res[i].evtowernumber        
          });
        }
      });
    }
  }
};
</script>
 <style scoped>
.active {
  background-color: #b4d8f3;
  color: #000;
}
#tablew {
  width: 100%;
  right: 0px;
  bottom: 170px;
  z-index: 10;
  /*max-width: 400px;*/
}
.paging {
  margin-top: 20px;
}

.highlight tr:hover {
  background-color: #b4d8f3;
  color: black;
}
</style>
