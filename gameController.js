import { Players } from "./gameObjects.js";

const boardContainer = document.getElementById('boards-container')
const gameBoardUI = document.getElementById('board')
const gameBoardUIComputer = document.getElementById('computer-board')
const randomizeShipBtn = document.getElementById('randomize')
const startGameBtn = document.getElementById('start');
const body = document.querySelector('body');

const announce = document.createElement('span')

gameBoardUIComputer.classList.add('disableBoard');

let player = new Players('player')
const computer = new Players('computer');

player.addShips();
computer.addShips();

const computerAttackedCoordiate = [];

function attackCoordinates(){
    let notUnique = true; 
    let startPointX = (Math.floor(Math.random() * 10))
    let startPointY = (Math.floor(Math.random() * 10))
    let points = [startPointX, startPointY];

    if(computerAttackedCoordiate.length > 0){
        //prevents producing the same starting point twice
        while(notUnique){
            startPointX = (Math.floor(Math.random() * 10))
            startPointY = (Math.floor(Math.random() * 10))
            points = [startPointX, startPointY];
            let count = 0;
            for(let i = 0; i < computerAttackedCoordiate.length; i++){
                count++
                const [x, y] = computerAttackedCoordiate[i];
                if(x === points[0] && y === points[1]){
                    count = 0;
                    console.log('starting point matched an coordinate:');
                    console.log(points);
                    break;
                }
            }
            if(count === computerAttackedCoordiate.length){
                console.log('produced points are unique:');
                console.log(points);
                notUnique = false;
                computerAttackedCoordiate.push(points)
                return points;
            }
        }
    }
    computerAttackedCoordiate.push(points)
    return points;
}

function convertToString(x, y){
    if(x === 0){
        return y.toString();
    }else{
        const arr = [x, y]
        const string = arr.join('')
        return string;
    }
}

function checkWinner(){
    if(player.game.gameOver){
        boardContainer.classList.add('disableBoard');
        console.log('Computer won the game');
        announce.textContent = 'COMPUTER WON THE GAME!';
        body.appendChild(announce);
    }
    if(computer.game.gameOver){
        boardContainer.classList.add('disableBoard');
        console.log('Player won the game');
        gameBoardUIComputer.classList.add('disableBoard');
        announce.textContent = 'YOU WON THE GAME!';
        body.appendChild(announce);
    }
}

function computerAttackAI(){
    while(true){
        const [x, y] = attackCoordinates();
    
        //convert attack coordinate into string
        const string = convertToString(x, y)

        //access gameboard div with the converted coordinate
        const playerBoard = gameBoardUI.children[`${string}`]
        if(player.game.recieveAttack(x, y)){
            Object.assign(playerBoard.style, {
                backgroundColor: 'rgb(255, 120, 120)',
                border: '2px dashed rgb(255, 96, 96)',
            });
            checkWinner();
            continue;
        }else{
            const p = document.createElement('p');
            p.textContent = '*';
            p.classList.add('missedStyle');
            playerBoard.appendChild(p);
            break;
            checkWinner();
        }
    }
    gameBoardUIComputer.classList.remove('disableBoard');

}

function getDivCoordinate(number){
    if(number < 10){
        return [0, Number(number)]
    }else{
        const arr = number.split('');
        let [x, y] = arr;
        return [Number(x), Number(y)]
    }
}

function renderShip(index1, index2){
    const shipsLocations = player.game.shipCoordinates;

    for(let i = 0; i < shipsLocations.length; i++){
        const [x, y] = shipsLocations[i];
        if(index1 === x && index2 === y){
            return true;
        }
    }
}

function createPlayerBoard(){
    for(let i = 0; i < 100; i++){
        const div = document.createElement('div');
        div.id = i
        div.classList.add("divStyle");
        getDivCoordinate(div.id)
        const [x, y] = getDivCoordinate(div.id);
        
        //display ship on the board
        if(renderShip(x, y)){
            Object.assign(div.style, {
                 backgroundColor: 'rgb(148, 168, 236)',
                 border: '1px dashed rgb(100, 136, 255)'
            })
        }
        gameBoardUI.append(div)
    }
}

function createComputerBoard(){
    for(let i = 0; i < 100; i++){
        const div = document.createElement('div');
        div.id = i
        div.classList.add("divStyle");
        getDivCoordinate(div.id)
        const [x, y] = getDivCoordinate(div.id);
        
        div.addEventListener('click', () => {
            div.style.pointerEvents = "none";
            console.log(div.id);

            //attacked color hit and miss
            if(computer.game.recieveAttack(x, y)){
                Object.assign(div.style, {
                backgroundColor: 'rgb(255, 120, 120)',
                border: '2px dashed rgb(255, 96, 96)',
            });
                checkWinner();
            }else{
                const p = document.createElement('p');
                p.textContent = '*';
                p.classList.add('missedStyle');
                div.appendChild(p);

                //disable board when its computers turn
                gameBoardUIComputer.classList.add('disableBoard');
                
                //computer attack
                setTimeout(function() {
                    computerAttackAI();
                }, 500);
            }

        })
        gameBoardUIComputer.append(div)
    }
}

createPlayerBoard();
createComputerBoard();

randomizeShipBtn.addEventListener('click', () => {
    while(gameBoardUI.firstChild){
        gameBoardUI.removeChild(gameBoardUI.firstChild);
    }
    player = new Players('player')
    player.addShips();
    createPlayerBoard();
})

startGameBtn.addEventListener('click', () => {
    gameBoardUIComputer.classList.remove('disableBoard');
    randomizeShipBtn.remove();
    startGameBtn.remove();
})
