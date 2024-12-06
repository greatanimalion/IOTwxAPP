import * as echarts from '../../../components/ec-canvas/echarts.min';
import chartsOption from  '../../../utils/chartsOption'
import getDefTime  from '../../../utils/getDefTime'

Page({
  data: {
    ec: {
      lazyLoad: true
    },
    list:[
      {
        value:1212,
        time:'20222-10-21'
      }
    ]
  },
  initChart(values) {
    // 绑定组件
    this.barComponent = this.selectComponent("#mychart-dom-bar");
    // 初始化柱状图
    this.barComponent.init((canvas, width, height, dpr) => {
      // 初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 解决模糊显示问题
      })
      // 开发中根据从后端获取barData数据,动态更新图表
      chart.setOption(chartsOption(values))
      return chart
    })
  },
  refresh(){
    let that=this
    wx.request({
      url: 'https://apis.bemfa.com/va/getmsg?uid=f47aab1ee7ba4f14b877a444f8ad69d7&topic=rain&type=3&num=8',
      success(res){
        const d=res.data.data
        let x=[];
        let da=[]
        d.forEach(item=>{
          x.push(getDefTime(item.time));
          da.push(item.msg.replaceAll("#",""))
        })
        let newList=[]
        for(let i=0;i<x.length;i++){
          let value=(4095-Number(da[i]))*100/4095
            newList.push({
              time:x[i],
              value:value.toFixed(2)+'°'
            })
        }
        that.setData({
          list:newList,
        })
        that.initChart({
          x:x,
          value:da.map(i=>{
            let value=(4095-Number(i))*100/4095
            return value.toFixed(0)
          }),
          smooth:false,
          type:'bar',
          Yname:'%'
        })
      },
      fail(err){
        console.log(err);
      }
    })
  },
  onLoad(){
    this.refresh()
    setInterval(this.refresh,5000);
  }
});

