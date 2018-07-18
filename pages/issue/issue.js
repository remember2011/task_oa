// pages/issue/issue.js
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
    if (!token) {
      //token不存在直接转向登录
      wx.redirectTo({
        url: '../login/login',
      })
      return
    } 
    if (options.id && options.id != "" && options.id != 'undefined') {
      this.setData({
        uid: options.id
      })
    }
    this.setData({
      now: util.formatDate(new Date()),
      date: util.formatDate(new Date())
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 时间选择器
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
  * 表单提交
  */
  formSubmit: function (e) {
    var postData = e.detail.value
    //formId 用于发送模板消息
    postData.formId = e.detail.formId
    postData.create_time = Date.parse(new Date)
    postData.token = wx.getStorageSync('token')
    if (postData.task_name == "" || postData.task_time == "" || postData.task_detail == ""){
      wx.showToast({
        title: '请将任务填写完整',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
      mask: true
    })
    //向服务器发送数据 成功后的处理
    wx.hideLoading()
    wx.showModal({
      content: '发布任务成功，该员工将会收到任务推送通知',
      showCancel: false,
      confirmText: "我知道了",
      success: res => {
        wx.navigateBack({})
      }
    })
  },
 
})