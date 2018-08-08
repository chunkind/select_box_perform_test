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

  // 클릭 이벤트 핸들러
  $('#title').click(function(e) {
    $('#popup').toggle();
  });

  // 데이터로 셀렉트박스 항목 만들기
  for (var i = 0; i < data.length; i++) {
    var elem = createItem(data[i]);
    $('#list').append(elem);
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
