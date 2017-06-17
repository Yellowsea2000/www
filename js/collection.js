
$(function() {
    refresh();
    function refresh() {
        var collection = localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection")) : [];

        if (collection.length) {
            $(".list").empty();

            collection.map(function(item, index) {
                var li = $('<li class="item"></li>').appendTo(".list");
                $('<div class="item-img"><img src="../'+ item.img+'"/></div>').appendTo(li);
                var div = $('<div class="item-content"></div>').appendTo(li);
                $('<div class="name"><span class="brandname">'+ item.name +'</span><a href="#" index="'+ item.id +'" class="del"> <img src="../img/del.png"/></a></div>').appendTo(div);
                $('<p>[买一赠一]</p>').appendTo(div);
                $('<div class="price">单价 :<i>&nbsp;&nbsp;￥'+item.nowPrice+'</i></div>').appendTo(div);
                $('<div class="buyNum"><span>'+item.discount+'折</span></div>').appendTo(div);
                $('<p class="delPrice">￥'+ item.oldPrice +'</p>').appendTo(div);
                $('<a href="#" index="'+ item.id +'" class="button"></a>').appendTo(div);
            });

        } else {
            window.location.href = "empty-collection.html";
        }
    }

    // 加入购物车
    $(".list").on("tap", ".button", function() {
        var id = $(this)[0].getAttribute("index"),
            ind,
            dataArr = [],
            obj = {};
        var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        var num = 1;
        var collection = localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection")) : [];

        $.getJSON("../json/goods.json", function (responseData) {
            dataArr = responseData.data1;


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

            collection.map(function(item, index) {
                if (item.id == id) {
                    collection.splice(index, 1);
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("collection", JSON.stringify(collection));


            refresh();
            refresh1();
        });

    });

    $('.list').on('tap', '.del', function() {
        var id = $(this)[0].getAttribute("index"),
            ind,
            collection = JSON.parse(localStorage.getItem("collection"));

        collection.map(function(item, index) {
            if (item.id == id) {
                ind = index;
            }
        });

        collection.splice(ind, 1);
        localStorage.setItem("collection", JSON.stringify(collection));
        refresh();
        refresh1();
    });


    //购物小圆点
    refresh1();
    function refresh1() {
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