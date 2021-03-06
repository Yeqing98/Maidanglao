// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 28.693638,
    longitude: 115.849830,
    scale: 18,
    markers: [],
    height: '',
    showList: false,
    minHeight: '',
    index: 0,
    items: [
      {
        name: "南昌麦当劳凤凰中大道(万达)餐厅",
        address: "江西省南昌市东湖区红谷滩万达广场二层2055号商铺大玩家旁和三层3036商铺万达影城旁",
        distance: "3.0",
        icons: ["亲子活动","甜品站","Wi-Fi","McCafe"],
        index: 0,
        latitude: 28.693638,
        longitude: 115.849830,
      },
      {
        name: "南昌麦当劳新建中心餐厅",
        address: "江西省南昌市新建区新建中心一楼",
        distance: "3.8",
        icons: ["亲子活动","Wi-Fi"],
        index: 1,
        latitude: 28.680130,
        longitude: 115.819126,
      },
      {
        name: "南昌麦当劳丰和南大道DT(山姆会员店)餐厅",
        address: "江西省南昌市新建区乐世界购物中心",
        distance: "6.5",
        icons: ["得速来","亲子活动","甜品站"],
        index: 2,
        latitude: 28.655750,
        longitude: 115.837960,
      }
    ],
    isRight: true,
    showMarker: true,
    coordinates: [
      {
        latitude: 28.693638,
        longitude: 115.849830,
      },
      {
        latitude: 28.680130,
        longitude: 115.819126,
      },
      {
        latitude: 28.655750,
        longitude: 115.837960,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorage({
      key:"items",
      data: this.data.items
    })
    let height = wx.getSystemInfoSync().windowHeight;
    let width = wx.getSystemInfoSync().windowWidth;
    let hrpx = ( (750 * height) / width);
    this.setData({
      height: hrpx - 400 - 80,
      minHeight: hrpx - 268 - 98
    })
    this.addMarkers();
  },
  toDetail (e) {
    let idx = e.currentTarget.dataset.idx;
    if (idx) {
      wx.setStorage({
        key:"itemsIndex",
        data: this.data.items[idx],
      })
    } else {
      wx.setStorage({
        key:"itemsIndex",
        data: this.data.items[0]
      })
    }
    wx.navigateTo({
      url: '../menu/menu'
    })
  },
  changeFocus (e) {
    let that = this;
    let index = e.markerId;
    let promise = new Promise(()=>{
      if (that.data.index === index) {
        that.setData({
          showMarker: !this.data.showMarker
        })
      } else {
        wx.getStorage({
          key:"items",
          success:function(res){
            let its = res.data;
            let head = its[index];
            its.splice(index,1);
            its.unshift(head);
            that.setData({
              items: its
            })
          },
        })
        that.setData({
          index: index,
          showMarker: true
        })
      }
    })
    promise.then(
      this.addMarkers()
    )
  },  
  addMarkers () {
    let items = this.data.items;
    let coordinates = this.data.coordinates;
    let markers = [];
    for (let i = 0; i < items.length; i ++) {
      if (i === this.data.index && this.data.showMarker === true) {
        let marker = {
          id: i,
          iconPath: '/images/index/marker-focus.png',
          width: 40,
          height: 40,
          latitude: coordinates[i].latitude,
          longitude: coordinates[i].longitude
        }
        markers.push(marker);
      }else {
        let marker = {
          id: i,
          iconPath: '/images/index/marker.png',
          width: 30,
          height: 30,
          latitude: coordinates[i].latitude,
          longitude: coordinates[i].longitude
        }
        markers.push(marker);
      }
    }
    this.setData({
      markers: markers
    })
  },
  showList () {
    this.setData({
      showList: true
    })
  },
  hiddenList () {
    this.setData({
      showList: false,
      latitude: this.data.markers[this.data.index].latitude,
      longitude: this.data.markers[this.data.index].longitude
    })
  },
  toLeft () {
    this.setData({
      isRight: false
    })
  },
  toRight () {
    this.setData({
      isRight: true
    })
  }
})