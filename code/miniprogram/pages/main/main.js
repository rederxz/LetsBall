// pages/main/main.js

const app = getApp()

Page({
  data: {
    status: 0,
    images: [ '/images/test1.jpg', '/images/test2.jpg'],
    activities: []
  },

  // 点击最新活动
  onTapNew: function (event) {
    this.setData({
      status: 0
    })
  },

  // 点击热门活动
  onTapHot: function (event) {
    this.setData({
      status: 1
    })
  },

  //进入详情页
  onTapDetail: function (event) {
    var TaskId = event.currentTarget.dataset.taskid
    console.log("获取到任务id:" + String(TaskId))
    // 如果没有登录，就直接进入报名者界面，正常显示满员与否
    if (!app.globalData.logged) {
      wx.navigateTo({
        url: '../detail_sub_1/detail_sub_1?TaskId=' + TaskId,
      })
    } else if (app.globalData.taskPub.includes(TaskId)) {  // 否则需要判断用户是否是该任务的发起者
      wx.navigateTo({
        url: '../detail_pub_1/detail_pub_1?TaskId=' + TaskId,
      })
    }
  },

  onUpdateUserInfo: function() {
    var that = this
    // 调用云函数 TODO 这里输入参数不应该有openid和age，因为前端拿不到
    wx.cloud.callFunction({
      name: 'Wechat_sign',
      data: {
        UserPic: app.globalData.userInfo.avatarUrl,
        NickName: app.globalData.userInfo.nickName,
        Gender: app.globalData.userInfo.gender,
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          app.globalData.logged = true
          app.globalData.user = res.result.data.user
        } else {
          wx.showModal({
            title: '抱歉，出错了呢~',
            content: res.result.errMsg,
            confirmText: "我知道了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  // 点击增加按钮
  onTapAdd: function (event) {
    console.log('点击增加按钮')
    // 判断用户是否登录
    if (!app.globalData.logged) {
      wx.showModal({
        title: '提示',
        content: '请先登录哦~',
        cancelText: '取消',
        confirmText: '登录',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var that = this
            wx.getUserProfile({
              desc: '用于更新和完善用户资料', 
              success: (res) => {
                console.log("获取用户信息成功")
                console.log(res.userInfo)
                app.globalData.userInfo = res.userInfo
                that.onUpdateUserInfo()
              },
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../publish/publish',
      })
    }
  },

  // 点击更多按钮
  onTapMore: function(event) {
    console.log("点击更多按钮")
    wx.navigateTo({
      url: '/pages/main-more/main-more',
    })
  },

  // 根据时间进行筛选
  filterByTime: function(activity) {
    let now = new Date()
    let startTime = new Date(Date.parse(activity.StartTime))
    if (now >= startTime) {
      return false
    }
    return true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    // 这里将调用云函数获得最新和最热活动
    var that = this
    // 获取最新活动并按照时间筛选
    wx.cloud.callFunction({
      name: 'get_latest_task',
      data: {
        num: 30,
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          let activities = res.result.data.activities
          // 根据时间筛选          
          activities = activities.filter(this.filterByTime)
          that.setData({
            newActivities: activities
          })
        } else {
          wx.showModal({
            title: '抱歉，出错了呢~',
            content: res.result.errMsg,
            confirmText: "我知道了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })

    // 获取热门活动并按照时间筛选
    wx.cloud.callFunction({
      name: 'get_hot_task',
      data: {
        num: 30,
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          let activities = res.result.data.activities
          // 根据时间筛选          
          activities = activities.filter(this.filterByTime)
          that.setData({
            hotActivities: activities
          })
        } else {
          wx.showModal({
            title: '抱歉，出错了呢~',
            content: res.result.errMsg,
            confirmText: "我知道了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })

    // 获取用户发布的所有活动
    wx.cloud.callFunction({
      name: 'get_user_published',
      data: {},
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          let taskPub = res.result.data.taskId
          app.globalData.taskPub = taskPub
        } else {
          wx.showModal({
            title: '抱歉，出错了呢~',
            content: res.result.errMsg,
            confirmText: "我知道了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })

    // 获取用户报名的所有活动
    wx.cloud.callFunction({
      name: 'get_user_signed',
      data: {},
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          let taskSub = res.result.data.taskId
          app.globalData.taskSub = taskSub
        } else {
          wx.showModal({
            title: '抱歉，出错了呢~',
            content: res.result.errMsg,
            confirmText: "我知道了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [wechat_sign] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    
    // some dummy data
    var newActivities =  [
      {
        picture_url: "/images/test3.jpg",
        title: '足球运动',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1",
      },
      {
        picture_url: "/images/test3.jpg",
        title: '足球运动',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "2",
      },
      {
        picture_url: "/images/test3.jpg",
        title: '足球运动',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "3",
      },
      {
        picture_url: "/images/test3.jpg",
        title: '足球运动',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "4",
      },
      {
        picture_url: "/images/test2.jpg",
        title: '足球运动',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "5",
      },
    ]
    var hotActivities =  [
      {
        picture_url: "/images/test4.jpg",
        title: '击剑',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1234567",
      },
      {
        picture_url: "/images/test3.jpg",
        title: '击剑',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1234567",
      },
      {
        picture_url: "/images/test4.jpg",
        title: '击剑',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1234567",
      },
      {
        picture_url: "/images/test4.jpg",
        title: '击剑',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1234567",
      },
      {
        picture_url: "/images/test2.jpg",
        title: '击剑',
        loc: "氣膜館",
        time: "10月1日",
        leader: "令狐沖",
        TaskId: "1234567",
      },
    ]
    var taskSub = [
      '1', '2', '3'
    ]
    var taskPub = [
      '4', '5', '6'
    ]
    this.setData({
      status: 0,
      newActivities: newActivities,
      hotActivities: hotActivities,
    })
    app.globalData.taskSub = taskSub
    app.globalData.taskPub = taskPub
    app.globalData.logged = true
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
    if (this.data.status == 0) {
      this.setData({
        activities: this.data.newActivities
      })
      console.log("当前状态是0")
    } else {
      this.setData({
        activities: this.data.hotActivities
      })
      console.log("当前状态是1")
    }
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

  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })

    console.log(index)
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  },

  onShareAppMessage() {
  }

})