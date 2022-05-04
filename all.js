	// Sample using dynamic pages with turn.js

	var numberOfPages = 28; 
	let pageNumber = Number(1);

	// Adds the pages that the book will need
	function addPage(page, book) {
		// 	First check if the page is already in the book
		if (!book.turn('hasPage', page)) {
			// Create an element for this page
			var element = $('<div />', {'class': 'page '+((page%2==0) ? 'odd' : 'even'), 'id': 'page-'+page}).html('<i class="loader"></i>');
			// If not then add the page
			book.turn('addPage', element, page);
			// Let's assum that the data is comming from the server and the request takes 1s.
			setTimeout(function(){
					element.html(`<div class="data"><a href="javascript:;" class="page-link"><img class="book-page" src="./img/teams-paper-${page}.png"></a></div>`);
			}, 1000);
		}
	}

	$(window).ready(function(){
		$('#book').turn({acceleration: true,
							pages: numberOfPages,
							elevation: 50,
							gradients: !$.isTouch,
							when: {
								turning: function(e, page, view) {

									// Gets the range of pages that the book needs right now
									var range = $(this).turn('range', page);

									// Check if each page is within the book
									for (page = range[0]; page<=range[1]; page++) 
										addPage(page, $(this));

								},

								turned: function(e, page) {
									// $('#page-number').val(page);
									let pageNumber = page
								}
							}
						});

		$('#number-pages').html(numberOfPages);

		$('#page-number').keydown(function(e){

			if (e.keyCode==13)
				// $('#book').turn('page', $('#page-number').val());
				$('#book').turn('page', pageNumber);
				
		});
	});

	$(window).bind('keydown', function(e){

		if (e.target && e.target.tagName.toLowerCase()!='input')
			if (e.keyCode==37)
				$('#book').turn('previous');
			else if (e.keyCode==39)
				$('#book').turn('next');

	});

	$('.page-prev').click(function(){
		if(pageNumber <= 1){
			console.log('stop')
		}else{
			pageNumber -= 2
			$('#book').turn('page', pageNumber);
		}
	});
	$('.page-next').click(function(){
		let currentPage = Number($('#page-number').val());
		if(currentPage > 100){
			console.log('stop')
		}else{
			pageNumber += 2
			$('#book').turn('page', pageNumber);
		}
	});