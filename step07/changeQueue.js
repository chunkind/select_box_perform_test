//old
//var changeQueue = (function() {
//	var list = [];
//	return {
//		enqueue: function(c) {
//			list.push(c);
//		},
//		dequeue: function() {
//			return list.shift();
//		},
//		isEmpty: function() {
//			return list.length === 0;
//		}
//	}
//})();
var changeQueue = (function() {
	var list = [];
	var index = 0;
	return {
		enqueue: function(c) {
			list.push(c);
		},
		dequeue: function() {
			var o = list[index];
			index++;
			return o;
		},
		isEmpty: function() {
			return list.length - index === 0;
		}
	}
})();