// pages/leader.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var token = wx.getStorageSync('token')
    if (token) {
      this.getMyleader(token)
    } else {
      //token不存在直接转向登录
      wx.redirectTo({
        url: '../login/login',
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 查询上级信息
   */
  getMyleader:function(token){
    var that = this
    wx.request({
      url: _API.getMyleader,
      data: token,
      success: res => {
        console.log(res.data.msg)
        if (res.data.status == 1) {
          wx.setNavigationBarTitle({
            title: res.data.data.name
          })
          that.setData({
            user:res.data.data
          })
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
  }
})