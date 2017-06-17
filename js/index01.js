'use strict'
//创建banner的轮播视图
var bannerSwiper = new Swiper('.banner', {
	pagination: '.swiper-pagination',
	loop: true
});

//创建content的滚动视图
var contentScroll = new IScroll('.content', {
	scrollbars: true,
	fadeScrollbars: true
});


//请求banner数据
setTimeout(function(){
	var data = ['images/banner.jpg','images/banner.jpg','images/banner.jpg','images/banner.jpg'];
	
	var bannerHtml = '';
	//对banner数据进行遍历
	data.map(function(item, index){
		bannerHtml += '<div class="swiper-slide"><img src="'+item+'" /></div>';
	})
	document.querySelector('.banner .swiper-wrapper').innerHTML = bannerHtml;
	//更新
	bannerSwiper.update();
}, 500);


//请求列表数据
setTimeout(function(){
	var data = [];
//	for (var i = 0; i <4; i++) {
//		var obj = {};
//		obj.main_img = 'images/main.jpg';
//		obj.title = '0元抽大奖，爱神的箭凡发生大是的发送到发生大事';
//		obj.price = 299;
//		obj.o_price = 999;
//		obj.discount = 3;
//		data.push(obj);
//	}
	$.get("json/goods.json",function(respondData){
		var arr=respondData.data;
			for (var i=0; i<arr.length; i++){
						var obj = arr[i];
//						console.log(arr)
						fn(obj);
					data.push(obj);
					}
	});
	
	//根据请求的数据封装dom结构插入页面
	        function fn(obj){
					
	       var list= "<li class='item'>"
					 +"<div class='item-img'>"
					 +"<img src="+obj.img+"/>"
					 +"</div>"
					 +"<div class='item-content'>"
				     +"<h3>"+obj.title+"</h3>"
					 +"<p class='price'>￥"+obj.price+"</p>"
					 +"<p class='discount'>3折</p>"
					 +"</div>"
					 +"<a class='button'>购物</a>"
					 +"</li>";
					 $(".list").append($(list))
	        }
		        
		

	
//	contentScroll.refresh();
	
}, 1000);

$(".tabs li").click(function(){
  console.log($(this))
$(this).siblings().removeClass("active");
$(this).addClass("active");
})




