// pages/Album/Album.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    seleId:'',
    navbar: ['全部相册', '我的发送'],

    //GYB-start
    title:'输入相册名',
    sure:'lisconfirm',//确认键指向的函数
    //GYB-end

    currentTab: 0,

    //GYB-start
    albums:[],
    //GYB-end

    options:true,
    opeName:"管理",
    openFlag:true,
    deleteNums:[],
    hidden: true,
    albumName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    new app.SmallTab()
    
    this.setData({
      seleId:options.id
    })
    console.log(this.data.seleId)

    //GYB-start
    //向后台请求相册信息并显示
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        var user_id = res.data;
        wx.request({
          url: 'https://www.concertgifts.cn/index.php/home/query/getDirArrByZoneNameUserId',
          header:{
            'Content-Type': 'application/json'
          },
          method: 'POST',
          data:{
            user_id: user_id,
            zone_name: options.zone_name
          },
          success: function(res){
            var albums = [{ id: 0, src: "../../image/addAlbum.png", src1: "../../image/circle.png", des:"添加相册", radioType: '', typeSelect: true, seleColor: "#BEBEBE"}];
            for(var i = 0; i < res.data.length-1; i++){
              var item = { id: parseInt(res.data[i].file_id), src: "../../image/album.png", src1: "../../image/circle.png", des: res.data[i].file_name, radioType: '', typeSelect: true, seleColor: "#BEBEBE" };
              albums.push(item);
            }
            that.setData({
              albums:albums
            });
            var temp = res.data.pop();
            wx.setStorage({
              key: 'zone_id',
              data: temp,
            })
          }
        })
      },
    });
    //GYB-end

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.request({
      method:'GET',
      url:'',
      data:{
        field:'id,src,des'
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        var temp=res.data
        for(var i=0;i<res.data.length;i++){
          temp[i].radioType="";
          temp[i].typeSelect=true;
          temp[i].seleColor = "#BEBEBE";
        }
        // this.setData({
        //   albums:temp
        // })
      }

    })
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
    wx.stopPullDownRefresh()
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
  navbarTap: function (e) {
    // this.setData({
    //   currentTab: e.currentTarget.dataset.idx
    // })
    wx.getStorage({
      key: 'zone_code',
      success: function(res) {
        console.log(res);
      },
    })
  },

  //GYB-start
  openAlbum:function(e){
    if(this.data.openFlag==true){
      var desname;
      for(var i = 0; i < this.data.albums.length; i++){
        if (this.data.albums[i].id == parseInt(e.currentTarget.id)){
          desname = this.data.albums[i].des;
          break;
        }
      }
      wx.navigateTo({
        url: '../uploadPic/uploadPic?id='+e.currentTarget.id+"&des="+desname,
      })
    }
    else{

    }
      // console.log(e.currentTarget.id)
  },
  //GYB-end

  createAlbum:function(e){
    console.log(e.currentTarget.id)
    this.setData({
      hidden:false
    })
  },
  manage:function(e){
    console.log(this.data.small.selectNum)
    this.setData({
      opeName:(this.data.options==true)?"完成":"管理",
      openFlag: (this.data.options == true) ? false: true,
      options: !this.data.options
    })
    console.log(this.data.opeName,this.data.openFlag)
  },
  select:function(e){
   var jj = parseInt(e.currentTarget.id)-1;
   var t ="albums["+jj+"].typeSelect";
   var r ="albums["+jj+"].radioType";
   var s ="albums["+jj+"].seleColor";
   if(this.data.albums[jj].typeSelect==true)
    {
      this.data.small.selectNum += 1;
      this.update(this.data.small.selectNum)
      this.data.deleteNums.push(jj)
      this.setData({
        [t]: false,
        [r]: "success",
        [s]: "#ffffff"
      })
    }else{
     this.data.small.selectNum -= 1;
     this.update(this.data.small.selectNum)
     this.data.deleteNums=getApp().remove(this.data.deleteNums,jj)
     this.setData({
       [t]: true,
       [r]: "",
       [s]: "#BEBEBE"
     })
  }
  },
  switchtab:function(e){
    if(e.target.id=="11"){
      for(var i=0;i<this.data.albums.length;i++){
        var t = "albums[" + i+ "].typeSelect";
        var r = "albums[" + i + "].radioType";
        var s = "albums[" + i + "].seleColor";
        this.data.small.selectNum=0;
        this.update(this.data.small.selectNum)
        this.setData({
          [t]:true,
          [r]:"",
          [s]:'#BEBEBE'
        }) 
      }
      this.setData({
        openFlag:true,
        opeName: "管理",
        options:true
      })      
    }
    if(e.target.id=="22"){
      console.log(this.data.deleteNums);
      wx.showModal({
        title:'提示',
        content:'是否删除记录',
        confirmColor:'#46A3FF',
        success:function(res){
          if(res.confirm){
            //

          }
          console.log("删除成功")
        }
      })
    }
  },
  liscancel:function () {
    this.setData({
      hidden: true,
      albumName:''
    })
    console.log("取消")
  },
  lisconfirm: function () {
   this.setData({
     hidden:true
   })
   var flag=false;
   for (var i = 0;  i < this.data.albums.length; i++) {
     console.log(this.data.albums[i].des)
      if(this.data.albumName==this.data.albums[i].des){
        flag=true;
      }
   }
   if(flag==true){
    wx.showToast({
      title: '该相册已经存在',
      icon:'loading',
      duration: 5000,
      mask: true
    })
    return;
   }
    console.log("clicked confirm");

    //LXT_GYB-start
    var that = this;
    wx.getStorage({
      key: 'zone_id',
      success: function(res) {
        var zone_id = res.data;
        wx.request({
          url: 'https://www.concertgifts.cn/index.php/home/mkdirImg/index',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: {
            'albumName': that.data.albumName,
            'zone_id': zone_id
          },
          success: function (res) {
            if (res.data.status == 1) {
              var temp = that.data.albums;
              var dict = { id: res.data.file_id, src: '../../image/album.png', des: that.data.albumName, radioType: '', typeSelect: true, seleColor: "#BEBEBE" }
              temp.push(dict)
              console.log(temp)
              that.setData({
                albums: temp
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'loading'
              })
            }
          }
        })
      },
    })
    //LXT_GYB-end

  },

  //GYB-start
  bindinput:function(e){
    if(this.validateInput(e.detail.value)){
      this.setData({
        title:'输入相册名',
        albumName: e.detail.value,
        sure:'lisconfirm'
      })
    }else{
      this.setData({
        title:'相册名不能包含特殊字符',
        sure:'showErr'
      })
    }
  },

  validateInput:function(s){
    var wrong_set = [' ', '/', '?', ',', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '\\', '`', '~', '[', ']', '{', '}', '|', ':', ';', '"', "'", '<', '>'];
    for (var i = 0; i < wrong_set.length; i++){
      if (s.indexOf(wrong_set[i]) != -1){
        return false;
      }
    }
    return true;
  },

  showErr:function(){
    wx.showToast({
      title: '添加失败',
      icon:'loading'
    })
  }
  //GYB-end
})