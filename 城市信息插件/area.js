//插件前加分号，防止插入的前面代码没加分号，出现错误
;(function () {
    
    //实现插件的功能
    var obj = {
        // 初始化函数
        init:function (option) {
            this.parent = option.parent;
            this.items = option.items;
            this.rowNum = option.rowNum || 5;
            this.nowItem = option.nowItem || this.items[0].name || "";
            this.nowItemImg = option.nowItemImg || "";
            this.createDom();
            this.bindEvent();
        },
        createDom:function () {
            var wrap = $("<div class='area-content'></div>");
            var nowArea = $("<div class='nowArea'></div>");
            var itemList = $("<div class='itemList'></div>");
            if(this.nowItemImg){
                var img = new Image();
                img.src = this.nowItemImg;
                img.onload = function () {
                    $(img).prependTo(nowArea);
                }
            }
            //生成一个DOM节点，内容为默认值，添加到nowArea节点下。
            $("<span class='item-name'></span>").html(this.nowItem).appendTo(nowArea);
            this.items.forEach(function (ele,index) {
                console.log(ele,index);
                var str = '<a href="' + ele.href +'">'+ ele.name +'</a>';
                $("<div class='item'></div>").append(str).appendTo(itemList);
            });
            wrap.append(nowArea).append(itemList);
            this.parent.append(wrap);
            $("#location .itemList").css({
                "width":$(".item").innerWidth()*this.rowNum + "px",
                "top":$(this.parent).height() - 1 +"px"
            })
        },
        bindEvent:function () {

            $(".itemList").on("click",".item",function () {
                $(this).addClass("nowactive").siblings().removeClass("nowactive");
                $("span.item-name").text($(this).text());
            })
        }
    };

    
    $.fn.extend({
        areaList:function (opt) {
            opt.parent = this;
            obj.init(opt);
        }
    })
})();