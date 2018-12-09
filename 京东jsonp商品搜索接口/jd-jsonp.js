/*通过jsonp访问百度服务器，获取搜索联想词*/
$(".sj-input").on("input",function () {
    var value = this.value;
    var oScript = document.createElement("script");
    //wd=关键字，doJson=执行函数名，这里要保证传的是函数名的字符串！！！
    oScript.src = "http://suggest.taobao.com/sug?code=utf-8&q="+ value +"&callback=doJson";
    //这里将插入以联想词数组为参数的名为doJson的js文件，马上执行
    document.body.appendChild(oScript);
    //执行完以后又马上移除掉
    document.body.removeChild(oScript);
});

function doJson(data) {
    var s = data.result;
    $(".search-drop ul").empty();
    //当输入值过多时，s的联想词会匹配不到
    if(s.length > 0){
        s.forEach(function (ele,index) {
        var a = $("<a></a>").attr("href","https://s.taobao.com/search?q=" + ele);
        a.text(ele);
        $("<li></li>").append(a).appendTo($(".search-drop ul"));
        });
        $(".search-drop ul").css("display","block");
    }else{
        $(".search-drop ul").css("display","none");
    }
}