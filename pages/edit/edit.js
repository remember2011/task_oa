// pages/edit/edit.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telFocus:0,
    emailFocus:0,
    files:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    if (token) {
      var myinfo = wx.getStorageSync('myinfo')
      if (myinfo) { // 本地如果有缓存列表，提前渲染
        this.setData({
          menus: [
            { attr: '姓名', val: myinfo.name },
            { attr: '工号', val: myinfo.jobid },
            { attr: '职位', val: `${myinfo.part}` - `${myinfo.job}` }
          ],
          myinfo: myinfo
        })
        wx.setNavigationBarTitle({
          title: myinfo.name
        })
      }
      this.getMyInfo(token)
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
   * 获取我的信息
   */
  getMyInfo: function (token) {
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
      success: res => {
        console.log(res.data.msg)
        if (res.data.status == 1) {
          //覆盖缓存数据 并重新渲染
          wx.setStorageSync('myinfo', res.data.data)
          that.setData({
            menus: [
              { attr: '姓名', val: res.data.data.name },
              { attr: '工号', val: res.data.data.jobid },
              { attr: '职位', val: `${res.data.data.part}-${res.data.data.job}` }
            ],
            myinfo: res.data.data
          })
          wx.setNavigationBarTitle({
            title: res.data.data.name
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
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
    }
  },

  /**
   * 表单操作-聚焦
   */
  inputFocus: function(e){
    var id = e.currentTarget.id;
    if (id=="tel"){
      this.setData({
        telFocus:1
      })
    }
    if (id == "email") {
      this.setData({
        emailFocus: 1
      })
    }
    
  },
  /**
   * 表单操作-失焦
   */
  inputBlur: function (e) {
    var id = e.currentTarget.id;
    if (id == "tel") {
      this.setData({
        telFocus: 0
      })
    }
    if (id == "email") {
      this.setData({
        emailFocus: 0
      })
    }
  },

  /**
   * 表单操作-提示
   */
  showTips:function(){
    wx.showToast({
      title: '暂无修改权限，请联系人事处进行修改。',
      icon: 'none'
    })
  },

  /**
   * 表单操作-提交
   */
  formSubmit: function(e){
    if (e.detail.value.tel == "" || e.detail.value.email == ""){
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        mask: true
      })
      return
    }
    
    wx.showLoading({
      title: '保存中...',
      mask:true
    })
    var token = wx.getStorageSync('token')
    e.detail.value.token = token
    wx.request({
      url: _API.setMyinfo,
      data: e.detail.value,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.msg)
        if (res.data.status == 1) {
          var myinfo = wx.getStorageSync('myinfo')
          myinfo.tel = e.detail.value.tel
          myinfo.email = e.detail.value.mail
          wx.setStorageSync('myinfo', myinfo)
          wx.showModal({
            content: '保存信息成功',
            showCancel:false,
            confirmText:"我知道了",
            success:res=>{
              wx.navigateBack({})
            }
          })
        } else {
          wx.showToast({
            title: '保存数据失败',
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