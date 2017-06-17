$(document).ready(function(){
	
	//创建滚动视图
	var myScroll = new IScroll('.content', {
		probeType: 3
	})
	
	
	//刚进入时设置下拉刷新隐藏
	myScroll.scrollTo(0, -50);
	
	var isAddUp = false;
	var isAddDown = false;
	
	myScroll.on('scroll', function(){
		
		//下拉刷新箭头图标换方向
		if(this.y >= 0 && !isAddUp){
			isAddUp = true;
			console.log('srcoll'+myScroll.y)
			$('.head').addClass('up');
		}
		else if(this.y<0 && isAddUp){
			isAddUp = false;
			$('.head').removeClass('up');
		}
		
		
		
		//加载更多箭头图标换方向
		var y = this.y;
		var maxY = myScroll.maxScrollY;
		var disY = maxY - y;
		if(disY >= 0 && !isAddDown){
			isAddDown = true;
			$('.foot').addClass('down');
		}
		else if(disY < 0 && isAddDown){
			isAddDown = false;
			$('.foot').removeClass('down');
		}
	})
	
	
	
	myScroll.on('scrollEnd', function(){
		
		console.log('end'+myScroll.y)
		//判断下拉刷新松手的位置，执行是否刷新
		//y = 0 刷新
		//y<0 收回
		if(this.y >= 0){
			//刷新
			console.log('refresh');
			$('.head img').attr('src', 'images/ajax-loader.gif');
			
			//重新请求数据
			//请求成功，结束动画
			setTimeout(function(){
				colseRefresh();
			}, 2000);
			
		}
		else if(this.y<0 && this.y>-50){
			myScroll.scrollTo(0, -50, 300);
		}
		
//		console.log(myScroll)
		
		var y = this.y;
		var maxY = myScroll.maxScrollY;
		var disY = maxY - y;
		
		console.log(disY);
		
		
		if(disY>=0){
			//加载更多
			console.log('loadmore....');
			//换图片
			$('.foot img').attr('src', 'images/ajax-loader.gif');
			
			//请求下一页数据
			//请求成功
			setTimeout(function(){
				colseLoadMore()
			}, 2000)
		}
		else if(disY<0 && disY>-50){
			myScroll.scrollTo(0, maxY+50, 300);
		}
		
	})
	
	
	function colseRefresh(){
		$('.head img').attr('src', 'images/arrow.png');
		myScroll.scrollTo(0, -50, 300);
	}
	
	function colseLoadMore(){
		$('.foot img').attr('src', 'images/arrow.png');
		myScroll.scrollTo(0, myScroll.maxScrollY+50, 300);
	}
})
