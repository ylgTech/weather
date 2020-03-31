// pages/weather/weather.js
// var app = getApp();

var urlPrefix = require('../../configuration.js').urlPrefix;
var surlPrefix = require('../../configuration.js').surlPrefix;
var weatherKey = require('../../configuration.js').weatherKey;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '../../images/warm-bg.jpg',
    temp: 15,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: urlPrefix + '/now',
      // url: 'https://free-api.heweather.net/s6/weather/now??location=beijing&key=fb5dedeb60954c9d8cee4719a10039c5',
      method: 'GET',  
      data: {
        location: 'changsha',
        key: weatherKey,
      },
      success: function (res) {
        console.log(res)
        let time = res.header.Date.split(" ")
        that.setData({
          basic: res.data.HeWeather6[0].basic,
          now: res.data.HeWeather6[0].now,
          date: time[1] + "  " + time[2],
        })
        if (res.data.HeWeather6[0].now.tmp >= 16) {
          that.setData({
            imgUrl: '../../images/warm-bg.jpg',
          })
        }
        else {
          that.setData({
            imgUrl: '../../images/cold-bg.jpg',
          })
        }
      }
    })



    var that = this
    // console.log(app.globalData)
    wx.getSystemInfo({
      success: function (res) {
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

  searchword: function (evt) {

    let searchword = evt.detail.value;
    var that = this;
    wx.request({
      url: urlPrefix + '/now',
      // url: 'https://free-api.heweather.net/s6/weather/now??location=beijing&key=fb5dedeb60954c9d8cee4719a10039c5',
      method: 'GET',
      data: {
        location: searchword,
        key: weatherKey,
      },
      success: function (res) {
        console.log(res)
        let time = res.header.Date.split(" ")
        that.setData({
          basic: res.data.HeWeather6[0].basic,
          now: res.data.HeWeather6[0].now,
          date: time[1] + "  " + time[2],
        })
        if (res.data.HeWeather6[0].now.tmp >= 16) {
          that.setData({
            imgUrl: '../../images/warm-bg.jpg',
          })
        }
        else {
          that.setData({
            imgUrl: '../../images/cold-bg.jpg',
          })
        }
      }
    })  
    // let that = this;
    // wx.request({
    //   url: surlPrefix + '/find',
    //   // url: 'https://free-api.heweather.net/s6/weather/now??location=beijing&key=fb5dedeb60954c9d8cee4719a10039c5',
    //   method: 'GET',
    //   data: {
    //     location: searchword,
    //     key: weatherKey,
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },


})