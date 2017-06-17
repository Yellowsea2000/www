/**
 * Created by Administrator on 2017/6/4 0004.
 */
$(function() {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination'
    });

    var id = location.search.slice(4),
        obj;


    $.getJSON("../json/goods.json", function (responseData) {
        var data = responseData.data1,
            index = 0;

        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (data[i][key] == id ) {
                    //console.log(data[i]);
                    index = i;
                }
            }
        }
        obj = data[index].img1;

        obj.map(function(item,index) {
            $(".swip" + (index + 1)).find("img").attr("src", item);
        });

        $(".introduce a").attr("href", "introduce.html?id=" + id);
        $(".detail a").attr("href", "detail.html?id=" + id);
        $(".real a").attr("href", "realPhoto.html?id=" + id);
    });
});