let _madalData = {

  "_datas.display": '',
  "_datas.funBar":[
   
    { id:"1", src:"../../image/video.png", label: "上传视频" },
    { id: "2", src: "../../image/photo.png", label: "上传图片" },
    { id:"3", src:"../../image/file.png", label: "上传文件" }
  ]

}
let madals = {
  changeShow: function () {
    let self = this
    console.log("here")
    self.setData({ "_datas.display": "block" })
    console.log;
  },
  hideview: function () {
    let self = this
    console.log("here")
    self.setData({ "_datas.display":"none" })
  },
  openTheFile(e){
    if(e.currentTarget.id==="2"){
      wx.navigateTo({
        url: '../Album/Album',
      })
    }

  }
}

function Madals() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;

  Object.assign(curPage, madals);
  curPage.madals = this;
  curPage.setData(_madalData);

  return this;
}
module.exports = {
  Madals
}