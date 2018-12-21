// pages/theater/theater.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: {
      currentCity: '',
      placeholder: '找影院'
    },
    theaters: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getpoi(
      function (currentCity) {
        that.setData({
          'head.currentCity': currentCity
        });
        wx.request({
          url: app.globalData.URL + '/api/theaters/?city=' + currentCity,
          success: function (res) {
            // console.log(res.data)
            that.setData({
              theaters: res.data
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    );
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

  }
})