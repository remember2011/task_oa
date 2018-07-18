// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[
      { attr: '旧密码', name: 'old_pwd', place:'请输入旧密码'},
      { attr: '新密码', name: 'new_pwd', place: '请输入新密码' },
      { attr: '确认密码', name: 'conf_pwd', place: '请重新输入新密码' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if (e.detail.value.new_pwd == "" || e.detail.value.old_pwd == "" || e.detail.value.conf_pwd == "") {
      wx.showToast({
        title: '请将密码填写完整',
        icon: 'none',
        mask: true
      })
      return
    }
    if (e.detail.value.new_pwd !== e.detail.value.conf_pwd){
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showModal({
      content: '修改密码成功',
      showCancel: false,
      confirmText: "我知道了",
      success: res => {
        wx.navigateBack({})
      }
    })
  },
})