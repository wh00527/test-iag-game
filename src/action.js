const logger = require('../config/config').logger();
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const movements = [
    { x: 0, y: 1 },     // North
    { x: 1, y: 0 },     // East
    { x: 0, y: -1 },    // South
    { x: -1, y: 0 }     // West
];
const request = require('request-promise');

class Action {

    /**
     * Pass player into a random room.
     * @param {*} coordinate    Current coordinate of the player
     * @param {*} health   Current Player's health
     * @param {*} health   Current Player's health
     * @param {*} score  Current Player's score
     */
    static pass(coordinate,health,score) {
        logger.debug('Start passing room.');    

        console.log(`player health ${health}`);
        console.log(`player scores ${score}`);

        let url = `HTTP://localhost:8080/room/${coordinate.x}/${coordinate.y}'`;    
        return request({
            'method':'GET', 
            'uri': url,
            'json': true
        });    
    }

    /**
     * Move player in the direction it is facing.
     * Validate coordinate before returning.
     * @param {*} coordinate    Current coordinate of the player
     * @param {*} dir           Current direction of the player
     * @param {*} board         The board player is placed on
     * @param {*} health        Current player's health
     * @param {*} score         Current player's score
     */
    static move(coordinate, dir, board,health,score) {
        logger.debug('Moving forward.'); 
        Action.validate(coordinate, board, health, score);
        // delare coorindate and direction
        let direction = directions.findIndex(e => e === dir.toUpperCase()),
            nCoordinate = Object.assign({}, coordinate);        
        nCoordinate.x += Number(movements[direction].x);
        nCoordinate.y += Number(movements[direction].y);
        //generate results
        let result = {};
        result.nCoordinate = nCoordinate;
        result.health = health;
        result.score = score;        
        Action.validate(nCoordinate, board, result.health, result.score);
        result.passingResult = Action.pass(nCoordinate,health,score).then(res =>{
            if(res.out === 0){
                result.health--; 
            }else{
                result.score++;
            }            
            return result;
        });
        return result;
    }

    /**
     * Validate incoming coordinate to make sure if it is valid and within boundary
     * Will throw an error if invalid which will not update the coordinate
     * @param {*} coordinate    Current coordinate of the player
     * @param {*} board         The board player is placed on
     */
    static validate(coordinate, board, health, score) {
        logger.debug('Validating coordinate and board');        
        if (typeof coordinate !== 'object' || !Number.isInteger(coordinate.x)
            || !Number.isInteger(coordinate.y)) {
            throw new Error('INVALID_COORDINATE');
        }

        if (typeof board !== 'object' || !board || !board._width || !board._height) {
            throw new Error('INVALID_BOARD');
        }

        if (coordinate.x >= board._width || coordinate.y >= board._height
            || coordinate.x < 0 || coordinate.y < 0) {
            throw new Error('OUTSIDE_BOARD');
        }

        if(health < 1){
            throw new Error(`Boom! GAME OVER! Your score is ${score}`);
        }
        return coordinate;
    }

    /**
     * Check if coordinate exists, throw an error if not.
     * @param {*} coordinate    Current coordinate of the player
     */
    static report(coordinate) {
        logger.debug('Reporting coordinate and direction.');
        if (!coordinate || Object.keys(coordinate).length < 1) {
            throw new Error('I haven\'t been placed yet :)');
        }
        return coordinate;
    }
}

module.exports = Action;