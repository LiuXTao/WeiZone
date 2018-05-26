let _compData={
 
  '_tabData.src1': "../../image/myZone.png",
  '_tabData.src2': "../../image/add.png",
  '_tabData.src3': "../../image/person.png",
  '_tabData.color1': "#bfbfbf",
  '_tabData.color3': "#bfbfbf",
  '_tabData.title1':"微空间",
  '_tabData.title3':"个人中心",

}

let tabbar={
  initial:function(id){
    let self=this;
    console.log(id);
    switch(id){
      case "1":
        self.setData({ '_tabData.src1': "../../image/myZone-select.png", '_tabData.color1': "#1296db"});
        break;
      case "3":
        self.setData({ '_tabData.src3': "../../image/person-select.png", '_tabData.color3': "#1296db" });
        break;
    }

  },
 
  switchs:function(id){
    let self=this;
    console.log(id);
    if(id=='')
      return;
    self.setData(_compData)
    switch (id) {
      case "1":
        // self.setData({ '_tabData.src1': "../../image/myZone-select.png", '_tabData.color1': "#1296db" });
        wx.redirectTo({
          url: '/pages/enter/enter'
        })
        break;
      case "3":
        // self.setData({ '_tabData.src3': "../../image/person-select.png", '_tabData.color3': "#1296db" });
         wx.redirectTo({
          url: '/pages/me/me'
        })
        break;
      case "2":
        self.setData({ '_tabData.src2': "../../image/add.png"})
          break;
    }


  }
}


function TabBar(){
  let pages=getCurrentPages();
  let curPage=pages[pages.length-1];
  this.__page=curPage;

  Object.assign(curPage,tabbar);
  curPage.tabbar=this;
  curPage.setData(_compData);
 
  return this;
}
module.exports={
  TabBar
}