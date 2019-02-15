class OPPOGamePlatform {
	var name = 'oppogame';
	var videoAd = null;
	var bannerAd = null;
	//登陆
	login(){
		return new Promise((resolve, reject) => {
            qg.login({
			    pkgName: "com.game.demo",//游戏包名
			    success: function(res){
			        var data = JSON.stringify(res);
			        resolve(data)
			    },
			    fail: function(res){
			        console.log("@David 登陆失败：" + JSON.stringify(res));
			    }
			});
        })
	}

	//创建Banner广告
	createBannerAd(){
		this.bannerAd = qg.createBannerAd({
		    posId: "adUnitId"
		})
	}

	showBannerAd(isShow = true){
		if(isShow&&this.bannerAd){
			this.bannerAd.show();
			return;
		}else if(!isShow || !this.bannerAd){
			this.createBannerAd();
		}
		if(this.bannerAd){
			bannerAd.onError(function(err) {
			    console.log("@David Banner广告错误："+err);
			})
			if(isShow){
				this.bannerAd.show();
			}else{
				this.bannerAd.hide();
			}
		}
	}

	closeBannerAd(){
		this.showBannerAd(false);
	}

	//创建视频广告 playComplete:广告播放完毕后的回调
    createRewardedVideoAd(adUnitId,playComplete) {
    	if(this.videoAd){
    		this.videoAd.destroy();
    		this.videoAd = null;
    	}
    	if(this.videoAd == null){
    		this.videoAd = qg.createRewardedVideoAd({
            	adUnitId: adUnitId
        	})
        	if(this.videoAd){
        		//视频广告加载成功回调
        		this.videoAd.onLoad(function() {
				    console.log("激励视频加载成功");
				    this.videoAd.show();
				    this.videoAd.offLoad();
				})
				this.videoAd.onRewarded(function() {
				    console.log("激励视频广告完成，发放奖励");
				    playComplete&&playComplete();
				    this.videoAd.offRewarded();
				})
				this.videoAd.onError(function(err) {
				    console.log("@David 视频广告播放错误："+err);
				    this.videoAd.offError();
				})
        	}
    	}
    }

    //加快触发 JavaScript VM 进行（垃圾回收），GC 时机是由 JavaScript VM 来控制的，并不能保证调用后马上触发 GC。
    gc(){
    	qg.triggerGC();
    }

}
window.oppo = new OPPOGamePlatform();