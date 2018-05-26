// pages/companyManage/companyManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager:true,
    isSuper:true,
    zoneid:'',
    selfId:1,
    screenWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    members:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zoneid:options.id
    });

    //GYB-start
    var that = this;
    wx.getStorage({
      key: 'zone_code',
      success: function(res) {
        wx.request({
          header: {
            'content-type': 'application/json' // 默认值
          },
          url: 'https://www.concertgifts.cn/index.php/home/showMember/index',
          data: {
            'zone_code': res.data[0],
          },
          method: 'POST',
          success: function (res) {
            // { id: 1, src:'../../image/circle.png', name:'Tao', level:1, manager:'超级管理员' },
            var data = res.data;
            var members = [];
            var member = {};
            member = { id: 1, src: '../../image/circle.png', name: data[0], level: 1, manager: '超级管理员'};
            members.push(member);
            for(var i = 1; i < data.length; i++){
              var level;
              var manager;
              if(data[i][1] == 0){
                level = 0;
                manager = '';
              }else{
                level = 1;
                manager = '管理员';
              }
              member = { id: i + 1, src: '../../image/circle.png', name: data[i][0], level: level, manager: manager};
              members.push(member);
            }
            that.setData({
              members:members
            })
          }
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
  manage:function(e){
    //flag=[0,1,2],0表示设置为管理员，1表示移出空间，2表示取消管理员
    var flag=null
   
    console.log(e)
    var that=this;
    var selectId = e.target.id
    var hisId = that.data.members[selectId].id
    var hisLevel = that.data.members[selectId].level
    if(hisId!=that.data.selfId){
      if(that.data.isSuper===true &&hisLevel==2){
        var tempList=['取消管理员','移出微空间']
        wx.showActionSheet({
          itemList: tempList,//弹窗
          success: function (res) {
            if (!res.cancel) {
              console.log(res.tapIndex)
              if(0===res.tapIndex)
                flag=3
              if(1===res.tapIndex)
                flag=2
              that.sendOperation(that,flag,hisId,selectId)
            }
          }
        })
      }else if(that.data.isSuper===true &&hisLevel==3){
        var tempList = ['设置管理员', '移出微空间']
        wx.showActionSheet({
          itemList: tempList,//弹窗
            success: function (res) {
            if (!res.cancel) {
              console.log(res.tapIndex)
              if (0 === res.tapIndex)
                flag = 1
              if (1 === res.tapIndex)
                flag = 2
              that.sendOperation(that,flag, hisId,selectId)
            }
          }
        })
      }else if(that.data.isSuper===false&& hisLevel==3){
        var tempList = ['移出微空间']
        wx.showActionSheet({
          itemList: tempList,//弹窗
          success: function (res) {
            if (!res.cancel) {
              console.log(res.tapIndex)
              if (0 === res.tapIndex)
                flag = 2
              that.sendOperation(that,flag, hisId,selectId)
            }
          }
        })
      }
    }
  
  },
  sendOperation:function(that,flag,hisId,selectId){
    console.log(flag,hisId)
    // wx.request({
    //   url: '', header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: 'POST',
    //   data: {
    //     id:hisId,
    //     flag:flag
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    if(flag==1)
      var manager="members["+selectId+"].manager"
      var level="members["+selectId+"].level"
      that.setData({
        [manager]:'管理员',
        [level]:2
    })
    console.log(that.data.members)
  }
})