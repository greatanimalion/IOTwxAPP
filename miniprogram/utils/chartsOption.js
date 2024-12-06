//x data type smooth
export default function barOption(data) {
	// 图表内容配置项
	const option = {
    xAxis: {
      type: 'category',
      data: data.x,
      name:'时间'
    },
    yAxis: {
      type: 'value',
      name:data.Yname||''
    },
    series: [
      {
        data: data.value,
        type:data.type,
        smooth:data.smooth
      },
    ]
  };
	return option
}

