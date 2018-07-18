// pages/tasks/tasks.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
var sliderWidth = 48
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我收到的", "我发布的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    icons:[
      '../../public/pics/ing.png',
      '../../public/pics/done.png',
      '../../public/pics/over.png',
      '../../public/pics/overdone.png',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    if (token) {
      this.getMytask(token)
    } else {
      //token不存在直接转向登录
      wx.redirectTo({
        url: '../login/login',
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        })
      }
    })
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 我的任务
   */
  getMytask: function (token) {
    var that = this
    wx.request({
      url: _API.getMytask,
      data: token,
      success: res => {
        wx.hideLoading()
        console.log(res.data.msg)
        if (res.data.status == 1) {
          var received = res.data.data.received.map(el => {
            el.createtime = util.dateDiff(el.createtime)
            el.donetime = util.formatTime(new Date(Number(el.donetime)))
            return el
          })
          var sent = res.data.data.sent.map(el => {
            el.createtime = util.dateDiff(el.createtime)
            el.donetime = util.formatTime(new Date(Number(el.donetime)))
            return el
          })
          that.setData({
            received: received,
            sent: sent
          })
          app.globalData.tasks = { received: received,sent:sent}
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none',
            mask: true
          })
        }
      },
      fail: res => {
        app.reqFail()
      }
    })
  },


  /**
   * 选项卡切换
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})