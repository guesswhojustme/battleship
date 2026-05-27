class Ship{
    constructor(length){
        this.length = length;
    }
    hits = 0;
    hit(){
        this.hits++;
        return this.hits;
    }
    sunk = false
    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        }
        return this.sunk;
    }
}

class Gameboard{
    board = [[0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0]];

    sunkShips = 0;
    gameOver = false;
    recieveAttack(x,y){
        console.log(`attacked [${x}, ${y}]`);
        if(this.board[x][y] === 0 || this.board[x][y] === 1){
            console.log('Missed!');
            this.board[x][y] = '';
            return false;
        }else{
            console.log('Hit!');
            console.log(`there was a ship in: [${x}, ${y}] !`);
            this.board[x][y].hit();
            this.board[x][y].isSunk();
            console.log(this.board[x][y]);
            if(this.board[x][y].sunk === true){
                this.sunkShips++;
            }
            if(this.sunkShips === 10){
                console.log('Game over!');
                this.gameOver = true;
            }
            return true;
        }
        // console.log(this.board);
    }
    
    queue = []
    allOccupiedCoordinates = [];
    shipCoordinates = []
    produceStartPoints(){
        let notUnique = true; 
        let startPointX = (Math.floor(Math.random() * 10))
        let startPointY = (Math.floor(Math.random() * 10))
        let points = [startPointX, startPointY];

        if(this.allOccupiedCoordinates.length > 0){
            //prevents producing the same starting point twice
            while(notUnique){
                startPointX = (Math.floor(Math.random() * 10))
                startPointY = (Math.floor(Math.random() * 10))
                points = [startPointX, startPointY];
                let count = 0;
                for(let i = 0; i < this.allOccupiedCoordinates.length; i++){
                    count++
                    const [x, y] = this.allOccupiedCoordinates[i];
                    if(x === points[0] && y === points[1]){
                        count = 0;
                        // console.log('starting point matched a ship coordinate:');
                        // console.log(points);
                        break;
                    }
                }
                if(count === this.allOccupiedCoordinates.length){
                    // console.log('produced starting point is unique:');
                    // console.log(points);
                    notUnique = false;
                    return points;
                }
            }
        }
        return points;
    }

    placeShip(shipLength){
        const number = (Math.floor(Math.random() * 2))
        const ship = new Ship(shipLength);
        let coordinates = [];  
        let notUnique = true;
        // const shipCoordinates = [];
        //add a ship horizontally
        if(number === 0){
            // console.log('added ship horizontally');

            //runs until there is no collision and out of bounds
            while(notUnique){
                const [startPointX, startPointY] = this.produceStartPoints();
                const addLengthY = startPointY + ship.length
                // console.log(`starting point X val = ${startPointX}`);
                // console.log(`starting point Y val = ${startPointY}`);
                // console.log(`addedLengthY val = ${addLengthY}`);
                
                if(addLengthY > 10){
                    // console.log('went out of bounds');
                    //reruns the loop if out of bounds
                    continue;
                }else{
                    let count = 0;
                    for(let i = startPointY; i < ship.length + startPointY; i++){
                        count++;
                        //no collision
                        if(this.board[startPointX][i] === 0){
                            this.board[startPointX][i] = ship;
                            const arr = [startPointX, i];
                            coordinates.push(arr)
                        //collision
                        }else{
                            // console.log('ship collided');
                            //clean up
                            for(let i = startPointY; i < (count + startPointY) - 1; i++){
                                this.board[startPointX][i] = 0;
                            }
                            coordinates = [];
                            count = 0;
                            break;
                        }
                    }
                    //placing a ship is succesful
                    if(count === shipLength){
                        this.queue.push(coordinates);
                        notUnique = false;
                        break;
                    }
                    //if placing a ship failed, run again.
                    continue;
                    }
                }
        }

        //add a ship vertically
        if(number === 1){
            // console.log('added ship vertically');         
            while(notUnique){
                const [startPointX, startPointY] = this.produceStartPoints();
                const addLengthX = startPointX + ship.length
                // console.log(`starting point X val = ${startPointX}`);
                // console.log(`starting point Y val = ${startPointY}`);
                // console.log(`addedLengthX val = ${addLengthX}`);
                
                if(addLengthX > 10){
                    // console.log('went out of bounds');
                    continue;
                }else{
                    let count = 0;
                    for(let i = startPointX; i < ship.length + startPointX; i++){
                        count++;
                        if(this.board[i][startPointY] === 0){
                            this.board[i][startPointY] = ship;
                            const arr = [i, startPointY];
                            coordinates.push(arr)
                        }else{
                            // console.log('ship collided');
                            for(let i = startPointX; i < (count + startPointX) - 1; i++){
                                this.board[i][startPointY] = 0;
                            }
                            coordinates = [];
                            count = 0;
                            break;
                        }
                    }
                    if(count === shipLength){
                        this.queue.push(coordinates);
                        notUnique = false;
                        break;
                    }
                    continue;
                    }
                }
        }
        
        //add ship coordinate
        for(let i = 0; i < coordinates.length; i++){
            this.shipCoordinates.push(coordinates[i]);
            this.allOccupiedCoordinates.push(coordinates[i]);
        }

        // console.log('queue:');
        // console.log(this.queue);
        // console.log('ship coordinates:');
        // console.log(shipCoordinates);
        this.occupyShipsAdjacentElem(this.queue);
        // console.log('All Occupied coordinates: ');
        // console.log(this.allOccupiedCoordinates);
        this.queue.shift();
    }

    occupyShipsAdjacentElem(queue){
        const adjacentCoordinates = [];
        for(let i = 0; i < queue[0].length; i++){
            const [x, y] = queue[0][i];
            //possible adjacent coordinate formula
            const pac = [[x-1, y-1], [x-1, y], [x-1, y+1],
				    [x, y-1], [x, y+1],
				    [x+1, y-1], [x+1, y], [x+1, y+1]];

            //check valid coordinates
            for(let j = 0; j < pac.length; j++){
                const arr = [];
                for(let k = 0; k < pac[j].length; k++){
                    const elem = pac[j][k];
                    if(elem >= 0 && elem <= 9){
                        arr.push(elem);
                    }
                }

                //populate valid coordinates
                if(arr.length === 2){
                    const [validX, validY] = arr;
                    if(this.board[validX][validY] === 0){
                        this.board[validX][validY] = 1;
                        adjacentCoordinates.push(arr)
                        this.allOccupiedCoordinates.push(arr);
                    }
                }
            }
        }
        // console.log('ships adjacent coordinates: ');
        // console.log(adjacentCoordinates);
    }
    
}

export class Players{
    constructor(name){
        this.name = name;
    }
    game = new Gameboard();
    myTurn = false;
    addShips(){
        const arr = [4,3,3,2,2,2,1,1,1,1];
        for(let i = 0; i < arr.length; i++){
            this.game.placeShip(arr[i])
        }
    }
}


// const p1 = new Players('player 1');
// const p2 = new Players('player 2');

// console.log("this runs");

// p2.game.recieveAttack(0,1);
