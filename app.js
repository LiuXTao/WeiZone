//app.js
import {TabBar} from "./pages/tab/tab.js"
import {Madals} from "./pages/madal/madal.js"
import {SmallTab} from "./pages/smalltab/smalltab.js"
var util = require('./utils/getOpenid.js');
App({
  TabBar,
  Madals,
  SmallTab,
  onLaunch: function (ops) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
    }
    wx.setStorageSync('logs', logs)
    // 登录
   var that=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var data =res.code ;
          //自定义的格式 ，主要就是传递给服务器一个code
          //发起网络请求
          util.myRequestByGet(  //请求获取openid
            that.globalData.phpUrl,//php网址
            data,
            function callback(obj) {
                that.globalData.openid=obj.data;
                that.getSetting(that)
            }
          )
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  getSetting: function (that) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("123")

        // if (res.authSetting['scope.userInfo']) {
        if (true) {
          console.log("12")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.globalData.yibu=true
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              //
              if (true) {
                // console.log(that.globalData.openid)
                wx.request({
                  url: 'https://www.concertgifts.cn/index.php/home/login/index',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  method: 'POST',
                  data: {
                    user_name: that.globalData.userInfo.nickName,
                    user_appid: that.globalData.openid
                  },

                  success: function (res) {
                    // GYB-start
                    if(res.data['user_id']){
                      wx.setStorage({
                        key: 'user_id',
                        data: res.data['user_id'],
                      });
                    }
                    if(res.data['zone_id']) {
                      wx.setStorage({
                        key: 'zone_id',
                        data: res.data['zone_id'],
                      });
                    }
                    if (res.data['zone_code']) {
                      wx.setStorage({
                        key: 'zone_code',
                        data: res.data['zone_code'],
                      });
                    }
                    //GYB-end
                   
                  }
                })
              }
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            },
            fail(err){
              console.log(err)
              wx.showModal({
                title: '用户未授权',
                content: '如需正常使用小程序功能，请按确定并且在【我的】页面中点击授权按钮，勾选用户信息并点击确定',
                confirmText: '确定',        
                showCancel:false,
                success: function (res) {
                  wx.openSetting({
                    success: function (res) {
                      res.authSetting = {
                           "scope.userInfo": true,
                           "scope.userLocation": true
                    }
                    }
                  })
                },
                fail: function () {
                  console.log('接口调用失败');
                },
                complete: function () {
                  console.log('接口调用结束')
                }
              })
    
            }
          })
        }
      }
    })
  },
  /**
 * get方式的请求都在这里
 */
 
  globalData: {
    userInfo: null,
    selectId:"1",
    phpUrl:'https://www.concertgifts.cn/index.php/Home/index/getOpenid',
    openid:null,
    yibu:''
  },
  remove:function (myarray,val) {
    var index = myarray.indexOf(val);
    if (index > -1) {
      myarray.splice(index, 1);
    }
    return myarray
  }

})