const logger = require('../config/config').logger();

class Board {
    constructor(bWidth = 0, bHeight = 0) {
        logger.debug('Board initialised.');
        if (!Number.isInteger(bWidth) || !Number.isInteger(bHeight)) {
            throw new Error('INVALID_BOARD_DIMENSION');
        }
        this._width = bWidth;
        this._height = bHeight;
    }
    room(){
        // random generate inside stuff room -> 0 is monster, 1 is gold
        let dungeon = Math.round(Math.random());
        return dungeon;
    }
}

module.exports = Board;