// pages/detail/detail.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //t=1 我收到的任务 t=2我分配的任务
    if (options.id && options.id != "" && options.id != 'undefined') {
      this.setData({
        tid: options.id
      })
    }
 
    if (options.t && options.t != "" && options.id != 'undefined') {
      this.setData({
        types: options.t
      })
      if (app.globalData.tasks) {
        if(options.t == 1){
          var detail = app.globalData.tasks.received.filter((el) => el.tid == options.id)[0]
        }
        if(options.t ==2){
          var detail = app.globalData.tasks.sent.filter((el) => el.tid == options.id)[0]
        }
        this.setData({
          task: detail,
        })
      }
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 表单操作-提交
   */
  formSubmit: function (e) {
    wx.showLoading({
      title: '处理中...',
      mask: true
    })
    //formId 用于发送模板消息
    var postData = {}
    postData.formId = e.detail.formId
    postData.tid = this.data.tid
    postData.donetime = Date.parse(new Date)
    postData.token = wx.getStorageSync('token')
    postData.types = this.data.types
    
    
    //向服务器发送数据 成功后的处理
    wx.hideLoading()
    if (this.data.types == 1){
      var content = '任务已成功提交！'
      if(this.data.task.status == 1){
        var st = 2
      }
      if (this.data.task.status == 3) {
        var st = 4
      }
      this.setData({
        ["task.status"]: st
      })
    }
    if (this.data.types == 2) {
      var content = '任务提醒发送成功！'
    }
    wx.showModal({
      content: content,
      showCancel: false,
      confirmText: "我知道了",
      success: res => {
        wx.navigateBack({})
      }
    })
  }
 
})