import BaseModule from './base-module';
import httpRequest from '@/utils/httpRequest'
class Element extends BaseModule {
  getHumidity () {
    return this.get('static/data/rh.json');
  }
  getFire () {   
    this.$http = httpRequest;
    return this.$http({
      url: this.$http.adornUrl('fcjc/evmonitormicroclimatesite/list'),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {
      // console.log(res, "get micro towers information")
      if (res.status === 200 && res.data) {
        if (res.data.list && res.data.list.length) {
          return new Promise(resolve => {
            resolve(res.data.list);
          });
        } else {
          // alert('数据为空');
        }
      } else {
        alert('获取数据失败');
      }
    });
   
  }
  getAllRelativeTowerByTowerId(towerid){
    // return this.get('http://47.104.174.116:8083/renren-fast/zhyj/eveenginetowerinfo/getAllRelativeTowerByTowerId?towerid=');
    this.$http = httpRequest
    return this.$http({
      url: this.$http.adornUrl('zhyj/eveenginetowerinfo/getAllRelativeTowerByTowerId?towerid=' + towerid),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {      
      return res.data.towerList;
    });
  }
  gezyxl (a) {
    // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
    this.$http = httpRequest
    return this.$http({
      url: this.$http.adornUrl('zhyj/eveenginetowerinfo/getTowerYjByHours?evreceive='+a),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {
      return res.data.towerYjList;
    });
  }
  gegtlx (a) {

    // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
    this.$http = httpRequest
    return this.$http({
      url: this.$http.adornUrl('/zhyj/eveenginetowerinfo/getAllTowerByLoop?lineid='+a),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {
      return res.data.towerList

    });
  }
  geqtxl (a,b) {
    // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
    this.$http = httpRequest
    return this.$http({
      url: this.$http.adornUrl('zhyj/eveenginetowerinfo/getFpDtYjByHours?yjType='+a+'&evreceive='+b),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {
      return res.data.yjGroupCountAndList

    });
  }
  getqitaxianlu (a) {
    // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
    this.$http = httpRequest
    return this.$http({
      url: this.$http.adornUrl('/zhyj/eveenginetowerinfo/getAllTowerByLoop?lineid='+a),
      method: 'get',
      params: this.$http.adornParams()
    }).then(res => {
      console.log(res, 'getqitaxianlu !!!! ')
      return res.data.towerList

    });
  }
  // 
  // getleida (a,b,c) {
  //   // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
  //   this.$http = httpRequest
  //   return this.$http({
  //     url: this.$http.adornUrl('/fcjc/evmonitorthundersite/getThunderFilelist?evid='+a+'&starttime='+b+'&endtime='+c),
  //     method: 'get',
  //     params: this.$http.adornParams()
  //   }).then(res => {
	// 	console.log(res.data.files, "leida files");
  //     return res.data.files

  //   });
  // }
  gettf () {
    // return this.get('http://47.104.174.116:8083/renren-fast/generator/evdatatyphoonhistory/historyList');
    return this.get('static/data/station.json');
  }
  getWind () {
    return this.get('static/data/wd.json');
  }
  getStationName () {
    return this.get('static/data/sta.json');
  }
  
  getVector () {
    return this.get('static/data/quanguo.json');
  }

  getRadar () {
    return this.get('static/data/radar.json');
  }
}

export default new Element();
