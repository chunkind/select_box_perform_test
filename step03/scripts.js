 // 랙을 보기 위한 카운터
var counter = 0;

$(function() {
	// 매 초마다 카운터 갱신
	setInterval(function() {
		counter++;
		$('#counter').html(counter);
	}, 1000);

	// 데이터 생성
	var data = [];

	for (var i = 0; i < 100000; i++) {
		data.push('아이템' + i);
	}

	//클릭 이벤트 핸들러
	$('#title').click(function(e) {
		$('#popup').toggle();
	});

	
	console.time();
	//데이터로 셀렉트박스 항목 만들기
	for(let i=0; i<data.length; i++){
		changeQueue.enqueue({
			execute: function(){
				const elem = createItem(data[i]);
				$('#list').append(elem);
			}
		});
		//new
		requestIdleCallback(processChanges);
	}
	//반복적으로 큐를 체크하여 30개씩 실행
	//old
//	setInterval(function(){
//		for(var i=0; i<30 && !changeQueue.isEmpty(); i++){
//			var c = changeQueue.dequeue();
//			if(c){
//				c.execute();
//			}
//			if(changeQueue.isEmpty()){
//				console.timeEnd();
//			}
//		}
//	},0);
	//new
	function processChanges(deadline){
		while(deadline.timeRemaining() > 0 && !changeQueue.isEmpty()){
			var c = changeQueue.dequeue();
			if(c){
				c.execute();
			}
			if(!changeQueue.isEmpty()){
				requestIdleCallback(processChanges);
			}else{
				console.timeEnd();
			}
		}
	}

});

function createItem(d) {
	var elem = $('<li>' + d + '</li>');
	elem.addClass('item');
	// 아이템 클릭 시 선택되도록 함
	elem.click(function() {
		$('#title').html(d);
		$('#popup').hide();
	});
	return elem;
}