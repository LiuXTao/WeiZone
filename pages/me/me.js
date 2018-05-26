const app = getApp();
Page({
  data: {
    imageWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    userInfo: null,
    shareCount:0,
    collectCount:0,
    currentId: "3",
    seleId: ''
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let app = getApp()
    new app.TabBar()
    new app.Madals()
    this.setData({
      currentId: app.globalData.selectId
    })
    this.initial(this.data.currentId)
  },

  onShow(){
    const self = this;
    if (!app.userInfo.nickName) {
      wx.openSetting({
        success(res) {
          app.login(() => {
            app.userInfo.nickName && self.getCount();
          });
        }, fail(res) {
          console.log(res)
        }
      })
    }else{
      app.userInfo.nickName && self.getCount();
    }
  },
  getCount(){
    const self = this;
    self.setData({
      'userInfo': app.userInfo
    });
    wx.request({
      url: `${app.host}/photo/api/gallery/user/${wx.getStorageSync('token')}`,
      success(res){
        self.setData({
          'shareCount': res.data.shareCount,
          'collectCount': res.data.collectCount
        });
      },
      fail(){
        wx.showModal({
          title: '网络出错',
          content: '抱歉，刷线试试！',
          success: function (res) {
            if (res.confirm) {
              self.getCount();
            }
          }
        })
      }
    })
  },
   switchtab: function (event) {
    console.log(event)
    this.setData({ seleId: event.target.id })
    if (this.data.seleId == 2) {
      console.log(123)
      this.changeShow();
      return;
    }
    if (this.data.seleId != this.data.currentId) {
      getApp().globalData.selectId = this.data.seleId
      this.switchs(this.data.seleId)
    }
    else
      console.log("不变")
  }
})