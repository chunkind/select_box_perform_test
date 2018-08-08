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
			
			//old
//			execute: function(){
			//new
			execute: function(fragment){
	
				const elem = createItem(data[i]);
				//old
//				document.getElementById('list').appendChild(elem);
				//new
				fragment.appendChild(elem);
			}
		});
		requestIdleCallback(processChanges);
	}
	
	//old
//	function processChanges(deadline){
//		while(deadline.timeRemaining() > 0 && !changeQueue.isEmpty()){
//			var c = changeQueue.dequeue();
//			if(c){
//				requestAnimationFrame(c.execute);
//			}
//			if(!changeQueue.isEmpty()){
//				requestIdleCallback(processChanges);
//			}else{
//				console.timeEnd();
//			}
//		}
//	}
	//new
	function processChanges(deadline) {
		// DocumentFragment 생성
		var fragment = document.createDocumentFragment();
		while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
			var c = changeQueue.dequeue();
			if (c){
				c.execute(fragment);
			}
		}
		requestAnimationFrame(function() {
			// 개별 <li>태그 대신 fragment를 추가
			document.getElementById('list').appendChild(fragment);
		});
		if (!changeQueue.isEmpty()){
			requestIdleCallback(processChanges);
		}else{
			console.timeEnd();
		}
	}
});

function createItem(d) {
	var elem = document.createElement('li');
	elem.textContent = d;
	elem.classList.add('item');
	elem.addEventListener('click', function() {
		$('#title').html(d);
		$('#popup').hide();
	});
	return elem;
}