const domVars = (() => {
    const container = document.querySelector('#container');
    const display = document.querySelector('#display');
    const form = document.querySelector('#form');
    const restart = document.querySelector('#restart');
    const newGame = document.querySelector('#newGame');
    const score = document.querySelector('#score');
    return {
        container,
        display,
        form,
        restart,
        newGame,         
        score
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
        let player1 = Player(e.target.player1.value, 'X');
        let player2 = Player(e.target.player2.value, 'O');
        e.preventDefault();
        form.style.display = 'none';
        restart.style.display = 'block';
        newGame.style.display = 'block';
        score.style.display	= 'block';
        gameBoard(player1.getName(), player2.getName());
        passAlong.player1 = player1.getName();
        passAlong.player2 = player2.getName();
        changePlayer(game.flag, passAlong.player1, passAlong.player2);
    });

    restart.addEventListener('click', (e) => {
        const player1 = passAlong.player1;
        const player2 = passAlong.player2;
        e.preventDefault();
        display.innerHTML = '';
        display.classList.remove('noClick');
        score.innerHTML = '';
        game.flag = 'Player 1';
        gameBoard(player1, player2);
        changePlayer(game.flag, player1, player2);
    });

    newGame.addEventListener('click', (e) => {
        e.preventDefault();
        display.innerHTML = '';
        display.classList.remove('noClick');
        score.innerHTML = '';
        game.flag = 'Player 1';
        form.reset();
        form.style.display = 'block';
        newGame.style.display = 'none';
        restart.style.display = 'none';
        score.style.display = 'none';
    })
    return{
    	passAlong
    }
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
        		changePlayer(game.flag, player1, player2);
                game.checkWinner(arr, player1, player2);
            } else if(game.flag == 'Player 2' && div.innerHTML == '') {
                arr[div.id] = 'O';
                div.innerHTML = arr[div.id];
                game.flag = 'Player 1';
        		changePlayer(game.flag, player1, player2);
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
            score.innerHTML	= player1 + ' wins!';
            display.classList.add('noClick');
        } else if(a.every(allO) || b.every(allO) || c.every(allO) || d.every(allO) || e.every(allO) || f.every(allO) || g.every(allO) || h.every(allO)) {
            score.innerHTML = player2 + ' wins!';
            display.classList.add('noClick');
        } else if(arr.every(isTie)) {
            score.innerHTML = 'Tie Game!';
        } else {
            return;
        }
    }
    return {
        flag,
        checkWinner
    }
})();

const changePlayer = ((flag, player1, player2) => {
	if(flag == 'Player 1') {
		score.innerHTML = player1 + "'s turn";
	} else {
		score.innerHTML = player2 + "'s turn";
	}
});


