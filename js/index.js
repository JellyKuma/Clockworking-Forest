/**
 * Created by 卢克 on 2017/9/10.
 */
var navRoute = "img/";
var navArr = [
    navRoute+"2016040318504130250.jpg",//主背景
    navRoute+"IMGP5461edited.jpg",//品牌介绍背景
    navRoute+"3-160401151627.jpg",//热卖商品背景
    navRoute+"mttc-fxrqhar9964652.jpg"//关于我们背景
];
$(function(){
    $("video").on("ended", function () {
        this.currentTime = 0;
        this.play();
    });
    // 加载轮播数据
    var tagI = $("<i></i>").addClass("index"),
        new1 = $("<span></span>").addClass("new1"),
        new2 = $("<span></span>").addClass("new2"),
        cover = $("<img>").addClass("cover").attr("alt", "cover"),
        title = $("<h4></h4>").addClass("title"),
        desc = $("<span></span>").addClass("desc"),
        front = $("<img>").addClass("front").attr("alt", "front"),
        back = $("<img>").addClass("back").attr("alt", "back"),
        subTitle1 = $("<span>").addClass("subTitle1"),
        subTitle2 = $("<span>").addClass("subTitle2");
    imgData.forEach(function (val, i) {
        tagI.text((i + 1) < 10 ? "0" + (i + 1) : (i + 1));
        new1.text(val.new1);
        new2.text(val.new2);
        cover.attr("src", val.cover);
        title.text(val.title);
        desc.text(val.desc);
        front.attr("src", val.front);
        back.attr("src", val.back);
        subTitle1.text(val.subTitle1);
        subTitle2.text(val.subTitle2);
        var wrap = $("<div></div>");
        wrap.append(tagI[0].outerHTML + new1[0].outerHTML + new2[0].outerHTML + cover[0].outerHTML + title[0].outerHTML + desc[0].outerHTML + front[0].outerHTML + back[0].outerHTML + subTitle1[0].outerHTML + subTitle2[0].outerHTML);
        var ctrl = $("<a href='javascript:void(0);'></a>");
        $(".imgWheel").append(wrap);
        $(".imgCtrl").append(ctrl.data("index", i));
    })
    // 商品轮播动画
    var imgCtrlBtn = $(".imgCtrl").children("a");
    var imgWheel = $(".imgWheel");
    var width = imgWheel.children("div").outerWidth();
    imgWheel.css("width", imgCtrlBtn.length * width);
    var index = 0;
    imgCtrlBtn.hover(function () {
            index = $(this).index();
            imgScroll(index);
            imgWheel.trigger("mouseenter");
        }, function () {
            imgWheel.trigger("mouseleave");
        }
    ).eq(0).trigger("mouseenter");
    imgWheel.hover(
        function () {
            clearInterval(wheelTime);
        }, function () {
            wheelTime = setInterval(function () {
                if (index == imgCtrlBtn.length) {
                    index = 0
                }
                imgScroll(index);
                index++;
            }, 3000);
        }
    ).trigger("mouseleave");
    function imgScroll(index) {
        var scroll = "-" + width * index + "px";
        imgWheel.stop(true, false).animate({"margin-left": scroll}, 400);
        imgCtrlBtn.removeClass("active").eq(index).addClass("active");
    }
    // 导航事件
    $("nav>a").hover(function () {
        if($(this).index() > 0) {
            $(this).parents("header").css({
                "background-image": "url(" + navArr[$(this).index()] + ")",
                "opacity": "0.7"
            }).stop(true, false).animate({"opacity": "1"}, 1000);
        }else {
            var video = $(this).parent().siblings("video");
            video.stop(true,false).animate({"opacity": "1"}, 500);
            video[0].play();
        }
    },function () {
        var video = $(this).parent().siblings("video");
        if(!video[0].paused){
            video.stop(true,false).animate({"opacity": "0"}, 300);
            video[0].pause();
            video[0].currentTime = 0;
        }
        $("header").css({
            "background-image": "url(" + navArr[0] + ")",
            "background-size": "cover"
        });
    }).trigger("mouseleave");
})
