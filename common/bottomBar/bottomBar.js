(function(){
	
		var strFinal = '<a class="index btn-item" href="https://joerahod.github.io/WebappWM/index.html"><div class="tab-icon"></div><div class="btn-name">首页</div></a><a class="order btn-item" href="https://joerahod.github.io/WebappWM/order/order.html"><div class="tab-icon"></div><div class="btn-name">订单</div></a><a class="my btn-item" href="https://joerahod.github.io/WebappWM/my/my.html"><div class="tab-icon"></div><div class="btn-name">我的</div></a>';

		$('.bottom-bar').append(strFinal);

		//当前页面地址栏地址,判断页面改变bottom icon的激活值
		var currentPage = window.location.pathname.split('/');
		var currentPageName = currentPage[currentPage.length-1].replace('.html','');
		$('a.'+currentPageName).addClass('active');
	}

	init();
})();
