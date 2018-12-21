// pages/shop/shop.js
var util = require('../../utils/util.js');
var weekday = util.getWeek(5);
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theater: '',
    shop: {},
    selectedIndex: 0,
    cover: '',
    selectedMovie: {},
    selectedDay: 0,
    weekday: weekday,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      theater: options.theater
    });
    // console.log(options.movie);
    wx.request({
      url: app.globalData.URL + '/api/shops/' + options.id + "/",
      success: function (res) {
        // console.log(res.data);
        let shop = res.data;
        let selectedIndex = 0;
        if(options.movie)
          selectedIndex = shop.movies.findIndex(function (value) { return value.name === options.movie; });
        console.log(selectedIndex)
        let cover = shop.movies[selectedIndex].cover;
        let selectedMovie = shop.movies[selectedIndex];
        that.setData({
          shop: shop,
          cover: cover,
          selectedIndex: selectedIndex,
          selectedMovie: selectedMovie
        })
      },
      fail: function (res) {
        console.log(res)
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

  selectMovie: function (event) {
    var that = this;
    var selectedIndex = Number(event.currentTarget.id);
    this.setData({
      selectedIndex: selectedIndex,
      cover: that.data.shop.movies[selectedIndex].cover,
      selectedMovie: that.data.shop.movies[selectedIndex]
    })
  }, 

  selectDate: function (event) {
    var that = this;
    this.setData({
      selectedDay: event.currentTarget.id
    });
  }
})