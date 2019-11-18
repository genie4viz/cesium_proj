<template>
  <div id="base-frame" class="base_frame">
    <div id="map_frame" v-show="map_frame">
      <!---------------------------------------------------------------Start Main Menu and Sub Menu Building---------------------------------------------------------------------->
      <div id="map_main">
        <div id="xinxizonglan" class="button_div" v-show="xinxizonglan">
          <img
            :src="taifengzonglan_imgurl"
            class="sub_image_button"
            style="width:90px;"
            @click="submenu_click('taifengzonglan')"
          >
          <img
            :src="shebeiguanli_imgurl"
            class="sub_image_button"
            style="width:90px;"
            @click="submenu_click('shebeiguanli')"
          >
        </div>
        <div id="fengchangjiance" class="button_div" v-show="fengchangjiance">
          <img
            :src="weiqixiangzaixianjiance_imgurl"
            style="width:105px;"
            class="sub_image_button_long"
            @click="submenu_click('weiqixiangzaixianjiance')"
          >
          <img
            :src="leidajiance_imgurl"
            style="width:90px;"
            class="sub_image_button"
            @click="submenu_click('leidajiance')"
          >
        </div>
        <div id="zaihaiyujing" class="button_div" v-show="zaihaiyujing">
          <img
            :src="fengchangyubao_imgurl"
            style="width:90px;"
            class="sub_image_button"
            @click="submenu_click('fengchangyubao')"
            v-show="true"
          >
          <img
            :src="taganlixuepinggu_imgurl"
            style="width:100px;"
            class="sub_image_button_long"
            @click="submenu_click('taganlixuepinggu')"
            v-show="true"
          >
          <img
            :src="zhongyaotongdaoxianlu_imgurl"
            style="width:100px;"
            class="sub_image_button_long"
            @click="submenu_click('zhongyaotongdaoxianlu')"
            v-show="true"
          >
          <img
            :src="qitatongdaoxianlu_imgurl"
            style="width:100px;"
            class="sub_image_button_long"
            @click="submenu_click('qitatongdaoxianlu')"
            v-show="true"
          >
          <div id="thematic" v-show="fengchangyubao" style="position: absolute; top: 45px; right: 8%; z-index: 101;">
            <div
              id="fengsu_show"
              style="margin-top:-5px;border-radius:4px;width:60px;margin-left:2px;line-height:30px;text-align:center;float:right;background-color:#69A8E2;color: #b4d8f3;font-size:12px"
              @click="fengsu_show"
              v-show="true"
            >风速</div>
            <div
              id="jaingshui_show"
              style="margin-top:-5px;border-radius:4px;width:60px;margin-left:2px;line-height:30px;text-align:center;float:right;background-color:#69A8E2;color: #b4d8f3;font-size:12px"
              @click="jaingshui_show"
              v-show="true"
            >降水</div>
            <el-checkbox
              v-model="checked"
              @change="zhuantitu"
              style="color: #b4d8f3;float:right;     text-shadow: 2px 2px 12px black;"
              v-show="true"
            >专题图</el-checkbox>
            <!-- <el-checkbox
              v-model="check_wind"
              @change="fengchangliuxiantu"
              style="color: #b4d8f3;float:right;     text-shadow: 2px 2px 12px black;"
              v-show="wind_show"
            >风场流线图&nbsp;&nbsp;&nbsp;</el-checkbox> -->
          </div>
        </div>
        <div id="yunweiguanli" class="button_div" v-show="yunweiguanli">
          <img
            :src="changqiyujing_imgurl"
            style="width:90px;margin-left:3.5%;"
            class="sub_image_button"
            @click="submenu_click('changqiyujing')"
          >
          <img
            :src="yujingxinxifabu_imgurl"
            style="width:100px;height:29px;"
            class="sub_image_button_long"
            @click="submenu_click('yujingxinxifabu')"
          >
          <img
            :src="zhibangongzuojilu_imgurl"
            style="width:100px;height:29px;"
            class="sub_image_button_long"
            @click="submenu_click('zhibangongzuojilu')"
          >
          <yunweiguanliyjxxfb
            ref="yunweiguanliyjxxfb"
            id="yunweiguanliyjxxfb"
            style="z-index:10000;float:left;width:90%;height:700px;position:relative;margin-left:0%;margin-top: 5px;"
            v-show="yunweiguanliyjxxfbshow"
          ></yunweiguanliyjxxfb>
          <yunweiguanlizbjl
            ref="yunweiguanlizbjl"
            id="yunweiguanlizbjl"
            style="z-index:10000;float:left;width:97%;height:700px;position:relative;margin-left:-5%;margin-top: 20px;"
            v-show="yunweiguanlizbjlshow"
          ></yunweiguanlizbjl>
        </div>
        <div
          id="yonghuzhongxin"
          style="width:1000px;height:35px;margin:-7px;border:0;padding:0;margin-left:10.5%;margin-bottom:-0px;"
          v-show="yonghuzhongxin"
        ></div>
        <!---------------------------------------------------------------End Main Menu and Sub Menu Building---------------------------------------------------------------------->
        <!---------------------------------------------------------------Start Map Building---------------------------------------------------------------------->
        <div :style="map_main_content">
          <div class="neizhi" style="margin-top:0px;">
            <div style="border:0.5px solid #000">
              <div
                style="width: 36%;height: 20.8px;position:absolute; z-index:11;right: 1px;background-color: rgb(78,78,78);color: #FFFFFF"
                v-show="pdf"
              >
                杆塔力学评估pdf报告
                <img
                  src="static/images/xxx.png"
                  style=" width:12px;
                          height:12px;
                          border-radius:60%;
                          position:absolute;
                          top:3px;
                          right:2px;"
                  @click="delpdf"
                >
              </div>
              <iframe
                id="example1"
                src
                style="width: 36%;height: 86%;position:absolute; z-index:10;right: 1px;margin-top: 20px;border:0px solid #000"
                v-show="pdf"
              ></iframe>
            </div>
            <img
              src="static/images/jiangshuituli.jpg"
              style="width: 30%;bottom: 0%;position:absolute;  z-index:10;right:1.5px;height: 60px"
              v-show="jstbutton==true&&checked==true"
            >
            <img
              src="static/images/fengsutuli.jpg"
              style="width:30%;bottom: 0%;position:absolute;  z-index:10;right:1.5px;height: 60px"
              v-show="fstbutton==true&&checked==true"
            >
            <img
              src="static/images/sebantu.png"
              style="width: 26%;bottom: 0%;position:absolute;  z-index:10;right:1.5px"
              v-show="pdf"
            >
            <img
              src="static/images/sudu.jpg"
              style="width: 30%;bottom: 0%;position:absolute;  z-index:10;right:1.5px"
              v-show="radar_type_band==='vel'"
            >
            <img
              src="static/images/pukuan.jpg"
              style="width: 30%;bottom: 0%;position:absolute;  z-index:10;right:1.5px"
              v-show="radar_type_band==='sw'"
            >
            <img
              src="static/images/qiangdu.jpg"
              style="width: 30%;bottom:0%;position:absolute;  z-index:10;right:1.5px"
              v-show="radar_type_band==='undbz'"
            >
            <img
              src="static/images/qiangdu.jpg"
              style="width: 30%;bottom: 0%;position:absolute;  z-index:10;right:1.5px"
              v-show="radar_type_band==='dbz'"
            >
            <tankuang
              v-show="show_el_tower_detail"
              style="background-color:#FFFFFF;width:20%;height: 40%;position:fixed;     z-index:10;"
            ></tankuang>
            <!------------------------------------------------------------Start Cesium Map Building-------------------------------------------------------->
            <div
              id="cesiumContainer"
              style="position:relative;height:100%"
              ref="cesium_viewer"
              v-show="map_show"
            >
              <div id="gps_info" :style="gps_info_bar" style="padding-top:5px; color: white;"></div>              
              <center
                id="loadingData"
                style="position:absolute;left:45%;top:40%;z-index:88889;color:white; height: 60px; background-color:rgba(0,0,0,0.5);"
                v-show="loadingData"
              >
                <table height="60px" border="0">
                  <tr>
                    <td>
                      <img
                        width="28"
                        height="28"
                        id="myImage"
                        src="http://img.zcool.cn/community/0179f1574d2d656ac72525ae5f181d.gif"
                      >
                    </td>
                    <td>Loading Data...</td>
                  </tr>
                </table>
              </center>
              <cesium-viewer
                :scene3DOnly="scene3DOnly"
                :selectionIndicator="selectionIndicator"
                :infoBox="infoBox"
                @ready="readyCesium"
              ></cesium-viewer>
            </div>
            <!-----------------------------------------------------------End Cesium Map Building----------------------------------------------------->
          </div>
        </div>
        <!---------------------------------------------------------------End Map Building---------------------------------------------------------------------->
      </div>
      <!---------------------------------------------------------------End Main Menu and Sub Menu Building---------------------------------------------------------------------->
      <!---------------------------------------------------------------Start Table Building---------------------------------------------------------------------->
      <div :style="ttable" id="sidebar">
        <!-- 1-1 taifengzonglan -->
        <div v-show="taifengzonglan" style="height: 100%">
          <div style="padding-left: 10px;width: 100%;padding-top: 15px;">
            <div
              @click="dangqiantaifeng_show"
              class="taifeng_switch"
              :class="{active:dangqiantaifeng}"
            >当前台风</div>
            <div
              @click="lishitaifeng_show"
              class="taifeng_switch"
              :class="{active:lishitaifeng}"
            >历史台风</div>
          </div>
          <div style="overflow-y:auto;overflow-x:hidden; white-space:nowrap;height: 87%; width: 100%">
            <!-- 1-1-1 dangqiantaifeng -->
            <div id="tfdqlb" v-show="dangqiantaifeng">
              <div class="tyhoon-list-wrap" style="color: white">
                <div class="clearfix title" style="color: #b4d8f3;font-size:16px">当前台风记录</div>
                <table style="width:100%;">
                  <thead>
                    <tr
                      style="border-style:dashed; border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                    >
                      <td
                        style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
                      >台风编号</td>
                      <td
                        style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
                      >台风名称</td>
                      <td
                        style="width:35%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
                      >发布时间</td>
                      <!--<td style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;">播放控制</td>-->
                    </tr>
                  </thead>
                  <tbody class="highlight">
                    <div
                      v-if="typhoonPresentList.length == 0"
                      style="color: #b4d8f3;margin-top: 10%"
                    >暂无台风</div>
                    <tr
                      v-for="(typhoonitem, index) in typhoon_tableData"
                      :key="index"
                      :class="{active: activeName == typhoonitem}"
                    >
                      <td
                        style="width:17%;height:30px;text-align: center;border-bottom:1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                      >{{typhoonitem[0]}}</td>
                      <td
                        style="width:20%;height:30px;text-align: center;border-bottom:1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                      >{{typhoonitem[1]}}</td>
                      <td
                        style="width:35%;height:30px;text-align: center;border-bottom:1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
                      >{{typhoonitem[2]}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="width:100%;height:10%;">
                <Paging
                  @change="onPageChange"
                  :page-size="size"
                  :total="total"
                  layout="jumper,total"
                  :current-page="curPage"
                  :startnum="startnum"
                  :endnum="endnum"
                  style="margin-top:5%;"
                />
              </div>
              <!--分页-->
            </div>
            <!-- 1-1-2 lishitaifeng -->
            <div id="tflslb" v-show="lishitaifeng">
              <div class="tyhoon-list-wrap" style="color: white;">
                <div class="clearfix title" style="color: #b4d8f3;font-size:16px">历史台风记录</div>
                <table style="width:100%;height:30px;">
                  <thead style="height:30px;">
                    <tr
                      style="border-style:dashed; border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                    >
                      <td
                        style="width:17%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
                      >台风编号</td>
                      <td
                        style="width:20%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
                      >台风名称</td>
                      <td
                        style="width:35%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;"
                      >发布时间</td>
                      <td
                        style="width:15%;color: #b4d8f3;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-top:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
                      >播放控制</td>
                    </tr>
                  </thead>
                  <tbody class="highlight" style="color: #b4d8f3">
                    <tr
                      v-for="(typhoonitem, index) in typhoon_tableData"
                      :key="index"
                      :class="{active: activeName == typhoonitem}"
                    >
                      <div
                        v-if="typhoonHistoryList.length == 0"
                        style="color: #b4d8f3;margin-top: 10%"
                      >暂无台风</div>
                      <td
                        style="width:17%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                      >{{typhoonitem.typ_no}}</td>
                      <td
                        style="width:20%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                      >{{typhoonitem.typ_name}}</td>
                      <td
                        style="width:35%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;"
                      >{{typhoonitem.typ_publish}}</td>
                      <td
                        style="width:15%;height:30px;text-align: center;border-bottom: 1px dotted #69ABE2;border-left:1px dotted #69ABE2;border-right:1px dotted #69ABE2;"
                      >
                        <img
                          v-show="!typhoonitem.typ_playing"
                          src="static/images/bofang.png"
                          style="width: 15px;height: 15px"
                          @click="playing_pause_Typhoon(index, typhoonitem)"
                        >
                        <img
                          v-show="typhoonitem.typ_playing"
                          src="static/images/zanting.png"
                          style="width: 15px;height: 15px"
                          @click="playing_pause_Typhoon(index, typhoonitem)"
                        >
                        <img
                          src="static/images/tingzhi.png"
                          style="width: 15px;height: 15px"
                          @click="stopTyphoon(index, typhoonitem)"
                        >
                      </td>
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
                style="margin-top:5%"
              />
              <!--分页-->
            </div>
            <div class="zhuzhuangtu"
              v-if="lishitaifeng"
              style="color: #b4d8f3;text-align:center;width: 100%;">
              <div style="font-size: 18px">台风塔杆预警</div>
              <chartTaifengtaganyujing v-bind:timess="timess"></chartTaifengtaganyujing>
            </div>
            <div class="zhuzhuangtu1" v-show="dangqiantaifeng">
              <tableDangqiantaifeng></tableDangqiantaifeng>
            </div>
          </div>
        </div>
        <!-- 1-2 shebeiguanli -->
        <div class="table123"
          v-if="shebeiguanli"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <!-- 柱状图 -->
          <!-- 表格 -->
          <div style="width: 100%">
            <!-- <div style="line-height:34px;font-size: 16px;margin-left:133px;">线路图层选择</div>
            <div id="towerLine" v-show="shebeiguanli" style="float: right;width: 100%;">
              <el-checkbox
                v-model="ch1"
                @change="show_el_line_110"
                fill="red"
                text-color="red"
                style="width:10%;margin-bottom: 10px"
              >
                <div style="color: rgb(0,255,0)">110kV</div>
              </el-checkbox>
              <el-checkbox
                v-model="ch2"
                @change="show_el_line_220"
                style="width:10%;color: #b4d8f3;margin-bottom: 10px"
              >
                <div style="color: #0066FF">220kV</div>
              </el-checkbox>
              <el-checkbox
                v-model="ch3"
                @change="show_el_line_500"
                style="width:10%;color: #b4d8f3;margin-bottom: 10px"
              >
                <div style="color: rgb(255,0,0)">500kV</div>
              </el-checkbox>
              <el-checkbox
                v-model="ch4"
                @change="show_el_line_800"
                style="width:10%;color: #b4d8f3;margin-bottom: 10px"
              >
                <div style="color: #0066FF">±800kV</div>
              </el-checkbox>
              <el-checkbox
                v-model="ch5"
                @change="show_el_line_1000"
                style="width:10%;color: #b4d8f3;margin-bottom: 10px"
              >
                <div style="color:#0066FF">1000kV</div>
              </el-checkbox>
            </div> -->
            <tableXianluchaxun :clickable="clickable"></tableXianluchaxun>
            <!-- table for 线路图层选择-->
            <tableWeiqixiangzhuangzhichaxun style="margin-top: 10px"></tableWeiqixiangzhuangzhichaxun>
            <!-- table for 微气象装置查询-->
          </div>
        </div>
        <!-- 2-1 weiqixiangzaixianjiance -->
        <div class="table123"
          v-show="weiqixiangzaixianjiance"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 91%" >
          <!-- 柱状图 -->
          <div style="background:#364359;width: 96.5%;height: 500px;font-size: 18px;color: white">
            <div style="line-height: 36px;font-size:16px;color: #b4d8f3;text-align: center;">各电压等级统计</div>
            <chartGedianyadengjitongji v-if="weiqixiangzaixianjiance"></chartGedianyadengjitongji>
            <div style="line-height: 36px;font-size:16px;color: #b4d8f3;text-align: center;">各地区统计</div>
            <chartGediqutongji v-if="weiqixiangzaixianjiance"></chartGediqutongji>
          </div>
          <!-- 表格 -->
          <div style="width: 96.5%">
            <div
              style="line-height: 36px;font-size:16px;color: #b4d8f3;margin-top: 5%;text-align: center;"
            >微气象装置列表</div>
            <tableWeiqixiangzhuangzhiliebiao
              ref="tgtable"
              v-show="weiqixiangzaixianjiance"
              v-bind:tableshow="weiqixiangzaixianjiance"
            ></tableWeiqixiangzhuangzhiliebiao>
          </div>
        </div>
        <!--2-2 leidajiance -->
        <div class="table123"
          v-if="leidajiance"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <div style="width:100%;">
            <tableLeidajiance></tableLeidajiance>
          </div>
        </div>
        <!-- 3-1 fengchangyubao -->
        <div class="table123"
          v-if="fengchangyubao"
          style="color: #b4d8f3;height: 93%;overflow: hidden;" >
          <!--风场预报-->
          <el-button
            @click="dangqianfengyangyubao(0)"
            style="border: 1px solid rgb(50,120,178);   background-color: rgb(50,120,178);color: #FFFFFF"
          >当前</el-button>
          <el-dropdown trigger="click" @command="dangqianfengyangyubao">
            <el-button
              style="border: 1px solid rgb(50,120,178);   background-color: rgb(50,120,178);color: #FFFFFF;   width: 80px;"
            >
              {{time_24}}h
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="height: 200px;overflow: auto;width: 70px">
              <template v-for="(item, index) in time_24_options">
                <el-dropdown-item :command="item" :key="index">{{ item }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" @command="dangqianfengyangyubao">
            <el-button
              style="border: 1px solid rgb(50,120,178);   background-color: rgb(50,120,178);color: #FFFFFF;width: 80px;"
            >
              {{time_48}}h
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="height: 200px;overflow: auto;width: 70px">
              <template v-for="(item, index) in time_48_options">
                <el-dropdown-item :command="item" :key="index">{{ item }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" @command="dangqianfengyangyubao">
            <el-button
              style="border: 1px solid rgb(50,120,178);   background-color: rgb(50,120,178);color: #FFFFFF;width: 80px;"
            >
              {{time_72}}h
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="height: 200px;overflow: auto;width: 70px">
              <template v-for="(item, index) in time_72_options">
                <el-dropdown-item :command="item" :key="index">{{ item }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
          <div
            class="clearfix"
            style="width: 96.5%;height: 91%; text-align: center;font-size: 18px;color: #b4d8f3;"
          >
            <div style="line-height: 36px;font-size:16px;">各区域最大风速</div>
            <chartGequyuzuidafengshi :datadq="datadqwind" :datadqchengshi="datadqchengshi"></chartGequyuzuidafengshi>
            <br>
            <div style="line-height: 36px;font-size:16px;">各区域最大降水</div>
            <chartGequyuzuidafengshui :datadq="datadqrain" :datadqchengshi="datadqchengshi"></chartGequyuzuidafengshui>
          </div>
        </div>
        <!-- 3-2 taganlixuepinggu -->
        <div class="table123"
          v-if="taganlixuepinggu"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <!-- 柱状图 -->
          <!-- 表格 -->
          <div style="width: 100%">
            <tableTaganlixuepinggu :clickable="clickable"></tableTaganlixuepinggu>
          </div>
        </div>
        <!-- 3-3 zhongyaotongdaoxianlu  -->
        <div class="table123"
          v-if="zhongyaotongdaoxianlu"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <!-- 柱状图 -->
          <!-- 表格 -->
          <div style="width:100%">
            <tableZhongyaotongdaoxianlu :clickable="clickable"></tableZhongyaotongdaoxianlu>
          </div>
        </div>
        <!-- 3-4 qitatongdaoxianlu -->
        <div class="table123"
          v-if="qitatongdaoxianlu"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <!-- 柱状图 -->
          <!-- 表格 -->
          <div style="width: 100%">
            <tableQitatongdaoxianlu :clickable="clickable"></tableQitatongdaoxianlu>
          </div>
        </div>
        <!-- 4-2 yujingxinxifabu -->
        <div class="table123"
          v-if="yunweiguanliyjxxfbshow"
          style="color: #FFFFFF;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <tableYujingxinxifabu ref="tableYujingxinxifabu"></tableYujingxinxifabu>
        </div>
        <!-- 4-3 zhibangongzuojilu -->
        <div class="table123"
          v-if="yunweiguanlizbjlshow"
          style="color: #b4d8f3;overflow-y: auto;overflow-x: hidden;height: 93%" >
          <!-- 柱状图 -->
          <!-- 表格 -->
          <div style="width: 100%">
            <tableZhibangongzuojilu ref="tableZhibangongzuojilu"></tableZhibangongzuojilu>
          </div>
        </div>
      </div>
      <!---------------------------------------------------------------End Table Building---------------------------------------------------------------------->
    </div>
    <!---------------------------------------------------------------Start Tab4(yunweiguanli) Userbox Content Building---------------------------------------------------------------------->
    <div id="userbox" :style="userbox11" v-show="userbox"></div>
    <div id="operation" :style="userbox11" v-show="userbox">
      <!-- 4 yunweiguanli -->
      <div id="yunweiguanli11" class="button_div" v-show="yunweiguanli">
        <img
          :src="changqiyujing_imgurl"
          style="width:90px;"
          class="sub_image_button"
          @click="submenu_click('changqiyujing')"
        >
        <img
          :src="yujingxinxifabu_imgurl"
          style="width:100px;height:29px;"
          class="sub_image_button_long"
          @click="submenu_click('yujingxinxifabu')"
        >
        <img
          :src="zhibangongzuojilu_imgurl"
          style="width:100px;height:29px;"
          class="sub_image_button_long"
          @click="submenu_click('zhibangongzuojilu')"
        >
      </div>
      <center
        id="waitPdfPage"
        style="float:left;left:50%;z-index:88888;position:absolute;border:0px red solid;opacity:0 "
        v-show="userbox_waitPdf1Page_notloaded"
      >
        <table height="150px" border="0">
          <tr>
            <td>
              <img
                width="28"
                height="28"
                id="myImage"
                src="http://img.zcool.cn/community/0179f1574d2d656ac72525ae5f181d.gif"
              >
            </td>
            <td>加载中，请等待...</td>
          </tr>
        </table>
      </center>
      <!-- <div
        id="example2"        
        style="width: 98%;height:97%;overflow:scroll;textAlign:'center';position:'fixed';padding:10px;margin:12px 16px 12px 16px;background-color: white;"
        v-show="userbox"
      >
        <Baogaobox />
      </div> -->
      <iframe id="example2"
                 src=""
                 style="width: 98%;height: 97%;textAlign:'center';position:'fixed';margin-top:10px"
                 v-show="userbox"
         >
         </iframe>
    </div>
  </div>
</template>

<script>
import gBus from "../assent/eventBus";
import axios from "axios";
import $ from "jquery";
import interact from "interactjs";

import tankuang from "../components/tankuang"; //1-2 tableXianluchaxun, information of tower

import Baogaobox from "../components/Baogaobox";
import chartGedianyadengjitongji from "@/components/chartGedianyadengjitongji";
import chartGediqutongji from "@/components/chartGediqutongji";
import Paging from "@/components/Paging"; // 分页
import Element from "../api/element";
import chartTaifengtaganyujing from "../components/chartTaifengtaganyujing"; // 1-1-2 lishitaifeng
import tableDangqiantaifeng from "../components/tableDangqiantaifeng"; // 1-1-1 dangqiantaifeng
import tableWeiqixiangzhuangzhichaxun from "../components/tableWeiqixiangzhuangzhichaxun"; // 1-2 shebeiguanli => weiqizhuangbei
import tableXianluchaxun from "../components/tableXianluchaxun"; // 1-2 shebeiguanli => xianluchaxun

import tableWeiqixiangzhuangzhiliebiao from "../components/tableWeiqixiangzhuangzhiliebiao"; // 2-1 weiqixiangzaixianjiance
import tableLeidajiance from "../components/tableLeidajiance"; // 2-2 leidajiance
import chartGequyuzuidafengshi from "@/components/chartGequyuzuidafengshi"; // 3-1 fengchangyubao 各区域最大风速
import chartGequyuzuidafengshui from "@/components/chartGequyuzuidafengshui"; // 3-1 fengchangyubao 各区域最大降水
import tableTaganlixuepinggu from "../components/tableTaganlixuepinggu"; // 3-2 taganlixuepinggu
import tableZhongyaotongdaoxianlu from "../components/tableZhongyaotongdaoxianlu"; // 3-3 zhongyaotongdaoxianlu
import tableQitatongdaoxianlu from "../components/tableQitatongdaoxianlu"; // 3-4 qitatongdaoxianlu
import tableYujingxinxifabu from "../components/tableYujingxinxifabu"; // 4-2 yujingxinxifabu // check it.
import yunweiguanliyjxxfb from "@/components/yunweiguanliyjxxfb"; // 4-2 yujingxinxifabu // check it.
import tableZhibangongzuojilu from "../components/tableZhibangongzuojilu"; // 4-3 zhibangongzuojilu // check it.
import yunweiguanlizbjl from "@/components/yunweiguanlizbjl";  // 4-3 zhibangongzuojilu // check it.

import mapwaikuangpng from "../assets/static_pages/img/mapwaikuang.png";
import youcebiankuangpng from "../assets/static_pages/img/youcebiankuang.png";

//cesium injection
import Vue from "vue";
import VueCesium from "vue-cesium";
import { relative } from "path";
//for windy
import Windy from "./windy/js/windy/Windy";
import StormField from "./windy/js/storm/StormField";

//lodash
import VueLodash from "vue-lodash";
import { setTimeout } from 'timers';

require("@/components/styles/App.css");

const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional
Vue.use(VueCesium,{
  cesiumPath: '/static/plugins/Cesium/Cesium.js'
});

//global variables
let off_x = 80;
let off_y = 80;

var cesium;
var viewer;
var main;
var img_path = "static/images/";

export default {
  // eslint-disable-next-line
  /* eslint-disable */
  name: "App",
  components: {
    Baogaobox,
    chartGedianyadengjitongji,
    chartGediqutongji,
    chartGequyuzuidafengshi,
    chartGequyuzuidafengshui,    
    tableWeiqixiangzhuangzhichaxun,
    tableXianluchaxun,    
    chartTaifengtaganyujing,
    tableDangqiantaifeng,
    tableWeiqixiangzhuangzhiliebiao,
    Paging,
    tableZhongyaotongdaoxianlu,
    tankuang,
    tableQitatongdaoxianlu,
    tableTaganlixuepinggu,    
    tableLeidajiance,
    tableZhibangongzuojilu,
    tableYujingxinxifabu,
    yunweiguanliyjxxfb,
    yunweiguanlizbjl    
  },
  data() {
    return {
      clickable: true,
      /** view block */
      map_frame: true,
      userbox: false,
      /** viewer */
      entities:[],
      /* cesium view data */
      scene3DOnly: true,
      selectionIndicator: false,
      infoBox: false,
      map_show: true,
      /** menu selection*/
      main_sel: "",
      sub_sel: "",
      right_tab_sel: "",
      clippingPlanes: null,
      loadingData: false,
      //functionCesium
      callbackFn:[],

      //************typhoon relation**************** */
      typhoon_tableData: [],
      typhoonPresentList: [],
      typhoonHistoryList: [],
      /************************/
      //---------electricity line-----------
      //xianlu layers
      xianlu_110: null,
      xianlu_220: null,
      xianlu_500: null,
      xianlu_800: null,
      xianlu_1000: null,
      //*******************/xinxizonglan section
      ch1: false,
      ch2: false,
      ch3: false,
      ch4: false,
      ch5: false,
      //*******************/fengchangjiance section

      //*******************/zaihaiyujing section
      time_24: 24,
      time_48: 48,
      time_72: 72,
      time_24_options: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ], // 风场预报
      time_48_options: [
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48
      ], // 风场预报
      time_72_options: [
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72
      ], // 风场预报
      //******************** */yunweiguanli
      //************************************** */
      /*******************radar******************** */
      radar_type_band: "",
      rd_vals: [
        [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70], //dbz
        [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70], //undbz
        [
          -4.22,
          -3.69,
          -3.17,
          -2.64,
          -2.11,
          -1.58,
          -1.05,
          -0.53,
          -0.26,
          0.26,
          0.53,
          1.05,
          1.58,
          2.11,
          2.64,
          3.17,
          3.69,
          4.22
        ], //vel
        [0.0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] //sw
      ],
      rd_colors: [
        [
          "439ff2",
          "69e9ec",
          "62d63f",
          "3f8d27",
          "fffc55",
          "e0c142",
          "f09336",
          "e93222",
          "c72920",
          "b12518",
          "ea3ce9",
          "8958b1",
          "ab93e7"
        ],
        [
          "439ff2",
          "69e9ec",
          "62d63f",
          "3f8d27",
          "fffc55",
          "e0c142",
          "f09336",
          "e93222",
          "c72920",
          "b12518",
          "ea3ce9",
          "8958b1",
          "ab93e7"
        ],
        [
          "0100a2",
          "0050c3",
          "0069ff",
          "00baff",
          "6ff8ff",
          "00ff01",
          "01b400",
          "007800",
          "d8dde3",
          "be0002",
          "ff6364",
          "ffb3b3",
          "edffa9",
          "f6ef00",
          "c7c300",
          "898a00",
          "5e5e04"
        ],
        [
          "0000a9",
          "004dc1",
          "0069ff",
          "01bafd",
          "6ff8ff",
          "15ff68",
          "018b00",
          "226724",
          "fffe97",
          "fbe601",
          "ffa9ac",
          "ff7779",
          "fd3329",
          "d20001",
          "e600e7",
          "960097"
        ]
      ],
      /******************************************** */
      fszhuantitu: null,
      jszhuantitu: null,
      interval: null, //timer
      blink_circle_interval: null, //for blink circle
      blink_line_interval: null, //for blink line
      activeName: "", //当前选中项所在页
      timess: { id: "", name: "" },
      userbox: false,
      userbox_waitPdf1Page_notloaded: true,
      wind_show: true,
      pdf: false,
      fstbutton: false,
      jstbutton: false,
      checked: false,
      check_wind: false, //show wind
      fs_datasource: null,
      js_datasource: null,

      size: 5, // 分页
      total: 5, // 分页
      curPage: 1, // 分页
      startnum: 1, // 分页
      endnum: 5, // 分页
      all_towers_layer: null,
      /*****************micro tower relation************ */
      selected_micro_tower: null,
      micro_towers: [], //limited to nanjing
      //3-1
      datadqwind: [],
      datadqrain: [],
      datadqchengshi: [],
      //************** */el tower relation*****************
      show_el_tower_detail: false, //show
      el_towers_on_line: null,
      el_tower_models: [
            {
          name: "default",
          url: "./static/models/1.glb",
          scale: 1,
          units: [
            //only for left side
            // 0
            {
              x_b_dist: 17.05, //meters
              y_b_dist: 2, //meters
              z_b_dist: 64.403,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //1
            {
              x_b_dist: 16.85, 
              y_b_dist: 2, 
              z_b_dist: 64.02,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //2
            {
              x_b_dist: 17.15,
              y_b_dist: 2, 
              z_b_dist: 63.6,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //3
            {
              x_b_dist: 17.645, 
              y_b_dist: 2, 
              z_b_dist: 63.6,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //4
            {
              x_b_dist: 17.935, 
              y_b_dist: 2, 
              z_b_dist: 64.02,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //5
            {
              x_b_dist: 17.745, 
              y_b_dist: 2, 
              z_b_dist: 64.403,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //only for right side
            // 0
            {
              x_b_dist: -17.05, //meters
              y_b_dist: 2, //meters
              z_b_dist: 64.403, 
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //1
            {
              x_b_dist: -16.85, 
              y_b_dist: 2, 
              z_b_dist: 64.02,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //2
            {
              x_b_dist: -17.15,
              y_b_dist: 2, 
              z_b_dist: 63.6,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            {
              x_b_dist: -17.645, 
              y_b_dist: 2, 
              z_b_dist: 63.6,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //4
            {
              x_b_dist: -17.935, 
              y_b_dist: 2, 
              z_b_dist: 64.02,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            // //5
            {
              x_b_dist: -17.745, 
              y_b_dist: 2, 
              z_b_dist: 64.403,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#ffff00"
            },
            //white line
            //left
            {
              x_b_dist: 12.02, //meters
              y_b_dist: 2, //meters
              z_b_dist: 78.57,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#fff"
            },
            //right
            {
              x_b_dist: -12.02, //meters
              y_b_dist: 2, //meters
              z_b_dist: 78.57,
              think: 1,
              pass: 1, // or 2, 1 : one point for each tower,  2 : two point for each tower
              color: "#fff"
            }
          ]
        },
        {
          name: "±500kV直线-T字",
          url: "./static/models/±500kV直线-T字.glb",
          scale: 0.1,
          units: [
          ]
        },{
          name: "±500kV耐张-T字",
          url: "./static/models/±500kV耐张-T字.glb",
          scale: 0.1,
          units: [
          ]
        },{
      name: "±800kV直线-T字",
      url: "./static/models/±800kV直线-T字.glb",
      scale: 0.1,
      units: [
        // left
        { x_b_dist: 14.4,    y_b_dist: 0,      z_b_dist: 57.75,   type: 0,  color: "#ffff00"  },
        { x_b_dist: 13.2,    y_b_dist: 0,      z_b_dist: 57.75,   type: 0,  color: "#ffff00"  },
/*
        // right
        { x_b_dist: -15,    y_b_dist: 0,      z_b_dist: 57.8,   type: 0,  color: "#ffff00"  },
        { x_b_dist: -13.7,  y_b_dist: 0,      z_b_dist: 57.8,   type: 0,  color: "#ffff00"  },*/

      ]
    },{
      name: "±800kV耐张-干字",
      url: "./static/models/±800kV耐张-干字.glb",
      scale: 0.1,
      units: [
        // left
        { x_b_dist: 13.9,    y_b_dist: 11.5,     z_b_dist: 64.5,     type: 1,  color: "#ffff00"  },
        { x_b_dist: 14.4,    y_b_dist: 3,      z_b_dist: 57.75,   type: 2,  color: "#ffff00"  },
        { x_b_dist: 14.4,    y_b_dist: -3,      z_b_dist: 57.75,   type: 2,  color: "#ffff00"  },
        { x_b_dist: 13.9,    y_b_dist: -11.5,     z_b_dist: 64.5,     type: 3,  color: "#ffff00"  },

        { x_b_dist: 13.5,    y_b_dist: 11.5,     z_b_dist: 64.5,     type: 1,  color: "#ffff00"  },
        { x_b_dist: 13.2,    y_b_dist: 3,      z_b_dist: 57.75,   type: 2,  color: "#ffff00"  },
        { x_b_dist: 13.2,    y_b_dist: -3,      z_b_dist: 57.75,   type: 2,  color: "#ffff00"  },
        { x_b_dist: 13.5,    y_b_dist: -11.5,     z_b_dist: 64.5,     type: 3,  color: "#ffff00"  },
/*
        // right
        { x_b_dist: -14.6,    y_b_dist: 11.5,     z_b_dist: 64.5,     type: 1,  color: "#ffff00"  },
        { x_b_dist: -15,    y_b_dist: 3,      z_b_dist: 57.8,   type: 2,  color: "#ffff00"  },
        { x_b_dist: -15,    y_b_dist: -3,      z_b_dist: 57.8,   type: 2,  color: "#ffff00"  },
        { x_b_dist: -14.6,    y_b_dist: -11.5,     z_b_dist: 64.5,     type: 3,  color: "#ffff00"  },

        { x_b_dist: -14.1,    y_b_dist: 11.5,     z_b_dist: 64.5,     type: 1,  color: "#ffff00"  },
        { x_b_dist: -13.7,    y_b_dist: 3,      z_b_dist: 57.8,   type: 2,  color: "#ffff00"  },
        { x_b_dist: -13.7,    y_b_dist: -3,      z_b_dist: 57.8,   type: 2,  color: "#ffff00"  },
        { x_b_dist: -14.1,    y_b_dist: -11.5,     z_b_dist: 64.5,     type: 3,  color: "#ffff00"  },*/
      ]
    },{
          name: "1000kV直线-丰字",
          url: "./static/models/1000kV直线-丰字.glb",
          scale: 0.12,
          units: [
    /*        // 0 // left - bottom
            { x_b_dist: 7,    y_b_dist: 0,      z_b_dist: 61.9,   type: 0,  color: "#ffff00"  },
            { x_b_dist: 7.3,  y_b_dist: 0,      z_b_dist: 61.68,  type: 0,  color: "#ffff00"  },
            { x_b_dist: 7.6,  y_b_dist: 0,      z_b_dist: 61.9,   type: 0,  color: "#ffff00"  },

            // left - middle
            { x_b_dist: 6.55, y_b_dist: 0,      z_b_dist: 76.8,   type: 0,  color: "#ffff00"  },
            { x_b_dist: 6.85, y_b_dist: 0,      z_b_dist: 76.55,   type: 0,  color: "#ffff00"  },
            { x_b_dist: 7.15, y_b_dist: 0,      z_b_dist: 76.8,   type: 0,  color: "#ffff00"  },

            // left - top
            { x_b_dist: 6.0,  y_b_dist: 0,     z_b_dist: 91.7,   type: 0,  color: "#ffff00"  },
            { x_b_dist: 6.3,  y_b_dist: 0,     z_b_dist: 91.45,   type: 0,  color: "#ffff00"  },
            { x_b_dist: 6.6,  y_b_dist: 0,     z_b_dist: 91.7,   type: 0,  color: "#ffff00"  },

            // 0 // right - bottom
            { x_b_dist: -6.45,    y_b_dist: 0,      z_b_dist: 61.9,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -6.75,    y_b_dist: 0,      z_b_dist: 61.68,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -7.05,    y_b_dist: 0,      z_b_dist: 61.9,   type: 0,  color: "#ffff00"  },

            // right - middle
            { x_b_dist: -6.85, y_b_dist: 0,      z_b_dist: 76.8,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -6.5, y_b_dist: 0,      z_b_dist: 76.5,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -6.25, y_b_dist: 0,      z_b_dist: 76.8,   type: 0,  color: "#ffff00"  },
*/
            // right-top
            { x_b_dist: -6.1,   y_b_dist: 0,      z_b_dist: 91.7,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -5.8,   y_b_dist: 0,      z_b_dist: 91.4,   type: 0,  color: "#ffff00"  },
            { x_b_dist: -5.5,   y_b_dist: 0,      z_b_dist: 91.7,   type: 0,  color: "#ffff00"  },
          ]
        },{
          name: "1000kV耐张-丰字",
          url: "./static/models/1000kV耐张-丰字.glb",
          scale: 0.12,
          units: [
    /*
            // 0 // left - bottom
            { x_b_dist: 7,    y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: 7,    y_b_dist: 0,      z_b_dist: 61.9,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 7,    y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            { x_b_dist: 7.25, y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: 7.3,  y_b_dist: 0,      z_b_dist: 61.68,  type: 2,  color: "#ffff00"  },
            { x_b_dist: 7.25, y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            { x_b_dist: 7.5,  y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: 7.6,  y_b_dist: 0,      z_b_dist: 61.9,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 7.5,  y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            // left - middle
            { x_b_dist: 6.7,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 6.55, y_b_dist: 0,      z_b_dist: 76.8,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 6.7,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: 6.9,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 6.85, y_b_dist: 0,      z_b_dist: 76.55,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 6.9,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: 7.1,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 7.15, y_b_dist: 0,      z_b_dist: 76.8,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 7.1,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },

            // left - top
            { x_b_dist: 6.15,  y_b_dist: 7.6,   z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 6.0,  y_b_dist: 0,     z_b_dist: 91.7,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 6.15,  y_b_dist: -7.6,  z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: 6.35,  y_b_dist: 7.6,   z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 6.3,  y_b_dist: 0,     z_b_dist: 91.45,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 6.35,  y_b_dist: -7.6,  z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: 6.55,  y_b_dist: 7.6,   z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: 6.6,  y_b_dist: 0,     z_b_dist: 91.7,   type: 2,  color: "#ffff00"  },
            { x_b_dist: 6.55,  y_b_dist: -7.6,  z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },

            // 0 // right - bottom
            { x_b_dist: -6.5,    y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.45,    y_b_dist: 0,      z_b_dist: 61.9,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.5,    y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            { x_b_dist: -6.75,    y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.75,    y_b_dist: 0,      z_b_dist: 61.68,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.75,    y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            { x_b_dist: -6.9,    y_b_dist: 8.5,    z_b_dist: 67,     type: 1,  color: "#ffff00"  },
            { x_b_dist: -7.05,    y_b_dist: 0,      z_b_dist: 61.9,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.9,    y_b_dist: -8.5,   z_b_dist: 67,     type: 3,  color: "#ffff00"  },

            // right - middle
            { x_b_dist: -6.7,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.85, y_b_dist: 0,      z_b_dist: 76.8,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.7,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: -6.5,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.5, y_b_dist: 0,      z_b_dist: 76.5,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.5,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: -6.3,  y_b_dist: 8.3,    z_b_dist: 81.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.25, y_b_dist: 0,      z_b_dist: 76.8,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6.3,  y_b_dist: -8.3,   z_b_dist: 81.8,   type: 3,  color: "#ffff00"  },
*/            
            // right-top
            { x_b_dist: -6,   y_b_dist: 7.6,    z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -6.1,   y_b_dist: 0,      z_b_dist: 91.7,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -6,   y_b_dist: -7.6,   z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },

            { x_b_dist: -5.8,   y_b_dist: 7.6,    z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -5.8,   y_b_dist: 0,      z_b_dist: 91.4,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -5.8,   y_b_dist: -7.6,   z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },
    

            { x_b_dist: -5.6,   y_b_dist: 7.6,    z_b_dist: 96.8,   type: 1,  color: "#ffff00"  },
            { x_b_dist: -5.5,   y_b_dist: 0,      z_b_dist: 91.7,   type: 2,  color: "#ffff00"  },
            { x_b_dist: -5.6,   y_b_dist: -7.6,   z_b_dist: 96.8,   type: 3,  color: "#ffff00"  },

          ]
        }
      ],
      predict_main_towers: [],
      qita_main_towers: [],
      /************const data*********** */
      yunweiguanliyjxxfbshow: false,
      yunweiguanlizbjlshow: false,
      //**********camera relation */
      cam_5000K: 5000000,
      cam_2500K: 2500000,
      cam_500K: 500000,
      cam_250K: 250000,
      cam_100K: 100000,
      cam_50K: 50000,
      cam_25K: 25000,
      cam_10K: 10000,
      cam_8K: 8000,
      cam_5K: 5000,
      cam_1K: 1000,
      cam_500: 500,
      cam_ori: null,
      cam_tar: null,
      nanjing_pos: {
        lng: 118.76741,
        lat: 32.041546
      },
      shenghui: [
        {
          text: "沈阳市",
          lng: 123.429092,
          lat: 41.796768,
          tooltip: "新疆：104"
        },
        {
          text: "长春市",
          lng: 125.324501,
          lat: 43.886841,
          tooltip: "西藏：104"
        },
        {
          text: "哈尔滨市",
          lng: 126.642464,
          lat: 45.756966,
          tooltip: "青海：104"
        },
        {
          text: "北京市",
          lng: 116.405289,
          lat: 39.904987,
          tooltip: "甘肃：104"
        },
        {
          text: "天津市",
          lng: 117.190186,
          lat: 39.125595,
          tooltip: "内蒙古：104"
        },
        {
          text: "呼和浩特市",
          lng: 111.75199,
          lat: 40.84149,
          tooltip: "宁夏：104"
        },
        { text: "银川市", lng: 106.23248, lat: 38.48644, tooltip: "四川：104" },
        {
          text: "太原市",
          lng: 112.549248,
          lat: 37.857014,
          tooltip: "云南：104"
        },
        {
          text: "石家庄市",
          lng: 114.502464,
          lat: 38.045475,
          tooltip: "陕西：104"
        },
        {
          text: "济南市",
          lng: 117.000923,
          lat: 36.675808,
          tooltip: "山西：104"
        },
        {
          text: "郑州市",
          lng: 113.665413,
          lat: 34.757977,
          tooltip: "重庆：104"
        },
        {
          text: "西安市",
          lng: 108.948021,
          lat: 34.263161,
          tooltip: "贵州：104"
        },
        {
          text: "武汉市",
          lng: 114.298569,
          lat: 30.584354,
          tooltip: "广西：104"
        },
        {
          text: "南京市",
          lng: 118.76741,
          lat: 32.041546,
          tooltip: "海南：104"
        },
        {
          text: "合肥市",
          lng: 117.283043,
          lat: 31.861191,
          tooltip: "广东：104"
        },
        {
          text: "上海市",
          lng: 121.472641,
          lat: 31.231707,
          tooltip: "澳门：104"
        },
        {
          text: "长沙市",
          lng: 112.982277,
          lat: 28.19409,
          tooltip: "香港：104"
        },
        {
          text: "南昌市",
          lng: 115.892151,
          lat: 28.676493,
          tooltip: "台湾：104"
        },
        {
          text: "杭州市",
          lng: 120.15358,
          lat: 30.287458,
          tooltip: "福建：104"
        },
        {
          text: "福州市",
          lng: 119.306236,
          lat: 26.075302,
          tooltip: "江西：104"
        },
        {
          text: "广州市",
          lng: 113.28064,
          lat: 23.125177,
          tooltip: "湖南：104"
        },
        {
          text: "台北市",
          lng: 121.520076,
          lat: 25.030724,
          tooltip: "湖北：104"
        },
        { text: "海口市", lng: 110.19989, lat: 20.04422, tooltip: "安徽：104" },
        {
          text: "南宁市",
          lng: 108.320007,
          lat: 22.82402,
          tooltip: "浙江：104"
        },
        {
          text: "重庆市",
          lng: 106.504959,
          lat: 29.533155,
          tooltip: "江苏：104"
        },
        {
          text: "昆明市",
          lng: 102.71225,
          lat: 25.040609,
          tooltip: "河南：104"
        },
        {
          text: "贵阳市",
          lng: 106.713478,
          lat: 26.578342,
          tooltip: "山东：104"
        },
        {
          text: "成都市",
          lng: 104.065735,
          lat: 30.659462,
          tooltip: "上海：104"
        },
        { text: "兰州市", lng: 103.83417, lat: 36.06138, tooltip: "河北：104" },
        { text: "西宁市", lng: 101.77782, lat: 36.61729, tooltip: "天津：104" },
        { text: "拉萨市", lng: 91.1145, lat: 29.64415, tooltip: "北京：104" },
        {
          text: "乌鲁木齐市",
          lng: 87.61688,
          lat: 43.82663,
          tooltip: "辽宁：104"
        },
        { text: "香港", lng: 114.16546, lat: 22.27534, tooltip: "吉林：104" },
        { text: "澳门", lng: 113.54913, lat: 22.19875, tooltip: "黑龙江：104" }
      ],

      map_main_content: {
        width: "97%",
        height: "100%",
        textAlign: "center",
        left: "2%",
        bottom: "0",
        // backgroundImage:'url(../assets/static_pages/img/youcebiankuang.png)',
        backgroundImage: "url("+mapwaikuangpng+")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      },
      gps_info_bar: {
        position: "absolute",
        width: "100%",
        height: "25px",
        bottom: "0px",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      ttable: {
        width: "25%",
        height: "90%",
        float: "right",
        position: "fixed",
        bottom: 0,
        right: "3%",
        backgroundImage: "url("+youcebiankuangpng+")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        minWidth: "410px"
      },
      userbox11: {
        width: "100%",
        height: "88%",
        float: "left",
        //left:'1%',
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        backgroundImage: "url("+mapwaikuangpng+")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }
    };
  },
  watch: {
    screenWidth() {
      this.__watchWidth();
    },
    main_sel: function(main_menu_sel, pre_main) {
      main.map_frame = true; // check
      main.userbox = false;
      switch (main_menu_sel) {
        case "xinxizonglan": // 1-
          break;
        case "fengchangjiance": // 2-
          break;
        case "zaihaiyujing": // 3-
          break;
        case "yunweiguanli": // 4 -
          break;
        default:
          break;
      }
    },
    sub_sel: function(sub_menu_sel, pre_sub) {
      if (pre_sub == sub_menu_sel) {
        return;
      }
      // main._clearMap();
      main.clearMap();
      console.log("sub_menu_sel", sub_menu_sel);
      switch (sub_menu_sel) {
        case "taifengzonglan": // 1-1
          break;
        case "shebeiguanli": // 1-2
          break;
        case "weiqixiangzaixianjiance": // 2-1
          break;
        case "leidajiance": // 2-2
          break;
        case "fengchangyubao": // 3-1
          break;
        case "taganlixuepinggu": // 3-2, tableTaganlixuepinggu
          break;
        case "zhongyaotongdaoxianlu": // 3-3  tableZhongyaotongdaoxianlu
          break;
        case "qitatongdaoxianlu": // 3-4
          break;
        case "changqiyujing": // 4-1
          main.map_frame = false;
          main.map_show = false;
          main.userbox = true; // check

          //静态pdf
          //调用pdf，使用编辑器注释下面两行，更改dom example2的类型
          var curUrl='static/pdf/web/viewer_longtimealarm.html';
          document.getElementById('example2').src=curUrl;

          break;
        case "yujingxinxifabu": // 4-2
          main.map_frame = true;
          main.map_show = false;
          main.userbox = false; // check
          main.yunweiguanliyjxxfbshow = true;
          main.yunweiguanlizbjlshow = false;
          break;
        case "zhibangongzuojilu": // 4-3
          main.map_frame = true;
          main.map_show = false;
          main.userbox = false; // check
          main.yunweiguanliyjxxfbshow = false;
          main.yunweiguanlizbjlshow = true;
          break;
        default:
          return;
          break;
      }

      main.right_tab_sel = "";
      if (main[main.main_sel + "_" + sub_menu_sel]) {
        main[main.main_sel + "_" + sub_menu_sel]();
      } else {
        console.log("undefined function: ", main.main_sel + "_" + sub_menu_sel);
      }
    }
  },
  computed: {
    /** main menu views */
    xinxizonglan() {
      return this.main_sel == "xinxizonglan";
    },
    fengchangjiance() {
      return this.main_sel == "fengchangjiance";
    },
    zaihaiyujing() {
      return this.main_sel == "zaihaiyujing";
    },
    yunweiguanli() {
      return this.main_sel == "yunweiguanli";
    },
    yonghuzhongxin() {
      return this.main_sel == "yonghuzhongxin";
    },
    /** sub menu tab images, sub pannel == start */
    /** xinxizonglan */
    taifengzonglan_imgurl() {
      // 1-1
      return this.sub_sel == "taifengzonglan"
        ? img_path + "taifengzonglan_over.png"
        : img_path + "taifengzonglan_nor.png";
    },
    taifengzonglan() {
      return this.sub_sel == "taifengzonglan";
    },
    dangqiantaifeng() {
      return this.right_tab_sel == "dangqiantaifeng";
    },
    lishitaifeng() {
      return this.right_tab_sel == "lishitaifeng";
    },
    shebeiguanli_imgurl() {
      // 1-2
      return this.sub_sel == "shebeiguanli"
        ? img_path + "shebeiguanli_over.png"
        : img_path + "shebeiguanli_nor.png";
    },
    shebeiguanli() {
      // tableXianluchaxun
      return this.sub_sel == "shebeiguanli";
    },
    /** fengchangjince */
    weiqixiangzaixianjiance_imgurl() {
      // 2-1
      return this.sub_sel == "weiqixiangzaixianjiance"
        ? img_path + "weiqixiangzaixianjiance_over.png"
        : img_path + "weiqixiangzaixianjiance_nor.png";
    },
    weiqixiangzaixianjiance() {
      //tgtatble
      return this.sub_sel == "weiqixiangzaixianjiance";
    },
    leidajiance_imgurl() {
      // 2-2
      return this.sub_sel == "leidajiance"
        ? img_path + "leidajiance_over.png"
        : img_path + "leidajiance_nor.png";
    },
    leidajiance() {
      // tableLeidajiance
      return this.sub_sel == "leidajiance";
    },
    /** zaihaiyujing */
    fengchangyubao_imgurl() {
      // 3-1
      return this.sub_sel == "fengchangyubao"
        ? img_path + "fengchangyubao_over.png"
        : img_path + "fengchangyubao_nor.png";
    },
    fengchangyubao() {
      return this.sub_sel == "fengchangyubao";
    },
    taganlixuepinggu_imgurl() {
      // 3-2
      return this.sub_sel == "taganlixuepinggu"
        ? img_path + "taganlixuepinggu_over.png"
        : img_path + "taganlixuepinggu_nor.png";
    },
    taganlixuepinggu() {
      // tableTaganlixuepinggu
      return this.sub_sel == "taganlixuepinggu";
    },
    zhongyaotongdaoxianlu_imgurl() {
      // 3-3
      return this.sub_sel == "zhongyaotongdaoxianlu"
        ? img_path + "zhongyaotongdaoxianlu_over.png"
        : img_path + "zhongyaotongdaoxianlu_nor.png";
    },
    zhongyaotongdaoxianlu() {
      // tableZhongyaotongdaoxianlu
      this.pdf = false;
      return this.sub_sel == "zhongyaotongdaoxianlu";
    },
    qitatongdaoxianlu_imgurl() {
      // 3-4
      return this.sub_sel == "qitatongdaoxianlu"
        ? img_path + "qitatongdaoxianlu_over.png"
        : img_path + "qitatongdaoxianlu_nor.png";
    },
    qitatongdaoxianlu() {
      // tableQitatongdaoxianlu
      return this.sub_sel == "qitatongdaoxianlu";
    },
    /** yunweiguanli */
    changqiyujing_imgurl() {
      // 4-1
      return this.sub_sel == "changqiyujing"
        ? img_path + "changqiyujing_over.png"
        : img_path + "changqiyujing_nor.png";
    },
    yujingxinxifabu_imgurl() {
      //4-2
      return this.sub_sel == "yujingxinxifabu"
        ? img_path + "yujingxinxifabu_over.png"
        : img_path + "yujingxinxifabu_nor.png";
    },
    yujingxinxifabu() {
      // tableYujingxinxifabu.vue
      return this.sub_sel == "yujingxinxifabu";
    },
    zhibangongzuojilu_imgurl() {
      // 4-3
      return this.sub_sel == "zhibangongzuojilu"
        ? img_path + "zhibangongzuojilu_over.png"
        : img_path + "zhibangongzuojilu_nor.png";
    },
    zhibangongzuojilu() {
      // tableZhibangongzuojilu.vue
      return this.sub_sel == "zhibangongzuojilu";
    }
    /** yonghuzhongxin */
    /** sub menu images == end */
    /** map and pdf view */
  },
  created() {},
  mounted() {
    main = this;
    main._initTyphoonData();
    main.__watchWidth();
    main.setOnEvents();
  },
  methods: {
    /* cesium init function */
    readyCesium(cesiumInstance) {
      // init global parameters
      cesium = cesiumInstance.Cesium;
      viewer = cesiumInstance.viewer;
      // init data
      
      main._initZaihaiyujing();
      main.dangqianfengyangyubao();
      // init cesium and draw privinces;
      main._initCesium();
      main._addCesiumEvents();
      
      main.__moveCam({ lng: 111.901875, lat: 30.486703 }, main.cam_5000K, function(){
        // draw privinces;
        main._drawProvinces();
        //load 24 and 48 hours border
        main._drawTimeBorder();
        main._initGlobal();
      });
      // init the first screen.
      main._selectMainMenu();
    },
    /* navbar click events */
    main_navbar_xinxizonglan() {
      //1-
      if (this.main_sel == "") {
        this.main_sel = "xinxizonglan";
        return;
      }
      main.main_sel = "xinxizonglan";
      main.submenu_click("taifengzonglan");
    },
    main_navbar_fengchangjiance() {
      //2-
      if (this.main_sel == "") {
        this.main_sel = "fengchangjiance";
        return;
      }
      main.main_sel = "fengchangjiance";
      main.submenu_click("weiqixiangzaixianjiance");
    },
    main_navbar_zaihaiyujing() {
      //3-
      if (this.main_sel == "") {
        this.main_sel = "zaihaiyujing";
        return;
      }
      main.main_sel = "zaihaiyujing";

      main.submenu_click("fengchangyubao");
    },
    main_navbar_yunweiguanli() {
      //4-
      if (this.main_sel == "") {
        this.main_sel = "yunweiguanli";
        return;
      }
      main.main_sel = "yunweiguanli";

      main.submenu_click("changqiyujing");
    },
    submenu_click(name) {
      //1-
      main.sub_sel = name;

      // zoom in china map.
    },
    /** sub menu detail */
    xinxizonglan_taifengzonglan() {
      // 1-1
      main.dangqiantaifeng_show();
      main.__moveCam({ lng: 111.901875, lat: 30.486703 }, main.cam_5000K);
    },
    xinxizonglan_shebeiguanli() {
      // 1-2
      main.__moveCam({ lng: 111.901875, lat: 30.486703 }, main.cam_5000K);
    },
    fengchangjiance_weiqixiangzaixianjiance() {
      // 2-1
      main.__moveCam(main.nanjing_pos, main.cam_500K);
    },
    fengchangjiance_leidajiance() {
      // 2-2
      main.loadingData = true;
      main.__moveCam(main.nanjing_pos, main.cam_500K);
    },
    zaihaiyujing_fengchangyubao() {
      // 3-1
      main.fengsu_show();
      main.__moveCam(main.nanjing_pos, main.cam_2500K);
    },
    zaihaiyujing_taganlixuepinggu() {
      // 3-2
      main.__moveCam(main.nanjing_pos, main.cam_2500K);
    },
    zaihaiyujing_zhongyaotongdaoxianlu() {
      // 3-3
      main.__moveCam(main.nanjing_pos, main.cam_2500K);
    },
    zaihaiyujing_qitatongdaoxianlu() {
      // 3-4
      main.__moveCam(main.nanjing_pos, main.cam_2500K);
    },
    yunweiguanli_changqiyujing() {
      
    },
    yunweiguanli_yujingxinxifabu() {
      // 4-2
    },
    yunweiguanli_zhibangongzuojilu() {
      // 4-3
    },
    /** sub menu right bar */
    // xinxizonglan_taifengzonglan
    dangqiantaifeng_show() {
      main.right_tab_sel = "dangqiantaifeng";
      // 1-1-1
      main.clearMap();
      main._initDangqiantaifeng();
    },
    lishitaifeng_show() {
      main.right_tab_sel = "lishitaifeng";
      // 1-1-2
      main.clearMap();
      main._initLishitaifeng();
    },
    // method_1-1
    onPageChange(page) {
      // 分页
      main.curPage = page.curPage;
      main.typhoon_tableData = [];
      main.startnum = (main.curPage - 1) * 5 + 1;
      main.endnum = main.curPage * 5;
      if (main.endnum > main.total) {
        main.endnum = main.total;
      }
      if (main.dangqiantaifeng === true) {
        // 播放暂停图片切换需刷新
        main.typhoon_tableData = main.typhoonPresentList.slice(
          main.startnum - 1,
          main.endnum
        );
      } else if (main.lishitaifeng === true) {
        //console.log("onPagechange");
        main.typhoon_tableData = main.typhoonHistoryList.slice(
          main.startnum - 1,
          main.endnum
        );
      }
    },
    _initTyphoonData(){
      // get dangqiantaifeng data
      axios
        .get(main.$http.adornUrl("/generator/evdatatyphoonpredict/presentList"))
        .then(res => {
          if (res.data.code === 0) {
            main.typhoonPresentList = [];
            let detail = res.data.presentList;
            detail.forEach(val => {
              let arr = [
                val.typhoonnum,
                val.name,
                val.publishdate,
                false,
                "static/images/bofang.png"
              ];
              main.typhoonPresentList.push(arr);
            });
          }
        });
      // get lishitaifeng data
      axios
        .get(main.$http.adornUrl("/generator/evdatatyphoonhistory/historyList"))
        .then(res => {
          main.seenlszwsj = true;
          if (res.data.code === 0) {
            main.seenlszwsj = false;
            main.typhoonHistoryList = [];
            let detail = res.data.historyList;
            detail.forEach(val => {
              let typ_rec = {
                typ_no: val.typhoonnum,
                typ_name: val.name,
                typ_publish: val.publishdate,
                typ_playing: false,
                typ_starttime: val.starttime,
                typ_endtime: val.endtime,
                detail_info: null
              };
              main.typhoonHistoryList.push(typ_rec);
            });
            //load typhoon points data
            for (var i = 0; i < main.typhoonHistoryList.length; i++) {
              let index = i;
              axios
                .get(
                  main.$http.adornUrl(
                    "/generator/evdatatyphoonhistory/getTyphoonDetail?typhoonNum=" +
                      main.typhoonHistoryList[index].typ_no
                  )
                )
                .then(res => {
                  // console.log("set data of typhoon", main.typhoonHistoryList[index].typ_no);
                  if (res.data.code === 0) {
                    main.typhoonHistoryList[index].detail_info = res.data.detail.data[0];
                  }
                });
            }
          }
        });
    },
    _initDangqiantaifeng() {
      main.startnum = 1;
      main.endnum = 5;
      main.curPage = 1;
      main.typhoon_tableData = main.typhoonPresentList.slice(0, 5);
      main.total = main.typhoonPresentList.length; // 分页
    },
    _initLishitaifeng() {
      main.startnum = 1;
      main.endnum = 5;
      main.curPage = 1;
      main.typhoon_tableData = main.typhoonHistoryList.slice(0, 5); // 分页
      main.total = main.typhoonHistoryList.length; // 分页
    },
    addTyphoon(typhoon) {
      main.__moveCam(typhoon.detail_info.points[0], main.cam_2500K);
      
      let theta = -500;
      let overlap_typhoons = main.getSamePeriodTyphoons(typhoon);
      main.playingTyphoons = overlap_typhoons;

      let cur_start = Cesium.JulianDate.fromDate(
        new Date(typhoon.typ_starttime)
      );
      let cur_stop = Cesium.JulianDate.fromDate(new Date(typhoon.typ_endtime));

      viewer.clock.shouldAnimate = true;
      viewer.clock.startTime = cur_start.clone();
      viewer.clock.stopTime = cur_stop.clone();
      viewer.clock.currentTime = cur_start.clone();

      viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
      viewer.clock.multiplier = 12200; //how much time to advance each tick

      let property_position = [];

      let property_year = [];
      let property_month = [];
      let property_date = [];
      let property_hour = [];
      let property_lng = [];
      let property_lat = [];
      let property_press = [];
      let property_speed = [];
      let property_radius_10 = [];
      let property_radius_7 = [];
      
      let prediction_points = [];
      for (let ti = 0; ti < overlap_typhoons.length; ti++) {
        let start = Cesium.JulianDate.fromDate(
          new Date(overlap_typhoons[ti].typ_starttime)
        );
        let stop = Cesium.JulianDate.fromDate(
          new Date(overlap_typhoons[ti].typ_endtime)
        );

        let points = overlap_typhoons[ti].detail_info.points;

        property_position[ti] = new Cesium.SampledPositionProperty();
        property_year[ti] = new Cesium.SampledProperty(Number);
        property_month[ti] = new Cesium.SampledProperty(Number);
        property_date[ti] = new Cesium.SampledProperty(Number);
        property_hour[ti] = new Cesium.SampledProperty(Number);
        property_lng[ti] = new Cesium.SampledProperty(Number);
        property_lat[ti] = new Cesium.SampledProperty(Number);
        property_press[ti] = new Cesium.SampledProperty(Number);
        property_speed[ti] = new Cesium.SampledProperty(Number);
        property_radius_10[ti] = new Cesium.SampledProperty(Number);
        property_radius_7[ti] = new Cesium.SampledProperty(Number);

        prediction_points = [];
        for (let i = 0; i < points.length; i++) {
          let time = Cesium.JulianDate.addHours(
            start,
            i,
            new Cesium.JulianDate()
          );
          let position = Cesium.Cartesian3.fromDegrees(
            points[i].lng,
            points[i].lat
          );
          //for prediction point          
          prediction_points.push(points[i].lng);
          prediction_points.push(points[i].lat);          

          let radius_7 = points[i].radius7 == "" ? 0 : points[i].radius7 / 1;
          let radius_10 = points[i].radius10 == "" ? 0 : points[i].radius10 / 1;

          let press = points[i].pressure === "" ? 0 : points[i].pressure;
          let speed = points[i].speed === "" ? 0 : points[i].speed;

          property_position[ti].addSample(time, position);
          let date_cnv = new Date(points[i].time);
          property_year[ti].addSample(time, date_cnv.getFullYear());
          property_month[ti].addSample(time, date_cnv.getMonth() + 1);
          property_date[ti].addSample(time, date_cnv.getDate());
          property_hour[ti].addSample(time, date_cnv.getHours());
          property_lng[ti].addSample(time, points[i].lng);
          property_lat[ti].addSample(time, points[i].lat);
          property_press[ti].addSample(time, press);
          property_speed[ti].addSample(time, speed);
          property_radius_10[ti].addSample(time, radius_10);
          property_radius_7[ti].addSample(time, radius_7);

          //add live points
          main.__addEntities({
            id:
              overlap_typhoons[ti].typ_no +
              "_" +
              overlap_typhoons[ti].typ_name +
              "_typpoint_" +
              i,
            availability: new Cesium.TimeIntervalCollection([
              new Cesium.TimeInterval({
                start: time,
                stop: stop
              })
            ]),
            position: position,
            point: {
              pixelSize: 12,
              color: Cesium.Color.BLUE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 1,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
            }
          });
          // //add live path
          if (i > 0) {
            main.__addEntities({
              id:
                overlap_typhoons[ti].typ_no +
                "_" +
                overlap_typhoons[ti].typ_name +
                "_path_" +
                i,
              availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                  start: time,
                  stop: stop
                })
              ]),
              polyline: {
                positions: new Cesium.Cartesian3.fromDegreesArray([
                  points[i - 1].lng,
                  points[i - 1].lat,
                  points[i].lng,
                  points[i].lat
                ]),
                width: 2
              }
            });
          }
        }        
        //add predict lines
        main.__addEntities({
          id: "predict_line_" + overlap_typhoons[ti].typ_no + "_" + overlap_typhoons[ti].typ_name,
          polyline: {
            positions: new Cesium.Cartesian3.fromDegreesArray(prediction_points),
            material : new Cesium.PolylineDashMaterialProperty({
              color : Cesium.Color.BLUE,
              dashLength: 8.0
            }),
            width: 2,
            show: false
          }
        });
      }
      
      
      for (let oi = 0; oi < overlap_typhoons.length; oi++) {
        let start = Cesium.JulianDate.fromDate(
          new Date(overlap_typhoons[oi].typ_starttime)
        );
        let stop = Cesium.JulianDate.fromDate(
          new Date(overlap_typhoons[oi].typ_endtime)
        );
        //add tip_window line
        let line_id = "canvas_" + overlap_typhoons[oi].typ_no + "_" + overlap_typhoons[oi].typ_name;
        let line_canvas = document.getElementById(line_id);
        if(!line_canvas){
          line_canvas = document.createElement("canvas");
          line_canvas.id = line_id;
          viewer.container.appendChild(line_canvas);
        }
        line_canvas.style.display = "none";
        line_canvas.style["pointer-events"] = "none";
        //add tip_window        
        let tip_id = "tip_window_" + overlap_typhoons[oi].typ_no + "_" + overlap_typhoons[oi].typ_name;
        let tip_window = document.getElementById(tip_id);
        if(!tip_window){
          tip_window = document.createElement("div");
          tip_window.className = "tip_window";
          tip_window.id = tip_id;
          viewer.container.appendChild(tip_window);
          interact("#" + tip_window.id).draggable({
            onmove(event) {
              var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
                y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
              // translate the element
              target.style.webkitTransform = target.style.transform =
                "translate(" + x + "px, " + y + "px)";
              // update the posiion attributes
              target.setAttribute("data-x", x);
              target.setAttribute("data-y", y);
              target.is_picked = true;
            },
            onend(event) {
              var target = event.target;
              target.is_picked = false;
            }
          });
        }        
        tip_window.is_picked = false;
        tip_window.style.display = "none";
        tip_window.start_time = start;
        tip_window.end_time = stop;
        
        main.__addEntities({
          id:
            overlap_typhoons[oi].typ_no +
            "_" +
            overlap_typhoons[oi].typ_name +
            "_move_point",
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop
            })
          ]),
          position: new Cesium.CallbackProperty(function(time, result) {
            var cart2_pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
              viewer.scene,
              new Cesium.Cartesian3.fromDegrees(
                property_lng[oi].getValue(time),
                property_lat[oi].getValue(time)
              )
            );
            // show predict lines.
            let predict_line = viewer.entities.getById("predict_line_" + overlap_typhoons[oi].typ_no + "_" + overlap_typhoons[oi].typ_name);
            predict_line.polyline.show.setValue(true);
            
            let tyear = property_year[oi].getValue(time);
            let tmonth = property_month[oi].getValue(time);
            let tdate = Math.floor(property_date[oi].getValue(time));
            let thour = Math.floor(property_hour[oi].getValue(time));
            let tlng = property_lng[oi].getValue(time).toFixed(2);
            let tlat = property_lat[oi].getValue(time).toFixed(2);
            let tpress = property_press[oi].getValue(time).toFixed(2);
            let tspeed = property_speed[oi].getValue(time).toFixed(2);
            let tradius7 = property_radius_7[oi].getValue(time).toFixed(1);
            let tradius10 = property_radius_10[oi].getValue(time).toFixed(1);

            overlap_typhoons[oi].cart2_pos = cart2_pos;
            //for time graph
            overlap_typhoons[oi].playing_time = tyear + "-" + (tmonth < 10 ? "0" + tmonth : tmonth)  + "-" + (tdate < 10 ? "0" + tdate : tdate) + " " + (thour < 10 ? "0" + thour : thour) + ":00:00";            
            if(!overlap_typhoons[oi].norepeat && overlap_typhoons[oi].typ_endtime == overlap_typhoons[oi].playing_time){
              overlap_typhoons[oi].norepeat = 1;
              gBus.$emit("time", main.curPlayTyphoon.playing_time, main.curPlayTyphoon.typ_no); //chartTaifengtaganyujing.vue
              console.log("gBus-emit", "time");
              gBus.$emit("draw_taifengtaganyujing_table");
              console.log("gBus-emit", "draw_taifengtaganyujing_table");
            }
            let tips = document.getElementById(
              "tip_window_" +
                overlap_typhoons[oi].typ_no +
                "_" +
                overlap_typhoons[oi].typ_name
            );
            if (tips != null) {
              let rx, ry, x_diff, y_diff;
              let dx = tips.getAttribute("data-x") != null  ? tips.getAttribute("data-x") : 0,
                dy = tips.getAttribute("data-y") != null ? tips.getAttribute("data-y") : 0;
              rx = parseInt(tips.style.left) + parseInt(dx);
              ry = parseInt(tips.style.top) + parseInt(dy);
              x_diff = rx - cart2_pos.x;
              y_diff = ry - cart2_pos.y;
              // if (viewer.clock.shouldAnimate && !tips.is_picked) {
              if (!tips.is_picked) {
                tips.style.left = cart2_pos.x + off_x - dx + "px";
                tips.style.top = cart2_pos.y + off_y - dy + "px";
                x_diff = off_x;
                y_diff = off_y;
                rx = parseInt(tips.style.left);
                ry = parseInt(tips.style.top);
              }

              let cnv = document.getElementById(
                "canvas_" +
                  overlap_typhoons[oi].typ_no +
                  "_" +
                  overlap_typhoons[oi].typ_name
              );
              cnv.style.display = "block";
              cnv.style.position = "absolute";

              cnv.width = Math.abs(x_diff);
              cnv.height = Math.abs(y_diff);
              if (x_diff <= 0) {
                cnv.style.left = rx + "px";
              } else {
                cnv.style.left = cart2_pos.x + "px";
              }
              if (y_diff <= 0) {
                cnv.style.top = ry + "px";
              } else {
                cnv.style.top = cart2_pos.y + "px";
              }
              let context2D = cnv.getContext("2d");
              context2D.beginPath();
              context2D.lineWidth = 2;
              context2D.strokeStyle = "yellow";
              if ((x_diff <= 0 && y_diff >= 0) || (x_diff > 0 && y_diff < 0)) {
                context2D.moveTo(0, cnv.height);
                context2D.lineTo(cnv.width, 0);
              } else {
                context2D.moveTo(0, 0);
                context2D.lineTo(cnv.width, cnv.height);
              }
              context2D.stroke();
              // console.log(tips.id + ": typhoon id")
              let str_typ = "<p>台风名称：" + overlap_typhoons[oi].typ_name + "</p>";
              str_typ +=
                "<p>时间：" +
                tyear +
                "-" +
                tmonth +
                "-" +
                tdate +
                " " +
                thour +
                ":00:00" +
                "</p>";
              str_typ += "<p>经度：" + tlng + "</p>";
              str_typ += "<p>纬度：" + tlat + "</p>";
              str_typ += "<p>中心气压：" + tpress + "</p>";
              str_typ += "<p>最大风速：" + tspeed + "</p>";
              str_typ += "<p>十级风圈半径：" + tradius10 + "</p>";
              str_typ += "<p>七级风圈半径：" + tradius7 + "</p>";
              tips.style.display = "block";
              tips.innerHTML = str_typ;
              
              //remove other ended typhoons
              for (let b = 0; b < overlap_typhoons.length; b++) {
                let jtime = Cesium.JulianDate.fromDate(
                  new Date(overlap_typhoons[b].typ_endtime)
                );
                if (jtime < time) {
                  let tips_stopped = document.getElementById(
                    "tip_window_" +
                      overlap_typhoons[b].typ_no +
                      "_" +
                      overlap_typhoons[b].typ_name
                  );
                  if (tips_stopped != null) {
                    tips_stopped.style.display = "none";
                    tips_stopped.remove();
                  }
                  let cnv_stopped = document.getElementById(
                    "canvas_" +
                      overlap_typhoons[b].typ_no +
                      "_" +
                      overlap_typhoons[b].typ_name
                  );
                  if (cnv_stopped != null) {
                    cnv_stopped.style.display = "none";
                    cnv_stopped.remove();
                  }
                  //remove other typhoon's predict lines.
                  viewer.entities.removeById("predict_line_" + overlap_typhoons[b].typ_no + "_" + overlap_typhoons[b].typ_name);
                }
              }
            }
            return property_position[oi].getValue(time);
          }, false),
          point: {
            pixelSize: 12,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1
          }
        });
        var rotation = Cesium.Math.toRadians(30);
        function getRotationValue() {
          rotation += 0.05;
          return rotation;
        }
        main.__addEntities({
          id:
            overlap_typhoons[oi].typ_no +
            "_" +
            overlap_typhoons[oi].typ_name +
            "_layer_radius_7",
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop
            })
          ]),
          position: property_position[oi],
          billboard: new Cesium.BillboardGraphics({
            image: "static/images/tf1.gif",
            rotation: new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false),
            scale: 1
          }),
          ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(function(time, result) {
              return property_radius_7[oi].getValue(time) * 1000;
            }, false),
            semiMajorAxis: new Cesium.CallbackProperty(function(time, result) {
              return property_radius_7[oi].getValue(time) * 1000;
            }, false),
            material: Cesium.Color.GREEN.withAlpha(0.8),
            zIndex: 4
          }
        });
        main.__addEntities({
          id:
            overlap_typhoons[oi].typ_no +
            "_" +
            overlap_typhoons[oi].typ_name +
            "_layer_radius_10",
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop
            })
          ]),
          position: property_position[oi],
          ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(function(time, result) {
              return property_radius_10[oi].getValue(time) * 1000;
            }, false),
            semiMajorAxis: new Cesium.CallbackProperty(function(time, result) {
              return property_radius_10[oi].getValue(time) * 1000;
            }, false),
            material: Cesium.Color.RED.withAlpha(0.8),
            zIndex: 5
          }
        });
      }
    },
    getTyphoonRevision(typhoon) {
      //make typhoon data for per hour
      var points = typhoon.detail_info.points;
      var startdate = new Date(typhoon.typ_starttime);
      var stopdate = new Date(typhoon.typ_endtime);
      var diff = stopdate.valueOf() - startdate.valueOf();
      var diffInHours = diff / 1000 / 60 / 60 + 1; //plus start time
      var wpoints = [];
      for (var i = 0; i < diffInHours; i++) {
        var cur_time = new Date(startdate.getTime() + i * 60 * 60000);
        let wpt = {
          lat: 0,
          lng: 0,
          movedirection: "",
          movespeed: "",
          power: "",
          pressure: 0,
          radius7: "",
          radius10: "",
          radius12: "",
          speed: 18,
          strong: "",
          time: cur_time.toString(),
          replaced: false
        };
        wpoints.push(wpt);
      }
      for (var i = 1; i < points.length; i++) {
        for (var k = 0; k < wpoints.length; k++) {
          var otime = new Date(points[i].time);
          var wtime = new Date(wpoints[k].time);

          if (!wpoints[k].replaced && wtime.getTime() < otime.getTime()) {
            wpoints[k].lat = points[i - 1].lat;
            wpoints[k].lng = points[i - 1].lng;
            wpoints[k].movedirection = points[i - 1].movedirection;
            wpoints[k].movespeed = points[i - 1].movespeed;
            wpoints[k].power = points[i - 1].power;
            wpoints[k].pressure = points[i - 1].pressure;
            wpoints[k].radius7 = points[i - 1].radius7;
            wpoints[k].radius10 = points[i - 1].radius10;
            wpoints[k].radius12 = points[i - 1].radius12;
            wpoints[k].speed = points[i - 1].speed;
            wpoints[k].strong = points[i - 1].strong;
            wpoints[k].replaced = true;
          }
          if (!wpoints[k].replaced && wtime.getTime() == otime.getTime()) {
            wpoints[k].lat = points[i].lat;
            wpoints[k].lng = points[i].lng;
            wpoints[k].movedirection = points[i].movedirection;
            wpoints[k].movespeed = points[i].movespeed;
            wpoints[k].power = points[i].power;
            wpoints[k].pressure = points[i].pressure;
            wpoints[k].radius7 = points[i].radius7;
            wpoints[k].radius10 = points[i].radius10;
            wpoints[k].radius12 = points[i].radius12;
            wpoints[k].speed = points[i].speed;
            wpoints[k].strong = points[i].strong;
            wpoints[k].replaced = true;
          }
        }
      }
      typhoon.detail_info.points = wpoints;
      return typhoon;
    },
    getSamePeriodTyphoons(typhoon) {
      var overlap_typhoons = [];
      for (var i = 0; i < main.typhoonHistoryList.length; i++) {
        var comp_typhoon = main.typhoonHistoryList[i];

        var pstarttime = new Date(typhoon.typ_starttime); //current typhoon
        var pendtime = new Date(typhoon.typ_endtime); //current typhoon
        var cstarttime = new Date(comp_typhoon.typ_starttime); //rest typhoon
        var cendtime = new Date(comp_typhoon.typ_endtime); //rest typhoon
        if (
          (cstarttime >= pstarttime && cstarttime <= pendtime) ||
          (cendtime >= pstarttime && cendtime <= pendtime) ||
          (cstarttime <= pstarttime && cendtime >= pendtime)
        ) {
          overlap_typhoons.push(main.getTyphoonRevision(comp_typhoon));
        }
      }
      return overlap_typhoons;
    },    
    playing_pause_Typhoon:_.debounce(function(index, typhoon_data) {
      if(!main.curPlayTyphoon || main.curPlayTyphoon !== typhoon_data){
        main.clearMap();
        // play new
        main.curPlayTyphoon = typhoon_data;
        main.addTyphoon(typhoon_data);
        main.curPlayTyphoon.typ_playing = true;
        viewer.clock.shouldAnimate = true;
      }else if (main.curPlayTyphoon.typ_playing){
        // pause play
        main.curPlayTyphoon.typ_playing = false;
        viewer.clock.shouldAnimate = false;
        
        gBus.$emit("time", main.curPlayTyphoon.playing_time, main.curPlayTyphoon.typ_no); //chartTaifengtaganyujing.vue
        console.log("gBus-emit", "time");

        gBus.$emit("draw_taifengtaganyujing_table");
        console.log("gBus-emit", "draw_taifengtaganyujing_table");
      }else if (!main.curPlayTyphoon.typ_playing){
        // continue play
        main.curPlayTyphoon.typ_playing = true;
        viewer.clock.shouldAnimate = true;
      }
    },500),
    stopTyphoon(index, typhoon_data) {
        gBus.$emit("clearTime");
        if(main.curPlayTyphoon && main.curPlayTyphoon === typhoon_data){
            typhoon_data.typ_playing = false;
            viewer.clock.shouldAnimate = false;
            main.clearMap();
        }
    },
    // xinxizonglan_shebeiguanli
    show_el_line_110(value) {
      if (value === true) {
        main.__moveCam(main.nanjing_pos, main.cam_2500K);
        if (!main.xianlu_110){
          main.xianlu_110 = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
              id: "Towerline110",
              url: '/geoserver/wms',
              layers: "TowerLine110", // Here just give layer name from server
              parameters: {
                transparent: true,
                format: "image/png"
              }
            })
          );
        }
      } else {
        if (main.xianlu_110){
          viewer.imageryLayers.remove(main.xianlu_110);
          main.xianlu_110 = null;
        }
      }
      viewer.imageryLayers.raiseToTop(main.all_towers_layer);
    },
    show_el_line_220(value) {
      if (value === true) {
        main.__moveCam(main.nanjing_pos, main.cam_2500K);        
        if (!main.xianlu_220) {
          main.xianlu_220 = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
              id: "Towerline220",
              url: '/geoserver/wms',
              layers: "TowerLine220", // Here just give layer name from server
              parameters: {
                transparent: true,
                format: "image/png"
              }
            })
          );
        }
      } else {
        if (main.xianlu_220){
          viewer.imageryLayers.remove(main.xianlu_220);
          main.xianlu_220 = null;
        }
      }
      viewer.imageryLayers.raiseToTop(main.all_towers_layer);
    },
    show_el_line_500(value) {
      if (value === true) {
        main.__moveCam(main.nanjing_pos, main.cam_2500K);
        if (!main.xianlu_500){
          main.xianlu_500 = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
              id: "Towerline500",
              url: '/geoserver/wms',
              layers: "TowerLine500", // Here just give layer name from server
              parameters: {
                transparent: true,
                format: "image/png"
              }
            })
          );
        }
      } else {
        if (main.xianlu_500){
          viewer.imageryLayers.remove(main.xianlu_500);
          main.xianlu_500 = null;
        }
      }
      viewer.imageryLayers.raiseToTop(main.all_towers_layer);
    },
    show_el_line_800(value, cam_if) {
      if (value === true) {
        if (cam_if){
          main.__moveCam(main.nanjing_pos, main.cam_2500K);
        }
        if(!main.xianlu_800){
          main.xianlu_800 = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
              id: "Towerline800",
              url: '/geoserver/wms',
              layers: "typhoon:line_tower", // Here just give layer name from server
              parameters: {
                transparent: true,
                format: "image/png"
              }
            })
          );
        }
      } else {
        if (main.xianlu_800){
          viewer.imageryLayers.remove(main.xianlu_800);
          main.xianlu_800 = null;
        }
      }
      viewer.imageryLayers.raiseToTop(main.all_towers_layer);
    },
    show_el_line_1000(value, cam_if) {
      if (value === true) {
        if (cam_if){
          main.__moveCam(main.nanjing_pos, main.cam_2500K);
        }
        if(!main.xianlu_1000){
          main.xianlu_1000 = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider({
              id: "Towerline1000",
              url: '/geoserver/wms',
              layers: "typhoon:line_tower", // Here just give layer name from server
              parameters: {
                transparent: true,
                format: "image/png"
              }
            })
          );
        }
      } else {
        if (main.xianlu_1000){
          viewer.imageryLayers.remove(main.xianlu_1000, true);
          main.xianlu_1000 = null;
        }
      }
      viewer.imageryLayers.raiseToTop(main.all_towers_layer);
    },
    __getTowerDir(pTower, cTower, nTower) {
      const GE_PI = Math.PI;
      const GE_PI2 = Math.PI / 2;
      const GE_PI4 = Math.PI / 4;
      const GE_2PI = Math.PI * 2;
      const GE_DEG270 = Math.PI + Math.PI / 2;
      let a = 0.0,
        ap = 0.0,
        an = 0.0;

      if (pTower == undefined) {
        // if start point
        a =
          main.__getAngle(cTower.lat, cTower.lng, nTower.lat, nTower.lng) + GE_PI2;
      } else if (nTower == undefined) {
        // if end point
        a =
          main.__getAngle(pTower.lat, pTower.lng, cTower.lat, cTower.lng) + GE_PI2;
      } else {
        // if middle point
        ap = main.__getAngle(cTower.lat, cTower.lng, pTower.lat, pTower.lng);
        an = main.__getAngle(cTower.lat, cTower.lng, nTower.lat, nTower.lng);
        a = (ap + an) / 2;
        if (an > ap) a -= GE_PI;
      }
      // normalize angle
      if (a > GE_2PI) {
        let n = Math.floor(a / GE_2PI);
        a -= GE_2PI * n;
      }
      return a;
    },
    __getAngle(x1, y1, x2, y2) {
      const GE_PI = Math.PI;
      const GE_PI2 = Math.PI / 2;
      const GE_PI4 = Math.PI / 4;
      const GE_2PI = Math.PI * 2;
      const GE_DEG270 = Math.PI + Math.PI / 2;
      let a = x1 - x2;
      let b = y1 - y2;
      if (a == 0) {
        if (b == 0.0) {
          return 0.0;
        }
        return b > 0.0 ? GE_PI2 : GE_DEG270;
      } else {
        if (b == 0.0) {
          return a > 0.0 ? 0.0 : GE_PI;
        }
        if (a > 0.0) {
          if (b > 0.0) {
            return Math.atan(b / a);
          } else {
            return Math.atan(b / a) + GE_2PI;
          }
        } else {
          return Math.atan(b / a) + GE_PI;
        }
      }
    },
    getSelectedTowerModel(tower) {
      //check model type----------------------
      let model_name = '';
      let simpletype = '';
      if(tower.typename && tower.simpletype){
        simpletype = tower.simpletype.split("-")[3];
        model_name = tower.evvoltage + tower.typename + "-" + simpletype;
      }
      
      //get model from model name ---------------------------
      let currentModel = main.el_tower_models.filter(model => model_name === model.name)[0];
      if(!currentModel){
        currentModel = main.el_tower_models[0];//default model
      }
      //-----------------------------------------------------
      //--------------------------------------
      return currentModel;
    },
    draw_all_el_towers(towers, tower, blink_flag) {  
      
      console.log(towers, "all towers");
        // clean screen      
      main.clearMap();      
      // get heights of the towers.
      main.tower_baseline_entity = null;
      let carto_positions = [];
      
      for (let i = 0; i < towers.length; i++) {
        carto_positions.push(
          Cesium.Cartographic.fromDegrees(
            towers[i].lng,
            towers[i].lat,
            0
          )
        );        
      }
      
      
      viewer.scene.requestRender();
      // move cam.      
      if(!tower){
        main.__moveCam(
            { lng: towers[0].lng, lat: towers[0].lat },
            main.cam_500K,
            checkVisibles, true
          );
      }else{
        main.__moveCam(
            { lng: towers[0].lng, lat: towers[0].lat },
            main.cam_10K,
            checkVisibles, true
          );
      }
      
      Cesium.sampleTerrainMostDetailed(
          viewer.terrainProvider,
          carto_positions
        ).then(function(positions) {
          // line for connect towers;
          
          let lines = [];
          let temp_lines = [];
          let baseLine = [];
          main.baselinepoint_entities = [];
          for (var i = 0; i < towers.length; i++) {
            // set towers addtional information
            towers[i].radian = main.__getTowerDir(
              towers[i - 1],
              towers[i],
              towers[i + 1]
            );            
            towers[i].z_pos = positions[i].height;
            
            towers[i].tower_color = Cesium.Color.ALICEBLUE;
            towers[i].id = "el_tower_on_line_" + towers[i].evid;
            towers[i].model = main.getSelectedTowerModel(towers[i]);
            
            let currentModel = towers[i].model;
            // draw towers
            main.add_el_tower(towers[i]);
            // ready for draw baseline
            baseLine.push(1.0 *(towers[i].lng));
            baseLine.push(1.0 *(towers[i].lat));
            baseLine.push(towers[i].z_pos);

            // ready for draw lines
            viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
            var startTime = viewer.clock.startTime;
            var midTime = Cesium.JulianDate.addSeconds(startTime, 43200, new Cesium.JulianDate());
            var stopTime = Cesium.JulianDate.addSeconds(startTime, 86400, new Cesium.JulianDate());
            let sPt, mPt, ePt;
            let center, pt1, pt2;

            for (let k = 0; k < currentModel.units.length-1; k++) {
              // draw line of the between towers
              if(i > 0 && (currentModel.units[k].type == 0 || currentModel.units[k].type == 1)) {
                let n = -1;
                if(currentModel.name == towers[i-1].model.name) {
                  if(currentModel.units[k].type == 1) {
                    for(let m=k+1; m<towers[i-1].model.units.length; m++) {
                      if(towers[i-1].model.units[m].type == 3){
                        n = m;
                        break;
                      }
                    }
                  } else {
                    n = k;
                  }
                } else {
                  if(currentModel.units[k].type == 0) {
                    if(currentModel.name == "±800kV直线-T字.glb")
                      n = k * 4 + 3;
                    else
                      n = k * 3 + 2;
                  } else {
                    if(currentModel.name == "±800kV直线-T字.glb")
                      n = k / 4;
                    else
                      n = k / 3;
                  }
                  console.log(n, "n");
                }
                
                if(n < 0)
                  continue;

                center = ComputeLatLng(towers[i-1].lat, towers[i-1].lng, towers[i-1].radian, towers[i-1].model.units[n].x_b_dist);
                pt1 =  ComputeLatLng(center[0], center[1], towers[i-1].radian - Math.PI / 2 , towers[i-1].model.units[n].y_b_dist);
                sPt = Cesium.Cartesian3.fromDegrees(pt1[1], pt1[0], towers[i-1].model.units[n].z_b_dist + 1.0 * towers[i-1].z_pos);

                center = ComputeLatLng(towers[i].lat, towers[i].lng, towers[i].radian, currentModel.units[k].x_b_dist);
                pt2 =  ComputeLatLng(center[0], center[1], towers[i].radian - Math.PI / 2 , currentModel.units[k].y_b_dist);
                ePt = Cesium.Cartesian3.fromDegrees(pt2[1], pt2[0], currentModel.units[k].z_b_dist + 1.0 * towers[i].z_pos);
                mPt = Cesium.Cartesian3.fromDegrees((pt1[1]+pt2[1])/2, 
                                                  (pt1[0]+pt2[0])/2,
                                                  (currentModel.units[k].z_b_dist+towers[i-1].model.units[n].z_b_dist)/2 + (towers[i].z_pos+towers[i-1].z_pos)/2 - 7);
                var property = new Cesium.SampledPositionProperty();
                property.addSample(startTime, sPt);
                property.addSample(midTime, mPt);
                property.addSample(stopTime, ePt);
                var arcEntity = viewer.entities.add({
                  position : property,
                  path : {
                      resolution : 500,
                      material: Cesium.Color.fromCssColorString(
                        currentModel.units[k].color
                      ),
                      width : 1,
                      leadTime: 1e10,
                      trailTime: 1e10
                  }
                });
                arcEntity.position.setInterpolationOptions({
                  interpolationDegree : 5,
                  interpolationAlgorithm : Cesium.LagrangePolynomialApproximation
                });

              } else if(i == 0 && currentModel.units[k].type == 0)
                continue;

              // draw tower inside line
              center = ComputeLatLng(towers[i].lat, towers[i].lng, towers[i].radian, currentModel.units[k].x_b_dist);
              //let right = ComputeLatLng(center[0], center[1], Math.PI / 2 + towers[i].radian , y_b_dist);
              pt1 =  ComputeLatLng(center[0], center[1], towers[i].radian - Math.PI / 2 , currentModel.units[k].y_b_dist);
              //pt1 =  ComputeLatLng(center[0], center[1], Math.PI / 2 + towers[i].radian , currentModel.units[k].y_b_dist);
              sPt = Cesium.Cartesian3.fromDegrees(pt1[1], pt1[0], currentModel.units[k].z_b_dist + 1.0 * towers[i].z_pos);
              
              if(currentModel.units[k+1].type != 1) {
                pt2 =  ComputeLatLng(center[0], center[1], towers[i].radian - Math.PI / 2 , currentModel.units[k+1].y_b_dist);
              }else
                continue;
              ePt = Cesium.Cartesian3.fromDegrees(pt2[1], pt2[0], currentModel.units[k+1].z_b_dist + 1.0 * towers[i].z_pos);
              mPt = Cesium.Cartesian3.fromDegrees((pt1[1]+pt2[1])/2, 
                                                  (pt1[0]+pt2[0])/2,
                                                  (currentModel.units[k].z_b_dist+currentModel.units[k+1].z_b_dist)/2 + 1.0 * towers[i].z_pos - 2);
              var property = new Cesium.SampledPositionProperty();
              property.addSample(startTime, sPt);
              property.addSample(midTime, mPt);
              property.addSample(stopTime, ePt);
              var arcEntity = viewer.entities.add({
                position : property,
                path : {
                    resolution : 500,
                    material: Cesium.Color.fromCssColorString(
                      currentModel.units[k].color
                    ),
                    width : 1,
                    leadTime: 1e10,
                    trailTime: 1e10
                }
              });
              arcEntity.position.setInterpolationOptions({
                interpolationDegree : 5,
                interpolationAlgorithm : Cesium.LagrangePolynomialApproximation
              });
            }
            
            // add blink point
            if(blink_flag){
              main.baselinepoint_entities.push(main.__addEntities({
                id: "el_tower_baselinepoint_" + i,
                position: Cesium.Cartesian3.fromDegrees(towers[i].lng, towers[i].lat, towers[i].z_pos),
                point: {
                  pixelSize: 10,
                  color: Cesium.Color.YELLOW,
                  disableDepthTestDistance: Number.POSITIVE_INFINITY,
                  show: false
                }
              }));
            }
          }
          // draw base line
          main.tower_baseline_entity = main.__addEntities({
            id: "el_tower_baseline",
            polyline: {
              positions: new Cesium.Cartesian3.fromDegreesArrayHeights(
                baseLine
              ),
              material: Cesium.Color.RED,
              width: 2,
              show: false
            }
          });
          // blink base line
          if (blink_flag){
            main.blink_line_interval = setInterval(() => {
              if (main.tower_baseline_entity.polyline.material.color.getValue().green == 0) {
                main.tower_baseline_entity.polyline.material.color.setValue(Cesium.Color.YELLOW);                
                for(let i = 0; i < towers.length; i++){
                  let point_en = viewer.entities.getById("el_tower_baselinepoint_" + i);
                  if (point_en){
                    point_en.point.color.setValue(Cesium.Color.RED);
                  }
                }
              } else {                
                main.tower_baseline_entity.polyline.material.color.setValue(Cesium.Color.RED);
                for(let i = 0; i < towers.length; i++){
                  let point_en = viewer.entities.getById("el_tower_baselinepoint_" + i);
                  if (point_en){
                    point_en.point.color.setValue(Cesium.Color.YELLOW);
                  }
                }
              }
              viewer.scene.requestRender();
            }, 500);

            if (tower){
              main.draw_blink_circle(tower);
            }
          }
          // draw lines
          main.tower_line_entities = [];
          for (let p = 0; p < lines.length; p++) {
            main.tower_line_entities.push(main.__addEntities({
              id: "el_tower_line_" + p,
              polyline: {
                positions: new Cesium.Cartesian3.fromDegreesArrayHeights(
                  lines[p]
                ),
                material: Cesium.Color.fromCssColorString(
                  currentModel.units[p].color
                ),
                width: 1,
                show: false
              }
            }));
          }          
          main.el_towers_on_line = towers;
          console.log(main.el_towers_on_line, 'main.el_towers_on_line!!!')
          if (tower){
            main.show_el_tower_info(tower, null, true);
          }
          viewer.scene.requestRender();
          setTimeout(function(){main.clickable = true;main.loadingData = false;}, 1000)
        });
    },
    add_el_tower(el_tower) {
      
      if (el_tower.lng === undefined) el_tower.lng = el_tower.lon;
      let position = Cesium.Cartesian3.fromDegrees(
        el_tower.lng,
        el_tower.lat,
        el_tower.z_pos
      );
      let heading = el_tower.radian; //Cesium.Math.toRadians(tower.radian);
      let hpr = new Cesium.HeadingPitchRoll(heading, 0, 0);
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position, hpr
      );

      let currentModel = el_tower.model;
      
      main.__addEntities({
        id: el_tower.id,
        position: position,
        orientation: orientation,
        model: {
          uri: currentModel.url,
          shadows: Cesium.ShadowMode.DISABLED,
          color: el_tower.tower_color,
          scale: currentModel.scale,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            main.cam_5K
          )
        },
        label: {
          show: false,
          text: el_tower.towernumber,
          font: "18px SimHei",
          fillColor: Cesium.Color.BROWN,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3.0,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, 20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            main.cam_5K
          )
        }
      });      
    },
    show_el_tower_info(item, index){
      if (!main.el_towers_on_line){
        setTimeout(function(){
          main.show_el_tower_info(item, index);
        }, 1000);
        return;
      }
      if (main.el_tower_sel){
        main.el_tower_sel._model._color._value = Cesium.Color.ALICEBLUE;
          main.el_tower_sel._label._show._value = false;
      }

      main.el_tower_sel = viewer.entities.getById("el_tower_on_line_" + item.evid);
      if(main.el_tower_sel){
        let cur_zpos = 0;
        if(index != null){
          cur_zpos = main.el_towers_on_line[index].z_pos;
        }else{
          for (var i = 0; i < main.el_towers_on_line.length; i++){
            if(main.el_towers_on_line[i].evid = item.evid){
              cur_zpos =  main.el_towers_on_line[i].z_pos;
              break;
            }
          }
        }
        main.el_tower_sel._model._color._value = Cesium.Color.AQUA;
        main.el_tower_sel._label._show._value = true;
        viewer.scene.requestRender();
        
        main.__moveCam({lng:item.lng, lat:item.lat}, cur_zpos + main.cam_500, checkVisibles, true);

        main.show_el_tower_detail = true; //show tankuang dialog.        
        gBus.$emit("get_el_tower_info", item.evid, true, 111);
      }
    },
    add_micro_tower(tower, cam_dist) {
      main.micro_towers.push(tower);
      let position = new Cesium.Cartesian3.fromDegrees(tower.lon, tower.lat);
      return main.__addEntities({
        id: "micro_tower_" + tower.evid, //evid = micro tower id
        position: position,
        billboard: {
          image: "static/images/honghuang.png",
          scale: 1,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            main.cam_2500K
          )
        },
        label: {
          text: tower.text,
          font: "18px SimHei",
          fillColor: Cesium.Color.MEDIUMVIOLETRED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3.0,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, 20),
          
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            (cam_dist)? cam_dist:main.cam_50K
          )
        }
      });
    },
    add_micro_tower_tip(mtower) {
      if(main.selected_micro_tower){
        let towerEntity = viewer.entities.getById("micro_tower_" + main.selected_micro_tower.evid);
        if (towerEntity){
          towerEntity._billboard._image._value = "static/images/honghuang.png";
        }
        main.selected_micro_tower = null;
      }

      let position = new Cesium.Cartesian3.fromDegrees(mtower.lon, mtower.lat);
      let micro_tower_tip = document.getElementById("micro_tower_tip");
      if (micro_tower_tip == null) {
        micro_tower_tip = document.createElement("div");        
        micro_tower_tip.setAttribute("id", "micro_tower_tip");
        viewer.container.appendChild(micro_tower_tip);
        interact("#micro_tower_tip").draggable({
          onmove(event) {
            var target = event.target,
              // keep the dragged position in the data-x/data-y attributes
              x =
                (parseFloat(target.getAttribute("data-x")) || 0) +
                event.dx,
              y =
                (parseFloat(target.getAttribute("data-y")) || 0) +
                event.dy;
            // translate the element
            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";
            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
            
          }
        });
      }
      micro_tower_tip.style.display = 'none';
      micro_tower_tip.setAttribute('data-x', 0);
      micro_tower_tip.setAttribute('data-y', 0);
      micro_tower_tip.style.transform = 'translate(0,0)';
      main.__moveCam(
        { lng: mtower.lon, lat: mtower.lat },
        main.cam_500,
        function() {
          main
            .$http({
              url: main.$http.adornUrl(
                "/fcjc/evdatamicroclimatesite/getLastMonitorData?evid=" +
                  mtower.evid
              ),
              method: "get",
              params: main.$http.adornParams()
            })
            .then(res => {
              let micro_tower_info = res.data.evdataMicroclimatesite;
              let cart2_micro_pos = new Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                position
              );
              
              micro_tower_tip.className = "micro_tip_window";              
              micro_tower_tip.setAttribute("data-evid", mtower.evid);
              micro_tower_tip.style.left = cart2_micro_pos.x + 10 + "px";
              micro_tower_tip.style.bottom = cart2_micro_pos.y + 10 + "px";

              let str_micro = "<p>微气象站点编号：" +
                micro_tower_info.evsiteid +
                "</p>" +
                "<p>所在线路：" +
                micro_tower_info.evpowerlinename +
                "</p>" +
                "<p>最大风速：" +
                micro_tower_info.max_windspeed +
                "m/s" +
                "</p>" +
                "<p>标准风速：" +
                micro_tower_info.evbzfs +
                "m/s" +
                "</p>" +
                "<p>极大风速：" +
                micro_tower_info.evjdfs +
                "m/s" +
                "</p>" +
                "<p>气温：" +
                micro_tower_info.evqw +
                "℃" +
                "</p>" +
                "<p>气压：" +
                micro_tower_info.evqy +
                "hPa" +
                "</p>" +
                "<p>相对湿度：" +
                micro_tower_info.evxdsd +
                "%RH" +
                "</p>" +
                "<p>降雨量：" +
                micro_tower_info.evjyl +
                "mm" +
                "</p>" +
                "<p>降水强度：" +
                micro_tower_info.evjsqd +
                "mm/min" +
                "</p>" +
                "<p>十分钟平均风向：" +
                micro_tower_info.evaveragefx +
                "度" +
                "</p>" +
                "<p>十分钟平均风速：" +
                micro_tower_info.evaveragefs +
                "m/s" +
                "</p>" +
                "<p>光照辐射强度：" +
                micro_tower_info.evgzfsqd +
                "W/㎡" +
                "</p>" +
                "<p>最近一次监测时间：" +
                micro_tower_info.evlastmonitortime +
                "</p>" +
                "<p>设备投运时间：" +
                micro_tower_info.evstarttime +
                "</p>";
              micro_tower_tip.innerHTML = str_micro;
              micro_tower_tip.style.display = "block";
              main.selected_micro_tower = mtower;
              let towerEntity = viewer.entities.getById("micro_tower_" + mtower.evid);
              if (towerEntity){
                towerEntity._billboard._image._value = "static/images/lanhei.png";
              }
            });
        }
      );
    },
    // fengchangjiance_weiqixiangzaixianjiance
    // fengchangjiance_leidajiance
    drawRadar(position, radius, length) {
      var longRadar = main.__addEntities({
        id: "radar_long",
        position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 0),
        cylinder: {
          length: length,
          topRadius: radius,
          bottomRadius: 0.0,
          material: Cesium.Color.BLACK.withAlpha(0.3),
          numberOfVerticalLines: 12,
          outline: true,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          outlineColor: Cesium.Color.WHITE
        }
      });
      var midRadar = main.__addEntities({
        id: "radar_mid",
        position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 0),
        cylinder: {
          length: (length * 2) / 3,
          topRadius: (radius * 2) / 3,
          bottomRadius: 0.0,
          material: Cesium.Color.BLACK.withAlpha(0.2),
          numberOfVerticalLines: 12,
          fill: false,
          outline: true,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          outlineColor: Cesium.Color.WHITE
        }
      });
      var shortRadar = main.__addEntities({
        id: "radar_short",
        position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 0),
        cylinder: {
          length: length / 3,
          topRadius: radius / 3,
          bottomRadius: 0.0,
          material: Cesium.Color.BLACK.withAlpha(0.2),
          numberOfVerticalLines: 12,
          fill: false,
          outline: true,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          outlineColor: Cesium.Color.WHITE
        }
      });
    },
    getPoint(lat, lng, r, deg) {
      let lat2, lon2;
      lat2 = (r / 111230) * Math.cos(Cesium.Math.toRadians(deg));
      lat2 += lat;
      lon2 = (r / 111230) * Math.sin(Cesium.Math.toRadians(deg));
      lon2 = lon2 * (1 / Math.cos(Cesium.Math.toRadians(lat2)));
      lon2 += lng;
      return { lat: lat2, lng: lon2 };
    },
    drawDistanceLabel(pos_radar,
      ev_degree,
      ev_radius,
      radar_radius,
      radar_length,
      id) {
      let pos_event = main.getPoint(
        pos_radar.lat,
        pos_radar.lng,
        ev_radius,
        ev_degree
      );
      let left = Cesium.Cartesian3.fromDegrees(pos_radar.lng, pos_radar.lat);
      let right = Cesium.Cartesian3.fromDegrees(pos_event.lng, pos_event.lat);
      let dist = Cesium.Cartesian3.distance(left, right);

      let radian = Math.atan2(radar_length, radar_radius);
      let height = Math.tan(radian) * dist;

      main.__addEntities({
        id: "radar_label_" + id,
        position: Cesium.Cartesian3.fromDegrees(
          pos_event.lng,
          pos_event.lat,
          height
        ),
        label: new Cesium.LabelGraphics({
          text: id,
          font: "20px SimHei",
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          fillColor: Cesium.Color.YELLOW,
          pixelOffset: new Cesium.Cartesian2(0, -5),
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        })
      });
    },
    __hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
    },
    drawRadarBox(box_data) {
      let pos_radar = box_data.pos_radar,
          ev_degree = box_data.ev_degree,
          ev_radius = box_data.ev_radius,
          radar_radius = box_data.radar_radius,
          radar_length = box_data.radar_length,
          color = box_data.color,
          id = box_data.id
      let pos_event = main.getPoint(
        pos_radar.lat,
        pos_radar.lng,
        ev_radius,
        ev_degree
      );
      let left = Cesium.Cartesian3.fromDegrees(pos_radar.lng, pos_radar.lat);
      let right = Cesium.Cartesian3.fromDegrees(pos_event.lng, pos_event.lat);
      let dist = Cesium.Cartesian3.distance(left, right);
      let radian = Math.atan2(radar_length, radar_radius);
      let height = Math.tan(radian) * dist;
      let boxSize = ev_radius * 0.0001;
      boxSize = 8 + Math.floor(boxSize);
      let cColor = main.__hexToRgb("#" + color);
      let strColor = "rgb(" + cColor.r + "," + cColor.g + "," + cColor.b + ")";
      let svgDataDeclare = "data:image/svg+xml,";      
      let svgRect =
        "<rect x='0px' y='0px' width='" + boxSize + "px' height='" + boxSize + "px' fill='" + strColor + "' />";
      let svgPrefix =
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + boxSize + 'px" height="' + boxSize + 'px" xml:space="preserve">';
      let svgSuffix = "</svg>";
      let svgString = svgPrefix + svgRect + svgSuffix;
      let svgEntityImage = svgDataDeclare + svgString;
      main.radar_data.push(id);
      main.__addEntities({
        id: id,
        position: Cesium.Cartesian3.fromDegrees(
          pos_event.lng,
          pos_event.lat,
          height
        ),
        billboard: {
          image: svgEntityImage,
          scale: 1,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            main.cam_2500K
          )
        }
      });
    },
    // zaihaiyujing_fengchangyubao
    _initZaihaiyujing() {
      //preloading fengsum jiangsu kml data
      if (main.fs_datasource == null)
        main.fs_datasource = new Cesium.KmlDataSource();
      if (main.js_datasource == null)
        main.js_datasource = new Cesium.KmlDataSource();

      axios
        .get(
          main.$http.adornUrl(
            "/zhyj/evdatajcdsjyjxzqh/getFsJsKmlPath?element=wind&evreceive=1"
          )
        )
        .then(res => {
          if (res.data.code === 0) {
            // console.log(res.data, "res.data datasource")
            main.fszhuantitu = res.data.path.substr(
              res.data.path.indexOf("fcyb")
            );
            // console.log(main.fszhuantitu, "fszhuantitu")
            main.fs_datasource.load("/typhoon/" + main.fszhuantitu);
          }
        });
      axios
        .get(
          main.$http.adornUrl(
            "/zhyj/evdatajcdsjyjxzqh/getFsJsKmlPath?element=rain&evreceive=1"
          )
        )
        .then(res => {
          if (res.data.code === 0) {
            main.jszhuantitu = res.data.path.substr(
              res.data.path.indexOf("fcyb")
            );
            main.js_datasource.load("/typhoon/" + main.jszhuantitu);
          }
        });
    },
    dangqianfengyangyubao(time) {
      // console.log(time);
      let time_x = time + "";
      axios
        .get(
          main.$http.adornUrl(
            "/zhyj/evdatajcdsjyjxzqh/getMaxSpeedRainByXZQ?evreceive=" + time_x
          )
        )
        .then(res => {
          if (res.data.code === 0) {
            let detail = res.data.list;
            main.datadqwind = [];
            main.datadqrain = [];
            main.datadqchengshi = [];
            for (var j in detail) {
              main.datadqwind.push(detail[j].maxwindspeed);
              main.datadqrain.push(detail[j].maxrain);
              main.datadqchengshi.push(detail[j].cityname);
            }
          }
        });
      if (time === 0) {
        main.time_24 = 24;
        main.time_48 = 48;
        main.time_72 = 72;
      } else if (time <= 24) {
        main.time_24 = time;
        main.time_48 = 48;
        main.time_72 = 72;
      } else if (time > 24 && time <= 48) {
        main.time_48 = time;
        main.time_24 = 24;
        main.time_72 = 72;
      } else if (time > 48 && time <= 72) {
        main.time_72 = time;
        main.time_24 = 24;
        main.time_48 = 48;
      }
    }, // 风场预报
    fengsu_show() {
      if (viewer.dataSources.contains(main.fs_datasource)) {
        viewer.dataSources.remove(main.fs_datasource);
      }
      if (viewer.dataSources.contains(main.js_datasource)) {
        viewer.dataSources.remove(main.js_datasource);
      }
      if (main.check_wind && main.windy != null) {
        clearInterval(main.interval);
        main.windy.removeLines();
        main.windy = null;
      }
      document.getElementById("fengsu_show").style.backgroundColor = "#2839FF";
      document.getElementById("jaingshui_show").style.backgroundColor =
        "#69A8E2";
      main.checked = false;
      main.check_wind = false;
      main.wind_show = true;      
      main.fstbutton = true;
      main.jstbutton = false;
      viewer.scene.requestRender();
    },
    jaingshui_show() {
      if (viewer.dataSources.contains(main.fs_datasource)) {
        viewer.dataSources.remove(main.fs_datasource);
      }
      if (viewer.dataSources.contains(main.js_datasource)) {
        viewer.dataSources.remove(main.js_datasource);
      }
      document.getElementById("fengsu_show").style.backgroundColor = "#69A8E2";
      document.getElementById("jaingshui_show").style.backgroundColor =
        "#2839FF";
      main.checked = false;
      main.wind_show = false;
      if (main.check_wind && main.windy != null) {
        clearInterval(main.interval);
        main.windy.removeLines();
        main.windy = null;
      }
      main.jstbutton = true;
      main.fstbutton = false;
      viewer.scene.requestRender();
    },
    zhuantitu() {
      if (main.checked == true) {
        if (
          main.fstbutton == true &&
          !viewer.dataSources.contains(main.fs_datasource)
        ) {
          viewer.dataSources.add(main.fs_datasource);
          let entities = main.fs_datasource.entities.values;
          for (var i = 0; i < entities.length; i++) {
            let entity = entities[i];
            let pColor = entity.polygon.material.color.getValue();
            entity.polygon.material = new Cesium.Color(
              pColor.red,
              pColor.green,
              pColor.blue
            ).withAlpha(0.3);
            entity.polygon.outline = true;
          }
        }
        if (
          main.jstbutton == true &&
          !viewer.dataSources.contains(main.js_datasource)
        ) {
          viewer.dataSources.add(main.js_datasource);
          let entities = main.js_datasource.entities.values;
          for (var i = 0; i < entities.length; i++) {
            let entity = entities[i];
            let pColor = entity.polygon.material.color.getValue();
            entity.polygon.material = new Cesium.Color(
              pColor.red,
              pColor.green,
              pColor.blue
            ).withAlpha(0.3);
            entity.polygon.outline = true;
          }
        }
      } else {
        if (viewer.dataSources.contains(main.fs_datasource)) {
          viewer.dataSources.remove(main.fs_datasource);
        }
        if (viewer.dataSources.contains(main.js_datasource)) {
          viewer.dataSources.remove(main.js_datasource);
        }
      }
      viewer.scene.requestRender();
    },
    //implement of windy effect
    reqDynamicWind() {
      main.windy = null;

      function redraw() {
        main.interval = setInterval(function() {
          main.windy.animate();
        }, 100);
      }
      function createRect(west, south, east, north) {
        viewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: [
              getRectInstance(
                Cesium.Rectangle.fromDegrees(west, south, east, north)
              )
            ],
            appearance: new Cesium.PolylineColorAppearance({
              translucent: false
            })
          })
        );
      }
      function getRectInstance(rect) {
        return new Cesium.GeometryInstance({
          geometry: new Cesium.RectangleOutlineGeometry({
            rectangle: rect
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.RED
            )
          }
        });
      }
      
      Cesium.Resource.fetchJson(main.$http.adornUrl("/generator/airflow/getwind")).then(function(
        uvdata
      ) {
        let header = uvdata[0].header;
        main.windy = new Windy(uvdata, viewer);
        redraw();
      });
    },
    fengchangliuxiantu() {
      if (main.check_wind) {
        main.reqDynamicWind();
      } else {
        clearInterval(main.interval);
        main.windy.removeLines();
      }
    },
    // zaihaiyujing_taganlixuepinggu
    show_el_tower_physics(tower, index){

        //var url = "http://47.104.174.116:8081/typhoon/gtlxpg/" + tower[0] + "/" + tower[4] + "/" + tower[3] + ".pdf";
        console.log(tower, 'for showing physics'); //tower[9]: typename
        var pdfUrl = '/typhoon/gtlxpg/';
        if(tower[9] === "直线"){
          pdfUrl += tower[0] + '/' + tower[4] + '/' + tower[3] + ".pdf";
        }else{//耐张
          pdfUrl += 'noexist.pdf';
        }
        // var importUrl = "static/pdf/web/viewer.html?file=" + (pdfUrl);
        console.log(pdfUrl, 'pdfurl')
        let tower_cap = {
          evloopname: tower[0],
          text: tower[1],
          evid: tower[3],
          lng: tower[5],
          lat: tower[6]
        }        
        document.getElementById("example1").src = pdfUrl;
        main.pdf = true;        
        main.show_el_tower_info(tower_cap, index);       
      },
    // zaihaiyujing_zhongyaotongdaoxianlu
    draw_predict_main_towers(towers) {
      main.predict_main_towers = towers;
      // for (let i = 0; i < towers.length; i++) {
      //   let position = Cesium.Cartesian3.fromDegrees(
      //     towers[i].lng,
      //     towers[i].lat,
      //     0
      //   );
      //   main.predict_main_towers[i].id =
      //     "prediction_main_tower_" + towers[i].evtowerid;
      //   //add prediction line
      //   main.__addEntities({
      //     id: "prediction_main_tower_" + towers[i].evtowerid,
      //     position: position,
      //     billboard: {
      //       image: towers[i].bgImg,
      //       scale: 0.7,
      //       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //         0,
      //         main.cam_5000K
      //       ),
      //       show: true
      //     },
      //     label: {
      //       pixelOffset: new Cesium.Cartesian2(0, -30),
      //       text: towers[i].text,
      //       font: "18px SimHei",
      //       fillColor: Cesium.Color.BROWN,
      //       outlineColor: Cesium.Color.WHITE,
      //       outlineWidth: 3.0,
      //       style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //       disableDepthTestDistance: Number.POSITIVE_INFINITY,
      //       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //         main.cam_5K, main.cam_5000K
      //       ),
      //       show: true
      //     }
      //   });
      //   viewer.scene.requestRender();
      // }
    },
    // zaihaiyujing_qitatongdaoxianlu
    // yunweiguanli_changqiyujing
    // yunweiguanli_yujingxinxifabu
    // yunweiguanli_zhibangongzuojilu

    /** Local functions */
    /* cesium init function(Local) */
    _initCesium() {
      viewer.scene.debugShowFramesPerSecond = true;
      viewer.scene.requestRenderMode = true;
      viewer.scene.maximumRenderTimeChange = Infinity;
      $(".cesium-viewer-bottom").css("visibility", "hidden");
      let layers = viewer.imageryLayers;
      let baseLayer = layers.get(0);
      layers.remove(baseLayer);
      //mapbox
      // layers.addImageryProvider(new Cesium.MapboxImageryProvider({
      //     mapId: 'mapbox.satellite',
      //     accessToken: 'pk.eyJ1Ijoic2VsaXMiLCJhIjoiY2pvbzZrcmtmMDA0dzNwcXNtcDRlNWV5cCJ9.VK3zv_k9wN3lGYO82qusDw'
      // }));
      //高德
      layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider(
        {
          url: "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          subdomains: ["1", "2", "3", "4"]
          })
        );
      //加载本地离线地图
      // layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //   url: "本地离线切片服务地址"
      // }));
      layers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          id: "TowerInLine",
          url: '/geoserver/wms',
          layers: "typhoon:line_tower",
          parameters: {
            transparent: true,
            format: "image/png"
          }
        })
      );
      main.all_towers_layer = layers.get(1);
      main.all_towers_layer.alpha = 0.0;
      layers.raiseToTop(main.all_towers_layer);
      
      // layers.lowerToBottom(main.wmsSourceTower);
      // main.clippingPlanes = new Cesium.ClippingPlaneCollection({
      //     planes : [
      //         new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.0, 0.0), 5.0)
      //     ],
      // });
      
      //在线瓦片
      viewer.terrainProvider = Cesium.createWorldTerrain();
      //离线瓦片
      // viewer.scene.terrainProvider =new Cesium.CesiumTerrainProvider({
      //         url: "/wzf_terrain/"
      // });
    },
    _initGlobal(){
      main.ch4 = true;
      main.ch5 = true;
      // main.show_el_line_800(true, false);
      main.show_el_line_1000(true, false);
    },
    _addCesiumEvents() {
      //add mouse handler on cesium
      let picked = false;
      let pickedEntity;
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      handler.setInputAction(wheel => {
        checkVisibles();
        let tip_add_window = document.getElementById("tip_add_window");
        let cnv_line = document.getElementById("cnv_line");
        let tip_tower = document.getElementById("tip_tower");
        let cnv_tip_tower = document.getElementById("cnv_tip_tower");
        if (tip_add_window != null) {
          tip_add_window.style.display = "none";
        }
        if (cnv_line != null) {
          cnv_line.style.display = "none";
        }
        if(tip_tower != null){
          tip_tower.style.display = 'none';
        }
        if (cnv_tip_tower != null) {
          cnv_tip_tower.style.display = "none";
        }
        let micro_tower_tip = document.getElementById("micro_tower_tip");
        if (!(!micro_tower_tip || micro_tower_tip.style.display == "none")) {
          let evid = micro_tower_tip.getAttribute("data-evid");
          let micro_tower_entity = viewer.entities.getById(
            "micro_tower_" + evid
          );
          setTimeout(function() {
            let cart2_micro_pos = new Cesium.SceneTransforms.wgs84ToWindowCoordinates(
              viewer.scene,
              micro_tower_entity._position._value
            );
            micro_tower_tip.style.left = cart2_micro_pos.x + 10 + "px";
            micro_tower_tip.style.bottom = micro_tower_tip.parentElement.offsetHeight - cart2_micro_pos.y + 10 + "px";
            // micro_tower_tip.style.bottom = cart2_micro_pos.y + 10 + "px";
          }, 10);
        }        
      }, Cesium.ScreenSpaceEventType.WHEEL);
      handler.setInputAction(click => {
        let tip_add_window = document.getElementById("tip_add_window");
        let cnv_line = document.getElementById("cnv_line");
        let tip_tower = document.getElementById("tip_tower");
        let cnv_tip_tower = document.getElementById("cnv_tip_tower");
        if (tip_add_window != null) {
          tip_add_window.style.display = "none";
        }
        if (cnv_line != null) {
          cnv_line.style.display = "none";
        }
        if(tip_tower != null){
          tip_tower.style.display = 'none';
        }
        if (cnv_tip_tower != null) {
          cnv_tip_tower.style.display = "none";
        }        
        let pickedObject = viewer.scene.pick(click.position);
        //show tower info on line
        let cam_height = getCameraHeight();
        if(main.shebeiguanli == true){          
          console.log(cam_height +": camera height")
          if(cam_height != -1 && cam_height <= main.cam_8K){
            let pickRay = viewer.camera.getPickRay(click.position);        
            let featuresPromise = viewer.imageryLayers.pickImageryLayerFeatures(pickRay, viewer.scene);            
            if (!Cesium.defined(featuresPromise)) {
                console.log('No features picked.');
            } else {
                Cesium.when(featuresPromise, function(features) {
                  console.log(features, "features")
                  if (features.length > 1) {
                    var line_id = features[1].data.properties.VOLTAGE;                                          
                    var tower_id = features[0].data.id.split(".")[1];
                    main.show_el_tower_detail = true;
                    gBus.$emit("get_el_tower_info", 200001, true, 111);//tower_id
                  }
                });
            }            
          }
        }
        if (pickedObject === undefined) {
          let micro_tower_tip = document.getElementById("micro_tower_tip");
          if (micro_tower_tip != null) {
            micro_tower_tip.style.display = "none";
            if(main.selected_micro_tower){
              let towerEntity = viewer.entities.getById("micro_tower_" + main.selected_micro_tower.evid);
              if (towerEntity){
                towerEntity._billboard._image._value = "static/images/honghuang.png";
              }
              main.selected_micro_tower = null;
            }
            viewer.scene.requestRender();
          } 
          return;
        }        

        if ( Cesium.defined(pickedObject) &&
          pickedObject.id._id.indexOf("el_tower_on_line_") != -1 ) {
          if (!main.el_towers_on_line){
              return;
          }
          main.show_el_tower_detail = true; //show tankuang dialog.
          if (main.el_tower_sel){
              main.el_tower_sel._model._color._value = Cesium.Color.ALICEBLUE;
              main.el_tower_sel._label._show._value = false;
          }
          main.el_tower_sel = pickedObject.id;
          main.el_tower_sel._model._color._value = Cesium.Color.AQUA;
          main.el_tower_sel._label._show._value = true;

          let str_id = pickedObject.id._id.substring(
            "el_tower_on_line_".length,
            pickedObject.id._id.length
          );
          
          if(main.shebeiguanli == true){
            gBus.$emit("selectItemOftableXianluchaxun", str_id);
          }
          if(main.taganlixuepinggu == true){
            gBus.$emit("selectItemOftableTaganlixuepinggu", str_id);
          }
          if(main.zhongyaotongdaoxianlu == true){
            gBus.$emit("selectItemOftableZhongyaotongdaoxianlu", str_id);
          }
          if(main.qitatongdaoxianlu == true){
            gBus.$emit("selectItemOftableQitatongdaoxianlu", str_id);
          }
          gBus.$emit("get_el_tower_info", str_id, true, 111);//from tankuang
          main.show_el_tower_detail = true;
          
          if(main.zhongyaotongdaoxianlu || main.qitatongdaoxianlu || main.taganlixuepinggu){            
            let tower_index = 0;
            for(let i = 0; i < main.el_towers_on_line.length; i++){
              if(pickedObject.id._id == main.el_towers_on_line[i].id){
                tower_index = i;
                break;
              }
            }
            let cur_blink_color = -1;
            if(main.zhongyaotongdaoxianlu){
              for(let k = 0; k < main.predict_main_towers.length; k++){
                if(main.el_towers_on_line[tower_index].evid == main.predict_main_towers[k].evtowerid){
                  cur_blink_color = main.predict_main_towers[k].zytdyjdj;                
                  break;
                }
              }
            }            
            if(main.qitatongdaoxianlu){
              for(let k = 0; k < main.qita_towers.length; k++){
                if(main.el_towers_on_line[tower_index].evid == main.qita_towers[k].evtowerid){
                  cur_blink_color = main.qita_towers[k].yjdj;                
                  break;
                }
              }
            }
            main.el_towers_on_line[tower_index].color = cur_blink_color;
            if(cur_blink_color != -1)//cur el tower has no color
              main.draw_blink_circle(main.el_towers_on_line[tower_index]);
            else
              viewer.entities.removeById("blink_circle");
            // main.pdf = true;
          }
          viewer.scene.requestRender();
        }        
        if ( Cesium.defined(pickedObject) &&
          pickedObject.id._id.indexOf("micro_tower_") != -1 ) {
          pickedEntity = pickedObject.id;
          let send_evid = pickedObject.id._id.substring(
            "micro_tower_".length,
            pickedObject.id._id.length
          );

          let selected_mtower;
          for (let i = 0; i < main.micro_towers.length; i++) {
            if (send_evid == main.micro_towers[i].evid) {
              selected_mtower = main.micro_towers[i];
              break;
            }
          } 

          pickedEntity._billboard._image._value = "static/images/lanhei.png";
          if (selected_mtower){
            main.add_micro_tower_tip(selected_mtower);
            gBus.$emit("selectItemOftableWeiqixiangzhuangzhiliebiao", selected_mtower);
            console.log("gBus-emit", "selectItemOftableWeiqixiangzhuangzhiliebiao");
          }
          viewer.scene.requestRender();
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(movement => {
        let overedObject = viewer.scene.pick(movement.endPosition);        

        let tip_add_window = document.getElementById("tip_add_window");
        let cnv_line = document.getElementById("cnv_line");
        let tip_tower = document.getElementById("tip_tower");
        let cnv_tip_tower = document.getElementById("cnv_tip_tower");

        // if(main.taifengzonglan == true){
        //   let line_id = "canvas_" + main.curPlayTyphoon.typ_no + "_" + main.curPlayTyphoon.typ_name;
        //   let line_canvas = document.getElementById(line_id);
        //   if(line_canvas){
        //     let context2D = line_canvas.getContext("2d");
        //     context2D.beginPath();
        //     context2D.lineWidth = 2;
        //     context2D.strokeStyle = "yellow";
        //     context2D.moveTo(0, 0);
        //     context2D.lineTo(off_x, off_y);          
        //     context2D.stroke();
        //   }
        //   let tip_id = "tip_window_" + main.curPlayTyphoon.typ_no + "_" +main.curPlayTyphoon.typ_name;
        //   let tip_window = document.getElementById(tip_id);
        //   if(tip_window){
        //     tips.style.left = main.curPlayTyphoon.cart2_pos.x + off_x + "px";
        //     tips.style.top = main.curPlayTyphoon.cart2_pos.y + off_y + "px";
        //   }
        // }

        if (tip_add_window != null) {
          tip_add_window.style.display = "none";
        }
        if (cnv_line != null) {
          cnv_line.style.display = "none";
        }
        if(tip_tower != null){
          tip_tower.style.display = 'none';
        }
        if (cnv_tip_tower != null) {
          cnv_tip_tower.style.display = "none";
        }
        
        if(main.el_towers_on_line && overedObject && overedObject.id._id.indexOf("el_tower_baselinepoint_") != -1){
          let spt = overedObject.id._id.split("_"); //[0]:no, [1]:name, [3]: i th
          let tower_no = spt[3];
          
          if (tip_tower == null) {
            tip_tower = document.createElement("div");
            tip_tower.className = "tip_tower";
            tip_tower.setAttribute("id", "tip_tower");              
            viewer.container.appendChild(tip_tower);
          }
          let over_pos = new Cesium.Cartesian3(
            overedObject.id._position._value.x,
            overedObject.id._position._value.y,
            overedObject.id._position._value.z
          );
          let cart2_pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            over_pos
          );
          tip_tower.style.left = cart2_pos.x + off_x + "px";
          tip_tower.style.top = cart2_pos.y + off_y + "px";
          if (cnv_tip_tower == null) {
            cnv_tip_tower = document.createElement("canvas");
            cnv_tip_tower.id = "cnv_tip_tower";
            cnv_tip_tower.style.display = "block";
            cnv_tip_tower.style["pointer-events"] = "none";
            cnv_tip_tower.style.position = "absolute";
            viewer.container.appendChild(cnv_tip_tower);
          }
          cnv_tip_tower.style.left = cart2_pos.x + "px";
          cnv_tip_tower.style.top = cart2_pos.y + "px";
          cnv_tip_tower.width = Math.abs(off_x + 5);
          cnv_tip_tower.height = Math.abs(off_y + 5);
          let context2D = cnv_tip_tower.getContext("2d");
          context2D.beginPath();
          context2D.lineWidth = 2;
          context2D.strokeStyle = "blue";
          context2D.moveTo(off_x < 0 ? -off_x : 0, off_y < 0 ? -off_y : 0);
          context2D.lineTo(off_x < 0 ? 0 : off_x, off_y < 0 ? 0 : off_y);
          context2D.stroke();
          
          let str_tower = "<p>" + main.el_towers_on_line[tower_no].evloopname + "</p>" +
                          "<p>线路名称：" + main.el_towers_on_line[tower_no].evloopname + "</p>" +
                          "<p>电压等级: " + main.el_towers_on_line[tower_no].evvoltage + "</p>" +
                          "<p>杆塔名称: " + main.el_towers_on_line[tower_no].towernumber + "</p>" +
                          "<p>位置: " + main.el_towers_on_line[tower_no].xzq + "</p>";
                          if(main.el_towers_on_line[tower_no].evlastmonitortime != undefined)
                            str_tower += "<p>预警时间: " + main.el_towers_on_line[tower_no].evlastmonitortime + "</p>";

          tip_tower.innerHTML = str_tower;
          tip_tower.style.display = "block";
          cnv_tip_tower.style.display = "block";
        }

        if(overedObject && overedObject.id._id.indexOf("_typpoint_") != -1){
          // draw typhoon point's msg.

          let spt = overedObject.id._id.split("_"); //[0]:no, [1]:name, [3]: i th
          let t_no = spt[0], t_name = spt[1], point_no = spt[3];

          let over_ty_i = -1;
          for (let i = 0; i < main.playingTyphoons.length; i++) {
            if (
              main.playingTyphoons[i].typ_no == t_no &&
              main.playingTyphoons[i].typ_name == t_name
            ) {
              over_ty_i = i;
              break;
            }
          }
          // check exception
          if (over_ty_i < 0 || main.playingTyphoons[over_ty_i].detail_info == null){
            return;
          }
          
          let over_pos = new Cesium.Cartesian3(
            overedObject.id._position._value.x,
            overedObject.id._position._value.y,
            overedObject.id._position._value.z
          );
          let cart2_pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            over_pos
          );        

          if (tip_add_window == null) {
            tip_add_window = document.createElement("div");
            tip_add_window.className = "tip_window add";
            tip_add_window.setAttribute("id", "tip_add_window");              
            viewer.container.appendChild(tip_add_window);
          }
          tip_add_window.style.left = cart2_pos.x + off_x + "px";
          tip_add_window.style.top = cart2_pos.y + off_y + "px";

          if (cnv_line == null) {
            cnv_line = document.createElement("canvas");
            cnv_line.id = "cnv_line";
            cnv_line.style.display = "block";
            cnv_line.style["pointer-events"] = "none";
            cnv_line.style.position = "absolute";
            viewer.container.appendChild(cnv_line);
          }
          cnv_line.style.left = cart2_pos.x + "px";
          cnv_line.style.top = cart2_pos.y + "px";
          cnv_line.width = Math.abs(off_x + 5);
          cnv_line.height = Math.abs(off_y + 5);
          let context2D = cnv_line.getContext("2d");
          context2D.beginPath();
          context2D.lineWidth = 2;
          context2D.strokeStyle = "yellow";
          context2D.moveTo(off_x < 0 ? -off_x : 0, off_y < 0 ? -off_y : 0);
          context2D.lineTo(off_x < 0 ? 0 : off_x, off_y < 0 ? 0 : off_y);
          context2D.stroke();
          
          let str_typ = "<p>台风名称：" + main.playingTyphoons[over_ty_i].typ_name + "</p>";
          let date_cnv = new Date(
            main.playingTyphoons[over_ty_i].detail_info.points[point_no].time
          );
          str_typ +=
            "<p>时间：" +
            date_cnv.getFullYear() +
            "-" +
            (date_cnv.getMonth() + 1) +
            "-" +
            date_cnv.getDate() +
            " " +
            date_cnv.getHours() +
            ":00:00" +
            "</p>";
          str_typ +=
            "<p>经度：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no].lng +
            "</p>";
          str_typ +=
            "<p>纬度：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no].lat +
            "</p>";
          str_typ +=
            "<p>中心气压：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no]
              .pressure +
            "</p>";
          str_typ +=
            "<p>最大风速：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no]
              .speed +
            "</p>";
          str_typ +=
            "<p>十级风圈半径：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no]
              .radius10 +
            "</p>";
          str_typ +=
            "<p>七级风圈半径：" +
            main.playingTyphoons[over_ty_i].detail_info.points[point_no]
              .radius7;
          str_typ += "</p>";

          tip_add_window.innerHTML = str_typ;
          tip_add_window.style.display = "block";
          cnv_line.style.display = "block";
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(leftup => {
        if (!picked) return;
        picked = false;
        // main.disableCameraMotion(true, viewer);
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
    },
    _drawProvinces() {
      // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('static/data/quanguo.json', {
      //     stroke: Cesium.Color.YELLOW,
      //     fill: Cesium.Color.TRANSPARENT,
      //     strokeWidth: 5
      // }));
      // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('static/data/zg.json', {
      //     stroke: Cesium.Color.BROWN,
      //     fill: Cesium.Color.TRANSPARENT,
      //     strokeWidth: 5
      // }));
      if (main.zhongguoProvinces) {
        main.__drawZhongguoProvinces();
      } else {
        let provinces = localStorage.getItem("zhongguoprovinces");
        if (provinces) {
          main.zhongguoProvinces = JSON.parse(provinces);
          main.__drawZhongguoProvinces();
        } else {
          // add zhongguo borders and province
          Cesium.Resource.fetchJson("static/data/quanguo.json")
            .then(function(provinces) {
              main.zhongguoProvinces = provinces;
              localStorage.setItem(
                "zhongguoprovinces",
                JSON.stringify(provinces)
              );
              main.__drawZhongguoProvinces();
            })
            .otherwise(function(error) {
              console.log(error, "from fetchJson");
            });
        }
      }

      // add selected province
      if (main.nanjingProvince) {
        main.__drawNanJingProvince();
      } else {
        let province = localStorage.getItem("nanjingprovince");
        if (province) {
          main.nanjingProvince = JSON.parse(province);
          main.__drawNanJingProvince();
        } else {
          Cesium.Resource.fetchJson("static/data/shanghai.json")
            .then(function(province) {
              main.nanjingProvince = province;
              localStorage.setItem("nanjingprovince", JSON.stringify(province));
              main.__drawNanJingProvince();
            })
            .otherwise(function(error) {
              console.log(error, "from fetchJson");
            });
        }
      }

      //add images and names of station
      for (var i = 0; i < main.shenghui.length; i++) {
        viewer.entities.add({
          id: "station" + i,
          position: Cesium.Cartesian3.fromDegrees(
            main.shenghui[i].lng,
            main.shenghui[i].lat
          ),
          billboard: {
            image: "static/images/location.png",
            scale: 0.6,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              main.cam_5K,
              Number.MAX_VALUE
            )
          },
          label: {
            text: main.shenghui[i].text,
            font: "17px SimHei",
            fillColor: Cesium.Color.RED,
            outlineColor: Cesium.Color.YELLOW,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            outlineWidth: 2,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              main.cam_5K,
              Number.MAX_VALUE
            )
          }
        });
      }
    },
    __drawZhongguoProvinces() {
      var provinces = main.zhongguoProvinces;
      var positions = [];
      for (var i = 0; i < provinces.features.length; i++) {
        for (
          var j = 0;
          j < provinces.features[i].geometry.coordinates.length;
          j++
        ) {
          positions = [];
          for (
            var k = 0;
            k < provinces.features[i].geometry.coordinates[j][0].length;
            k++
          ) {
            var lng = provinces.features[i].geometry.coordinates[j][0][
              k
            ][0].toFixed(4);
            var lat = provinces.features[i].geometry.coordinates[j][0][
              k
            ][1].toFixed(4);
            positions.push(lng);
            positions.push(lat);
          }
          viewer.entities.add({
            name: "Province",
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(positions),
              width: 2,
              arcType: Cesium.ArcType.GEODESIC,
              material: Cesium.Color.GOLD,
              clampToGround: true
            }
          });
        }
      }
    },
    // __drawNanJingProvince() {
    //   var province = main.nanjingProvince;
    //   var positions = [];
    //   for (var i = 0; i < province.features.length; i++) {
    //     for (
    //       var j = 0;
    //       j < province.features[i].geometry.coordinates.length;
    //       j++
    //     ) {
    //       positions = [];
    //       positions = [
    //       ...positions,
    //       ...province.features[i].geometry.coordinates[j]
    //     ];
       
    //     viewer.entities.add({
    //       name: "Selected Province",
    //       polyline: {
    //         positions: Cesium.Cartesian3.fromDegreesArray(positions),
    //         width: 3,
    //         arcType: Cesium.ArcType.GEODESIC,
    //         material: Cesium.Color.BROWN,
    //         clampToGround: true
    //       }
    //     });
    //     }
    //   }
    // },
    __drawNanJingProvince() {
      var province = main.nanjingProvince;
      var positions = [];
      for (
        var i = 0;
        i < province.geometry.coordinates.length;
        i++
      ) {
        positions = [];
        for (
            var k = 0;
            k < province.geometry.coordinates[i][0].length;
            k++
          ) {
            var lng = province.geometry.coordinates[i][0][k][0].toFixed(4);
            var lat = province.geometry.coordinates[i][0][k][1].toFixed(4);
            positions.push(lng);
            positions.push(lat);
          }
         viewer.entities.add({
          name: "Selected Province",
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(positions),
            width: 3,
            arcType: Cesium.ArcType.GEODESIC,
            material: Cesium.Color.BROWN,
            clampToGround: true
          }
        });
      }
     
    },
    _drawTimeBorder() {
      // 警戒线
      var guardLine24 = [
        126.993568,
        34.005024,
        126.993568,
        21.971252,
        118.995521,
        17.96586,
        118.995521,
        10.97105,
        113.018959,
        4.48627,
        104.998939,
        -0.035506
      ];
      var guardLine48 = [
        104.998939,
        -0.035506,
        119.962318,
        -0.035506,
        131.981361,
        14.96886,
        131.981361,
        33.959474
      ];

      viewer.entities.add({
        name: "24 hour border",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(guardLine24),
          width: 1,
          arcType: Cesium.ArcType.GEODESIC,
          material: Cesium.Color.GOLD,
          clampToGround: true,
          zIndex: 3
        }
      });

      viewer.entities.add({
        name: "48 hour border",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(guardLine48),
          width: 1,
          arcType: Cesium.ArcType.GEODESIC,
          material: Cesium.Color.BLUE,
          clampToGround: true,
          zIndex: 3
        }
      });

      viewer.entities.add({
        name: "24 hour border image",
        position: Cesium.Cartesian3.fromDegrees(126.993568, 27.959474, 100),
        billboard: new Cesium.BillboardGraphics({
          image: "static/images/hour24.png",
          scale: 1,
          zIndex: 1
        })
      });

      viewer.entities.add({
        name: "48 hour border image",
        position: Cesium.Cartesian3.fromDegrees(131.981361, 27.959474, 100),
        billboard: new Cesium.BillboardGraphics({
          image: "static/images/hour48.png",
          scale: 1,
          zIndex: 1
        })
      });
    },
    _selectMainMenu() {
      console.log("menu:" + main.main_sel);
      switch (main.main_sel) {
        case "xinxizonglan":
          main.main_navbar_xinxizonglan();
          break;
        case "fengchangjiance":
          main.main_navbar_fengchangjiance();
          break;
        case "zaihaiyujing":
          main.main_navbar_zaihaiyujing();
          break;
        case "yunweiguanli":
          main.main_navbar_yunweiguanli();
          break;
        default:
          main.main_sel = "xinxizonglan";
          main.main_navbar_xinxizonglan();
          break;
      }
    },
    /** */
    /* utils */
    /** move camera */
    __moveCam(pos, dis, callbackFn = null, last_flag = false) {
      if (main.cam_move && !last_flag){
        if (callbackFn){
          callbackFn();
        }
        return;
      }
      main.cam_move = true;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(pos.lng, pos.lat, dis),
        duration: 3,
        complete: function(){
          main.cam_move = false;
          if (callbackFn){
            callbackFn();
            }
          }
      });
    },
    __addEntities(entity, apply = true){
      if (viewer){
        if (entity.id != null){
          main.entities.push(entity.id);
        }
        if (apply){
          return viewer.entities.add(entity);
        }
      }
    },
    __applyEntities(){
      if (viewer){
        for(let index in main.entities){
          viewer.entities.add(main.entities[index]);
        }
      }
    },
    __watchWidth() {
      window.onresize = () => {
        main.screenWidth = window.innerWidth;
        main.rightframewidth = parseInt(
          document.getElementById("sidebar").offsetWidth
        );
        main.map_mainwidth =
          window.innerWidth -
          parseInt(document.getElementById("sidebar").offsetWidth) -
          40;
        document.getElementById("map_main").style.width =
          main.map_mainwidth + "px";

        main.screenHeight = window.innerHeight;
        main.yunweiguanliHeight = parseInt(main.screenHeight) - 140;
        document.getElementById("yunweiguanliyjxxfb").style.height =
          main.yunweiguanliHeight + "px";
      };
    },
    /* set On Events*/
    setOnEvents() {
      // tableXianluchaxun_make_disable_click
      gBus.$on("start_draw_all_el_towers", function() {
        main.clickable = false;
        main.loadingData = true;
      });
      //1-2 shebeiguanli => draw towers
      gBus.$on("tableXianluchaxun_draw_all_el_towers", _.debounce(function(towers) {
        console.log("gBus-on", "tableXianluchaxun_draw_all_el_towers");
        if (main.shebeiguanli){
          towers.forEach(e => {
            e.id = "el_tower_on_line_" + e.evid;
            e.text = e.text == undefined ? e.text : e.evid;
          });
          main.draw_all_el_towers(towers);
        }
      }, 500));
      //1-2 shebeiguanli => show single tower
      gBus.$on("tableXianluchaxun_show_el_tower_info", _.debounce(function(tower, index) {
        console.log("gBus-on", "tableXianluchaxun_show_el_tower_info");
        console.log(tower,"from single")
        let tower_cap = {
          evid: tower[1],
          lng: tower[6],
          lat: tower[5],
          text: tower[3],
          evloopname: tower[2]
        };
        main.show_el_tower_info(tower_cap, index);
      }, 500));
      //1-2 shebeiguanli => show micro tower
      gBus.$on("tableWeiqixiangzhuangzhichaxun_draw_micro_tower_info", _.debounce(function(tower) {
        console.log("gBus-on", "tableWeiqixiangzhuangzhichaxun_draw_micro_tower_info");
        // main.clearMap();
        let tower_cap = {
          lon: tower[3],
          lat: tower[4],
          text: tower[6],
          evsiteid: tower[1],
          evid: tower[7]
        };
        main.add_micro_tower(tower_cap, main.cam_100K);
        main.add_micro_tower_tip(tower_cap);
      }, 500));
      // 2-1 weiqixiangzaixianjiance
      gBus.$on("tableWeiqixiangzhuangzhiliebiao_nanjing_micro_tower", _.debounce(function(towers) {
        console.log("gBus-on", "tableWeiqixiangzhuangzhiliebiao_nanjing_micro_tower");
        for (let i = 0; i < towers.length; i++) {
          try {
            main.add_micro_tower(towers[i]);
          } catch (ex) {
            console.log("duplicated nanjing micro tower evid!", ex);
          }
        }
        
      }, 500));
      // 2-1 weiqixiangzaixianjiance
      gBus.$on("tableWeiqixiangzhuangzhiliebiao_draw_micro_tower_info", _.debounce(function(tower) {
        console.log("gBus-on", "tableWeiqixiangzhuangzhiliebiao_draw_micro_tower_info");
        let tower_cap = {
          lon: tower[3],
          lat: tower[4],
          text: tower[6],
          evsiteid: tower[1],
          evid: tower[7]
        };

        main.add_micro_tower_tip(tower_cap);
      }, 500));
      // 2-2 leidajiance
      gBus.$on("showRadarByType",function(details, angle, step, type, radar) {
        console.log("gBus-on", "showRadarByType");        
        if (!main.leidajiance) {
          return;
        }
        main.__moveCam({ lng: radar.lng, lat: radar.lat }, main.cam_500K);
        main.clearMap();
        
        for (let i = 0; i < 360; i++) {
          for (let k = 0; k < point; k++) {
            viewer.entities.removeById("radar_box_" + i + "_" + k);
          }
        }
        let point = 1000; //point per 1 degree
        main.radar_data = [];

        main.radar_type_band = type;
        let radian = Cesium.Math.toRadians(angle);        
        let top_radius_long = Math.cos(radian) * step * point;        
        let top_radius_middle = Math.cos(radian) * 100000;
        let top_radius_short = Math.cos(radian) * 50000;
        let length_long = Math.sin(radian) * step * point;
        let length_middle = Math.sin(radian) * 100000;
        let length_short = Math.sin(radian) * 50000;
        var longRadar = main.__addEntities({
          id: "radar_long",
          position: Cesium.Cartesian3.fromDegrees(radar.lng, radar.lat, 0),
          cylinder: {
            length: length_long,
            topRadius: top_radius_long,
            bottomRadius: 0.0,
            material: Cesium.Color.BLACK.withAlpha(0.3),
            numberOfVerticalLines: 12,
            outline: true,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            outlineColor: Cesium.Color.WHITE
          }
        });
        var middleRadar = main.__addEntities({
          id: "radar_middle",
          position: Cesium.Cartesian3.fromDegrees(radar.lng, radar.lat, 0),
          cylinder: {
            length: length_middle,
            topRadius: top_radius_middle,
            bottomRadius: 0.0,
            material: Cesium.Color.BLACK.withAlpha(0.3),
            numberOfVerticalLines: 12,
            fill: false,
            outline: true,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            outlineColor: Cesium.Color.WHITE
          }
        });
        var shortRadar = main.__addEntities({
          id: "radar_short",
          position: Cesium.Cartesian3.fromDegrees(radar.lng, radar.lat, 0),
          cylinder: {
            length: length_short,
            topRadius: top_radius_short,
            material: Cesium.Color.BLACK.withAlpha(0.3),
            bottomRadius: 0.0,
            numberOfVerticalLines: 12,
            fill: false,
            outline: true,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            outlineColor: Cesium.Color.WHITE
          }
        });
        //show 50km, 100km, 160km labels
        main.drawDistanceLabel(
          radar,
          0,
          top_radius_short,
          top_radius_long,
          length_long,
          "50km"
        );
        main.drawDistanceLabel(
          radar,
          0,
          top_radius_middle,
          top_radius_long,
          length_long,
          "100km"
        );
        main.drawDistanceLabel(
          radar,
          0,
          top_radius_long,
          top_radius_long,
          length_long,
          "160km"
        );
        let ti = 0;
        if (type == "dbz") ti = 0;
        if (type == "undbz") ti = 1;
        if (type == "vel") ti = 2;
        if (type == "sw") ti = 3;
        let totals = 0;
        let box_datas = [];
        let max_sampls = 1000;
        for (let i = 0; i < 360; i ++) {
          for (let k = 0; k < point; k ++) {
            for (let p = 0; p < main.rd_vals[ti].length - 1; p++) {        
              if (
                details[i][k] >= main.rd_vals[ti][p] && details[i][k] < main.rd_vals[ti][p + 1]
              ) {
                box_datas.push({
                  pos_radar: radar,                  
                  ev_degree: i,
                  ev_radius: Math.cos(radian) * k * step,
                  radar_radius: top_radius_long,
                  radar_length: length_long,
                  color: main.rd_colors[ti][p],
                  id: "radar_box_" + i + "_" + k
                });                
              }
            }
          }
        }
        let interval = Math.ceil(box_datas.length / max_sampls);
        for (let i = 0; i < box_datas.length; i += interval){
          totals++;
          main.drawRadarBox(box_datas[i]);
        }
        console.log("totals : " + totals)
      });
      //show loadingData
      gBus.$on("showloadingData", function(){
        console.log("show loadingData");
        main.loadingData = true;
      });
      gBus.$on("hideloadingData", function(){
        console.log("hide loadingData");
        main.loadingData = false;
      });
      // 3-1 fengchangyubao
      // 3-2 taganlixuepinggu
      gBus.$on("tableTaganlixuepinggu_draw_all_el_towers", _.debounce(function(towers) {
        console.log("gBus-on", "tableTaganlixuepinggu_draw_all_el_towers", towers);
        if (main.taganlixuepinggu){
          towers.forEach(e => {
            e.id = "el_tower_on_line_" + e.evid;
            e.text = e.text == undefined ? e.text : e.evid;
          });
          main.draw_all_el_towers(towers);
        }
      }, 500));
      gBus.$on("tableTaganlixuepinggu_show_el_tower_physics", _.debounce(function(tower, index) {
        console.log("gBus-on", "tableTaganlixuepinggu_show_el_tower_physics", tower);
        
        main.show_el_tower_physics(tower, index);
      }, 500));
      // 3-3 zhongyaotongdaoxianlu
      gBus.$on("tableZhongyaotongdaoxianlu_draw_predict_main_towers", _.debounce(function(towers) {
        console.log("gBus-on", "tableZhongyaotongdaoxianlu_draw_predict_main_towers");
        main.draw_predict_main_towers(towers);
      }, 500));
      gBus.$on("tableZhongyaotongdaoxianlu_select_predict_towers_in_line", _.debounce(function(towerList, mainTower) {
        console.log("gBus-on", "tableZhongyaotongdaoxianlu_select_predict_towers_in_line"); //3-3

        //disable tip_tower        
        let tip_tower = document.getElementById("tip_tower");
        if(tip_tower){
          tip_tower.style.display = 'none';
        }

        var url =
          "/typhoon/gtlxpg/" +
          mainTower[0] +
          "/" +
          mainTower[4] +
          "/" +
          mainTower[2] +
          ".pdf";
        url = '/typhoon/gtlxpg/±800锦苏线/20/687.pdf';
        var curUrl =
          "static/pdf/web/viewer.html?file=" + encodeURIComponent(url);

        document.getElementById("example1").src = curUrl;
        main.pdf = true;
        let tower_cap = {
          evloopname:mainTower[0],
          evid: mainTower[2],
          lng: mainTower[5],
          lat: mainTower[6],          
          color: mainTower[3],
          evlastmonitortime: mainTower[9]
        };        
        towerList.forEach(e => {
          e.id = "el_tower_on_line_" + e.evid;
          e.text = e.text !== undefined ? e.text : e.evid;
        });
        main.draw_el_towers_on_line(tower_cap, towerList);
      }, 500));
      gBus.$on("draw_qita_towers", _.debounce(function(towers) {
        console.log("gBus-on", "draw_qita_towers");
        main.draw_qita_towers(towers);
      }, 500));
      gBus.$on("select_qita_tower_online", _.debounce((tower, towerList) => {
        console.log("gBus-on", "select_qita_tower_online"); //3-4
        //disable tip_tower
        let tip_tower = document.getElementById("tip_tower");
        if(tip_tower){
          tip_tower.style.display = 'none';
        }
        let tower_cap = {
          evloopname: tower[0],
          evid: tower[7],
          lng: tower[5],
          lat: tower[6],
          color: tower[3], 
          evlastmonitortime: tower[4]
        };
        towerList.forEach(e => {
          e.id = "el_tower_on_line_" + e.evid;
          e.text = e.text != undefined ? e.text : e.evid;
        });
        main.draw_el_towers_on_line(tower_cap, towerList);
      }, 500));
      
    },
    
    draw_qita_towers(towers) {
      console.log("3-4 all qita towers", towers);      
      main.qita_towers = towers;
      // for (let i = 0; i < towers.length; i++) {
      //   let position = Cesium.Cartesian3.fromDegrees(
      //     towers[i].lon,
      //     towers[i].lat,
      //     0
      //   );
      //   main.qita_towers[i].id =
      //     "qita_tower_" + towers[i].evloopname + "_" + towers[i].towernumber;
      //   //add line
      //   main.__addEntities({
      //     id: main.qita_towers[i].id,
      //     position: position,
      //     billboard: {
      //       image: towers[i].bgImg,
      //       scale: 1,
      //       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //         main.cam_1K,
      //         main.cam_5K
      //       )
      //     }
      //     // label : {
      //     //   pixelOffset: new Cesium.Cartesian2(0, -30),
      //     //   text : towers[i].text,
      //     //   font : '18px SimHei',
      //     //   fillColor: Cesium.Color.WHITE,
      //     //   outlineColor: Cesium.Color.BLACK,
      //     //   outlineWidth: 2.0,
      //     //   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //     //   disableDepthTestDistance: Number.POSITIVE_INFINITY,
      //     //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      //     //   distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //     //     main.cam_1K,
      //     //     main.cam_5K
      //     //   )
      //     // }
      //   });
      // }
    },
    draw_predict_tower(tower){
      let position = Cesium.Cartesian3.fromDegrees(
          tower.lng,
          tower.lat          
        );        
        //add prediction line
        main.__addEntities({
          id: "prediction_main_tower_" + tower.evtowerid,
          position: position,
          billboard: {
            image: towers[i].bgImg,
            scale: 0.7,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              main.cam_5000K
            )
          },
          label: {
            pixelOffset: new Cesium.Cartesian2(0, -30),
            text: towers[i].text,
            font: "18px SimHei",
            fillColor: Cesium.Color.BROWN,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 3.0,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              main.cam_5K, main.cam_5000K
            )
          }
        });
        viewer.scene.requestRender();
    },
    draw_el_towers_on_line(tower, towers) {
      if (!tower){
        return;
      }
      if (main.el_towers_on_line){
        if (main.el_towers_on_line.length > 0 && main.el_towers_on_line[0].evloopname == tower.evloopname){

        }else{
          main.el_towers_on_line = null;
        }
      }
      if (!main.el_towers_on_line){
        // draw towers and check selected.
        main.draw_all_el_towers(towers, tower, true);
      }else{
        // draw selected tower's info and blink circle.
        main.clickable = true;
        main.loadingData = false;
        main.draw_blink_circle(tower);
        main.show_el_tower_info(tower, null);
      }
    },
    draw_blink_line(towers) {
      let line_en = viewer.entities.getById("el_tower_baseline");

      clearInterval(main.blink_line_interval);      
      main.blink_line_interval = setInterval(() => {
        
        if (line_en.polyline.material.color.getValue().green == 0) {
          line_en.polyline.material.color.setValue(Cesium.Color.YELLOW);                
          for(let i = 0; i < towers.length; i++){
            let point_en = viewer.entities.getById("el_tower_baselinepoint_" + i);
            point_en.point.color.setValue(Cesium.Color.RED);
          }
        } else {                
          line_en.polyline.material.color.setValue(Cesium.Color.RED);
          for(let i = 0; i < towers.length; i++){
            let point_en = viewer.entities.getById("el_tower_baselinepoint_" + i);
            point_en.point.color.setValue(Cesium.Color.YELLOW);
          }
        }
        viewer.scene.requestRender();
      }, 500);
    },
    draw_blink_circle(tower) {
      let color, count = 21, pos = -5;
      viewer.entities.removeById("blink_circle");
      if (tower.color == "红色预警") {
        color = Cesium.Color.RED.withAlpha(0.7);
      }
      if (tower.color == "橙色预警") {
        color = Cesium.Color.DARKORANGE.withAlpha(0.7);
      }
      if (tower.color == "黄色预警") {
        color = Cesium.Color.YELLOW.withAlpha(0.7);
      }
      if (tower.color == "蓝色预警") {
        color = Cesium.Color.BLUE.withAlpha(0.7);
      }
      let circle = main.__addEntities({
        id: "blink_circle",
        position: new Cesium.Cartesian3.fromDegrees(
          tower.lng,
          tower.lat,
          tower.z_pos
        ),
        ellipse: {
          semiMinorAxis: 20,
          semiMajorAxis: 20,
          material: color,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            main.cam_500
          )
        }        
      });
      
      clearInterval(main.blink_circle_interval);      
      main.blink_circle_interval = setInterval(() => {
        if (count > 20){
          pos = -5;
        }else if(count < 10){
          pos = 5;
        }
        count += pos;
        circle.ellipse.semiMajorAxis.setValue(count);
        circle.ellipse.semiMinorAxis.setValue(count);
        viewer.scene.requestRender();
      }, 500);
    },
    delpdf() {
      main.pdf = false;
    },   

    // 当前台风
    getDataDangQianTaiFeng(time) {
      // console.log(time);
      let time_x = time + "";
      axios
        .get(
          main.$http.adornUrl(
            "/zhyj/evdatajcdsjyjxzqh/getMaxSpeedRainByXZQ?evreceive=" + time_x
          )
        )
        .then(res => {
          if (res.data.code === 0) {
            let detail = res.data.list;
            main.datadqwind = [];
            main.datadqrain = [];
            main.datadqchengshi = [];
            for (var j in detail) {
              main.datadqwind.push(detail[j].maxwindspeed);
              main.datadqrain.push(detail[j].maxrain);
              main.datadqchengshi.push(detail[j].cityname);
            }
          }
        });
      if (time === 0) {
        main.time_24 = 24;
        main.time_48 = 48;
        main.time_72 = 72;
      } else if (time <= 24) {
        main.time_24 = time;
        main.time_48 = 48;
        main.time_72 = 72;
      } else if (time > 24 && time <= 48) {
        main.time_48 = time;
        main.time_24 = 24;
        main.time_72 = 72;
      } else if (time > 48 && time <= 72) {
        main.time_72 = time;
        main.time_24 = 24;
        main.time_48 = 48;
      }
    }, // 风场预报
    clearMap:function(){
      if (viewer) {
        //clear scene
        // clearInterval(main.interval);
        // viewer.scene.primitives.removeAll();
        // viewer.entities.removeAll();
        main.removeEntities();
        // viewer.imageryLayers.removeAll(false);
        main.resetInitParam();

        $("#cesiumContainer .cesium-viewer")
          .siblings()
          .remove();
      }
    },

    _clearMap: _.debounce(function(){
      if (main){
        main.clearMap();
      }
    }, 50), // throttle
    removeEntities() {
      for(let i = 0; i < main.entities.length; i++){
        viewer.entities.removeById(main.entities[i]);
      }
      main.entities = [];
    },
    resetInitParam() {
      console.log('reseted all data!!!!!!')
      // 1-1 play typhoon
      if (main.curPlayTyphoon){
        main.curPlayTyphoon.typ_playing = false;
        main.curPlayTyphoon = null;
      }
      // 1-2 
      main.el_towers_on_line = null;
      main.el_tower_sel = null;

      //1-2, 2-1
      main.selected_micro_tower = null;
      main.micro_towers = [];

      //show for loadingData message
      main.loadingData = false;

      viewer.dataSources.removeAll();
      // if (viewer.dataSources.contains(main.fs_datasource)) {
      //   viewer.dataSources.remove(main.fs_datasource);
      // }
      // if (viewer.dataSources.contains(main.js_datasource)) {
      //   viewer.dataSources.remove(main.js_datasource);
      // }

      viewer.clock.shouldAnimate = false;
      clearInterval(main.interval);
      clearInterval(main.blink_circle_interval);
      clearInterval(main.blink_line_interval);
      if (main.check_wind && main.windy != null) {
        // clearInterval(main.interval);
        main.windy.removeLines();
        main.windy = null;
      }
      main.map_show = true;
      //1-2-1 //shebeiguanli
      
      //1-2-2, 3-2, 3-3, 3-4
      main.show_el_tower_detail = false;      
      //show pdf
      main.pdf = false;
      //3-1
      main.check_wind = false;
      //4-2, 4-3
      main.yunweiguanliyjxxfbshow = false;
      main.yunweiguanlizbjlshow = false;
      //2-2
      main.radar_type_band = ""; //删除图例

      main.$store.commit("common/updateSidebarDisplay", false);
      //3-1
      main.jstbutton = false;
      main.fstbutton = false;
      main.checked = false;
      document.getElementById("fengsu_show").style.backgroundColor = "#69A8E2";
      document.getElementById("jaingshui_show").style.backgroundColor =
        "#69A8E2";
      main.baselinepoint_entities = [];
      main.tower_baseline_entity = null;
      main.tower_line_entities = [];
    },
    testline(x_b_dist, z_b_dist, lat, lng, z_pos, radian, y_b_dist) {
      lat = 30.737467;
      lng = 119.806319;
      radian = 3.246469592321075;
      z_pos = 68.64447070602344;
      y_b_dist = 0.005;
      let center = ComputeLatLng(lat, lng, radian, x_b_dist);
      let right = ComputeLatLng(
        center[0],
        center[1],
        Math.PI / 2 + radian,
        y_b_dist
      );
      let left = ComputeLatLng(
        center[0],
        center[1],
        radian - Math.PI / 2,
        y_b_dist
      );
      var lines = [];
        lines.push(left[1]);
        lines.push(left[0]);
        lines.push(z_b_dist + 1.0 * z_pos);
        lines.push(right[1]);
        lines.push(right[0]);
        lines.push(z_b_dist + 1.0 * z_pos);
        viewer.entities.removeById("el_tower_test_line");
        viewer.entities.add({
          id: "el_tower_test_line",
          polyline: {
            positions: new Cesium.Cartesian3.fromDegreesArrayHeights(lines),
            material: Cesium.Color.RED,
            width: 1
          }
        });
      viewer.scene.requestRender();
    }
  }
};
function ComputeLatLng(vLatitude, vLongitude, vAngle, vDistance) {
    var vNewLatLng = [];
    vDistance = vDistance / (6371 * 1000);
    // vAngle = ToRad(vAngle);

    var vLat1 = ToRad(vLatitude);
    var vLng1 = ToRad(vLongitude);

    var vNewLat = Math.asin(Math.sin(vLat1) * Math.cos(vDistance) +
                  Math.cos(vLat1) * Math.sin(vDistance) * Math.cos(vAngle));

    var vNewLng = vLng1 + Math.atan2(Math.sin(vAngle) * Math.sin(vDistance) * Math.cos(vLat1),
                          Math.cos(vDistance) - Math.sin(vLat1) * Math.sin(vNewLat));

    if (isNaN(vNewLat) || isNaN(vNewLng)) {
        return null;
    }

    vNewLatLng[0] = ToDeg(vNewLat);
    vNewLatLng[1] = ToDeg(vNewLng);

    return vNewLatLng;
}
function ToRad(vInput) {
    return vInput * Math.PI / 180;
}
function ToDeg(vInput) {
    return vInput * 180 / Math.PI;
}
function checkVisibles(){
  var cam_height = getCameraHeight();  
  //blink points  
  if (main.baselinepoint_entities && main.baselinepoint_entities.length > 0){
    if(cam_height > main.cam_5K && cam_height <= main.cam_2500K){            
        if (main.baselinepoint_entities[0].point.show.getValue() == false){
          for (let i = 0; i < main.baselinepoint_entities.length; i++){
            main.baselinepoint_entities[i].point.show.setValue(true);
          }
        }            
    }else{
      if (main.baselinepoint_entities[0].point.show.getValue() == true){
        for (let i = 0; i < main.baselinepoint_entities.length; i++){
          main.baselinepoint_entities[i].point.show.setValue(false);
        }
      }
    }    
  }
  //main line
  if(main.tower_baseline_entity){
    if(cam_height > main.cam_5K && cam_height <= main.cam_2500K){            
        if (main.tower_baseline_entity.polyline.show.getValue() == false){                
          main.tower_baseline_entity.polyline.show.setValue(true);                
        }            
    }else{
      if (main.tower_baseline_entity.polyline.show.getValue() == true){              
        main.tower_baseline_entity.polyline.show.setValue(false);              
      }
    }    
  }
  //tower lines
  if (main.tower_line_entities && main.tower_line_entities.length > 0){
    if(cam_height <= main.cam_5K){            
        if (main.tower_line_entities[0].polyline.show.getValue() == false){
          for (let i = 0; i < main.tower_line_entities.length; i++){
            main.tower_line_entities[i].polyline.show.setValue(true);
          }
        }            
    }else{
      if (main.tower_line_entities[0].polyline.show.getValue() == true){
        for (let i = 0; i < main.tower_line_entities.length; i++){
          main.tower_line_entities[i].polyline.show.setValue(false);
        }
      }
    }    
  }
  viewer.scene.requestRender();
}
function getCameraHeight() {
  var camera = viewer.camera;
  console.log(camera, "for camera height")
  var canvas = viewer.scene.canvas;
  var ray = camera.getPickRay(new Cesium.Cartesian2(
      Math.round(canvas.clientWidth / 2),
      Math.round(canvas.clientHeight / 2)
  ));

  var position = viewer.scene.globe.pick(ray, viewer.scene);
  if (Cesium.defined(position)) {
      var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
      // var height = cartographic.height;
      var range = Cesium.Cartesian3.distance(position, camera.position);
      return range;
      // console.log('Lat/Lon: [' +
      //     Cesium.Math.toDegrees(cartographic.latitude).toFixed(2) + ',' +
      //     Cesium.Math.toDegrees(cartographic.longitude).toFixed(2) + ']'+
      //     ' height: ' + height.toFixed(2) +
      //     ' range: ' + range.toFixed(2)
      // );
  } else {
      console.log('Looking at space?');
      return -1;
  }
}
</script>