// pages/movies/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: {
      currentCity: '',
      placeholder: '找电影、演员、影院'
    },

    movieList: {},
    counts: 10,
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // console.log(res.userInfo);
        app.globalData.nickname = res.userInfo.nickName;
        app.globalData.avatar = res.userInfo.avatarUrl;
        wx.request({
          url: app.globalData.URL + '/api/users/',
          data: { 'name': res.userInfo.nickName, 'avatar': res.userInfo.avatarUrl },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res.data);
          },
          fail: function (res) {
            // console.log(res);
          }
        })
      }
    });
    app.getpoi(
      function (currentCity) {
        that.setData({
          'head.currentCity': currentCity
        })
        that.requestData();
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
    // this.requestData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestData(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // aux funciton
  requestData: function(update=false) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/api/movies/?city=' + that.data.head.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
      success: function (res) {
        // console.log(res.data);
        let movieList = res.data;

        // 对数据进行处理
        for (let item of movieList) {
          if (!item.onsale && item.numbers >= 10000) {
            let num = item.numbers / 10000;
            item.numbers = num.toFixed(1) + '万';
          }

          let nActors = item.members.length;
          let actors = "";
          for(let i = 1; i < nActors && i < 5; ++i) {
            actors += item.members[i] + ',';
          }
          item.actors = actors.slice(0, -1);

          let tags = "";
          for(let tag of item.tags) {
            tags += tag + ',';
          }
          item.tags = tags.slice(0, -1);
        }

        if (!update) {
          let len = movieList.length;
          that.setData({
            movieList: movieList,
            start: len
          });
        }
        else {
          let newList = that.data.movieList;
          newList = newList.concat(movieList);
          let len = newList.length;
          that.setData({
            'movieList': newList,
            start: len
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})