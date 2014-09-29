$(document).ready(function(){

	// ==== logic ====

	// ==== place values ====

	var content = [															// 10 pics.
									'pic1.png',
									'pic2.png',
									'pic3.png',
									'pic4.png',
									'pic5.png',
									'pic6.png',
									'pic7.png',
									'pic8.png',
									'pic9.png',
									'pic10.png'
								];

	var squares = document.getElementsByClassName('square');		// in this case 20 square slots where content can be placed.
	var takenSlots = [];

	var filledSlotsWithValues;
	
	

	function clearTakenSlots() {
		takenSlots = [];

		for (var i = 0; i < squares.length; i++) {
			takenSlots.push(null);
		};
	}

	function getRandomEmptySlot() {
			
			var result = Math.floor(Math.random() * squares.length);

			while(takenSlots[result] != null) {												// changed indexOF method to simply check if the index value I'm trying to place my content in is Null instead.
				result = Math.floor(Math.random() * squares.length);

			}
			
			return result;
	}

	
	function fillTwoRandomEmptySlots(card) {
		var slot1 = getRandomEmptySlot();
		var slot2 = getRandomEmptySlot();
		while (slot1 == slot2) { 										// THE BUG  was i had no validation so that slot2 NOT could have the same value as slot1 :D...
			var slot2 = getRandomEmptySlot();
		}

		takenSlots[slot1] = card;
		takenSlots[slot2] = card;
	}

	function putFilledSlotsIntoHtml() {
		for (var i = 0; i < squares.length; i++) {
			squares[i]
			.getElementsByClassName('content')[0]
			.innerHTML = "<img src='pics/" + takenSlots[i] + "'" + "alt='" + takenSlots[i] + "'" + "/>";
		};
	}
	
	function startAndShuffleGame() {
		clearTakenSlots();
		
		for (var i = 0; i < content.length; i++) {
			fillTwoRandomEmptySlots(content[i]);
		};

		putFilledSlotsIntoHtml();

	}

	// ==== place values END ==== !!!!!!!

	// ==== Compare values ====

	
	function matchContent(pic1, pic2) {
		
		if ( $(pic1).find('img').first().attr('alt') == $(pic2).find('img').first().attr('alt') &&  
			$(pic1).attr('id') != $(pic2).attr('id') ) {
			return true;
		}
	}

	// ==== Compare values END ==== !!!!!!!

	// ==== logic END ==== !!!!!!!! 


	// =========================================================

	// ==== Interaction & effects ====


	$('#start-button').click(function() {
		

		startAndShuffleGame();

		var completedSlots = [];
		var twoActiveSlots = [];
		var totalClicksCounter = 0;

		$('.content').removeClass('selected finished');
		
		
		$('.content').hide();
		$('.row').fadeOut(2);
		$('.row').fadeIn(800);


		$('.square').on('click', function(){

			var activeSlot = this;
			
			$(completedSlots).show();

			if ( completedSlots.length == squares.length ) {

				$('squares').off('click');

			}	else if ( completedSlots == [] || completedSlots.indexOf(activeSlot) != -1  )  {
				
				$(this).find('.content').removeClass('selected');
				$('squares').off('click');

			}else if (twoActiveSlots.indexOf(activeSlot) == 0) {

				$('squares').off('click');

			} else { 
				
				totalClicksCounter++;
			
				$(this).find('.content').addClass('selected');

				$(this).find('.content').show();
				
				if ( twoActiveSlots.length == 0) { // && not in completedSlots

					$(activeSlot).addClass('finished');
					$(activeSlot).attr('id', 'item1');
					twoActiveSlots.push(activeSlot);

				}else if (twoActiveSlots.length == 1 ) {
					
					$(activeSlot).addClass('finished');
					$(activeSlot).attr('id', 'item2');
					twoActiveSlots.push(activeSlot);

					if ( matchContent(twoActiveSlots[0], twoActiveSlots[1]) && twoActiveSlots.indexOf(activeSlot) != -1) {
							
							$(twoActiveSlots).find('img').addClass('finished');
							completedSlots = completedSlots.concat(twoActiveSlots);
							twoActiveSlots = [];
							$('.content').removeClass('selected');
							$('.content').find('img').attr('id', null);
						
					}else {
						
						$(twoActiveSlots).find('img').removeClass('finished');
						twoActiveSlots = [];
						$('.selected').delay(400).fadeOut(300);
						$('.content').removeClass('selected');
						$(activeSlot).attr('id', null);
						
					}
				}else {
					twoActiveSlots = [];
					console.log("something went wrong :(");
				
				}
				if (completedSlots.length == squares.length) {
					
					$('.totalClicksCounter').text(totalClicksCounter);
					$('.victory-page').delay(600).fadeIn(700);
					twoActiveSlots = [];
				
				}
			}
		});
	});

	$('.victory-page').click(function() {
		$('.victory-page').hide();
	});

});