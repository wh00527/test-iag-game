# ForeverK dungeon player simulator

Refer to `PROBLEM.md`

## Getting Started

```
npm start
```
OR
```
docker build -t k-game .
docker run -it k-game /bin/bash
```
### Design consideraions
Contains 3 main components: player.js, action.js and board.js.
`player.js` - stateful, hold coordinate,direction,health and score, listening to command parsed in from stdin.
`action.js` - stateless, receive coordinate and direction from player.js and perform actions accordingly.
`board.js` - contain boundaries of the board.

`index.js` reads from stdin and pass command along to player, start http server with port 8080.

### Prerequisites
Running locally
* node
* npm

Running in docker
* docker(version > 18.01)

### Installing

```npm install```

## Running the tests

```npm test```
```npm run test:coverage```

## Game commands:
* start a new game or restart whole game: from the prompt type `START,NORTH(Any directions)`
* Player's default direction is NORTH
* Change direction, simply type `EAST` or `WEST`
* Make move, type `MOVE`
* Need help, from prompt type: `HELP`
* Each step game console will show player health, score, and which room he/she step in
* Game will be over if player's health is less than 1, then console will show the scores.
* To reset board's width and height, change value from .env files under root path.The default ones are `width=50 & height=50`.
* Quit game, type `EXIT`