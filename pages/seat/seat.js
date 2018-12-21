// pages/seat/seat.js
var app = getApp();

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    shop: {},
    map: [],
    columns: [],
    touching: false,
    selected: 0,
    selectedSeats: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.id);
    this.setData({
      id: options.id
    });
    wx.request({
      url: app.globalData.URL+'/api/seats/' + options.id + "/",
      success: function (res) {
        // console.log(res.data);
        let shop = res.data;
        let seats = JSON.parse(shop.seats.replace(/'/g, '"'));
        that.setData({
          shop: shop,
          map: seats.seats
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var columns = [];
    var map = this.data.map;
    for(var i = 1; i <= map.length; ++i) {
      columns.push(i);
    }
    this.setData({
      columns: columns
    });
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

  // click
  selectSeat: function (event) {
    var i = event.currentTarget.dataset.i;
    var j = event.currentTarget.dataset.j;
    var map = this.data.map;
    var selected = this.data.selected;
    if(selected >= 4) {
      wx.showToast({
        title: '最多选4个座位',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      map[i][j] = 2;
      var selectedSeats = this.data.selectedSeats;
      selectedSeats.push(formatNumber(i + 1) + '排' + (j + 1) + '座');
      this.setData({
        selected: selected + 1,
        map: map,
        selectedSeats: selectedSeats
      });
    }
  },

  cancelSeat: function (event) {
    var i = event.currentTarget.dataset.i;
    var j = event.currentTarget.dataset.j;
    var map = this.data.map;
    var selected = this.data.selected;

    map[i][j] = 1;
    var selectedSeats = this.data.selectedSeats;
    var seat = formatNumber(i + 1) + '排' + (j + 1) + '座';
    selectedSeats.splice(selectedSeats.indexOf(seat), 1);
    this.setData({
      selected: selected - 1,
      map: map,
      selectedSeats: selectedSeats
    });
  },

  // scroll
  scrollStart: function (event) {
    this.sX = event.changedTouches[0].clientX;
    this.sY = event.changedTouches[0].clientY;
    this.setData({
      touching: true
    });
  },

  scrollMove: function (event) {
    var mX = event.changedTouches[0].clientX;
    var mY = event.changedTouches[0].clientY;
    var deltaX = (mX - this.sX) / 2;
    var deltaY = (mY - this.sY) / 2;
    this.setData({
      deltaX: deltaX,
      deltaY: deltaY
    });
  },

  scrollEnd: function (event) {
    var eX = event.changedTouches[0].clientX;
    var eY = event.changedTouches[0].clientY;
    this.setData({
      touching: false
    });
  },

  pay: function (event) {
    let that = this;
    let selectedSeats = []
    for (let i = 0; i < this.data.map.length; ++i) {
      for (let j = 0; j < this.data.map[0].length; ++j) {
        if(this.data.map[i][j] == 2) {
          selectedSeats.push(Number(i));
          selectedSeats.push(Number(j));
        }
      }
    }
    let seats = {
      "seats": this.data.map
    };
    seats = JSON.stringify(seats);
    seats = seats.replace(/2/g, '3');
    wx.request({
      url: app.globalData.URL + '/api/tickets/add/',
      data: { 'scene': that.data.id, 'user': app.globalData.nickname, 'seats': selectedSeats },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.request({
      url: app.globalData.URL + '/api/pay/' + that.data.id + "/",
      data: { 'seats': seats },
      method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/pay/pay'
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})