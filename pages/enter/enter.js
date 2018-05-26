// pages/enter/enter.js
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    imageWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight:wx.getSystemInfoSync().windowHeight,
    imageHeight:  38/ 75 * wx.getSystemInfoSync().windowWidth,
    imageH: 1 / 2 * wx.getSystemInfoSync().windowWidth,
    imageUrls:[
      "https://www.concertgifts.cn/x.png"
    ],
    indicatorDots:false,
    autoplay:false,
    interval:5000,
    duration:1000,
    list:[],
    seleId:'',
    currentId:'1',
    hiddenmodalput: true,  
    focus: false,
    name:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    yibu:''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    new app.TabBar()
    new app.Madals()

    const self=this
    self.setData({
      currentId: app.globalData.selectId,
    })
    self.initial(self.data.currentId)
    if (app.globalData.userInfo) {
     
      self.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    
    } else if (self.data.canIUse) {
   
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        self.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(4)
        console.log(self.data.userInfo)
      }
      
    } else {
      
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          self.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        
        }
      })
  
    }


    // //转发分享
    // wx.showShareMenu({
    //   // withShareTicket: true,
    //   success: function (res) {
    //     // 分享成功
    //     // console.log('shareMenu share success')
    //     // console.log('分享' + res)
    //   },
    //   fail: function (res) {
    //     // 分享失败
    //     // console.log(res)
    //   }
    // })

    // GYB-start
    var that = this;    
    //从storage中获取到该用户所创空间的空间码，向后台查询空间名
    wx.getStorage({
      key: 'zone_code',
      success: function (res) {
        var x = wx.request({
          url: 'https://www.concertgifts.cn/index.php/home/query/getZoneNameArrByCodeArr',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: {
            'code':res.data
          },
          success: function (res) {
            var list = [];
            for(var i = 0; i < res.data.length; i++){
              list.push({id:i, title:res.data[i]});
            }
            that.setData({
              list:list
            })
          }
        });
      },
    });
    // GYB-end

  },
  //转发事件
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/enter/enter',
      success: function (res) {
        // 转发成功
        // console.log(res)
        that.data.list[0] = {id:0, title:res[0]};
      },
      fail: function (res) {
        // 转发失败
        console.log(213)
      }
    }
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
  createZone(event){
    // console.log("创建控件待实现");
    wx.navigateTo({
      url: '../createZone/createZone',
    })
  },

  bindViewTap(event){
    console.log(event)
  },
  switchtab(event) {
    console.log(event)
    this.setData({seleId:event.target.id})
    if(this.data.seleId==2){
      console.log(123)
      this.changeShow();
      return;
    }
    if(this.data.seleId!=this.data.currentId){
      getApp().globalData.selectId = this.data.seleId
      this.switchs(this.data.seleId)
    }
    else
      console.log("不变")
  },
  bindFocus:function(){
    this.setData({
      focus:true
    })
  },
  bindInputVulue:function(e){
    this.setData({
      name:e.detail.value
    })
    console.log(this.data.name)
  },
  openIndir:function(e){
    wx.navigateTo({
      url: '../indirection/indirection',
    })
  }
})