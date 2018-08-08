var changeQueue = (function() {
	var list = [];

	return {
		//항목을 추가한다.
		enqueue: function(c) {
			list.push(c);
		},

		//제일먼저 들어간 항목 1개를 제거한다. 제거된놈이 리턴된다.
		dequeue: function() {
			return list.shift();
		},

		//리스트의 갯수가 0인지 확인.
		isEmpty: function() {
			return list.length === 0;
		}
	}
})();