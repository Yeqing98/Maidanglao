const app = getApp()
const db = wx.cloud.database();
// miniprogram/pages/mune/mune.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adImage: [
      {image: '../../images/menuImg/36734b807336d9c0baf3c6b11de09c68a1fbede5.jpg'},
      {image: '../../images/menuImg/20130811210611_BXJAQ.jpeg'},
      {image: '../../images/menuImg/u=2220787854,1307774264&fm=26&gp=0.jpg'},
      {image: '../../images/menuImg/u=2824315576,2536577732&fm=26&gp=0.jpg'},
      {image: '../../images/menuImg/u=3692471229,4171936325&fm=26&gp=0.jpg'}
    ],
    storeInfo: {},
    scrollLeft: [
      {
        name: '早餐',
        url: '../../images/menuImg/hanbaobao.png',
        id: "l0"
      },
      {
        name: '超值套餐',
        url: '../../images/menuImg/hanbaobao.png',
        id: "l1"
      },
      {
        name: '快乐套餐',
        url: '../../images/menuImg/shutiao.png',
        id: "l2"
      },
      {
        name: '配餐',
        url: '../../images/menuImg/hanbaobao.png',
        id: "l3"
      },
      {
        name: '饮料',
        url: '../../images/menuImg/kele.png',
        id: "l4"
      },
      {
        name: '小主甜食',
        url: '../../images/menuImg/naicha.png',
        id: "l5"
      },
      {
        name: '麦咖啡',
        url: '../../images/menuImg/naicha.png',
        id: "l6"
      }
    ],
    scrollRight: [],
    curIndex: 0,
    toView: 'l0',
    hidden: true,
    heightArr: [],
    foodArr: [],
    totalPrice: 0,
    showList: false
  },
  // 左右联动
  onSelect(e) {
    console.log(e);
    const that = this;
    const curIndex = e.currentTarget.dataset.index;
    const toView = e.currentTarget.dataset.id;
    console.log(toView)
    that.setData({
      curIndex,
      toView
    })
  },
  // 左右联动
  scrollTop(e) {
    // console.log(e)
    const scrollTop = e.detail.scrollTop;
    if(scrollTop > 100) {
      this.setData({
        hidden: false
      })
    }
    else{
      this.setData({
        hidden: true
      })
    }
    const heightArr = this.data.heightArr;
    for(let i = 0; i < heightArr.length; i++) {
      if(scrollTop > 0 && scrollTop < heightArr[0]) {
        this.setData({
          curIndex: 0
        })
      } else if (scrollTop < heightArr[i] && scrollTop > heightArr[i - 1]) {
        this.setData({
          curIndex: i
        })
      }
    }
  },
  // 增加
  OnAdd(e) {
    const id = e.currentTarget.dataset.id;
    const indexSelect = e.currentTarget.dataset.index;
    let totalPrice = this.data.totalPrice;
    let index = id.split('l')[1];
    let scrollRight = this.data.scrollRight;
    const price = scrollRight[index].detail[indexSelect].price;
    scrollRight[index].detail[indexSelect].title++;
    scrollRight[index].detail[indexSelect].showCombo = true;
    totalPrice = totalPrice + price;
    this.setData({
      scrollRight,
      totalPrice
    })
  },
  OnReduce(e) {
    const id = e.currentTarget.dataset.id;
    const indexSelect = e.currentTarget.dataset.index;
    let index = id.split('l')[1];
    let scrollRight = this.data.scrollRight;
    let title = scrollRight[index].detail[indexSelect].title;
    let totalPrice = this.data.totalPrice;
    const price = parseFloat(scrollRight[index].detail[indexSelect].price);
    totalPrice = totalPrice - price;
    if(title > 1) {
      scrollRight[index].detail[indexSelect].title--;
      this.setData({
        scrollRight,
        totalPrice
      })
    }else if(title = 1) {
      scrollRight[index].detail[indexSelect].title--;
      scrollRight[index].detail[indexSelect].showCombo = false;
      this.setData({
        scrollRight,
        totalPrice,
      })
    }
  },
  // 是否显示选餐列表
  onList() {
    let showList = this.data.showList;
    showList = !showList;
    this.setData({
      showList
    })
  },
  // 清空事件
  onEmpty() {
    const scrollRight = this.data.scrollRight;
    for(let i = 0; i < scrollRight.length; i++) {
      for(let j = 0; j < scrollRight[i].detail.length; j++) {
        scrollRight[i].detail[j].title = 0;
        scrollRight[i].detail[j].showCombo = false;
      }
    }
    this.setData({
      scrollRight,
      totalPrice: 0,
      showList: false
    })
  },
  // 跳转到cart页面
  gotoCart(e) {
    // console.log(e)
    const id = e.currentTarget.dataset.id;
    const indexSelect = e.currentTarget.dataset.index;
    let index = id.split('l')[1];
    let scrollRight = this.data.scrollRight;
    const zhushi = scrollRight[index].detail[indexSelect];
    console.log(zhushi);
    wx.setStorage({
      key: "cartFood",
      data: zhushi
    })
  },
  gotoSettlement() {
    wx.setStorage({
      key: "settlement",
      data: this.data.scrollRight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'foodData',
      success: (res) => {
        // console.log(res);
        db.collection('breakfast')
        .get()
        .then(res => {
          let food = {};
          food.id =  `l${res.data[0].id}`
          food.detail = res.data[0].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[1].id}`
          food.detail = res.data[1].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[2].id}`
          food.detail = res.data[2].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[3].id}`
          food.detail = res.data[3].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[4].id}`
          food.detail = res.data[4].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[5].id}`
          food.detail = res.data[5].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(res => {
          let food = {};
          food.id =  `l${res.data[6].id}`
          food.detail = res.data[6].detail.slice(0,5);
          food.title = 0;
          let scrollRight = this.data.scrollRight;
          scrollRight.push(food);
          console.log(food);
          this.setData({
            scrollRight
          })
          return res
        })
        .then(() => {
          const scrollRight = this.data.scrollRight;
          return scrollRight
        })
        .then(res => {
          let heightArr = [];
          const height = 180;
          let heightList = 0
          for(let i = 0; i < res.length; i++) {
            heightList += res[i].detail.length * height;
            heightArr.push(heightList);
          }
          // console.log(heightArr);
          this.setData({
            heightArr
          })
        })
        
      }
    
    
    });
    
    wx.getStorage({
      key: 'itemsIndex',
      success: (res) => {
        let storeInfo = this.data.storeInfo;
        storeInfo.name = res.data.name;
        storeInfo.address = res.data.address;
        // console.log(storeInfo);
        this.setData({
          storeInfo
        })
      },
      fail: () => {},
      complete: () => {}
    });
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

  }
})