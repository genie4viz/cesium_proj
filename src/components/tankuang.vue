<template>
  <div v-if="zytd" class="ta1" style="color: #b4d8f3;text-align:left;font-size:10px;" id="onee">
    <img src="static/images/xxx.png" class="delete" @click="nowww">
    <div
      style="background-color:rgb(48,102,186);color:#FFFFFF;height: 20px;vertical-align:middle;padding-top:4px;padding-left:4px; "
    >杆塔属性</div>

    <div
      id="table123"
      style="color: #000000;overflow-y: auto;height: 430px;float: left;width: 100%;border:blue 0px solid;"
    >
      <div>
        <div style="color: #000000;background-color:green;border:blue 0px solid;">
          <table
            style=" text-align:center;background-color:white;"
            height="400px"
            width="100%"
            @mouseover="MouseOver()"
            @mouseout="MouseOut()"
          >
            <thead>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray;font-weight:bold;font-size:12px;"
                >属性</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray;font-weight:bold;font-size:12px;"
                >值</td>
              </tr>
            </thead>
            <tbody style=" text-align:center;">
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >属性</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{ccc}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >属性</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >值2</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >属性</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >值3</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >所在线路</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{canshu != null ? canshu.evloopname:''}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >塔号</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{canshu != null ? canshu.towernumber:''}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >投运日期</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >2014年7月</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >设计风速</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{canshu != null ? canshu.gtfs:''}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >杆塔型号</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >ZC27102-48</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >电压等级名称</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{canshu != null ? canshu.evvoltage:''}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >塔号</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >#3114</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >所属区域</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >{{canshu != null ? canshu.xzq:''}}</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >杆塔经度</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >118.464381</td>
              </tr>
              <tr>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >杆塔纬度</td>
                <td
                  style="width: 50%;border-bottom: 1px solid slategray;border-left:1px solid slategray"
                >27.457834</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import bus from "../assent/eventBus";
import Element from "../api/element";
import $ from "jquery";
export default {
  data() {
    return {
      canshu: null,
      zytd: true,
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      ccc: ""
    };
  },
  mounted() {
    let _this = this;
    bus.$on("get_el_tower_info", function(tower_evid, show, c) {
      //a:flag, c: 111?      
      _this
        .$http({
          url: this.$http.adornUrl(
            "/zhyj/eveenginetowerinfo/getTowerDetail?evid=" + tower_evid + ""
          ),
          method: "get",
          params: this.$http.adornParams()
        })
        .then(res => {
          // console.log(res, "from tankuang")
          _this.canshu = res.data.detail;
          _this.ccc = c;
          _this.zytd = tower_evid;
        });      
    });
  },
  methods: {
    MouseOver() {
      var highlightcolor = "rgb(1,127,0)";
      var clickcolor = "#ffedd2";

      var source = event.srcElement;
      if (source.tagName == "TD") {
        source = source.parentElement;
        var cells = source.children;
        if (
          cells[0].style.backgroundColor != highlightcolor &&
          cells[0].style.backgroundColor != clickcolor
        )
          for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = highlightcolor;
            cells[i].style.color = "#000000";
          }
      }
    },
    MouseOut() {
      var highlightcolor = "#E0F2FE";
      var clickcolor = "#ffedd2";

      var source = event.srcElement;
      if (source.tagName == "TD") {
        source = source.parentElement;
        var cells = source.children;
        if (cells[0].style.backgroundColor != clickcolor)
          for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "";
            cells[i].style.color = "";
          }
      }
    },
    getxinxi() {},
    nowww() {
      this.zytd = false;
    }
  }
};
</script>
<style scoped>
table,
table tr th,
table tr td {
  border: 1px solid slategray;
}
table {
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}

#table123 {
}
.delete {
  width: 12px;
  height: 12px;
  border-radius: 60%;
  position: absolute;
  top: 3px;
  right: 2px;
}
</style>

