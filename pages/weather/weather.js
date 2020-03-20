// pages/weather/weather.js
const app = getApp();
var urlPrefix = require('../../configuration.js').urlPrefix;
var weatherKey = require('../../configuration.js').weatherKey;
var util = require('../../utils/util.js');
var location = '长沙';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    date: '',
    CustomBar: app.globalData.CustomBar,
    pBackgroundImg: '../../images/sunny.jpg',
    temp: 15,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var month = util.formatDate_month(new Date());
    var day = util.formatDate_day(new Date());
    var time
    var imgUrl
    switch (month) {
      case '010':
        time = 'Jan' + day;
        break;
      case '020':
        time = 'Feb' + day;
        break;
      case '030':
        time = 'Mar' + day;
        break;
      case '040':
        time = 'Apr' + day;
        break;
      case '050':
        time = 'May' + day;
        break;
      case '060':
        time = 'Jun' + day;
        break;
      case '070':
        time = 'Jul' + day;
        break;
      case '080':
        time = 'Aug' + day;
        break;
      case '090':
        time = 'Sep' + day;
        break;
      case '100':
        time = 'Oct' + day;
        break;
      case '110':
        time = 'Nov' + day;
        break;
      case '120':
        time = 'Dec' + day;
        break;
    }
    this.setData({
      date: time
    })
    wx.request({
      url: urlPrefix + '/now',
      method: 'GET',
      data: {
        location: location,
        key: weatherKey,
      },
      success: function(res) {
        console.log(res)
        that.setData({
          basic: res.data.HeWeather6[0].basic,
          now: res.data.HeWeather6[0].now,
          code: res.data.HeWeather6[0].now.cond_code,
        })
        console.log('code1: ' + res.data.HeWeather6[0].now.cond_code)
        that.changeImg(res.data.HeWeather6[0].now.cond_code);
      }
    })
    console.log(urlPrefix)
    var that = this
    // console.log(app.globalData)
    wx.getSystemInfo({
      success: function(res) {
        console.log('windowHeight: ' + res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  searchIcon: function(e) {
    location = e.detail.value
    console.log(location)
    console.log(this.data.code)
    this.onLoad();
    this.onShow();
  },
  changeImg: function(name) {
    var i = name;
    console.log('i' + i)
    var bgImg;
    if (i == 200) {
      bgImg = '../../images/cloudy.jpg'
    }
    if (i == 104) {
      bgImg = '../../images/104.jpg'
    }
    if (i == 501) {
      bgImg = '../../images/foggy.jpg'
    }
    if (i == 400) {
      bgImg = '../../images/snowy.jpg'
    }
    if (i == 300) {
      bgImg = '../../images/rain.jpg'
    }
    if (i == 100) {
      bgImg = '../../images/sunny.jpg'
    }
    this.setData({
      pBackgroundImg: bgImg
    });
  }
})