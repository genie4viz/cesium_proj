<script>
import { createVectorStyle } from '../utils/style';
import { isEmptyObject } from '../utils/util';
import ready from '../mixins/ready';
import render from '../mixins/overlay/render';
import reload from '../mixins/overlay/reload';
import beforeDestroy from '../mixins/beforeDestroy';

const TYPE = 'vector';

export default {
  name: 'OlVector',
  render () { return false; },
  mixins: [ready, render, reload, beforeDestroy],
  props: {
    vid: {
      type: String,
      required: true
    },
    name: String,
    data: {
      //type: Object,
      required: true
    },
    strokeColor: {
      type: String,
      default: '#ffffff'
    },
    strokeWidth: {
      type: Number,
      default: 1.5
    },
    fillColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.1)'
    },
    text: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    textStroke: {
      type: String,
      default: '#000000'
    },
    align: {
      type: String,
      default: 'center'
    },
    offset: {
      // 0: X，正值向左移动
      // 1: Y，正值向上移动
      type: Array,
      default: function () {
        return [0, 0];
      }
    },
    noDataMode: {
      type: String,
      default: 'clean',
      validator: function (value) {
        return ['clean', 'keep'].indexOf(value) > -1;
      }
    },
    opacity: {
      type: Number,
      default: 1
    },
    zIndex: {
      type: Number,
      default: 2
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // TODO 使用 smooth 使曲线平滑
    // TODO 矢量图里的文字可能有多种颜色（e.g：高压是蓝色，低压是红色）
    // TODO 兼容其他投影，现在只支持 3857
    _load () {
      if (isEmptyObject(this.data)) { return false; }
      this.render(TYPE, this._getSource(this._getFeatures(this.data)));
    },
    _getFeatures (data) {
      let features = new this.ol.format.GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(data);
      features.forEach(feature => {
        feature.attr = data;
        feature.set('attr', data);
        feature.set('vid', this.vid);
        feature.set('style', this._getStyle(feature));
      });
      return features;
    },
    _getSource (features) {
      return new this.ol.source.Vector({features: features});
    },
    _getStyle (feature) {
      let style = createVectorStyle(this.ol, {
        strokeColor: feature.getProperties().color || this.strokeColor,
        strokeWidth: this.strokeWidth,
        fillColor: feature.getProperties().color || this.fillColor,
        text: (feature.getProperties().val || this.text) + '',
        textColor: this.textColor,
        textStroke: this.textStroke,
        align: this.align,
        offsetX: this.offset ? this.offset[0] : 0,
        offsetY: this.offset ? this.offset[1] : 0
      });

      return new this.ol.style.Style(style);
    }
  }
};
</script>
