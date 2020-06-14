(function(){
		//购物车顶部遮罩模板字符串
	var itemTopTemplate = '<div class="choose-content hide">'+
								'<div class="content-top">'+
									'<div class="clear-cart">清空购物车</div>'+
								'</div>'+
						  '</div>';
		//购物车底部字符串
	var itemBotTemplate = '<div class="bottom-content">'+
								'<div class="shop-icon">'+
									'<div class="food-num hide"></div>'+
								'</div>'+
								'<div class="price-content">'+
									'<p class="total-price">￥<span class="total-price-span">0</span></p>'+
									'<p class="other-price">另需配送&nbsp;￥<span class="shipping-fee">0</span></p>'+
								'</div>'+
								'<div class="submit-btn">去结算</div>'+
						  '</div>';

	var $strBottom = $(itemBotTemplate);
	var $strTop = $(itemTopTemplate);	

	function changeShippingFee(str){
		$strBottom.find('.shipping-fee').text(str)
	}	

	function changeTotalPrice(str){
		$strBottom.find('.total-price-span').text(str)
	}


	//渲染購物車頂部
	function renderItems(){
		$strTop.find('.choosed-item').remove();
		var list = window.food_spu_tags || [];
		var template = '<div class="choosed-item">'+
							'<div class="item-name">$name</div>'+
							'<div class="price">￥<span class="total">$price</span></div>'+
							'<div class="select-content">'+
								'<div class="minus"></div>'+
								'<div class="count">$chooseCount</div>'+
								'<div class="plus"></div>'+
							'</div>'+
					   '<div>';

	   var totalPrice = 0;
	   list.forEach(function(item){
	   		item.spus.forEach(function(_item){
	   			//如果有菜品数量大于0，开始渲染这条数据
	   			if(_item.chooseCount > 0){
	   				//计算每个菜品的总价就是单价乘数量
	   				var price = _item.min_price * _item.chooseCount;
	   				var row = template.replace('$name',_item.name)
	   									.replace('$price',price)
	   									.replace('$chooseCount',_item.chooseCount);
	   				//计算订单总价					
					totalPrice += price;
					var $row = $(row);
					$row.data('itemData',_item);
					$strTop.append($row);
	   			}
	   		});


	   		//改變總價
	   		changeTotalPrice(totalPrice);

	   		//改變紅點裡面的數量
	   		changeFoodNum();
	   });
	}

	function addClick(){
		$('.clear-cart').on('click',function(e){
			$item = $strTop.find('.choosed-item');

			for(var i = 0; i < $item.length; i++){
				$($item[i]).data('itemData').chooseCount = 0;
			}
			renderItems();
			$('.left-item.active').click();
		});

		$('.shop-icon').on('click',function(){
			$('.mask').toggle();
			$strTop.toggle();
		});

		$strTop.on('click','.plus',function(e){
			var $count = $(e.currentTarget).parent().find('.count');
			$count.text(parseInt($count.text()||'0')+1);
			var $item = $(e.currentTarget).parents('.choosed-item').first();
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount + 1;
			renderItems();
			//找到當前右側的數據詳情的數據進行聯動
			$('.left-item.active').click();
		});
		$strTop.on('click','.minus',function(e){
			var $count = $(e.currentTarget).parent().find('.count');

			if($count.text()==0) return;
			$count.text(parseInt($count.text()||'0')-1);
			var $item = $(e.currentTarget).parents('.choosed-item').first();
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount - 1;
			renderItems();
			//找到當前右側的數據詳情的數據進行聯動
			$('.left-item.active').click();
		});
	}			

//渲染紅點數量
	function changeFoodNum(){
		//先拿到所有的count
		var $foodCounts = $strTop.find('.count');
		var total = 0;

		//遍歷每個count相加
		for(var i = 0; i < $foodCounts.length; i++){
			total += parseInt($($foodCounts[i]).text());
		}

		if(total > 0){
			$('.food-num').show().text(total);
		}else{
			$('.food-num').hide();
			$('.mask').hide();
			$strTop.hide();
		}
	}
	
	function init(data){
		$('.shop-cart').append($strTop);
		$('.shop-cart').append($strBottom);
		addClick();
	}

	init();

	window.shopBar = {
		renderItems:renderItems,
		changeShippingFee:changeShippingFee,
	}

})();