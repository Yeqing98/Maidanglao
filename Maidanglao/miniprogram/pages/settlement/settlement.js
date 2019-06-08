// miniprogram/pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealTime: [
      {
        num: 0,
        time: '现在取餐'
      },
      {
        num: 1,
        time: '10分钟后到店'
      },
      {
        num: 2,
        time: '20分钟后到店'
      },
      {
        num: 3,
        time: '30分钟后到店'
      },
    ],
    isHookTime: [false, true, true, true],
    isHookMode: [false, true],
    amount: 1,
    price: 27.5,
    totalPrice: 27.5,
    isHookInVoice: false,
    show: false,
    storeInfo: {},
    foods: []
  },

  onChooseTime(e) {
    const id = e.currentTarget.dataset.id;
    if (id === 0 )　{
      this.setData({
        isHookTime: [false, true, true, true]
      })
    } else if(id === 1) {
      this.setData({
        isHookTime: [true, false, true, true]
      })
    } else if(id === 2) {
      this.setData({
        isHookTime: [true, true, false, true]
      })
    } else if(id === 3) {
      this.setData({
        isHookTime: [true, true, true, false]
      })
    }
  },

  onChooseMode(e) {
    const mode = e.currentTarget.dataset.mode;
    if(mode === '堂食') {
      this.setData({
        isHookMode:[false, true]
      }) 
    } else if (mode === '外带') {
      this.setData({
        isHookMode: [true, false]
      })
    }
  },

  reduce() {
    let amount = this.data.amount;
    let price = this.data.price/amount*(amount-1);
    amount -= 1;
    if(amount === 0) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        amount,
        price,
        totalPrice: price
      })
    }
  },

  add() {
    let amount = this.data.amount;
    let price = this.data.price/amount*(amount+1);
    amount += 1;
    this.setData({
      amount,
      price,
      totalPrice: price
    })
  },

  onNoChooseInvoice() {
    this.setData({
      isHookInVoice: true
    })
  },

  onChooseInvoice() {
    this.setData({
      isHookInVoice: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.getStorage({
      key: 'settlement',
      success: (res) => {
        // console.log(res)
        const foods = res.data;
        // console.log(foods)
        this.setData({
          foods
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