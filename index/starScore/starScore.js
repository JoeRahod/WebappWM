(function(){
	//商家评星模板
	var itemTemplate = '<div class="star-score">$starstr</div>';

	function _getStars(){
		var _score = this.score.toString();
		var scoreArray = _score.split('.');
		// 满星
		var fullStar = parseInt(scoreArray[0]);
		// 半星
		var halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
		// 0星
		var zeroStar = 5 - fullStar - halfStar;

		var starstr = '';

		for(var i = 0; i < fullStar ; i ++){
			starstr += '<div class="star fullStar"></div>';
		}
		for(var j = 0; j < halfStar ; j ++){
			starstr += '<div class="star halfStar"></div>';
		}
		for(var k = 0; k < zeroStar ; k ++){
			starstr += '<div class="star zeroStar"></div>';
		}

		return itemTemplate.replace('$starstr',starstr);
	}

	window.starScore = function(score){
		this.score = score || '';
		this.getStars = _getStars;
	}

})();