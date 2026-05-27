import { Players } from "./gameObjects.js";

const gameBoardUI = document.getElementById('board')
const gameBoardUIComputer = document.getElementById('computer-board')

const player = new Players('player')
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
        console.log('Computer won the game');
        gameBoardUIComputer.classList.add('disableBoard');
    }
    if(computer.game.gameOver){
        console.log('Player won the game');
        gameBoardUIComputer.classList.add('disableBoard');
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
            });
            continue;
        }else{
            const p = document.createElement('p');
            p.textContent = '*';
            p.classList.add('missedStyle');
            playerBoard.appendChild(p);
            break;
        }
    }

    gameBoardUIComputer.classList.remove('disableBoard');

    checkWinner();
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
            div.classList.add("divShipStyle");
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
                div.classList.add('hitStyle');
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

            //disable board if the game is over
            checkWinner();
        })
        gameBoardUIComputer.append(div)
    }
}

createPlayerBoard();
createComputerBoard();