//具体实现扩展轮播图插件
//放在一个父级中，id名为swiper，具有宽高
(function f() {
    //3.构造函数接收到参数，并执行初始化函数。
    /* 这里弄个构造函数来，是为了不使变量污染外部？？*/
    function Swiper(opt){
        //合并参数，容错处理,以防未传参数情况，设置默认参数。
        var opts = $.extend({'image':[],'interVal':2000},opt);
        this.img = opts.image;
        this.wrap = opts.father;
        this.interVal = opts.interVal;

        //4.谁调用了构造函数this就指向谁？
        // 这里就是生成了一个Swiper对象，
        // 这里this指向的是Swiper。
        // 并且内部的init函数是一个私有的方法。
        // 只有用new的时候才能执行init函数。
        this.init();
    }
    //这里的this是谁调用init方法，就指向谁，这里还是指向Swiper。
    Swiper.prototype.init = function(){
        this.nowIndex = 0;
        this.len = this.img.length;
        //itemWidth由自己定义的父级宽度决定。
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
            //不写成空字符串，会成undefined，出现在界面里。
            str = '',
            listStr = '',
            w = this.wrap.width(),
            h = this.wrap.height(),
            ulW = w * (len + 1),
            //用$包上，它就可以使用jquery方法了。
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
        //在父级wrap里放入ul，ul里还要有str，str为图片。
        this.wrap.append(imgBox.html(str))
                 // 将左右按钮和小球放入wrap里。
                 .append(btn)
                 .append(order.append(list));
        //img的宽度由父级li来决定。
        imgBox.find("li").css({
            "width":w + "px",
            "height":h + "px"
        });
        $(".order li").eq(0).addClass("active");
    };

    Swiper.prototype.bindEvent = function(){
        //将Swiper的this存给变量self。
        //点击事件中的this指向的是li
        var self = this;
        $(".order li").add(".prevBtn").add(".nextBtn").click(function () {
        if($(this).attr("class") == "prevBtn"){
            self.move("prev");
        }else if($(this).attr("class") == "nextBtn"){
            self.move("next");
        }else{
            //点击的是li
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
                        //瞬间改变left到无缝切换图片 然后滑动图片暂时
                        //len --> len-1
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
            //1.传进来的参数是个对象，这一步给对象加了个属性，值为this（调用此函数的DOM节点）。
            options.father = this || $(".body");
            //2.将带着新属性的参数对象再传给构造函数Swiper。
            // 并执行了这个构造函数，生成了一个Swiper对象。
            //记住：new一个构造函数，生成的是一个构造函数名的对象。
            new Swiper(options);
        }
    })
})();