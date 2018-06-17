const Board = require('../src/board');

describe('Constructor', () => {
    it('Should initialise a Board object.', () => {

        const board = new Board();

        expect(typeof board).toBe('object');
    });

    it('Should initialise a Board object.', () => {

        const board = new Board(5, 5);

        expect(typeof board).toBe('object');
        expect(board._height).toBe(5);
        expect(board._width).toBe(5);
    });

    it('Should throw an error if inputs are not numbers.', () => {
        try {
            new Board('Hello', 'World');
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('INVALID_BOARD_DIMENSION');
        }
    });

    it('It should return a interger.', () => {

        const board = new Board(5, 5);
        const room = board.room();
        console.log(room);
                
        expect(Number.isInteger(room)).toBe(true);
    });
});
