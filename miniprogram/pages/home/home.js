Page({
  data: {
    refreshTime:"暂无",
    temp:'0',
    weather:'晴',
    tem:'20',
    hum:'40',
    soil:'40',
    rain:'40'
  },
  getTopic(){
    let that=this;
    wx.request({
      url:'https://apis.bemfa.com/vb/api/v1/groupTopic?openID=你的钥匙&type=3&group=%E6%9C%AA%E5%88%86%E7%BB%84',
      success(res){
        const data=res.data.data.data;
        data.shift();
        let newDate={}
          data.forEach(item=>{
              newDate[item.topic]=item.msg.replaceAll("#",'');
              if(["soil","rain",].includes(item.topic)){
                let value=(4095-Number(newDate[item.topic]))*100/4095
                newDate[item.topic]=value.toFixed(2)
              }
          })
          that.setData({...newDate})
      },
      fail(){
        console.log("err");
      }
    })
  },
  onHide(){

  },
  onShow(){
    this.getTopic();
      setInterval(() => {
       this.getTopic();
    }, 5000);
  },
  navTo(path){
    wx.navigateTo({
      url:path.currentTarget.dataset.path
    })
  },
  getRefreshTime() {
    let date=new Date();
    this.setData({
      refreshTime:""+date.getHours()+"点"+date.getMinutes()+"分"+date.getSeconds()+"秒"
    })
    wx.showToast({ title: '刷新成功', icon: 'none', duration: 1000 });
    this.getWeather()
  },
  getWeather(){
    let tempThis=this
    wx.request({
      url:'https://api.seniverse.com/v3/weather/now.json',
      data:{
        key:'你的钥匙',
        location:'新乡',
      },
      success(res){
        if(res.statusCode!==200)wx.showToast({ title: '刷新失败', icon: 'none', duration: 1000 });
        //@ts-ignore
        let tempT=res.data.results[0].now.temperature
        tempThis.setData({
            temp:tempT
        })
      },
      fail(err){
        console.log("err",err)
      }
    })
  }
})
