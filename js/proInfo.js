$(function(){
	var proInfo = {
		gid : $('.proBasicInfo').attr("good-gid"),
		data: {},
		stock: 0,
		input: $('.proBasicInfo .pro_count input'),
		init: function(){
			this.getData();
		},
		//从json文件中获取数据
		getData: function(){
			var that = this;
			$.getJSON("js/data.json",function(data){
				that.data = data[that.gid];
				that.setInfo();
				that.add();
				that.redu();
				that.inputChange();
				that.addCart();
			})
		},
		//设置数据
		setInfo: function(){
			var goodTil = this.data.good_dec;
			//商品的名称
			$('.curName').html(goodTil);
			//商品展示区的标题
			$('.proMsgBox .title').html(goodTil);
			//改变商品的图片src
			$('.proImgBig').find('img').attr('src',this.data.good_img);
			//添加细节图片
			var img = '';
			for(var key in this.data.good_imgList){
				img += '<li><img src="'+this.data.good_imgList[key]+'"/></li>';
			}
			$('.proImgBox .proImgList ul').html(img);
			$('.proImgBox .proImgList ul li:eq(0)').addClass('active');
			//商品的原价
			$('.priceBox .good_price').html(this.data.good_price);
			//商品的当前活动价格
			$('.priceBox .good_curprice').html(this.data.good_curprice);
			//优惠的价格
			$('.priceBox .prefer').html(this.data.good_price-this.data.good_curprice);
			//添加商品的类型
			var str = '';
			for(var key in this.data.good_class){
				str += '<li sizeid="'+key+'">'+this.data.good_class[key]+'</li>';
			}
			$('.good_class ul').html(str);
			$('.good_class ul li:eq(0)').addClass('active');
			//商品的库存
			this.stock = this.data.stock
			$('.pro_count .stock').html(this.stock);
			
		},
		//商品购买数量加加
		add: function(){
			var that = this;
			$('.pro_count .add').click(function(){
				var count = that.input.val();
				//如过当前购买的数量超过库存
				if(count >= that.stock-1){
					that.input.val(that.stock);
					return;
				}
				count++;
				that.input.val(count);
			});
		},
		//商品购买数量减减
		redu: function(){
			var that = this;
			$('.pro_count .redu').click(function(){
				var count = parseInt(that.input.val());
				//如过当前购买的数量超过库存
				if(count <= 1){
					that.input.val(1);
					return;
				}
				count--;
				that.input.val(count);
			});
		},
		inputChange: function(){
			var that = this;
			this.input.on('input',function(){
				var count = $(this).val();
				//如果amout为空时不做处理
				if(count == ''){
					return;
				}
				count = parseInt(count);//12ds=>12 ef1=>NaN
				//如果不是一个数字或者count为0 时
				if(isNaN(count) || count == 0){
					$(this).val(1);
					return;
				}
				//判断是否超过库存
				if(count >= that.stock){
					$(this).val(that.stock);
					return;
				}
				$(this).val(count);
			})
			//当input失焦时
			this.input.blur(function(){
				var count = $(this).val();
				if(count == ''){
					$(this).val(1);
				}
			});
		},
		//当点击加入购物后将选中的商品信息加入cookie中
		addCart: function(){
			//点击加入购物的车的商品保存进cookie中
			/*
			 商品的图片
			 商品的名称
			 商品的价钱
			 选择商品的数量
			*/
			var that = this;
			$('.proMsgBox .addtoCat').click(function(){
				//先获取商品类型的id
				var sizeid = $('.good_class ul').find('.active').attr('sizeid');
				//获取商品的图片
				var imgsrc = that.data.good_img;
				//获取cookie(获取的是json字符串，要转化为json对象)
				var cart = $.cookie('gjw_cart') || '{}';
				cart = JSON.parse(cart);
				var count = that.input.val();
				if( !cart[sizeid] ){
					cart[sizeid] = {
						"good_id": that.gid,
						"goods_name":that.data.good_class[sizeid],
						"size_id": sizeid,
						"imgsrc": imgsrc,
						"price": that.data['good_curprice'],
						"count": count,
						"stock": that.data.stock
					};
					
				}else {
					cart[sizeid].count += count;
				}
				//重新写入cookie(写入cookie中的需要时json字符串)
				$.cookie('gjw_cart',JSON.stringify(cart),{expires:365,path:'/'});
				alert('添加成功');
				//console.log($.cookie('gjw_cart'));
			});
		}
	};
	proInfo.init();
});
