function startGame() {
	const numCards = getCardNum();
	if (!checkInput(numCards)) {
		return;
	}
	drawBoard(numCards);
	const cardVals = randomizeCards(numCards);
	const colors = randomizeColors(numCards);
	$('.card').click(e => clickCard($(e.target), cardVals, colors));
}

function clickCard(card, cardVals, colors) {
	if (isFound(card)) {
		return
	} else if (isSelected(card)) {
		deselectCard(card);
		return
	} 
	selectCard(card);
	if (isPairSelected()) {
		incrementCounter();
		revealCards(cardVals, colors);
		checkMatch(cardVals);
		checkWin();
	}
}
