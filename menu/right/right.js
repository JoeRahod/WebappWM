(function(){
		
	var itemTemplate = '<div class="menu-item">'+
							'<img class="img" src=$picture />'+
							'<div class="menu-item-right">'+
								'<p class="item-title">$name</p>'+
								'<p class="item-desc">$description</p>'+	
								'<p class="item-zan">$praise_content</p>'+
								'<p class="item-price">￥$min_price<span class="unit">/$unit</span></p>'+						
							'</div>'+
							'<div class="select-content">'+
								'<div class="minus"></div>'+
								'<div class="count">$chooseCount</div>'+
								'<div class="plus"></div>'+
							'</div>'+
						'</div>';



	//渲染列表
	function initRightList(list){
		$('.right-list-inner').html('');
		list.forEach(function(item,index){

			if(!item.chooseCount){
				item.chooseCount = 0;
			}
			var str = itemTemplate
						.replace('$picture',item.picture)
						.replace('$name',item.name)
						.replace('$description',item.description)
						.replace('$praise_content',item.praise_content)
						.replace('$unit',item.unit)
						.replace("$min_price",item.min_price)
						.replace('$chooseCount',item.chooseCount);

			var $target = $(str);
			$target.data("itemData",item);
			$('.right-list-inner').append($target);
		});		
	}

	//渲染右侧title
	function initRightTitle(str){
		$('.right-title').text(str);
	}

	function addClick(){
		$('.menu-item').on('click','.plus',function(e){
			//页面中的count+1
			var $count = $(e.currentTarget).parent().find('.count');
			$count.text(parseInt($count.text()||'0')+1);
			//后台中的count+1
			var $item = $(e.currentTarget).parents('.menu-item');
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount + 1;

			window.shopBar.renderItems();
		});
		$('.menu-item').on('click','.minus',function(e){
			//页面中的count+1
			var $count = $(e.currentTarget).parent().find('.count');
			if($count.text()==0){
				return;
			}
			$count.text(parseInt($count.text()||'0')-1);
			//后台中的count+1
			var $item = $(e.currentTarget).parents('.menu-item');
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount - 1;

			window.shopBar.renderItems();
		});
	}

	function init(data){
		initRightList(data.spus || []);
		initRightTitle(data.name);
		addClick();
	}

	window.Right = {
		refresh: init
	}

	init();

})();