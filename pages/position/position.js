// pages/position/position.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: '',
    cities: [],
    recent: [],
    toIndex: '#'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '当前城市-' + options.city,
    });
    this.setData({
      position: app.globalData.positionCity,
      recent: wx.getStorageSync('recentCities') || []
    });

    wx.request({
      url: app.globalData.URL + '/api/cities/',
      success: function (res) {
        // console.log(res.data);
        that.setData({
          cities: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  scrollTo: function (event) {
    var target = event.target.dataset.to;
    console.log(target);
    if(target) {
      this.setData({
        toIndex: target
      });
    }
  },

  selectCity: function (event) {
    var target = event.target.dataset.set;
    if(target) {
      var recentCities = wx.getStorageSync('recentCities') || [];
      if(recentCities[0] != target) {
        recentCities.unshift(target);
      }
      recentCities = recentCities.slice(0, 3);
      wx.setStorageSync('recentCities', recentCities);
      wx.navigateBack();

      app.globalData.currentCity = target;

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        'head.currentCity': target
      })
    }
  }
})