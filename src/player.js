const logger = require('../config/config').logger();
const action = require('./action');

class Player {
    constructor(board) {
        logger.debug('Game initialised.');
        this._coordinate = { x:0 , y:0};
        this._direction = 'NORTH';
        this._board = board || { _width: 50, _height: 50 };
        this._health = 5;
        this._score = 0;
    }

    /**
     * Carry out actions according to commands parsed in.
     * @param {*} command START NORTH,SOUTH,WEST,EAST / MOVE / NORTH / SOUTH / WEST / EAST / HELP / REPORT
     */
    listen(command) {
        const args = command.split(',');                      
        switch (args[0].toUpperCase()) {
            case 'START': {
                const direction = args[1];
                this._coordinate = action.validate({
                    x: 0,
                    y: 0
                }, this._board);                
                this._direction = direction.toUpperCase();
                //each time reset player's status
                this._health = 5;
                this._score = 0;
                logger.debug(`Coordinates: ${JSON.stringify(this._coordinate)}`);
                //console.log(`${this._coordinate.x}, ${this._coordinate.y}, ${this._direction}`); // eslint-disable-line no-console
                break;
            }
            case 'MOVE': {
                let result = action.move(this._coordinate, this._direction, this._board,this._health,this._score);
                this._coordinate = result.nCoordinate;
                result.passingResult.then(res => {
                    this._health = res.health;    
                    this._score = res.score;
                });
                break;
            }
            case 'EAST': {
                this._direction = 'EAST';
                break;
            }
            case 'WEST': {
                this._direction = 'WEST';
                break;
            }
            case 'NORTH': {
                this._direction = 'NORTH';
                break;
            }
            case 'SOUTH': {
                this._direction = 'SOUTH';
                break;
            }
            case 'MAP': {
                action.report(this._coordinate);
                console.log(`${this._coordinate.x}, ${this._coordinate.y}, ${this._direction}`); // eslint-disable-line no-console
                break;
            }
            case 'HELP': {
                console.log('\nHere\'s what I can do!'); // eslint-disable-line no-console
                console.log('\n START <WEST >\n MOVE \n NORTH \n SOUTH \n HELP \n'); // eslint-disable-line no-console
                break;
            }
            default: {
                console.log('Do nothing'); // eslint-disable-line no-console
                break;
            }
        }
    }
}

module.exports = Player;