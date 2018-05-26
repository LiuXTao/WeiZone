// pages/zone/zone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"123",
    
    zoneMembers:"4",
    barlist:[
      { id: 1, src: "../../image/pic1.png", label: "群视频"},
      { id: 2, src: "../../image/pic2.png", label: "群相册"},
      { id: 3, src:"../../image/pic3.png", label: "群文件" }
    ],
    Zonepho: '',
    selectId:'',
    tabSelect:'',
    currentId:'4',
    Next: [

    ],

    //GYB-start
    zone_name:''
    //GYB-end
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    new app.Madals();
    new app.TabBar();
  
    //GYB-start
    var that = this;
    that.setData({
      zone_name:options.title,
      Zonepho: 'https://www.concertgifts.cn/Public/QR/123.jpg'
    })
    wx.getStorage({
      key: 'zone_id',
      success: function(res) {
        that.setData({
          id:res.data
        })
      },
    })
    //GYB-end

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  open:function(event){
    this.setData({selectId:event.currentTarget.id})
    console.log(this.data.selectId)
    var aurl="../Album/Album?id="+this.data.selectId;
    //GYB-start
    aurl += "&zone_name="+this.data.zone_name;
    //GYB-end
    console.log(aurl)
    wx.navigateTo({
      url:aurl ,
    })
  },
   switchtab: function (event) {
    console.log(event)
    this.setData({ tabSelect: event.target.id })
    if (this.data.tabSelect == 2) {
      this.changeShow();
      return;
    }
    if (this.data.tabSelect != this.data.currentId) {
      getApp().globalData.selectId = this.data.tabSelect
      this.switchs(this.data.tabSelect)
    }
    else
      console.log("不变")
  },
   codeGenergate: function (e) {
     var that = this
     var appID = "wxf3aded971ea2369e"
     var secret = "a7b5a9172b66d3098766e872b121cb78"
     wx.request({
       url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + secret, //仅为示例，并非真实的接口地址
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         console.log(res.data)
         var ACCESS_TOKEN = res.data.access_token
         console.log(ACCESS_TOKEN)
         wx.request({
           url: 'http://www.concertgifts.cn/index.php/home/getQR/index',
           header: {
             'content-type': 'json'
           },
           method: 'POST',
           data: {
             "scene": that.data.id,
             "path": "pages/zone/zone?id=" + that.data.id,
             "ACCESS_TOKEN": ACCESS_TOKEN
           },
           success: function (res) {
             console.log(res.data)
             that.setData({
               imageURL: res.data
             })

             wx.showToast({
               title: '加载中',
               icon: 'loading',
               duration: 500,
               success: function (res) {

                 var aUrls = that.data.imageURL
                 var urls = that.data.Next
                 urls.push(aUrls.substr(1))
                 wx.previewImage({
                   current: aUrls,           //当前图片地址
                   urls: urls,               //所有要预览的图片的地址集合 数组形式
                   success: function (res) { },
                   fail: function (res) { },
                   complete: function (res) { },
                 })
               },

               fail: that.loadingFail,
               complete: that.loadingComplete
             })


           },
           fail: function (err) {
             console.log(err)
           }
         })
       },
       fail(error) {
         console.log(error)
       }

     })
   },
   openDetail: function (e) {
     wx.navigateTo({
       url: '../ZoneDetail/ZoneDetail?id=' + this.data.id + '&name=' + this.data.zoneName + '&image=' + this.data.Zonepho
     })
   }

})

