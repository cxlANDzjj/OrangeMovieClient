var qqmap = require('/vendor/qqmap-sdk.min.js')

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  getpoi: function (callback) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var lat = res.latitude;
        var lon = res.longitude;
        var demo = new qqmap({
          key: 'OWVBZ-HJYK5-GZKIT-QVXGO-27V7H-IDBBX'
        });
        demo.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lon
          },
          success: function (res) {
            var city = res.result.address_component.city;
            var len = city.length;
            if(city.charAt(city.length - 1) === '市') {
              city = city.slice(0, -1);
            }
            that.globalData.positionCity = city;
            var recentCities = wx.getStorageSync('recentCities') || [];
            if(recentCities.length) {
              that.globalData.currentCity = recentCities[0];
              if (!that.globalData.reminded && recentCities[0] !== city) {
                that.remind(callback);
                return;
              }
            }
            else {
              that.globalData.currentCity = city;
            }
            callback(that.globalData.currentCity);
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
    })
  },

  remind: function (callback) {
    var that = this;
    that.globalData.reminded = true;
    var positionCity = that.globalData.positionCity;
    var currentCity = that.globalData.currentCity;
    wx.showModal({
      title: '',
      content: '定位到您当前所在的城市为' + positionCity + ',是否切换',
      success: function (res) {
        if(res.confirm) {
          that.globalData.currentCity = positionCity;
        }
        callback(that.globalData.currentCity);
      }
    })
  },

  globalData: {
    userInfo: null,
    positionCity: '',
    currentCity: '',
    reminded: false,
    URL: 'http://kakit.top:8000'
  }
})
