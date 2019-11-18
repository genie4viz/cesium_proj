/**
 * 动态加载初始资源
 */
;(function() {
  var resList = {
    icon: window.SITE_CONFIG.cdnUrl + '/static/img/favicon.ico',
    css: [
      window.SITE_CONFIG.cdnUrl + '/static/css/app.css',
    ],
    js: [
      // 插件, 放置业务之前加载, 以免业务需求依赖插件时, 还未加载出错
      // 插件 - echarts
 //     window.SITE_CONFIG.cdnUrl + '/static/plugins/echarts-3.8.5/echarts.common.min.js', //commented by zyl

      ///cdns
	/*
      'https://cdn.bootcss.com/vue/2.5.17/vue.min.js',
      'https://cdn.bootcss.com/vuex/2.5.0/vuex.min.js',
      'https://cdn.bootcss.com/vue-router/2.8.1/vue-router.min.js',
      'https://cdn.bootcss.com/element-ui/2.4.9/index.js',
      'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
      'https://cdn.bootcss.com/axios/0.16.2/axios.min.js',
      'https://cdn.bootcss.com/openlayers/4.6.5/ol.js',
      'https://cdn.bootcss.com/openlayers/4.6.5/ol.css',
      'https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js',
      'https://cdn.bootcss.com/echarts/3.8.5/echarts.common.min.js',*/

      // 插件 - ueditor
      window.SITE_CONFIG.cdnUrl + '/static/plugins/ueditor-1.4.3.3/ueditor.config.js',
      window.SITE_CONFIG.cdnUrl + '/static/plugins/ueditor-1.4.3.3/ueditor.all.min.js',
      window.SITE_CONFIG.cdnUrl + '/static/plugins/ueditor-1.4.3.3/lang/zh-cn/zh-cn.js',
      // 业务
      window.SITE_CONFIG.cdnUrl + '/static/js/manifest.js',
      window.SITE_CONFIG.cdnUrl + '/static/js/vendor.js',
      window.SITE_CONFIG.cdnUrl + '/static/js/app.js'


    ]
  };

  // 图标
  (function () {
    var _icon = document.createElement('link');
    _icon.setAttribute('rel', 'shortcut icon');
    _icon.setAttribute('type', 'image/x-icon');
    _icon.setAttribute('href', resList.icon);
    document.getElementsByTagName('head')[0].appendChild(_icon);
  })();

  // 样式
  (function () {
    document.getElementsByTagName('html')[0].style.opacity = 0;
    var i = 0;
    var _style = null;
    var createStyles = function () {
      if (i >= resList.css.length) {
        document.getElementsByTagName('html')[0].style.opacity = 1;
        return;
      }
      _style = document.createElement('link');
      _style.href = resList.css[i];
      _style.setAttribute('rel', 'stylesheet');
      _style.onload = function () {
        i++;
        createStyles();
      }
      document.getElementsByTagName('head')[0].appendChild(_style);
    }
    createStyles();
  })();

  // 脚本
  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      var i = 0;
      var _script = null;
      var createScripts = function () {
        if (i >= resList.js.length) {
          return;
        }
        _script = document.createElement('script');
        _script.src = resList.js[i];
        _script.onload = function () {
          i++;
          createScripts();
        }
        document.getElementsByTagName('body')[0].appendChild(_script);
      }
      createScripts();
    }
  };
})();
