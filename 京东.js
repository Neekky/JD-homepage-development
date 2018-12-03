//轮播图插件
$("#swiper").sliderImg({
    image:["image/pic1.jpg","image/pic2.jpg","image/pic3.jpg"],
    interval:2500
});

/*下拉动画部分*/
var index;
//$(selector).hover(inFunction,outFunction)
$(".categor-unit").hover(function () {
    $(".tabs-gather").css("display","block");
    index = $(this).attr("data-index");
    $("#tabs-" + index).css("display","block").html(index);
    console.log(index);
},function () {
    $(".tabs-gather").css("display","none");
    $("#tabs-" + index).css("display","none");
});
$(".tabs-gather").mouseover(function () {
    $(this).css("display","block");
    $("#tabs-" + index).css("display","block");
}).mouseout(function () {
    $(".tabs-gather").css("display","none");
    $("#tabs-" + index).css("display","none");
});

//右侧滑动动画
$(".slide-toggle").hover(function () {
    $(".content-area").slideUp();
    $(".slide-content").slideDown();
    var id = $(this).attr("id");
    $("." + id + "-tab").addClass("active").siblings().removeClass("active");
    $("." + id + "-content").show()
});

$(".header span").hover(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("." + $(this).attr("data") + "-content").show().siblings(".tabs-content").hide();
});

//按钮关闭功能
$(".close").click(function () {
    $(".content-area").slideDown();
    //滑入
    $(".slide-content").slideDown();
});

//城市信息插件
$("#location").areaList({
    items:[{
        name:"北京",
        href:"#"
    },
    {
        name:"上海",
        href:"#"
    },
    {
        name:"天津",
        href:"#"
    },
    {
        name:"重庆",
        href:"#"
    },
    {
        name:"河北",
        href:"#"
    },
    {
        name:"山西",
        href:"#"
    },
    {
        name:"河南",
        href:"#"
    },
    {
        name:"辽宁",
        href:"#"
    },
    {
        name:"吉林",
        href:"#"
    },
    {
        name:"黑龙江",
        href:"#"
    },
    {
        name:"内蒙古",
        href:"#"
    },
    {
        name:"江苏",
        href:"#"
    },
    {
        name:"山东",
        href:"#"
    },
    {
        name:"安徽",
        href:"#"
    },
    {
        name:"浙江",
        href:"#"
    },
    {
        name:"福建",
        href:"#"
    },
    {
        name:"湖北",
        href:"#"
    },
    {
        name:"湖南",
        href:"#"
    },
    {
        name:"广东",
        href:"#"
    },
    {
        name:"广西",
        href:"#"
    },
    {
        name:"江西",
        href:"#"
    },
    {
        name:"四川",
        href:"#"
    },
    {
        name:"海南",
        href:"#"
    },
    {
        name:"贵州",
        href:"#"
    },
    {
        name:"云南",
        href:"#"
    },
    {
        name:"西藏",
        href:"#"
    },
    {
        name:"陕西",
        href:"#"
    },
    {
        name:"甘肃",
        href:"#"
    },
    {
        name:"青海",
        href:"#"
    },
    {
        name:"宁夏",
        href:"#"
    },
    {
        name:"新疆",
        href:"#"
    },
    {
        name:"港澳",
        href:"#"
    },
    {
        name:"台湾",
        href:"#"
    },
    {
        name:"钓鱼岛",
        href:"#"
    },
    {
        name:"海外",
        href:"#"
    }],
    //每一行显示城市数量
    rowNum: 5,
    //默认显示值
    nowItem: "北京",

    color:"#999",
    nowItemImg:"image/local.jpg"
});
