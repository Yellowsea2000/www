
'use strict';
$(function() {
    var dataArr;
//创建banner的轮播视图
    var bannerSwiper = new Swiper('.banner', {
        pagination: '.swiper-pagination',
        autoplay : 3000,
        loop: true
    });

//创建content的滚动视图
    var contentScroll = new IScroll('.content', {
        scrollbars: true,
        fadeScrollbars: true,
        probeType: 3
    });

//上下拉刷新的判断
    contentScroll.scrollTo(0, -50);
    var isAddUp = false;
    var isAddDown = false;
    contentScroll.on('scroll', function(){

        //下拉刷新箭头图标换方向
        if(this.y >= 0 && !isAddUp){
            isAddUp = true;
            // console.log('srcoll'+this.y)
            $('.head').addClass('up');
        }
        else if(this.y<0 && isAddUp){
            isAddUp = false;
            $('.head').removeClass('up');
        }

        //加载更多箭头图标换方向
        var y = this.y;
        var maxY = this.maxScrollY;
        var disY = maxY - y;
        if(disY >= 0 && !isAddDown){
            isAddDown = true;
            $('.foot').addClass('down');
        }
        else if(disY < 0 && isAddDown){
            isAddDown = false;
            $('.foot').removeClass('down');
        }
    });

    contentScroll.on('scrollEnd', function(){

        // console.log('end'+contentScroll.y);
        //判断下拉刷新松手的位置，执行是否刷新
        //y = 0 刷新
        //y<0 收回
        if(this.y >= 0){
            //刷新
             console.log('refresh');
            $('.head img').attr('src', 'img/ajax-loader.gif');

            //重新请求数据
            //请求成功，结束动画
            getBannerData();
            setTimeout(function(){
                colseRefresh();
            }, 2000);

        }
        else if(this.y<0 && this.y>-50){
            contentScroll.scrollTo(0, -50, 300);
        }

        var y = this.y;
        var maxY = this.maxScrollY;
        var disY = maxY - y;

        if(disY>=0){
            //加载更多
            // console.log('loadmore....');
            //换图片
            $('.foot img').attr('src', 'img/ajax-loader.gif');

            //请求下一页数据
            //请求成功
            getListData();
            setTimeout(function(){
                colseLoadMore()
            }, 2000)
        }
        else if(disY<0 && disY>-50){
            this.scrollTo(0, maxY+50, 300);
        }
    });

    function colseRefresh(){
        $('.head img').attr('src', 'img/arrow.png');
        contentScroll.scrollTo(0, -50, 300);
    }
    function colseLoadMore(){
        $('.foot img').attr('src', 'img/arrow.png');
        contentScroll.scrollTo(0, contentScroll.maxScrollY+50, 300);
    }

//请求banner数据
    getBannerData();
    function getBannerData() {
        setTimeout(function(){
            var bannerHtml = '';

            $.getJSON("json/goods.json", function (responseData) {
                var data = responseData.data2;

                //对banner数据进行遍历
                data.map(function(item, index){
                    bannerHtml += '<div class="swiper-slide"><img src="'+item.img+'" /></div>';
                });
                document.querySelector('.banner .swiper-wrapper').innerHTML = bannerHtml;
                //更新
                bannerSwiper.update();
                console.log("banner has been refleshed");
            });
        }, 500);
    }

//请求列表数据
    getListData();
    function getListData() {
        setTimeout(function(){

            $.getJSON("json/goods.json", function (responseData) {
                var data = responseData.data1;
                dataArr = data;

                var listHtml = '';
                //根据请求的数据封装dom结构插入页面
                data.map(function(item, index){
                    listHtml += `<li class="item" id="${item.id}">
						<div class="item-img">
							<img src="${item.img}" />
						</div>
						<div class="item-content">
							<h3 class="moreline">${item.name}</h3>
							<p class="price">￥${item.nowPrice}</p>
							<p class="discount">${item.discount}折</p>
							<p class="delPrice">￥${item.oldPrice}</p>
						</div>
						<a class="button">加入购物车</a>
					</li>`;
                });

                // document.querySelector('.list').innerHTML = listHtml;

                $(listHtml).appendTo('.list');

                contentScroll.refresh();
                console.log("List has been refreshed");
            });
        }, 1000);
    }

    // 

    // 加入购物车
    $(".list").on("tap", ".button", function() {
        var id = $(this).parent(".item")[0]["id"],
            ind,
            obj = {};
        var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        var num = 1;

        dataArr.map(function(item, index) {
            if (item.id == id) {
                ind = index;
            }
        });

        obj = dataArr[ind];

        var isExist = false;
        cart.map(function(item, index) {
            if (item.id == id) {
                item.num = parseInt(num) + parseInt(item.num);
                isExist = true;
            }
        });

        if (!isExist) {
            obj.num = num;
            cart.push(obj);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(localStorage.getItem("cart"));

        //window.location.href = 'views/cart.html';
        refresh();
    });

    //购物小圆点
    refresh();
    function refresh() {
        var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
            totalNum = 0;

        if (cart.length) {
            cart.map(function(item) {
                totalNum += parseInt(item.num);
            });
            if (!$('.cart span').hasClass("gou")) {
                $("<span class='gou'></span>").appendTo(".cart a");
            }
            $('.gou').html(totalNum);
        } else {
            $(".gou").remove();
        }
    }
});
