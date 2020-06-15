(function(){

	//类目的模板字符串
	var itemTemplate = '<div class="category-item">'+
							'<img class="item-icon" src=$url />'+
							'<p class="item-name">$name</p>'+ 
						'</div>';

	// 渲染category
	function initCategory(){
		//获取category的数据
		$.get('./json/head.json',function(data){
			console.log(data);

			var list = data.data.primary_filter.splice(0,8);
			list.forEach(function(item,index){
				
				var str = itemTemplate
				.replace('$url',item.url)
				.replace('$name',item.name);

				$('.category-content').append(str);
			});
		});
	}

	//绑定item 点击事件
	function addClick(){
		$(".category-content").on('click','.category-item',function(){
			alert('Hello,Joe');
		});
	}

	function init(){
		initCategory();
		addClick();
	};

	init();
})();
