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

	$completedSlots = [];
	$twoActiveSlots = [];

	function matchContent(pic1, pic2) {
		$pic1 = pic1;
		$pic2 = pic2;
		if ( $pic1 == $pic2 ) {
			return true;
		}
	}

	// ==== Compare values END ==== !!!!!!!

	// ==== logic END ==== !!!!!!!! 


	// =========================================================

	// ==== effects ====

	$('.victory-page').hide();
	$('#start-button').click(function() {
		
		$('.content').hide();
		startAndShuffleGame();

		$('.square').click(function(){

			var activeSlot = $(this).find('img').attr('alt');
			
			$('.finished').show();
			
			$(this).find('.content').addClass('selected finished');
			
			$(this).find('.content').show();
			
			
			if ($twoActiveSlots.length == 0) {
				
				$twoActiveSlots.push(activeSlot);
				
			}else if ($twoActiveSlots.length == 1) {
				
				$twoActiveSlots.push(activeSlot);

				if ( matchContent($twoActiveSlots[0], $twoActiveSlots[1]) ) {
						
						$completedSlots = $completedSlots.concat($twoActiveSlots);
						$('.selected').removeClass('selected');
						$twoActiveSlots = [];
				
				}else {
					
					$('.selected').delay(600).fadeOut(300);
					$('.selected').removeClass('selected finished');
					$twoActiveSlots = [];
				
				}
			}else {
				
				$twoActiveSlots = [];
				console.log("something went wrong :(");
			
			}
			if ($completedSlots.length == squares.length) {
				$('.victory-page').delay(700).fadeIn(700);
			}
		});
	});

	$('.victory-page').click(function() {
		$('.victory-page').hide();	
	});

});