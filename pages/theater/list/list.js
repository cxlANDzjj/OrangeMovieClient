// pages/theater/list/list.js
var util = require('../../../utils/util.js');
var weekday = util.getWeek(12);
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    theaters: [],
    weekday: weekday,
    selectedIndex: 0,
    movie: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.setData({
      movie: options.title
    });
    wx.request({
      url: app.globalData.URL + '/api/theaters/?city=' + app.globalData.currentCity,
      success: function (res) {
        that.setData({
          theaters: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
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

  selectDate: function (event) {
    var that = this;
    this.setData({
      selectedIndex: event.target.id
    });
    wx.request({
      url: app.globalData.URL + '/api/theaters/?city=' + app.globalData.currentCity,
      success: function (res) {
        that.setData({
          theaters: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})