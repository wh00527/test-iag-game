const prompt = require('prompt');
const Player = require('./src/player');
const Board = require('./src/board');
const logger = require('./config/config').logger();
const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();
const width = parseInt(process.env.width); // eslint-disable-line no-undef
const height = parseInt(process.env.height); // eslint-disable-line no-undef


// start http server of getting room
app.get('/room/(:x)/(:y)', (req, res) => {
    try {
        console.log(`you are passing room no.: ${req.params.x} ${req.params.y}`);    
        let response = board.room();
        res.json({out: response}); 
    } catch(err) {
        logger.error(err.message);
        console.error(err.message);
    }    
});

app.use( (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});


/**
 *  Schema for prompt that will handle validation for commands
 */
const schema = {
    properties: {
        cmd: {
            type: 'string',
            pattern: /^\s*(DEBUG|HELP|START,(NORTH|EAST|SOUTH|WEST){1}|MOVE|SOUTH|NORTH|WEST|EAST|MAP|UNDO|EXIT){1}\s*$/i,
            message: 'Invalid command. Type HELP for a list of commands. CTRL-C to exit.',
            required: true,
            before: (input) => { return input.trim(); }
        }
    }
};

const board = new Board(width,height);


// Place player on the board
const game = new Player(board);
prompt.start();
console.log('--- Welcome to the ForeverK Dungeon Simulator ---'); // eslint-disable-line no-console
/**
 * Infinitely prompt for next command until cancelled.
 */
(_prompt = () => { // eslint-disable-line no-undef
    prompt.get(schema, (err, results) => {

        // CTRL-C or user input = exit
        if (results && results.cmd && results.cmd.toUpperCase() === 'EXIT') {
            process.exit(0); // eslint-disable-line no-undef
        } else if (err && err.message && err.message.toUpperCase() === 'CANCELED') {
            console.log(''); // eslint-disable-line no-console
            process.exit(0); // eslint-disable-line no-undef
        } else {
            logger.debug(`Command:  ${results.cmd}`);
            try {
                game.listen(results.cmd);
            } catch (err) {
                logger.error(err.message);
                console.error(err.message);  // eslint-disable-line no-console
            }
        }
        _prompt(); // eslint-disable-line no-undef
    });
})();
