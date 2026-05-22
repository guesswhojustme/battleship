const gameBoardUI = document.getElementById('board')

function getCoordinate(number){
    if(number < 10){
        return [0, Number(number)]
    }else{
        const arr = number.split('');
        let [x, y] = arr;
        return [Number(x), Number(y)]
    }
}

function createBoard(){
    for(let i = 0; i < 100; i++){
        const div = document.createElement('div');
        div.addEventListener('click', () => {
            div.style.pointerEvents = "none";
            div.id = i
            console.log(div.id);
            console.log(getCoordinate(div.id));
        })
        gameBoardUI.append(div)
    }
}

createBoard();