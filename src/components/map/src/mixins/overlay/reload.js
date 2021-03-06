import { isEmptyObject, getDataType } from '../../utils/util';

export default {
  watch: {
    // data 发生改变时先检测以当前 vid 为 id 的图层是否存在，
    // 再检测传递过来的数据是否有效，
    // 如果无效，根据 noDataMode 进行操作，
    // 如果有效且以当前 vid 为 id 的图层已经存在，则直接使用 setSource 替换数据，可以减小开销并有效防止图层闪烁，若图层不存在则创建新的图层
    data (newData) {
      let existLayer = this._getLayerByParam('id', this.vid);
      if (!this._isValidData(newData)) {
        if (this.noDataMode === 'clean') {
          existLayer && this.map.removeLayer(existLayer);
        }
        return false;
      }

      if (existLayer) {
        existLayer.setSource(this._getSource(this._getFeatures(newData)));
      } else {
        this._load();
      }
    },
    opacity (newOpacity) {
      this.layer && this.layer.setOpacity(Math.abs(newOpacity));
    },
    scale (newscale) {
      console.log("4444444444444444444")
     // this.layer && this.layer.setScale(newscale);
    }
  },
  methods: {
    _getLayerByParam (key, value) {
      let layersList = this.map.getLayers().getArray();
      for (let i = layersList.length - 1; i >= 0; i--) {
        if (layersList[i].get(key) === value) {
          return layersList[i];
        }
      }
      return false;
    },
    _isValidData (data) {
      let type = getDataType(data);
      // 目前（2018/03/01）overlays 接受的数据类型只有 Object、Array 和 String 三种
      // 如果有更多数据类型则需要扩展
      switch (type) {
        case 'Object':
          return !isEmptyObject(data);
        case 'Array':
        case 'String':
          return !!data.length;
        default:
          return false;
      }
    }
  }
};
