// pages/me/me.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
var animation = wx.createAnimation({
  duration: 200,
  timingFunction: "linear",
  delay: 0
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskContent: '为了更好的用户体验，需要您授权允许小程序使用您的基本信息，不会涉及任何信息泄露，您可以放心授权，若未成功授权，则使用匿名信息。',
    authBtnText: '好的',
    gridsArray: [{
        icon: "icon-user",
        name: "我的上级",
        url: "../leader/leader"
      },
      {
        icon: "icon-users",
        name: "我的下属",
        url: "../under/under"
      },
      {
        icon: "icon-time",
        name: "我的任务",
        url: "../tasks/tasks"
      },
      {
        icon: "icon-edit",
        name: "修改信息",
        url: "../edit/edit"
      },
      {
        icon: "icon-setting",
        name: "安全设置",
        url: "../set/set"
      },
      {
        icon: "icon-log",
        name: "登录日志",
        url: "../logs/logs"
      },
      {
        icon: "icon-search",
        name: "关于我",
        url: "../about/about"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('hasRegisted')) {
      this.setData({
        hasRegisted: true
      })
    }
    var token = wx.getStorageSync('token')
    if (token) {
      var myinfo = wx.getStorageSync('myinfo')
      if (myinfo) { // 本地如果有缓存列表，提前渲染
        this.setData({
          myinfo: myinfo
        })
      }
      this.getMyInfo(token)
    }else{
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
  onShow: function() {
    //遮罩层动画
    this.animation = animation
    animation.opacity(1).step()
    setTimeout(function() {
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 400)
  },


  /**
   * 获取我的信息
   */
  getMyInfo:function(token){
    /**
     * 此处仅模拟 并未真实校验token
     * token是在服务器换取个人标识的凭证
     * 将token发送给服务器，服务器解密出用户表示(userId/openid)后进行数据查询
     * 后同上
     */
    var that = this
    wx.request({
      url: _API.getMyinfo,
      data: token,
      success:res=>{
        console.log(res.data.msg)
        if(res.data.status == 1){
          //覆盖缓存数据 并重新渲染
          wx.setStorageSync('myinfo', res.data.data)
          that.setData({
            myinfo: res.data.data
          })
        }else{
          wx.showToast({
            title: '获取数据失败',
            icon:'none',
            mask:true
          })
        }
      },
      fail:res=>{
        app.reqFail()
      }
    })
  },

  /**
   * 用户授权
   */
  getUserInfo: function(e) {
    wx.setStorageSync('hasRegisted', true)
    //隐藏遮罩层动画
    this.animation = animation
    animation.opacity(0).rotateX(-100).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      this.setData({
        hasRegisted: true
      })
    }.bind(this), 200)

    //同意授权
    if (e.detail.userInfo) {
      //设置时间戳 定期更新用
      e.detail.userInfo.time = Date.parse(new Date())
      wx.setStorageSync('userInfo', e.detail.userInfo)
      wx.setStorageSync('hasUserInfo', true)
      //拿到用户信息后按需处理即可
    } else {
      //拒绝授权
      wx.showModal({
        confirmColor: '#09BB07',
        showCancel: false,
        content: '您拒绝了授权',
        confirmText: '我知道了',
      })
    }
  },
  /**
   * 绑定事件
   */
  goMyinfo: function () {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
})