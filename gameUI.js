import { Players } from "./gameObjects.js";

const gameBoardUI = document.getElementById('board')
const gameBoardUIComputer = document.getElementById('computer-board')

const player = new Players('player')
player.addShips();
const computer = new Players('computer')
computer.addShips();

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
        
        div.addEventListener('click', () => {
            div.style.pointerEvents = "none";
            console.log(div.id);

            //attacked color hit and miss
            if(player.game.recieveAttack(x, y)){
                div.classList.add('hitStyle');
            }else{
                const p = document.createElement('p');
                p.textContent = '*';
                p.classList.add('missedStyle');
                div.appendChild(p);
            }

            
        })
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
        
        //display ship on the board
        // if(renderShip(x, y)){
        //     div.classList.add("divShipStyle");
        // }
        
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
            }

            //disable board if the game is over
            if(computer.game.gameOver){
                gameBoardUIComputer.style.pointerEvents = "none";
            }
        })
        gameBoardUIComputer.append(div)
    }
}

createPlayerBoard();
createComputerBoard();