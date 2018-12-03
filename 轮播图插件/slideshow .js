//轮播图插件
(function f() {
    function Swiper(opt){
        //合并参数，容错处理,以防未传参数情况，设置默认参数。
        var opts = $.extend({'image':[],'interVal':2000},opt);
        this.img = opts.image;
        this.wrap = opts.father;
        this.interVal = opts.interVal;
        this.init();
    }
    Swiper.prototype.init = function(){
        this.nowIndex = 0;
        this.len = this.img.length;
        this.itemWidth = this.wrap.width();
        this.timer = null;
        this.flag = true;
        //创建并且插入DOM元素
        this.createDom();
        // 点击事件,this指向事件对象
        this.bindEvent();
        // 自动轮播
        this.sliderAuto();
    };

    Swiper.prototype.createDom = function(){
        //局部变量
        var len = this.len,
            str = '',
            listStr = '',
            w = this.wrap.width(),
            h = this.wrap.height(),
            ulW = w * (len + 1),
            imgBox = $('<ul class="imgBox"></ul>'),
            order = $('<div class="order"></div>'),
            list = $('<ul></ul>');
            btn = '<div class="btn">\
                      <a class="prevBtn" href = "javascript:;" ><span>&lt;</span></a>\
                      <a class="nextBtn" href="javascript:;"><span>&gt;</span></a>\
                  </div>';
        imgBox.css({
            "width":ulW + "px",
            "height":h + "px"
        });
        for(var i = 0; i <len; i ++){
            str += '<li><a href="javascript:;"><img src="' + this.img[i] + '"></a></li>';
            listStr += '<li></li>';
        }
        str += '<li><a href="javascript:;"><img src="' + this.img[0] + '"></a></li>';
        $(listStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
                 .append(btn)
                 .append(order.append(list));
        imgBox.find("li").css({
            "width":w + "px",
            "height":h + "px"
        });
        $(".order li").eq(0).addClass("active");
    };

    Swiper.prototype.bindEvent = function(){
        var self = this;
        $(".order li").add(".prevBtn").add(".nextBtn").click(function () {
        if($(this).attr("class") == "prevBtn"){
            self.move("prev");
        }else if($(this).attr("class") == "nextBtn"){
            self.move("next");
        }else{
            var index = $(this).index();
            self.move(index);
        }
        });
        self.wrap.mouseenter(function () {
            $(".btn").show();
            clearTimeout(self.timer);
        }).mouseleave(function () {
            $(".btn").hide();
            self.sliderAuto();
        })
    };


    Swiper.prototype.sliderAuto = function(){
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.move("next");
        },self.interVal);
    };

    //运动函数
    Swiper.prototype.move = function(dir) {
        var self = this,
            len = self.len;
        if(self.flag){
            self.flag = false;
            if(dir == "prev" || dir == "next"){
                //prev
                if(dir == "prev"){
                    if(self.nowIndex == 0){
                        $(".imgBox").css("left",-(len*self.itemWidth));
                        self.nowIndex = len - 1;
                    }else {
                        self.nowIndex --;
                    }
                //next
                }else{
                    if(self.nowIndex == len - 1){
                        $(".imgBox").animate({left:-(len*self.itemWidth)},function () {
                            $(this).css("left",0);
                            self.flag = true;
                            self.sliderAuto();
                        });
                        self.nowIndex = 0;
                    }else{
                        self.nowIndex ++;
                    }
                }
            //点击li
            }else{
                self.nowIndex = dir;
            }
            self.slider();
            self.changeStyle(self.nowIndex);
        }
    };
    Swiper.prototype.changeStyle = function(index) {
        $(".order li").eq(index).addClass("active").siblings().removeClass();
    }
    Swiper.prototype.slider = function() {
        var self = this;
        $(".imgBox").animate({
            left:-(self.itemWidth * self.nowIndex) + "px"
        },function () {
            self.flag = true;
            self.sliderAuto();
        })
    }

    $.fn.extend({
        sliderImg : function (options) {
            options.father = this || $(".body");
            new Swiper(options);
        }
    })
})();
