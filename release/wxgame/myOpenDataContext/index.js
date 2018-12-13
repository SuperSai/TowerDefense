require("weapp-adapter.js");

// var main = function(){
//   require("code.js");
// }
// setTimeout(main, 300);
wx.onMessage(data => {
  console.log(data)
  if (data.message == "friendRank") {
    require("code.js");
  }
})

// function drawRankList (data) {
//   data.forEach((item, index) => {
//     console.log("drawRankList ", item, index)
//     // var image = new Laya.Image();
//     // image.loadImage(item.avatarUrl, 0, 0, 40, 40);

//     // let image2 = wx.createImage();
//     // image2.onload = function (res) {
//     //   console.log(res)
//     //   console.log(image2)
//     //   // image.loadImage(image2);
//     // };
//     // image2.src = item.avatarUrl;

//     // var score = new Laya.Text();
//     // score.text = item.KVDataList[0].value;
//     // image.addChild(score)

//     // var nickName = new Laya.Text();
//     // nickName.text = item.nickname;
//     // Laya.stage.addChild(image);

//     // image.addChild(nickName);
//     // image.x = 30
//     // nickName.x = image.x + 60;
//     // image.y = index * 80
//     // score.x = image.x + 180;
//   })
// }

// wx.getFriendCloudStorage({
//   success: res => {
//     let data = res.data
//     drawRankList(data)
//   }
// })

// // let sharedCanvas = wx.getSharedCanvas()
// // let context = sharedCanvas.getContext('2d')
// // context.fillStyle = 'red'
// // // context.fillRect(0, 0, 100, 100)
// // context.clearRect(0, 0, 150, 100);
// // context.font = "24px Arial";
// // context.fillText("Data : ", 50, 50);

