// pages/add/add.js
const util = require('../../utils/util.js')
const api = require("../../utils/api.js")
const _API = api.myApi
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getParts()
    //修改信息时的处理
    if (options.uid && options.uid != "" && options.uid != 'undefined') {
      this.setData({
        uid: options.uid,
        isEdit: true
      })
      if (app.globalData.all) {
        app.globalData.all.filter(el => {
          el.users.filter(user => {
            if (user.uid == options.uid) {
              this.setData({
                user
              })
            }
          })
        })
      }
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 获取部门
   */
  getParts: function() {
    var that = this
    wx.request({
      url: _API.getParts,
      success: res => {
        console.log(res.data.msg)
        if (res.data.status == 1) {
          if (that.data.isEdit) {
            var part = that.data.user.part
            var job = that.data.user.job
            res.data.data.forEach((el, index) => {
              if (el.name == part) {
                el.jobs.forEach((es, ind) => {
                  if (es.name == job) {
                    that.setData({
                      pid: el.pid,
                      jid: es.jid,
                      multiIndex: [index, ind],
                      multiArray: [res.data.data, res.data.data[index].jobs],
                    })
                  }
                })
              }
            })
          }else{
            that.setData({
              multiArray: [res.data.data, res.data.data[0].jobs],
              multiIndex: [0, 0],
              pid: res.data.data[0].pid,
              jid: res.data.data[0].jobs[0].jid,
            })
          }
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
   * 选择器
   */
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      pid: this.data.multiArray[0][e.detail.value[0]].pid,
      jid: this.data.multiArray[1][e.detail.value[1]].jid,
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case (data.multiIndex[0]):
            data.multiArray[1] = data.multiArray[0][data.multiIndex[0]].jobs
            break;
        }
        data.multiIndex[1] = 0
        break;
    }
    this.setData(data);
  },

  /**
   * 表单提交
   */
  formSubmit: function(e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        mask: true
      })
      return
    }
    if (!this.data.pid || !this.data.jid) {
      wx.showToast({
        title: '请等待数据加载完成后再提交',
        icon: 'none',
        mask: true
      })
      return
    }
    if(this.data.isEdit){
      this.edit(e.detail)
    }else{
      this.add(e.detail)
    }
    
    
  },
  /**
   * 新增员工
   */
  add:function(data){
    var postData = data.value
    postData.time = Date.parse(new Date)
    postData.pid = this.data.pid
    postData.jid = this.data.jid
    wx.showLoading({
      title: '保存中...',
      mask: true
    })
    //向服务器发送数据 成功后的处理
    wx.hideLoading()
    var info = '姓名:王大明\r\n工号:0234345\r\n初始密码:000000\r\n请员工本人登录系统初始化本账号。'
    var user = {
      name:'王大明',
      jobid:'0131322'
    }
    
    wx.showModal({
      content: '新增成功。\r\n姓名:王大明\r\n工号:0234345\r\n初始密码:000000\r\n员工本人登录系统后账号自动激活，方可进行任务分配。',
      showCancel: false,
      confirmText: "一键复制",
      success: res => {
        wx.setClipboardData({
          data: info,
          success: res => {
            wx.getClipboardData({
              success: res => {
                wx.navigateBack({})
              }
            })
          }
        })

      }
    })
  },
  /**
   * 修改员工信息
   */
  edit:function(data){
    var postData = { ...data.value}
    postData.formId = data.formId
    postData.pid = this.data.pid
    postData.jid = this.data.jid
    wx.showLoading({
      title: '保存中...',
      mask: true
    })
    //向服务器发送数据 成功后的处理
    wx.hideLoading()

    //向全局变量中修改本条数据
    var user = { ...data.value, ...data.target.dataset,avatar:this.data.user.avatar}
    app.globalData.all.forEach((el,index)=>{
      el.users.forEach((es,ind)=>{
        if(es.uid == user.uid){
          el.users.splice(ind, 1, user)
        }
      })
    })
    wx.showModal({
      content: '修改成功。',
      showCancel: false,
      confirmText: "我知道了",
      success: res => {
        wx.navigateBack({})
      }
    })
  }
})