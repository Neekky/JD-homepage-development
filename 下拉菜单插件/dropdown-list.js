(function () {
    function Index(option){
        //绑定属性，并做兼容处理
        this.menuList = option.menuList || [];
        this.dir = option.direction || 'x';
        this.colNum = option.colNum || 2;
        this.parent = option.parent;
        this.title = option.title || null;
        this.fontColor = this.parent.find('a').css("color");
        this.createDom();
        this.bindEvent();
    }
    Index.prototype.createDom = function(){
        var self = this;
        var content = $("<div class='dropContent' style='display:none;'></div>");
        var dropDownSon = $("<div class='dropDownSon'></div>");
        //生成结构
        this.menuList.forEach(function (ele) {
            //组
            var menu = $("<div class='nav-menu'></div>");
            //标题
            if(ele.title){
                var menuTitle = $("<div class='item menuTitle'></div>").html(ele.title);
                menu.append(menuTitle).css("text-align","left");
            }
            //内容展示列表
            var itemList = $("<div class='itemList'></div>");
            ele.items.forEach(function (ele) {
                var str = "<a href='"+ ele.href +"'>"+ ele.name +"</a>";
                var item = $("<div class='menuItem' style='width:100px;display: inline-block;'></div>");
                item.html(str).appendTo(itemList);
            });
            menu.append(itemList).appendTo(dropDownSon);
        });
        content.append(dropDownSon).appendTo(self.parent);
        this.addCss();
        //menu中组的排列，判断是横着还是竖着排列
        if(this.dir == "x"){
            $(".nav-menu",this.parent).css({
                "display":"inline-block",
                "border-right":"1px solid #ddd"
            });
            $(".dropContent",this.parent).css({
                "width":$(".nav-menu",this.parent).outerWidth()*$(".nav-menu",this.parent).length + "px",
                //右对齐
                "right":0
            });
            $(".menuTitle",this.parent).css({
                "color":"#666",
                "font-weight":"800"
            })
        }else{
            $(".nav-menu",this.parent).css({
                "display":"block",
                "border-bottom":"1px solid #ddd",
            });
             $(".dropContent",this.parent).css({
                 //左对齐
                 "left":0
            })
        }
    };
    Index.prototype.addCss = function(){
        var self = this;
        this.parent.css({
            "position":"relative"
        });
        //给定作用域
        $(".dropContent",this.parent).css({
            "position":"absolute",
            "z-index":"5",
            "background-color":"#fff",
        });
        $(".nav-menu",this.parent).css({
            "padding":"10px",
            "width":$(".menuItem",this.parent).width()*self.colNum + "px",
            "vertical-align": "top"
        });
    };
    Index.prototype.bindEvent = function(){
        var self = this;
        this.parent.hover(function () {
            $(this).css({
                "background-color":"#fff"
            }).find("a").css("color",self.fontColor);
            $(".dropContent",self.parent).show();
        },function () {
            $(".dropContent",self.parent).hide();
            var color = self.parent.parents().css("background-color");
            self.parent.css("background-color",color);
        });
        $("a",this.parent).hover(function () {
            $(this).css("color","red");
        },function () {
            $(this).css("color",self.fontColor);
        })
    };
    $.fn.extend({
        dropdownList:function (option) {
            option.parent = this;
            new Index(option);
            //返回调用对象，以实现后续的链式调用。
            return this;
        }
    })
})();