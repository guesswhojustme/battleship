# battleship
battleship project

spent almost 2weeks creating this project.

figuring out how to put a ship on the board randomly without
any collision, out of boundary and with atleast 1 gap of each 
other was the fun and hardest part.  

but overall I enjoyed making this and very statisfied of it,
because 100% of the code logic came from me. 

rules of the game:
there are total of 10 ships on each board (player and computer)
1 with 4grid length, 2 with 3grid length, 3 with 2grid length and 
4 with 1grid length (look at your board for reference). All of them 
are placed randomly on the board. the goal is attack the opponent's 
board and hit all of the ship by guessing where it is. who ever 
hits all of them first, wins the game. once the game is over just 
refresh the page to restart again.

live: https://guesswhojustme.github.io/battleship/


dont mind the thought process part below, becaues you probably wont be able to understand it anyway. 
I just want to add my thought process, problem encountered and how i solved them in here.

thought process: 

how to game works:
	-guessing game.
	-uses grid (10 x 10).
	-players take turns.
	-you have to hit all players ships to win.
	-before the game starts, players can place their ships to a specific coordinate or can be randomize. 
	-cannot shoot the same coordinate twice. 
	-the fleets are concealed from players.
game flow: 
	1. game start, should display the gameboard with ships.
game is going to revolve around:
	 -ships:
		 -~~have length (based on how many grid they occupy).~~
		 -can be placed horizontally and vertically.
		 ~~-each ships should have a count on how many times its been hit.~~
		 -they sink. for example: 
			 if they occupy 2 squares in the grid (a1, b1), and all of its coordinate or length has been hit, they sink. 
		-ships should only occupy any given square in the grid
		-ships cannot be placed diagonally. only horizontal and vertical
	 -gameboard:
		 - ~~10 x 10 board~~ 
		 - it needs to know that a specific coordinate has been attacked or shot.
		 - some coordinates contains ships. And needs to keep on track of where the ships is located. 
		 - generates ships on the board. 
		 - once a specific coordinate have been shot, it cannot be shot anymore. 
		 - should be able to tell if all the ship have been shot (winning game). 
		 - should have 10 ships inside the board. 
		 - ships should only occupy any given square in the grid
		 - ships cannot be placed diagonally. only horizontal and vertical
		 - ships produce fixed length not random: 
			 4 1grid length, 3 2grid length, 2 3grid length and 1 4grid length
	 -players:
		 - have its own gameboard. 
		 - two players (real players and computer). 
user interfaces: 
	-the gameboard UI functionalities: 
		-clickEvent: 
			-when a grid is clicked, the coordinate should be read on the gameboard object.
		-disable some clicked grid. 
		-should display the shot ships. 
		-renders the the gameboard object with new information.
		
interaction between the user interface and game logic: 
	- get UI div coordinate and read it with the gameboard object to read its attack.  
	-
development process:
	files/working directory:

The goal:
	is to make the game logic work for now: 
		-gameboard obj functionality. almost 
		-ship obj functionality. done
		-player obj functionality.
	is to keep the game working. 
		display gameboard with predetermined ships on the board. 
		to shot and render gameboard.
		computer player should be working (can shoot)
		display winner. 
		
adding a ship on the board:
	. produce a starting point coordinate x and y where x represents the row and y is the column. 
	 . start from that produced coordinate, place the ship and increment based on the ship length. 
	or

Problems encountered {
~~out of bounds problem:~~
 what causes out of bounds?:
	 . if starting point axis value + ship length exceeds to 9
 howd i solved it?: 
	. by subtract starting point axis by the ship length. 
	. and start there as a new starting point. 
  possible problem with this solution: 
	 . might produce a collision.
  possible solution for the problem:
	. **instead of starting a new point value by subtracting starting point axis by the ship length when out of bounds, produce a new starting point value instead. and when adding a ship based on length if it collided with an occupied coordinate, produce a new starting point again.** 
	 pseudocode: 
~~collision problem~~: 
 what causes the collision? 
	~~1. if starting point produces the same value more than twice~~
	2. ship coordinate length collides with a coordinate that is already occupied
 how to fix: 
	for problem 1.:
		. keep track of the produced starting points value?
		. maybe not generate a random starting points?
		. or maybe the whole logic of adding a ship on the board is wrong?
		. **keep track of the all occupied coordinates?**: 
			 . before producing a starting point loop through all the occupied coordinate. 
			 . if a coordinates matches the produced starting point value, produce again. 
			 pseudocode:
				. declare a variable called notUnique = true
				. run a while loop, inside it get the produce start points
				. for loop through the tracked ship coordinates.
				. if start point matches a ship coordinate, break the for loop
				. else, stop the while loop. notUnique = false 
	for problem 2:  
		. when placing a ship, input the adjacent element/coordinate of it as occupied.
		. use the adjacent element as a gap between the ship
		. for example one ship length coordinate [x=1, y=1]. its adjacent elements are: 
				[x=0, y=0], [x=0, y=1], [x=0, y=2]
				[x=1, y=0], [x=1, y=2]
				[x=2, y=0], [x=2, y=1], [x=2, y=2]
			formula:
				[x-1, y-1], [x-1, y], [x-1, y+1],
				[x, y-1], [x, y+1],
				[x+1, y-1], [x+1, y], [x+1, y+1]
		how?:
			. get valid adjacent element of each ship length coordinate. and push it into an array. 
			 . and populate the board based on that array
			 since we already know the adjacent coordinate of a ship. if a ship length is about to collide with a adjacent coordinate, subtract the length? or subtract the starting point?
			 . **or maybe keep track of all the produced occupied coordinates? and if the starting point generator produces  a matching value, try again.**
		getting the possible adjacent coordinates:
			. declare an array with a possible adjacent formula
			. 
		pseudocode: 
			2. put the ship length coordinate into a queue
			3. run a loop based on queue's length
			4. access index element, and get valid adjacent coordinate
			5. push the valid adjacent element in an array
			6. repeat until the end of queue
~~collision is almost solved, but the problem is some ship is not getting placed in the board:~~ 
	~~possible error:~~
		~~. there is no more possible starting point element to produce, because of the all occupied coordinates. produced adjacent coordinate.~~ 
	 ~~possible solution:~~ 
		 . ~~remove duplicates in All occupied coordinates.~~ 
~~total ships on the board exceeds its limit (10):~~
	possible cause:
		. the collision solution. where maybe it doesnt clean up the previous added ship. 
		. clean up problem.
}

5/20/26. What I accomplished: 
	 - refactored the checkAdjacentElem function where an adjacent coordinate doesnt duplicate.
5/21/26. What I accomplished:
	- solved the collision problem and ship duplication on the board.
	- can now place a ship on the board without any problem (exceeding limit, collision, and out of boundaries). probably need more testing tho just to make sure.
5/22/26. What I accomplished: 
	- placing a ship randomly on the board now works without any problem
	- made the gameboard UI (10 x 10 grid)
	- connected the gameboard UI into the game console logic. 
To continue: 
	~~Gameboard UI:~~
		- ~~should display the placed ship coordinate in the board~~
		- ~~should change the color of a grid when attacked (miss and hit)~~
	~~Finalize Gameboard flow logic:~~
		~~. board becomes unclickable after the game is over~~
		~~. make 2 boards. one for the user, one for the computer.~~ 
		~~. the computer ship should not be visible.

To do now:
	Finish Project:
		Game UI:
			~~. player should not have an event listener~~
			~~. buttons for: 1. restarting the game. 2. randomize player board again.~~ 
			~~. identify computer and player board.~~
			. display winner (after game Logic is finished)
		Game Logic:
			. computer AI - attacking
			. game flow - attacking turns
			. turns state
			. reading game winner state.
		Gameflow UI states:
			- Not yet starting state:
				- disable computer event board
				- user can change their ship placement (randomize)
			- Starting state:
				- change the start button to restart
				- enable computer event board
			- End game state:
				- disable computer board.
				- display winner
1. ~~connecting the game logic with the UI board:~~
	- ~~every click on the UI board / div should produce a coordinate [x, y]~~
		~~how?:~~
			~~- get the div element id~~ 
			~~- if its 1 digit, x = 0 and y = id~~
			~~- if not, get the element id separate the 2 digit number and x = first digit and y = second digit~~
			~~-~~ 
	- ~~get the div coordinate~~
	- ~~use that coordinate for attacking~~
2. ~~finalize gameboard console logic:~~ 
	~~. should read if all ship have sunk~~
	~~. and declare winner~~
3. ~~displaying the placed ship on the gameboard UI:~~
	~~two ways to do this:~~
		~~1. every time a ship is being added and render it to the UI~~
		~~**2. get all the ship coordinate and render it to the UI**~~
			~~pseudocode:~~
				~~. when creating a dive board, loop through all the ship coordinate~~
				~~. deconstruct it based on the what number/index the  createBoard is currently at.~~ 
				~~. if the coordinate matches the current number/index. add style.~~ 

What do we want to do?:
	make the game working. taking turns, computer and player. 
	flow:
		- player attacks computers board -> if hit continue attacking, else disable computer board -> set computer's turn as true -> attack random coordinate in players board -> if hit continue attacking, else -> set player turn as true -> enable computer's board -> repeat from step 1. 
05/25-26/26 What I accomplished:
	made board UI (Player and Computer) and connected with the game console logic

To continue: 
	make the game working. taking turns. player attacking and computer attack. figure out how the code should be and where some certain logic should be (different module and etc)

To do for now: 
	~~attacking turns and its UI states.~~ 
		how it works:
			if player's attacked computer's board, disable computer board 
			 and switch the turn to computer and attack player board. 
	~~read game winner:~~
	~~make the randomize ship button working.~~ 
		how?:
			remove the current divs inside the board- using while loop
			replace it with new one- calling the player instance, addShip method and createBoard function again. 
	
computer AI Attack algorithm:
	~~should produce random coordinates~~
	~~should keep on track of produced coordinates~~
	~~convert the produced coordinates into 1 string for id access of the player board for attacking~~	
	should attack again if hit
		how?:
			run a while loop inside the function and stops when 
	problem encountered:
		computer AI attacks the same coordinate.
			cause:
				if the produced same element is in the last index of the stored coordinate for checking, it bypasses the count length stopper, since it counts until up to the very last index. 
			solution:
				reset the count length stopper to 0 if produced the same value.


to improve once the game is done:
make computer AI smarter:
	hit adjacent top/bottom and left/right coordinate when hit a ship.
refactor some code. 
