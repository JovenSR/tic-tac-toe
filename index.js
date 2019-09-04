const domVars = (() => {
	const container = document.querySelector('#container');
	const display = document.querySelector('#display');
	const form = document.querySelector('#form');
	const restart = document.querySelector('#restart');
	return {
		container,
		display,
		form,
		restart
	};
})();

const Player = (name, str) => {
	const getName = () => name;
	const string = () => str;
	return {
		getName,
		string
	};
};

const play = (() => {
	const passAlong = {player1: '', player2: ''};

	const formClick = form.addEventListener('submit', (e) => {
		const player1 = Player(e.target.player1.value, 'X');
		const player2 = Player(e.target.player2.value, 'O');
		e.preventDefault();
		form.style.display = 'none';
		restart.style.display = 'block';
		gameBoard(player1.getName(), player2.getName());
		passAlong.player1 = player1.getName();
		passAlong.player2 = player2.getName();
	});

	restart.addEventListener('click', (e) => {
		const player1 = passAlong.player1;
		const player2 = passAlong.player2;
		console.log('player 1', player1);
		console.log('player2', player2);
		e.preventDefault();
		display.innerHTML = '';
		display.classList.remove('noClick');
		game.flag = 'Player 1';
		gameBoard(player1, player2);
	});
})();

const gameBoard = ((player1, player2) => {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const createGrid = arr.forEach(function(item) {
		let div = document.createElement('div');
		div.classList.add('displayDiv');
		div.setAttribute('id', arr.indexOf(item));
		div.addEventListener('click', (e) => {
			if(game.flag == 'Player 1' && div.innerHTML == '') {
				arr[div.id] = 'X';
				div.innerHTML = arr[div.id];
				game.flag = 'Player 2';
				game.checkWinner(arr, player1, player2);
			} else if(game.flag == 'Player 2' && div.innerHTML == '') {
				arr[div.id] = 'O';
				div.innerHTML = arr[div.id];
				game.flag = 'Player 1';
				game.checkWinner(arr, player1, player2);
			} else {
				return;
			}
		});
		display.append(div)
	});
	return {
		arr
	}
});

const game = (() => {
	const flag = 'Player 1';

	function allX(element, index, array) {
		return element == 'X';
	}
	function allO(element, index, arry) {
		return element == 'O';
	}
	function isTie(element, index, array) {
		return isNaN(element);
	}

	const checkWinner = (arr, player1, player2) => {
		const a = [arr[0], arr[1], arr[2]];
		const b = [arr[3], arr[4], arr[5]];
		const c = [arr[6], arr[7], arr[8]];
		const d = [arr[0], arr[3], arr[6]];
		const e = [arr[1], arr[4], arr[7]];
		const f = [arr[2], arr[5], arr[8]];
		const g = [arr[0], arr[4], arr[8]];
		const h = [arr[2], arr[4], arr[6]];

		if(a.every(allX) || b.every(allX) || c.every(allX) || d.every(allX) || e.every(allX) || f.every(allX) || g.every(allX) || h.every(allX)) {
			alert(player1 + ' wins!');
			display.classList.add('noClick');
		} else if(a.every(allO) || b.every(allO) || c.every(allO) || d.every(allO) || e.every(allO) || f.every(allO) || g.every(allO) || h.every(allO)) {
			alert(player2 + ' wins!');
			display.classList.add('noClick');
		} else if(arr.every(isTie)){
			alert('Game is a Tie!')
		} else {
			return;
		}
	}
	return {
		flag,
		checkWinner
	}
})();


