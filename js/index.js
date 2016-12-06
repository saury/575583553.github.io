$(function(){
	//baner轮播
	var imgFlade = {
		img: $('.banner .item'),
		now: 0,
		next: 0,
		timer: null,
		circle: null,
		init:function(){
			this.circle();
			this.imgSwitch();
			this.mouseenter();
			this.mouseleave();
			this.circleImg();
		},
		//生成小圆点
		circle: function(){
			var str = '';
			for(var i=0; i<this.img.length; i++){
				str += '<span>'+(i+1)+'</span>';
			}
			$('.banner .circle').html(str);
			this.circle = $('.banner .circle span');
			this.circle.eq(0).addClass('active');
		},
		//图片轮播
		imgSwitch: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.next++;
				that.next %= that.img.length;
				that.imgmove();
			},3500);
		},
		imgmove: function(){
			this.img.eq(this.now).animate({
					opacity: 0
				},500);
				this.img.eq(this.next).animate({
					opacity: 1
				},800);
				this.circle.eq(this.next).addClass('active')
				.siblings().removeClass('active');
				this.now = this.next;
		},
		//触摸暂定
		mouseenter: function(){
			var that = this;
			$('.banner').mouseenter(function(){
				clearInterval(that.timer);
			});
		},
		//离开继续动画
		mouseleave: function(){
			var that = this;
			$('.banner').mouseleave(function(){
				that.imgSwitch();
			});
		},
		//触摸小圆圈变化图片
		circleImg: function(){
			var that = this;
			this.circle.mouseenter(function(){
				that.next = $(this).index();
				that.imgmove();
			});
		}
	}
	imgFlade.init();
	
	//时间倒计时滚动
	//$('.flashBuy .time')
	var date = new Date('2016/12/15 00:00:00');
	var fTime = Date.parse(date);
	setInterval(function(){
		var time = Date.now();
		var diff  = fTime - time;
		var day = parseInt(diff/1000/60/60/24);
		var hour = parseInt(diff/1000/60/60%24);
		var minute = parseInt(diff/1000/60%60);
		var second = parseInt(diff/1000%60);
		$('.flashBuy .time .day .t1').html( addZero(day) );
		$('.flashBuy .time .hour .t1').html( addZero(hour) );
		$('.flashBuy .time .minute .t1').html( addZero(minute) );
		$('.flashBuy .time .second .t1').html( addZero(second) );
	},1000);
	
	/*$('.flashBuy .time .second').animate({
			top: -24
		},500,function(){
			top: 0
	},500);*/
	
	//如果不足两位补0
	function addZero(num){
		if( num < 10 && num >= 0){
			return "0"+num;
		}else {
			return num;
		}
	}
	//图片轮播
	function ImgSwitch(select){
		this.imgBox = select;
		this.img = select.find('img');
		this.index = 0;
		this.arrow = this.imgBox.parent().find('.arrow');
		this.circle = this.imgBox.next().find('span');
		this.timer = null;
	}
	ImgSwitch.prototype = {
		constructor: ImgSwitch,
		__proto__: ImgSwitch.prototype.__proto__,
		init: function(){
			var img = this.img.eq(0).clone(true);
			this.imgBox.append(img);
			this.img = this.imgBox.find('img');
			
			this.imgSwitch();
			this.mouseenter();
			this.mouseleave();
			this.left();
			this.right();
			this.circleClick();
		},
		imgSwitch: function(){
			var that = this; 
			this.timer = setInterval(function(){
				that.index++;
				that.imgmove();
			},2500);
		},
		imgmove: function(){
			if(this.index >= this.img.length){
				this.imgBox.css({left: 0});
				this.index = 1;
			}
			this.imgBox.animate({
				left: -this.index * this.img.eq(0).width()
			});
			//超出圆圈的数量时
			if(this.index > 1){
				this.circle.eq(0).addClass('active')
				.siblings().removeClass('active');
			}
			this.circle.eq(this.index).addClass('active')
				.siblings().removeClass('active');
		},
		mouseenter: function(){
			var that = this;
			this.imgBox.parent().mouseenter(function(){
				clearInterval(that.timer);
			});
		},
		mouseleave: function(){
			var that = this;
			this.imgBox.parent().mouseleave(function(){
				that.imgSwitch();
			});
		},
		//点击左按钮
		left: function(){
			var that = this;
			this.arrow.eq(0).click(function(){
				that.index++;
				that.imgmove();
			});
		},
		
		right: function(){
			var that = this;
			this.arrow.eq(1).click(function(){
				var width = that.img.eq(0).width();
				that.index--;
				if(that.index <= -1){
					that.imgBox.css({left: -(that.img.length-1)*width});
					that.index = that.img.length-2;
				}
				that.imgmove();
			});
		},
		//点击圆圈
		circleClick: function(){
			var that = this;
			this.circle.on('click',function(){
				that.index = $(this).index();
				that.imgmove();
			});
		}
	};
	//实例化轮播图
	var img = new ImgSwitch($('.liquor .one .imgWrap'));
	img.init();
	var img1 = new ImgSwitch($('.liquor .two .imgWrap'));
	img1.init();
	var img2 = new ImgSwitch($('.liquor .three .imgWrap'));
	img2.init();
	var img3 = new ImgSwitch($('.liquor .four .imgWrap'));
	img3.init();
	
	//商品闪购特效
	$('.section ul li').delay(100).hover(function(){
		$(this).find('.good_img img').stop(true).animate({
			left: -20
		});
	},function(){
		$(this).find('.good_img img').stop(true).animate({
			left: 0
		});
	});
	
	//图片闪光
	$('.shine').hover(function(){
		$(this).find('.light').addClass('light_now');
	},function(){
		$(this).find('.light').removeClass('light_now');
	});
	
	
	//6楼的特效
	$('.liquor .six a').stop(true).hover(function(){
		$(this).find('img').stop(true).animate({
			left: -150
		},400);
	},function(){
		$(this).find('img').stop(true).animate({
			left: 0
		},400);
	});
	
	//图片放大效果
	
	//
});
