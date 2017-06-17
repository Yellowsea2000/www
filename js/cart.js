
$(function() {

    refresh();
    function refresh() {
        var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
            totalNum = 0,
            totalPrice = 0;

        if (cart.length) {
            $(".list").empty();

            cart.map(function(item, index) {
                var li = $('<li class="item"></li>').appendTo(".list");
                $('<div class="item-img"><img src="../'+ item.img+'"/></div>').appendTo(li);
                var div = $('<div class="item-content"></div>').appendTo(li);
                $('<div class="name"><span class="brandname">'+ item.name +'</span><a index="'+ item.id +'" href="#" class="del"> <img src="../img/del.jpg"/></a></div>').appendTo(div);
                $('<div class="price">单价 :<i>&nbsp;&nbsp;￥'+item.nowPrice+'</i> <span class="unit"></span> </div>').appendTo(div);
                $('<div class="buyNum"><span>数量 :&nbsp;&nbsp;</span><a href="#" index="'+ item.id +'" class="sub">-</a> <input type="text" value="'+ item.num +'"/> <a href="#" id="'+ item.id +'" class="add">+</a> </div>').appendTo(div);

                totalNum += parseInt(item.num);
                totalPrice += parseInt(item.nowPrice) * parseInt(item.num);
            });


            $('.num').html("商品数量&nbsp;:&nbsp;" + totalNum);
            $('.gou').html(totalNum);
            $('.expense').html("应付总额(不含运费)&nbsp;:<i>&nbsp;￥"+ totalPrice +"</i>");
        } else {
            window.location.href = "empty-cart.html";
        }

    }

    $('.list').on('tap', '.add', function() {
        var id = $(this)[0]["id"],
            ind,
            cart = JSON.parse(localStorage.getItem("cart")),
            value = $(this).siblings("input").val();

        cart.map(function(item, index) {
            if (item.id == id) {
                ind = index;
            }
        });

        value++;
        $(this).siblings("input").val(value);

        cart[ind].num++;
        localStorage.setItem("cart", JSON.stringify(cart));
        refresh();
    });

    $('.list').on('tap', '.sub', function() {
        var id = $(this)[0].getAttribute("index"),
            ind,
            cart = JSON.parse(localStorage.getItem("cart")),
            value = $(this).siblings("input").val();

        cart.map(function(item, index) {
            if (item.id == id) {
                ind = index;
            }
        });


        if (value <= 1){
            value == 1;
        } else {
            value--;
            cart[ind].num--;
        }

        $(this).siblings("input").val(value);
        localStorage.setItem("cart", JSON.stringify(cart));
        refresh();
    });

    $('.list').on('tap', '.del', function() {
        var id = $(this)[0].getAttribute("index"),
            ind,
            cart = JSON.parse(localStorage.getItem("cart"));

        cart.map(function(item, index) {
            if (item.id == id) {
                ind = index;
            }
        });

        cart.splice(ind, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        refresh();
    });

});