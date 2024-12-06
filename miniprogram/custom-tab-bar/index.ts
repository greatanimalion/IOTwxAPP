import { nextTick } from "../miniprogram_npm/tdesign-miniprogram/common/utils";

Component({
  data: {
    value: "/pages/home/home",
    list: [
      { value: '/pages/home/home', icon: 'home', ariaLabel: '首页' },
      { value: '/pages/person/person', icon: 'user', ariaLabel: '我的' },
    ],
  },
  ready() {
    nextTick().then(() => {
      this.setData({
        value: "/"+getCurrentPages()[0].route
      })
    })
  },
  methods: {
    onChange(e: any) {
      wx.switchTab({
        url: e.detail.value,
      })
    }
  },
});
