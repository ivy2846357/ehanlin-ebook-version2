/* ------------------- turn.js 基本樣式、初始化設定 ------------------- */

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

	// 初始化檢查網站寬度
	changeWebsiteBook();

	// 預設取消前一頁按鈕的透明度
	$('.page-prev').css('opacity', '.3').removeClass('peag-btn-hover');
	$('.peag-btn.page-prev').css('cursor', 'auto');
});

/* ------------------- 翻頁功能 ------------------- */

// 點擊回到上一頁
$('.page-prev').click(function () {
	$('#book').turn('previous');
	// 設定按鈕透明度
	if ($('#book').turn('page') == 1) {
		$('.page-prev').css('opacity', '.3').removeClass('peag-btn-hover');
		$('.peag-btn.page-prev').css('cursor', 'auto');
	} else if ($('#book').turn('page') < 28) {
		$('.page-next').css('opacity', '1').addClass('peag-btn-hover');
		$('.peag-btn.page-next').css('cursor', 'pointer');
	} else {
		$('.page-prev').css('opacity', '1').addClass('peag-btn-hover');
		$('.peag-btn.page-prev').css('cursor', 'pointer');
	}
});

// 點擊進入下一頁
$('.page-next').click(function () {
	$('#book').turn('next');
	// 設定按鈕透明度
	if ($('#book').turn('page') == 28) {
		$('.page-next').css('opacity', '.3').removeClass('peag-btn-hover');
		$('.peag-btn.page-next').css('cursor', 'auto');
	} else if ($('#book').turn('page') > 1) {
		$('.page-prev').css('opacity', '1').addClass('peag-btn-hover');
		$('.peag-btn.page-prev').css('cursor', 'pointer');
	} else {
		$('.page-next').css('opacity', '1').addClass('peag-btn-hover');
		$('.peag-btn.page-next').css('cursor', 'pointer');
	}
});

/* ------------------- 滿版 RWD 功能 ------------------- */

$(window).resize(function () {

	if($('body').hasClass('book-full-active')){
		changeBookSize();
	}else{
		changeWebsiteBook();
	}
});

// 調整書本至滿版
$('#expand-book-btn').click(function(){
	// 書本狀態
	$('body').addClass('book-full-active'); // 檢查滿版狀態
	$('.flipbook').addClass('full-screen', 'flipbook-fullpage'); // 新增滿版樣式
	$('.e-book').css('background-image', 'radial-gradient(#537895 0%, #09203f 100%)').addClass('e-book-fullpage');
	// 按鈕顯示、隱藏
	$('#quit-fullscr').show();
	$('#fullscr-btn').show();
	$('#expand-book-btn').hide();
	// 翻頁按鈕樣式更換
	$('.peag-btn').addClass('peag-btn-fullscr');
	$('.page-prev').css('background-image', 'url("./img/arrow-white-left.svg")');
	$('.page-next').css('background-image', 'url("./img/arrow-white-right.svg")');

	changeBookSize();
})

/* ------------------- 全螢幕設定 ------------------- */

let eBook = document.querySelector('.e-book');

// 點擊進入全螢幕
$('#fullscr-btn').click(function () {
	$('body').addClass('book-fullsrc-active')
	$('#fullscr-btn').hide();
	eBook.requestFullscreen();
	changeWebsiteBook();
});

// 點擊移除滿版樣式
$('#quit-fullscr').click(function () {
	if($('body').hasClass('book-full-active')){
		// alert('quit fullpage')
		// 移除滿版樣式
		removeFullCSS();
	}
});

// 監聽是否為全螢幕
document.addEventListener("fullscreenchange", function (event) {

	// 監聽是否有按下 esc
	function checkFull() {
		let isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
		if (isFull == undefined) isFull = false;
		return isFull;
	}

	if (document.fullscreenElement !== null) {
		// console.log('進入全螢幕');
	} else {
		// console.log('離開全螢幕');

		// 監聽是否進入全螢幕
		let isclick;
		document.addEventListener('fullscreenchange', function () {
			console.log('切换模式了');
			isclick == false ? isclick = true : isclick = true;
		});

		if (!checkFull()) {
			if (!isclick) {
				// 離開全螢幕
				// alert('quit fullscr')
				removeFullCSS();
			} else {
				return
			}
		}
	}

});

/* ------------------- 共用函式整理 ------------------- */

// 書本大小設定
// （滿版）書本大小設置
function changeBookSize(){
	if ($(window).width() > 1500 && $(window).height() > 1070) {
		// 全螢幕視窗設定
		$('#book').turn('display', 'double');
		$('#book').turn('size', 1400, 988);
		$('#book').turn('resize');
	} else if ($(window).width() < 1500 && $(window).width() > 1300) {
		// 電腦版視窗設定
		$('#book').turn('display', 'double');
		$('#book').turn('size', 1200, 853);
		$('#book').turn('resize');
	} else if ($(window).width() < 1300 && $(window).width() > 768) {
		// 平板視窗設定
		$('#book').turn('display', 'single');
		$('#book').turn('size', 710, 1000);
		$('#book').turn('resize');
	} else if ($(window).width() < 768) {
		// 手機版視窗設定
		$('#book').turn('display', 'single');
		$('#book').turn('size',$(window).width(), $(window).height());
		$('#book').turn('resize');
	}
}

// （網頁）書本大小設置
function changeWebsiteBook(){
	if ($(window).width() > 992) {
		$('#book').turn('display', 'double');
		$('#book').turn('size', 700, 500);
		$('#book').turn('resize');
	} else {
		$('#book').turn('display', 'single');
		$('#book').turn('size', 400 , 600);
		$('#book').turn('resize');
	}
}

// 移除滿版樣式及改變書本大小
function removeFullCSS(){
	// 書本狀態
	$('body').removeClass('book-full-active'); // 檢查滿版狀態
	$('.flipbook').removeClass('full-screen'); // 移除滿版樣式
	$('.e-book').css('background-image', 'none').removeClass('e-book-fullpage');
	// 按鈕顯示、隱藏
	$('#quit-fullscr').hide();
	$('#fullscr-btn').hide();
	$('#expand-book-btn').show();
	// 翻頁按鈕樣式更換
	$('.peag-btn').removeClass('peag-btn-fullscr');
	$('.page-prev').css('background-image', 'url("./img/arrow-left.svg")');
	$('.page-next').css('background-image', 'url("./img/arrow-right.svg")');
	// 調整書本大小
	changeWebsiteBook();
}