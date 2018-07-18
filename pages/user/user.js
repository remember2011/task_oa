// pages/user/user.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id && options.id !="" && options.id !='undefined'){
      this.setData({
        uid: options.id
      })
    }
    if (options.from && options.from != "" && options.from != "undefined"){
      this.setData({
        froms: options.from
      })
    }
    if (options.pid && options.pid != "" && options.pid != "undefined") {
      this.setData({
        pid: options.pid
      })
    }
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.froms){
      if (this.data.froms == 1) {
        if (app.globalData.unders) {
          var user = app.globalData.unders.filter((el) => el.uid == this.data.uid)[0]
        }
      }
      if (this.data.froms == 2) {
        if (app.globalData.all) {
          var part = app.globalData.all.filter((el) => el.pid == this.data.pid)[0]
          var user = part.users.filter((el) => el.uid == this.data.uid)[0]
        }
      }

      this.setData({
        user: user,
        menus: [
          { attr: '姓名', val: user.name },
          { attr: '工号', val: user.jobid },
          { attr: '职位', val: `${user.part}-${user.job}` },
          { attr: '手机', val: user.tel },
          { attr: '邮箱', val: user.email },
        ],
      })
      wx.setNavigationBarTitle({
        title: user.name
      })
    }
  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    // console.log(e.detail.formId)
    wx.navigateTo({
      url: '../issue/issue?id=' + this.data.uid,
    })
  },

  /**
   * 减员操作
   */
  reduce:function(){
    var uid = this.data.uid
    wx.showModal({
      content: '该操作不可撤回，你确定要删除该员工的账户信息吗？',
      confirmText: "我确定",
      success: res => {
        if(res.confirm){
          wx.showToast({
            title: '删除成功',
            mask:true
          })
          var arr = app.globalData.all
          arr.filter(el=>{
            el.users.filter((es,index)=>{
              if (es.uid == uid){
                el.users.splice(index,1)
              }
            })
          })
          wx.navigateBack({})
        }

      }
    })
  }
})