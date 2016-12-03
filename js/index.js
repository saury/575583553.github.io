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
});
