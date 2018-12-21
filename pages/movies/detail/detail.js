// pages/movies/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    comments: [],
    expanded: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.name,
    })
    wx.request({
      url: app.globalData.URL + '/api/movies/' + options.id + '/',
      success: function (res) {
        // console.log(res.data);
        res.data.des = []
        let tags = "";
        for (let tag of res.data.tags) {
          tags += tag + ',';
        }
        res.data.des.push(tags.slice(0, -1));
        res.data.des.push(res.data.info);
        res.data.des.push(res.data.release_date+' 上映');

        that.setData({
          details: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.request({
      url: app.globalData.URL + '/api/comments/?movie=' + options.name,
      success: function (res) {
        // console.log(res.data);
        that.setData({
          comments: res.data
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

  expand: function() {
    var that = this;
    this.setData({
      expanded: !that.data.expanded
    })
  },
})