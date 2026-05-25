import { createComputerBoard, createPlayerBoard } from "./gameUI.js";
import { Players } from "./gameObjects.js";

const player = new Players('player')
const computer = new Players('computer')

function computerAttackAI(){
    let startPointX = (Math.floor(Math.random() * 10))
    let startPointY = (Math.floor(Math.random() * 10))

    return [startPointX, startPointY]
}

createComputerBoard(computer);
createPlayerBoard(player);