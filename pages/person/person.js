// pages/person/person.js
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
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAll()
  },


  /**
   * 获取全部成员
   */
  getAll:function(){
    var that = this
    wx.request({
      url: _API.getAlluser,
      success: res => {
        console.log(res.data.msg)
        if (res.data.status == 1) {
          wx.hideLoading()
          that.setData({
            parts: res.data.data
          })
          app.globalData.all = res.data.data
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