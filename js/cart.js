$(function(){
	var Cart = {
		proCon: $('.cart_pro .tr_pro'),
		cart: null,
		input: null,
		stock: 0,
		pay: {},
		cartProInfo: $('.cart_proInfo'),
		init: function(){
			this.loadgoods();
			this.add();
			this.redu();
			this.inputChange();
			this.delet();
			this.select_all();
			this.selected();
			this.selected_del();
		},
		//加载商品列表
		loadgoods: function(){
			var that = this;
			 this.cart = JSON.parse( $.cookie('gjw_cart') );
			 var num = 0;
			for(var key in this.cart){
				num++;
				//使用闭包，保存key的值
				(function(k){
					var ul = $('<ul class="tr"></ul>');
					ul.attr('sizeid',k);
					ul.load('cartGoods.html?key='+Math.random(),function(){
						that.stock  = that.cart[k].stock;
						//修改商品的名称
						ul.find('.td_proInfo span').html(that.cart[k].goods_name);
						//修改商品的图片
						ul.find('.td_proInfo img').attr('src',that.cart[k].imgsrc);
						//修改价格
						ul.find('.td_price').html('¥'+that.cart[k].price);
						//修改数量
						ul.find('.td_count .pro_count').val(that.cart[k].count);
						that.input = ul.find('.td_count .pro_count');
						var money = (that.cart[k].count * that.cart[k].price).toFixed(2);
						//修改总价
						ul.find('.td_money span').html( money);
				});
					//修改商品的数量
					$('.cart_contain .title .count').html(num);
					//将内容放入页面
					that.proCon.append(ul);
				})(key);
			}
		},
		//数量加加
		add: function(){
			var that = this;
			this.proCon.on('click','.td_count .add',function(){
				var count = parseInt( $(this).prev().val() );
				if(count >= that.stock){
					$(this).prev().val(that.stock);
					return;
				}
				count++;
				$(this).prev().val(count);
				//修改cookie
				that.handleCookie($(this).prev());
			});
		},
		//数量减减
		redu:function(){
			var that = this;
			this.proCon.on('click','.td_count .redu',function(){
				var count = parseInt( $(this).next().val());
				if(count <= 1){
					$(this).next().val(1);
					return;
				}
				count--;
				$(this).next().val(count);
				//修改cookie
				that.handleCookie($(this).next());
			});
		},
		//直接修改input中的值
		inputChange:function(){
			var that = this;
			this.proCon.on('input','.td_count .pro_count',function(){
				var count = parseInt( $(this).val() );
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
				//修改cookie
				that.handleCookie($(this));
			})
		},
		//修改价格和修改cookie值
		handleCookie: function(input){
			var sizeid = input.parents('.tr').attr('sizeid');
			var count = input.val();
			var money = (count * this.cart[sizeid].price).toFixed(2);
			input.parent().next().find('span').html(money);
			//重新修改cookie中的商品数量
			this.cart[sizeid].count = count;
			this.setCookie();
		},
		//删除商品
		delet: function(){
			var that = this;
			this.proCon.on('click','.td_op .del',function(){
				if(confirm('确认删除宝贝吗？')){
					var sizeid = $(this).parents('.tr').attr('sizeid');
					$(this).parents('.tr').remove();
					delete that.cart[sizeid];
					that.setCookie();
				}
			})
		},
		//全选
		select_all: function(){
			var that = this;
			$('.cart_proInfo .check_all').change(function(){
				var status = $(this).prop('checked');
				//选中所有商品前的checkbox按钮
				var allCheckbox = that.proCon.find('input[type="checkbox"]');
				if(status){
					//让所有商品的选择按钮选中
					allCheckbox.prop('checked',true);
					
				}else {
					allCheckbox.prop('checked',false);
				}
				//触发商品前面的复选框
				allCheckbox.change();
			});
		},
		//商品选择
		selected: function(){
			var that = this;
			this.proCon.on('change','input[type="checkbox"]',function(){
				var sizeid = $(this).parents('.tr').attr('sizeid');
				var totalmon = $(this).parents('.tr').find('.td_money span').html();
				if($(this).prop('checked')){
					that.pay[sizeid] = parseFloat(totalmon);
				}else {
					delete that.pay[sizeid];
				}
				//checkbox的数量
				var allCheckbox = that.proCon.find('input[type="checkbox"]');
				//在选中状态的按钮的数量
				var checkedbox = that.proCon.find('input[type="checkbox"]:checked');
				//如果数量相同说明是全选状态,反之就取消全选状态
				var check_all = $('.cart_proInfo .check_all');
				if(allCheckbox.length == checkedbox.length){
				 	check_all.prop('checked',true);
				}else {
					check_all.prop('checked',false);
				}
				
				that.handlePay();
			})
		},
		//删除选中的全部商品
		selected_del: function(){
			var that = this;
			$('.cart_proInfo .sel_delect a').click(function(){
				//获取所有已选中的商品
				var allchecked = that.proCon.find('input[type="checkbox"]:checked');
				//没有选中的商品时
				if(allchecked.length == 0){
					alert('请选择要删除的宝贝');
				}
				//确认删除
				if(confirm('确认删除选中的宝贝吗')){
					allchecked.each(function(i){
						var sizeid = $(this).eq(i).parents('.tr').attr('sizeid');
						//从页面上删除元素
						$(this).eq(i).parents('.tr').remove();
						//从cookie中删除记录
						delete that.cart[sizeid];
						that.setCookie();
						//从pay中删除记录
						delete that.pay[sizeid];
						that.handlePay();
					});
				}
			});
		},
		//处理数量和总价
		handlePay: function(){
			var amount = 0;
			var money = 0;
			for(var key in this.pay){
				amount++;
				money += this.pay[key];
			}
			$('.cart_proInfo .pay_count b').html(amount);
			$('.cart_proInfo .pay_money b').html('¥'+ (money.toFixed(2)));
			$('.title .cart_info b').html('¥'+ (money.toFixed(2)));
		},
		setCookie:function(){
			$.cookie('gjw_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}
	};
	Cart.init();
});
