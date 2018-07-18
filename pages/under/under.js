// pages/under/under.js
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
    if (options.pid && options.pid != "" && options.pid != 'undefined') {
      this.setData({
        pid: options.pid
      })
      return
    }
    var token = wx.getStorageSync('token')
    if (token) {
      this.getMyunder(token)
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.pid){
      this.getUsers(this.data.pid) 
    }
  },

  /**
   * 查询下属信息
   */
  getMyunder: function (token) {
    var that = this
    wx.request({
      url: _API.getMyunder,
      data: token,
      success: res => {
        wx.hideLoading()
        console.log(res.data.msg)
        if (res.data.status == 1) {
          that.setData({
            froms: 1,
            unders: res.data.data
          })
          app.globalData.unders = res.data.data
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
   * 人事查询部门成员信息
   */
  getUsers:function(pid){
    
    var users = app.globalData.all.filter(el => el.pid == pid)[0] 
    this.setData({
      froms:2,
      unders: users.users
    })
  }
})