<template>
  <div
    class="ol-overlay__wrapper"
    :class="{
      'is-fullscreen': type === 'fullscreen',
      'is-dynamic': type === 'dynamic',
      'is-popup': type === 'popup'
    }"
    :style="wrapperStyle"
    ref="wrapper"
    @click.self="_handleWrapperClick">
    <div v-if="type === 'popup'" class="ol-overlay__marker" ref="marker">
      <slot name="marker"></slot>
    </div>
    <div
      class="ol-overlay"
      :class="customClass"
      :style="{ left: overlayLeft, backgroundColor: color }"
      ref="overlay">
      <div v-if="type === 'popup'" class="ol-overlay__arrow" :style="{ borderRightColor: color }"></div>
      <div v-if="type === 'dynamic'" class="ol-overlay__pulse__inner" :style="pulseStyle"></div>
      <div v-if="type === 'dynamic'" class="ol-overlay__pulse__outer" :style="pulseStyle"></div>
      <div v-if="type !== 'dynamic'" class="ol-overlay__header">
        <slot name="title">
          <span class="ol-overlay__title">{{ title }}</span>
        </slot>
        <button
          type="button"
          class="ol-overlay__headerbtn"
          :style="closeBtnStyle"
          @click="_handleClose">
          <img src="../images/close.png" class="ol-overlay__closeImg" :style="closeImgStyle">
        </button>
      </div>
      <div v-if="type !== 'dynamic'" class="ol-overlay__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ready from '../mixins/ready';

export default {
  name: 'OlOverlay',
  mixins: [ready],
  data () {
    return {
      overlay: null,
      closeBtnTop: 0,
      closeBtnRight: 0,
      overlayLeft: 0
    };
  },
  props: {
    vid: {
      type: String,
      required: true
    },
    position: {
      type: Array,
      required: true
    },
    // overlay 对于 position 的相对位置，
    // 可能的值包括 bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，
    // 默认是 top-left，也就是 element 左上角与 position 重合
    positioning: String,
    // 正值分别向右和向下偏移
    offset: Array,
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'popup',
      validator: function (value) {
        return ['fullscreen', 'popup', 'dynamic'].indexOf(value) > -1;
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    stopEvent: {
      type: Boolean,
      default: true
    },
    autoPan: {
      type: Boolean,
      default: true
    },
    autoPanAnimation: {
      type: Number,
      default: 250
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    wrapperStyle () {
      let style = {};
      if (this.type === 'fullscreen') {
        style.width = document.body.clientWidth + 'px';
        style.height = document.body.clientHeight + 'px';
      }
      return style;
    },
    closeImgStyle () {
      let style = {
        width: '10px',
        height: '10px'
      };
      if (this.type === 'fullscreen') {
        style.width = '20px';
        style.height = '20px';
      }
      return style;
    },
    closeBtnStyle () {
      let style = {
        top: '20px',
        right: '20px'
      };
      if (this.type === 'fullscreen') {
        style.top = this.closeBtnTop + 'px';
        style.right = this.closeBtnRight + 'px';
      }
      return style;
    },
    pulseStyle () {
      return {
        borderColor: this.color,
        boxShadow: `1px 1px 16px ${this.color}`
      };
    }
  },
  watch: {
    position (newPosition) {
      if (newPosition.length) {
        if (this.overlay) {
          this.overlay.setPosition(this._getPosition(newPosition));
        } else {
          this._load();
        }
      } else {
        this._handleClose();
      }
    }
  },
  mounted () {
    if (this.type === 'fullscreen') {
      let overlayTop = (document.body.clientHeight - this.$refs.overlay.offsetHeight) / 2;
      let overlayRight = (document.body.clientWidth - this.$refs.overlay.offsetWidth) / 2;
      this.closeBtnTop = -(overlayTop - 20 - 20);
      this.closeBtnRight = -(overlayRight - 20);

      this.overlayLeft = '50%';
    } else if (this.type === 'popup') {
      if (this.$slots.marker) {
        this.overlayLeft = '22px';
      } else {
        this.overlayLeft = '8px';
      }
    } else {
      this.overlayLeft = 0;
    }
  },
  methods: {
    _load () {
      this.overlay = new this.ol.Overlay({
        id: this.vid,
        element: this.$el,
        position: this._getPosition(this.position),
        positioning: this.type === 'dynamic' ? 'center-center' : this.positioning,
        offset: this.offset,
        stopEvent: this.stopEvent,
        autoPan: this.autoPan,
        autoPanAnimation: {
          duration: this.autoPanAnimation
        }
      });
      this.overlay.set('id', this.vid);
      this.overlay.set('massClear', this.massClear);
      this.map.addOverlay(this.overlay);
    },
    _getPosition (position) {
      if (position.length === 0) {
        position = undefined;
      } else {
        if (this.type === 'fullscreen') {
          position = this.map.getCoordinateFromPixel([0, 0]);
        }
      }
      return position;
    },
    _handleClose () {
      this.overlay.setPosition(undefined);
      return false;
    },
    _handleWrapperClick () {
      if (!this.closeOnClickModal) { return false; }
      this._handleClose();
    }
  },
  beforeDestroy () {
    this.map && this.overlay && this.map.removeOverlay(this.overlay);
  }
};
</script>
<style scoped>
.ol-overlay__wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
.ol-overlay__wrapper.is-fullscreen {
  background-color: rgba(0, 0, 0, .4);
}
.ol-overlay__wrapper.is-dynamic {
  position: relative;
}
.ol-overlay__marker {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
}
.ol-overlay {
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 9;
}
.ol-overlay__wrapper.is-fullscreen .ol-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.ol-overlay__wrapper.is-popup .ol-overlay {
  top: -20px;
  left: 10px;
}
.ol-overlay__wrapper.is-popup .ol-overlay__arrow {
  position: absolute;
  top: 10px;
  left: -16px;
  border: 8px solid transparent;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
}
.ol-overlay__wrapper.is-dynamic .ol-overlay {
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
}
.ol-overlay__wrapper.is-dynamic .ol-overlay__pulse__inner {
  /* content: ''; */
  position: absolute;
  height: 18px;
  width: 18px;
  left: -8px;
  top: -8px;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0.0;
  animation: pulse-inner 1s ease-out;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 16px #fff;
}
.ol-overlay__wrapper.is-dynamic .ol-overlay__pulse__outer {
  /* content: ''; */
  position: absolute;
  height: 20px;
  width: 20px;
  left: -9px;
  top: -9px;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0.0;
  animation: pulse-outer 1s ease-out;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 16px #fff;
}
.ol-overlay__header {
  padding: 20px;
  padding-bottom: 0;
}
.ol-overlay__title {
  line-height: 24px;
  font-size: 18px;
}
.ol-overlay__headerbtn{
  position: absolute;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}
.ol-overlay__closeImg {
  width: 10px;
  height: 10px;
}
.ol-overlay__body {
  padding: 20px;
  line-height: 24px;
  font-size: 14px;
}

@keyframes pulse-inner {
  0% {
    -webkit-transform: scale(0.1, 0.1); opacity: 0.0;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    -webkit-transform: scale(0.8, 0.8); opacity: 0.0;
  }
}
@keyframes pulse-outer {
  0% {
    -webkit-transform: scale(0.1, 0.1); opacity: 0.0;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2); opacity: 0.0;
  }
}
</style>
