function checkInput(x) {
	if (isNaN(x) || parseInt(x) % 2 != 0) {
		$('#banner').text("Enter a positive even number");
		return false
	}
	return true;
}

function getCardNum() {
	return $("input[name='numCards']").val();
}

function drawBoard(numCards) {
	const rows = calcNumRows(numCards)
	const cols = numCards / rows;
	$('#gameBoard').remove();
	$('.checks').text('0');
	$('#banner').text("Select two Cards to Start");
	let gameBoard = $("<div id='gameBoard'></div>");
	for (let r = 0; r < rows; r++) {
		gameBoard.append(drawRow(r, cols));
	}
	$('body').append(gameBoard);
	resizeBoard();
	$(window).resize(() => resizeBoard());
}

function drawRow(rowNum, cols) {
	let row = $("<div class='row'></div>");
	for (let c = 0; c < cols; c++) {
		row.append(drawCard(rowNum * cols + c));
	}
	return row;
}

function drawCard(num) {
	return "<div class='card hidden'>" +
		   "    <div class='card-inner'>" +
		   "        <div class='back'></div>" +
		   "	    <div class='front'></div>" +
		   "	</div>" +
		   "</div>";
}

function calcNumRows(numCards) {
	const mid = parseInt(Math.sqrt(numCards))
	for (let rows = mid; rows > 1; rows--) {
		let cols = numCards / rows;
		if (parseInt(cols) == cols) {
			return rows;
		}
	}
	return 1;
}

function randomizeCards(numCards) {
	const pairs = numCards / 2;
	let cardVals = [];
	for (let i = 1; i <= pairs; i++) {
		cardVals.push(i);
		cardVals.push(i);
	}
	return randomize(cardVals);
}

function randomizeColors(numCards) {
	const pairs = numCards / 2;
	let colors = [];
	for (let i = 0; i < pairs; i++) {
		let color = randomize([94, 242, parseInt(Math.random() * 148 + 94)]);
		colors.push("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
	}
	return colors;

}

function randomize(arr) {
	for (let i = 0; i < arr.length; i++) {
		const rand = parseInt(Math.random() * arr.length);
		const temp = arr[i];
		arr[i] = arr[rand];
		arr[rand] = temp;
	}
	return arr;
}

function incrementCounter() {
	$('.checks').text(parseInt($('.checks').text()) + 1);
}

function isSelected(card) {
	return card.hasClass('selected');
}

function isFound(card) {
	return card.hasClass('found');
}

function selectCard(card) {
	$('.revealed').addClass('hidden').removeClass('revealed');
	card.removeClass('hidden').addClass('selected');
}

function deselectCard(card) {
	card.removeClass('selected').addClass('hidden');
}

function isPairSelected() {
	return $('.selected').length == 2;
}

function revealCards(cardVals, colors) {
	$('.selected').addClass('revealed').removeClass('selected');
	$('.revealed').each(function(){
		revealCard($(this), cardVals, colors);
	});
}

function revealCard(card, cardVals, colors) {
	const front = card.find('.front');
	const cardNum = cardVals[getCardIndex(card)];
	front.append("<div class='cardVal'><p>" + cardNum + '</p></div>');
	front.find('.cardVal').css('background', colors[cardNum - 1]);
	$('.cardVal p').css('font-size', parseInt(front.width() * .8) + 'px');
}

function getCardIndex(card) {
	const parent = card.parent();
	return parent.children().length * parent.index() + card.index();
}

function checkMatch(cardVals) {
	const revealed = $('.revealed');
	if (revealed.length != 2) {
	    return false;
    }
    const firstCard = getCardIndex($(revealed.get(0)));
    const secondCard = getCardIndex($(revealed.get(1)));
    if (cardVals[firstCard] != cardVals[secondCard]) {
    	$('#banner').text("Nice try, remember the cards and try again");
    	return false;
    }
    $('#banner').text("Match!");
	revealed.addClass('found').removeClass('revealed');
    return false;
}

function checkWin() {
	if ($('.hidden').length > 0) {
		return false;
	}
	$('#banner').text("Congratulations, you won!");
	return true;
}

function resizeBoard() {
	const wideScreen = $('body').width() > $('body').height();
	const boardOrientation = wideScreen ? 'column' : 'row';
	const cardsOrientation = wideScreen ? 'row' : 'column';
	$('#gameBoard').css('flex-direction', boardOrientation);
	$('#gameBoard .row').css('flex-direction', cardsOrientation);
	$('.cardVal p').css('font-size', parseInt($('.front').width() * .8) + 'px');
}
