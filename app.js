//app.js  小程序逻辑 App()指定小程序的生命周期函数
const api = require("utils/api.js")
const _API = api.myApi

App({
 
  globalData:{

  },
  //生命周期函数--监听小程序初始化
  onLaunch: function() {
    this.upLogs()
    this.login()
  },

  /**
   * 登录 
   */
  login:function(){
    wx.login({
      success:res=> {
        if (res.code) {
          //用code换取openid sessionkey 在服务器做自己的用户处理
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 更新登录日志
   */
  upLogs:function(){
    var logs = wx.getStorageSync('logs') || []
    var stamp = Date.now()
    wx.getSystemInfo({
      success: res => {
        var logObj = {
          stamp: stamp,
          system: res.system
        }
        logs.unshift(logObj)
      }
    })
    wx.setStorageSync('logs', logs)
  },


  /**
   * 通用请求失败回调
   */
  reqFail: function () {
    wx.showToast({
      title: '网络似乎开小差了 :(',
      icon: 'none',
      duration: 1500
    })
  },


})