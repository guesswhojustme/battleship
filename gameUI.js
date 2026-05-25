const gameBoardUI = document.getElementById('board')
const gameBoardUIComputer = document.getElementById('computer-board')

function getDivCoordinate(number){
    if(number < 10){
        return [0, Number(number)]
    }else{
        const arr = number.split('');
        let [x, y] = arr;
        return [Number(x), Number(y)]
    }
}

function renderShip(index1, index2, player){
    const shipsLocations = player.game.shipCoordinates;

    for(let i = 0; i < shipsLocations.length; i++){
        const [x, y] = shipsLocations[i];
        if(index1 === x && index2 === y){
            return true;
        }
    }
}

export function createPlayerBoard(player){
    player.addShips();
    for(let i = 0; i < 100; i++){
        const div = document.createElement('div');
        div.id = i
        div.classList.add("divStyle");
        getDivCoordinate(div.id)
        const [x, y] = getDivCoordinate(div.id);
        
        //display ship on the board
        if(renderShip(x, y, player)){
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

            //disable board if the game is over
            if(player.game.gameOver){
                gameBoardUI.style.pointerEvents = "none";
            }
        })
        gameBoardUI.append(div)
    }
}

export function createComputerBoard(computer){
    computer.addShips();
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