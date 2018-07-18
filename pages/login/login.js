// pages/login/login.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'江湖办公任务系统'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')

    if(token){
      //真实项目中 此处应向服务器请求校验token的正确性再做相应处理
      wx.redirectTo({
        url: '../me/me',
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
   * 表单提交
   */
  formSubmit: function (e) {
    if (e.detail.value.job_num == "" || e.detail.value.pwd == ""){
      wx.showToast({
        title: '请将信息填写完整',
        icon:'none',
        mask:true
      })
      return
    }


    //模拟管理员登录
    if (e.detail.value.job_num == 'admin' && e.detail.value.pwd == 'admin'){
      wx.redirectTo({
        url: '../person/person',
      })
    }else{
      /**  正常登录
      * 本地模拟登录态的生成，真实项目中token的存储更新及校验均在在服务器进行
      * 真实项目中会读取本地缓存的token到服务器校验
      */
      var timestamp = Date.parse(new Date()) / 1000
      let token = `${e.detail.value.job_num}-${timestamp}-${util.getRandom(4)}`
      wx.setStorageSync('token', token)
      wx.redirectTo({
        url: '../me/me',
      })
    }
    
  },
})