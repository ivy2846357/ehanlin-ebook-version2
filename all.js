// Sample using dynamic pages with turn.js

var numberOfPages = 28;
let pageNumber = Number(1);

// Adds the pages that the book will need
function addPage(page, book) {
	// 	First check if the page is already in the book
	if (!book.turn('hasPage', page)) {
		// Create an element for this page
		var element = $('<div />', {
			'class': 'page ' + ((page % 2 == 0) ? 'odd' : 'even'),
			'id': 'page-' + page
		}).html('<i class="loader"></i>');
		// If not then add the page
		book.turn('addPage', element, page);
		// Let's assum that the data is comming from the server and the request takes 1s.
		setTimeout(function () {
			element.html(`<div class="data"><div class="page-link"><img class="book-page" src="./img/teams-paper-${page}.png"></div></div>`);
		}, 1000);
	}
}

$(window).ready(function () {
	$('#book').turn({
		acceleration: true,
		pages: numberOfPages,
		elevation: 50,
		gradients: !$.isTouch,
		when: {
			turning: function (e, page, view) {

				// Gets the range of pages that the book needs right now
				var range = $(this).turn('range', page);

				// Check if each page is within the book
				for (page = range[0]; page <= range[1]; page++)
					addPage(page, $(this));

			},

			turned: function (e, page) {
				// $('#page-number').val(page);
				let pageNumber = page
			}
		}
	});

	$('#page-number').keydown(function (e) {

		if (e.keyCode == 13)
			// $('#book').turn('page', $('#page-number').val());
			$('#book').turn('page', pageNumber);

	});
});

$('.page-prev').click(function () {
	$('#book').turn('previous');
});
$('.page-next').click(function () {
	$('#book').turn('next');
});

$(window).resize(function () {
	if ($(window).height() > 1070) {
		// 全螢幕視窗設定
		$('#book').turn('display', 'double');
		$('#book').turn('size', 1400, 988);
	} else if ($(window).width() > 1200 && $(window).height() < 1070) {
		// 電腦版視窗設定
		$('#book').turn('display', 'double');
		$('#book').turn('size', 1110, 784);
	} else if ($(window).width() < 1200 && $(window).width() > 600) {
		// 平板視窗設定
		$('#book').turn('display', 'single');
		$('#book').turn('size', 500, 705);
	} else if ($(window).width() < 600) {
		// 手機版視窗設定
		$('#book').turn('display', 'single');
		$('#book').turn('size', 300, 424);
	}

	if (!checkFull()) {
		// isclick 為 true 表示為全螢幕狀態，false 為離開全螢幕的狀態
		if (!isclick) {
			// console.log('按下 esc 退出全螢幕')
		} else {
			// 全螢幕按下 esc 要執行的動作
			$('.flipbook').toggleClass('full-screen');
			$('#quit-fullscr').toggle();
			$('#fullscr').toggle();
			$('.e-book').css('background-image', 'none');
		}
	}
})

// 監聽是否進入全螢幕
let isclick;
document.addEventListener('fullscreenchange', function () {
	// console.log('切换模式了');
	isclick == false ? isclick = true : isclick = true;
});
// 監聽是否有按下 esc
function checkFull() {
	var isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (isFull == undefined) isFull = false;
	return isFull;
}

// 全螢幕設定
let eBook = document.querySelector('.e-book');

// 點擊進入全螢幕
$('#fullscr').click(function () {
	$('.flipbook').toggleClass('full-screen');
	$('#quit-fullscr').toggle();
	$('#fullscr').toggle();
	$('.e-book').css('background-image', 'radial-gradient(#537895 0%, #09203f 100%)');
	eBook.requestFullscreen();
});

// 點擊離開全螢幕(問題：點擊後書出不來)
$('#quit-fullscr').click(function () {
	$('.flipbook').toggleClass('full-screen');
	$('#quit-fullscr').toggle();
	$('#fullscr').toggle();
	$('.e-book').css('background-image', 'none');
	document.exitFullscreen();
});