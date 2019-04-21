// pages/user/user.js
const regeneratorRuntime = require('../common/regenerator-runtime.js')
//获取应用实例
const app = getApp()
const db = wx.cloud.database({})
let openid = ''

Page({
      data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        score: 0,
      },
      
      onShow() {
        let score = wx.getStorageSync('score')
        this.setData({
          score: score
        })
      },
  // 分别进入不同的页面
  clickItem(e) {
    let type = e.target.dataset.type
    let page_url = ''
    let openid = wx.getStorageSync('openid')

    // 检查用户是否登陆
    if (!openid) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1500
      })
      return
    }

    switch (type) {
      case 'msg':
        page_url = '/pages/msg/index'
        break
      case 'push':
        page_url = '/pages/push/index?type=push'
        break
      case 'adoption':
        page_url = '/pages/push/index?type=adoption'
        break
      case 'feedback':
        page_url = '/pages/feedback/feedback'
        break
      case 'lovetest':
        page_url = '/pages/lovetest/index'
        break
    }
    console.log(1111111)

    wx.navigateTo({
      url: page_url,
    })

  },
      onLoad() {
        if (app.globalData.userInfo) {
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })

          // this.addUser(app.globalData.userInfo)
        } else if (this.data.canIUse) {
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })

            // this.addUser(res.userInfo)
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo

              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })

              // this.addUser(app.globalData.userInfo)
            }
          })
        }
      },

      // 获取用户信息
      async getUserInfo(e) {
        if (e.detail.userInfo) {
          app.globalData.userInfo = e.detail.userInfo
          console.log(e.detail.userInfo)
          this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })

          wx.cloud.callFunction({
            name: 'login',
          }).then(async (res) => {
            console.log(res)
            // 获取openid
            openid = res.result.openid

            let result = await db.collection('user').where({
              _openid: openid
            }).get()

            // 设置openid
            wx.setStorage({
              key: 'openid',
              data: openid,
            })

            console.log('result:', result)

            

            // 判断user表里面是否有openid
            if (result.data.length == 0) {
              this.addUser(e.detail.userInfo)
            } else {
              // 设置usermsg
              wx.setStorage({
                key: 'usermsg',
                data: result.data[0].usermsg,
              })

              // 设置openid
              wx.setStorage({
                key: 'score',
                data: result.data[0].score,
              })
            }
          })
          return
        }
      },

      // 如果数据库没有此用户，则添加
      async addUser(user) {
        if (app.globalData.hasUser) {
          return
        }

        // 在此插入储存用户代码

        console.log(user)

        // 插入用户信息
        let result = await db.collection('user').add({
          data: {
            ...user,
            // 用户信息
            usermsg: 0,
            adoption_list: [],
            score: 0
          }
        })

        // 设置openid
        wx.setStorage({
          key: 'score',
          data: 0,
        })

        app.globalData.nickName = user.nickName
        app.globalData.id = result._id
        
      }
      })
