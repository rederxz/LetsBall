// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userMiniprogramData: {},
    defaultCount: -1,
    pubCount: -1,
    subCount: -1,
    credit: -1
  },

  onTapLogIn: function(e) {
    var that = this
    if (!app.globalData.logged) {
      that._wechatSign()
    }
  },

  toIndex: function(e) {
    if(app.globalData.openId=='oxLgv4xWiY7m-O9smRhbFtr1OWhA'||app.globalData.openId=='oxLgv42LKttuU9Xt1g-J8MLzhWBw'||app.globalData.openId=='oxLgv45CH6C0OGbacZpkXfeBcWds'||app.globalData.openId=='oxLgv4yhSBCM-jyYFl8hzb1SAW5w')
    {wx.navigateTo({
      url: '../index/index',
    })}
    else{
      wx.showModal({
        title: '抱歉，您没有权限',
        confirmText: "我知道了",
        confirmColor: '#FE6559',
        showCancel: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this

    // 设置用户微信相关信息
    that.setData({
      userInfo: app.globalData.userInfo,
    })
    
    // 获取用户小程序相关信息
    that._getUserMiniprogramData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //私有函数
  _wechatSign: function(callback) {
    var that = this
    wx.showModal({
      title: '登录',
      content: '您要登录吗？',
      confirmColor: '#FE6559',
      cancelColor: '#81838F',
      cancelText: '取消',
      confirmText: '登录',
      success(res) {
        if (res.confirm) {
          console.log('用户确认登录。')
          wx.getUserProfile({
            desc: '用于更新和完善用户资料', 
            success: (res) => {
              console.log("获取用户信息成功")
              console.log(res.userInfo)
              app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
              app.globalData.userInfo.nickName = res.userInfo.nickName
              that._updateUser()
              wx.showModal({
                title: '登录成功！',
                confirmText: "好的",
                confirmColor: '#FE6559',
                showCancel: false,
              })
            },
          })
        }
      }
    })
  },

  // 添加用户进入数据库
  _updateUser: function() {
    var that = this
    // 调用云函数 TODO 这里输入参数不应该有openid和age，因为前端拿不到
    wx.cloud.callFunction({
      name: 'wechat_sign',
      data: {
        openId: app.globalData.openId,
        userPic: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        gender: app.globalData.userInfo.gender,
        age: 18,
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          console.log('注册完美成功！')
          app.globalData.logged = true
          app.globalData.user = res.result.data.user
          that.onShow()
        } else {
          console.error('传参错误！')
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
      }
    })
  },

  // 获取用户的小程序相关信息
  _getUserMiniprogramData: function() {
    var that = this
    wx.cloud.callFunction({
      name: 'get_user_detail',
      data: {
        openId: [app.globalData.openId],
      },
      success: res => {
        // console.log(res)
        if (res.result.errCode == 0 && res.result.data.users.length > 0) {
          var userMiniprogramData = res.result.data.users[0]
          // 根据userMiniProgramData得到发布、报名、违约次数
          // console.log(Object.keys(userMiniprogramData))
          if (Object.keys(userMiniprogramData).length > 0) {  // 如果得到用户小程序相关信息
            that.setData({
              pubCount: userMiniprogramData.publishedTasks.length,
              subCount: userMiniprogramData.registeredTasks.length,
              defaultCount: userMiniprogramData.applicantDefaultedTasks.length + userMiniprogramData.publisherDefaultedTasks.length,
              credit: userMiniprogramData.credit,
              userMiniprogramData: userMiniprogramData       
            })
          }
        } else {
          console.error('传参')
        }
        console.log(that.data)
      },
      fail: err => {
        console.error('[accept_registration] 调用失败', err)
      },
    })
  }
})