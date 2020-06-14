(function(){
	var itemTemplate = '<a class="$key btn-item" href="../$key/$key.html">'+
							'<div class="tab-icon"></div>'+
							'<div class="btn-name">$text</div>'+
						'</a>'; 

	function init(){
		var items = [{
			key:'order',
			text:'订单'
		},{
			key:'my',
			text:'我的'
		}];

		var str = '',strFinal = '';

		items.forEach(function(item,index){
			str += itemTemplate.replace(/\$key/g,item.key)
								.replace('$text',item.text);
		});
		strFinal = '<a class="index btn-item" href="../index.html"><div class="tab-icon"></div><div class="btn-name">首页</div></a>' + str;

		$('.bottom-bar').append(strFinal);

		//当前页面地址栏地址,判断页面改变bottom icon的激活值
		var currentPage = window.location.pathname.split('/');
		var currentPageName = currentPage[currentPage.length-1].replace('.html','');
		$('a.'+currentPageName).addClass('active');
	}

	init();
})();