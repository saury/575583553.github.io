$(function(){
	$('.head').load('head.html',function(){
		//
		$('.good_info .navbar_all').hover(function(){
			$('.main').stop(true).fadeToggle(400);
		});
		
		//头部悬浮广告
		/*$('.noticeBar .noticeBar_img .small').animate({
			top: 83
		},400,function(){
			$('.noticeBar .noticeBar_img .small').hide();
			$('.noticeBar .noticeBar_img').animate({
				height: 270
			},800,function(){
				$('.noticeBar .noticeBar_img').animate({
					height: 83
				},600,function(){
					$('.noticeBar .noticeBar_img .small').show();
					$('.noticeBar .noticeBar_img .small').animate({
						top:0
					});
				});
				
			});
		});
		$('.noticeBar .noticeBar_img').animate({
			height: 270
		},800,function(){
			$('.noticeBar .noticeBar_img').delay(3000).animate({
				height: 83
			},600);
		});*/
		
		//二级菜单
		$('.all_count .item').mouseenter(function(){
			
			//二级菜单
			var item = $('.er_list .op');
			var index = parseInt($(this).index() - 1);
			if(index == -1 || index == 4) {
				$('.er_list').hide();
				return;
			}
			$('.er_list').show();
			item.eq(index).show().siblings().hide();
		});
		$('.main').mouseleave(function(e){
			var item = $('.er_list .op');
			$('.er_list').hide();
		});
		
		//右侧固定栏效果
		$('.rightBar li').mouseenter(function(){
			$(this).find('.iconBox_tips').show();
			$(this).find('.iconBox_tips').animate({
				right: 32,
				opacity: 1
			},500);
		});
		$('.rightBar li').mouseleave(function(){
			$(this).find('.iconBox_tips').animate({
				right: 80,
				opacity: 0
			},500);
			$(this).find('.iconBox_tips').hide();
		});
		
		//回到顶部
		$('.toTop').click(function(){
			$('html body').animate({
				scrollTop: 0
			},600);
		});
		
	});
	//头部加载结束
	
	//加载尾部内容
	$('.foot').load('footer.html',function(){
		//链接滚动
		var main = $('.footer .link_slide ul');
		var li = main.find('li').eq(0).clone(true);
		main.append(li);
		var index = 0;
		setInterval(function(){
			index++;
			if(index >= 5){
				main.css({top:0});
				index = 1;
			}
			main.animate({
				top: -33*index
			},500);
		},1500);
	});
	
	//公共的缩小版购物车
	var cart = JSON.parse( $.cookie('gjw_cart') || '{}' );//要做兼容'{}'
	var money = 0;
	var num = 0;
	for(var key in cart){
		num++;
		//使用闭包，保存key的值
		(function(k){
			var ul = $('<ul class="tr"></ul>');
			ul.attr('sizeid',k);
			ul.load('s_cart.html',function(){
				//修改商品的名称
				ul.find('.pro_title').html(cart[k].goods_name);
				//修改商品的图片
				ul.find('.pro_img img').attr('src',cart[k].imgsrc);
				//修改价格
				ul.find('.pro_price').html(cart[k].price);
				//修改数量
				ul.find('.pro_mes .pro_num').html(cart[k].count);
				money += cart[k].count * cart[k].price;
				$('.cartbox .total_mon b').html('¥'+money);
				
				/*ul.on('click','.delete',function(){
					var tr = $(this).parents('.tr');
					var sizeid = tr.attr('sizeid');
					tr.remove();
					delete cart[sizeid];
					$.cookie('gjw_cart',JSON.stringify(cart),{expires:365,path:'/'});
				})*/
		});
			//修改商品的数量
			$('.cartbox .pro_count b').html(num);
			//将内容放入页面
			$('.cartbox .cart_con').append(ul);
			
		})(key);
	}
	//放大镜效果
	var glass = {
		smallWrap: $('.proImg .proImgBig'),
		filter: $('.modal'),
		largeWrap: $('.bigImg'),
		largeImg: $('.bigImg img'),
		//初始化方法
		init: function(){
			this.mousemove();
			this.hover();
		},
		//鼠标移动
		mousemove: function(){
			var that = this;
			this.smallWrap.mousemove(function(e){
				//获取图片盒子相对市口的上边距和下边距
				var t = $(this).offset().top - $(window).scrollTop();
				var l = $(this).offset().left;
				//获取鼠标的相对位置
				e = e || window.event;
				var left = e.clientX - l;
				var top = e.clientY - t;
				//处理left和top，做边缘处理（防止越界）
				left = left < 100 ? 100 : (left > 318) ? 318 : left;
				top = top < 100 ? 100 : (top > 300) ? 300 : top;
				
				//改变滤镜的位置
				that.filter.css({
					left: left-100, //-100是为了让鼠标在滤镜的中心位置
					top: top-100
				});
				that.largeImg.css({
					left: -2*(left-100),
					top: -2*(top-100)
				});
			});
		},
		hover: function(){
			var that = this;
			this.smallWrap.stop(true).hover(function(){
				that.filter.toggle();
				that.largeWrap.toggle();
			});
		}
	};
	
	glass.init();
});
