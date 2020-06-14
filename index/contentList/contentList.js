(function(){
//商家详情模板字符串
	var itemTemplate = '<a href="menu/menu.html" class="seller-item-content">'+
							'<img class="item-img" src=$pic_url />'+
							'$brand' +
							'<div class="item-info-content">'+
								'<p class="item-title">$name</p>'+
								'<div class="item-desc clearfix">'+
									'<div class="item-score">$wm_poi-score</div>'+
									'<div class="item-count">月销$monthNum</div>'+
									'<div class="item-distance">&nbsp;$distance</div>'+
									'<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
								'</div>'+
								'<div class="item-price">'+
									'<div class="item-pre-price">$min_price_tip</div>'+
								'</div>'+
								'<div class="item-others one-line">'+
									'$others'+ 
								'</div>'+
							'</div>'+
						'</a>';
	var page = 0;
	var isLoading = false;					

// 获取商家列表数据
	function getList(){
		page++;
		isLoading = true;
		$.get('../../json/homelist.json',function(data){
			setTimeout(function(){
				console.log(data);
				var list = data.data.poilist || [];
				initContentList(list);
				isLoading = false;
			});
		});
	}

//渲染是否新到热门品牌标签
	function getMonthNum(data){
		var num = data.month_sale_num;
		if(num > 999) {
			return ' 999+';
		}
		return num;
	}

//渲染月销量
	function getBrand(data){
		if(data.brand_type){
			return '<div class="brand brand-pin">品牌</div>';
		}else{
			return '<div class="brand brand-xin">新到</div>';
		}
	}

//渲染商家活动
	function getOther(data){
		var array = data.discounts2;
		var str = '';
		// 内部商家活动模板字符串
		array.forEach(function(item,index){
			var _str = '<div class="other-info">'+
							'<img src=$icon_url class="other-tag" />'+
							'<p class="other-content">$info</p>'+
						'</div>';
		// 内部商家活动模板字符串替换数据

				_str = _str.replace('$icon_url',item.icon_url)
						   .replace('$info',item.info);

			   	str = str + _str;
		});

		return str;
	}

	//渲染列表数据
	function initContentList(list){
		list.forEach(function(item,index){
			var str = itemTemplate
					  	.replace("$pic_url",item.pic_url)
					  	.replace("$name",item.name)
					  	.replace("$distance",item.distance)
					  	.replace("$min_price_tip",item.min_price_tip)
					  	.replace("$mt_delivery_time",item.mt_delivery_time)
					  	.replace("$brand",getBrand(item))
					  	.replace("$monthNum",getMonthNum(item))
					  	.replace("$others",getOther(item))
					  	.replace('$wm_poi-score',new starScore(item.wm_poi_score).getStars());

			$('.list-wrap').append(str);
		})
	}

	function addEvent(){
		window.addEventListener('scroll',function(){
			var clientHeight = document.documentElement.clientHeight;
			var scrollHeight = document.body.scrollHeight;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var preDistance = 30;
			if(scrollTop + clientHeight >= (scrollHeight-preDistance)) {
				console.log('scrollTop + clientHeight >= (scrollHeight-preDistance)')
				//最多滚动加载三页
				if(page < 3){
					//在发送ajax请求时避免触发多次滚动加载;
					if(isLoading){
						return;
					}
					getList();	
				}else{
					$('.loading').text('加载完成');
				}
			}
		});
	}

	function init(){
		getList();
		addEvent();
	}

	init();
})();
