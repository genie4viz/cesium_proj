// eslint-disable-next-line
/* eslint-disable */
import Vue from 'vue'
import App from '@/App'
import router from '@/router' // api: https://github.com/vuejs/vue-router
import store from '@/store' // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import '@/element-ui' // api: https://github.com/ElemeFE/element
import '@/icons' // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import {
  isAuth
} from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import echarts from 'echarts';
import openlayers from '@/components/map';
import ol from 'openlayers';
import VueCesium from 'vue-cesium'

Vue.config.productionTip = false;
Vue.use(openlayers);

Vue.prototype.$echarts = echarts

Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.setStyle = function (styleobj) {
  if (!styleobj) {
    return;
  };
  var type = styleobj.type;
  var image = null;
  var fill = null;


  var stroke = null;
  var text = null;
  var style;

  if (type.substring(0, 1) === '1') {
    image = new ol.style.Icon({
      src: styleobj.imageurl ? 'static/images/' + styleobj.imageurl + '.png' : 'static/images/iconwhite4.png',
      scale: styleobj.scale ? styleobj.scale : 0.6,
      color: styleobj.imagecolor ? styleobj.imagecolor : '#fff',
      offset: styleobj.imageoffset ? styleobj.imageoffset : [0, 0],
      opacity: styleobj.imageopa ? styleobj.imageopa : 0.8,
      rotation: styleobj.rotation,
      rotateWithView: true
    });
  }
  if (type.substring(1, 2) === '1') {
    stroke = new ol.style.Stroke({
      color: styleobj.linecolor ? styleobj.linecolor : '#ffffff',
      width: styleobj.lwidth ? styleobj.lwidth : 1,
      lineDash: styleobj.lineDash ? styleobj.lineDash : null
    });
  }
  if (type.substring(2, 3) === '1') {
    fill = new ol.style.Fill({
      color: styleobj.fillcolor ? styleobj.fillcolor : 'rgba(255,0,0,0.8)',
      opacity: 0.6
    });
  }
  if (type.substring(3, 4) === '1') {
    var textTemp = styleobj.text ? styleobj.text : '';
    text = new ol.style.Text({
      // scale:styleobj.scale?styleobj.scale:zoomscale*0.25,
      text: textTemp + '',
      textAlign: 'center',
      font: styleobj.font ? styleobj.font : '12px 微软雅黑',
      opacity: 1,
      offsetY: styleobj.offsetY || 0,
      offsetX: styleobj.offsetX || 0,
      fill: new ol.style.Fill({
        color: styleobj.fontcolor ? styleobj.fontcolor : '#fff'
      }),
      stroke: new ol.style.Stroke({
        color: '#000',
        width: 5
      })
    });
  }
  if (type.substring(4, 5) === '1') {
    image = new ol.style.Circle({
      fill: new ol.style.Fill({
        color: styleobj.fillcolor
      }),
      stroke: new ol.style.Stroke({
        color: styleobj.linecolor,
        width: styleobj.cwidth
      }),
      radius: styleobj.cradius
    });
  }
  if (type.substring(5, 6) === '1') {
    image = new ol.style.RegularShape({
      fill: new ol.style.Fill({
        color: styleobj.rfillcolor
      }),
      // stroke: new ol.style.Stroke({color: "#007fff"}),
      points: 4,
      radius: 8,

      angle: Math.PI / 4
    });
  }

  style = new ol.style.Style({
    image: image,
    fill: fill,
    stroke: stroke,
    text: text
  });

  return style;
};
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
