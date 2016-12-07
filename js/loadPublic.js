$(function(){
	$('.head').load('head.html',function(){
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
	});
	
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
	var cart = JSON.parse( $.cookie('gjw_cart') || '{}' );
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
});
