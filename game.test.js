import { Ship, forTesting, Gameboard} from "./gameObjects";

const ship = new Ship(5);
ship.hits()
ship.hits()
ship.hits()
ship.hits()
const board = new Gameboard();

test('hit should be 5', () => {
    expect(ship.hits()).toBe(5);
})

test('ship should sunk', () => {
    expect(ship.isSunk()).toBe(true);
});

test('should be 1', () => {
    expect(board.placeShip()).toBe();
})