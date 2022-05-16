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

	$('#number-pages').html(numberOfPages);

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
	if ($(window).width() < 1200 && $(window).width() > 500) {
		$('#book').turn('display', 'single');
		$('#book').turn('size', 500, 705);
	} else if ($(window).width() < 500) {
		$('#book').turn('size', 300, 424);
	} else {
		$('#book').turn('display', 'double');
		$('#book').turn('size', 1110, 784);
	}
})

// 全螢幕設定
let fullscreen;
let eBook = document.querySelector('.e-book');
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
	e.preventDefault();
	$('.flipbook').toggleClass('full-screen');
	if (!fullscreen) {
		fullscreen = true;
		eBook.requestFullscreen();
		fsEnter.innerHTML = "離開全螢幕";
		$('#book').turn('size', 1300, 800);
	} else {
		fullscreen = false;
		document.exitFullscreen();
		fsEnter.innerHTML = "進入全螢幕";
	}
});