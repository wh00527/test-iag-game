const action = require('../src/action');

describe('Move', () => {

    const board = { _width: 5, _height: 5 };

    it('Should move up if facing NORTH.', () => {
        const coordinate = { x: 0, y: 0 };
        const direction = 'NORTH';
        const result = action.move(coordinate, direction, board,5,0);         
        expect(result.nCoordinate.x).toBe(coordinate.x);
        expect(result.nCoordinate.y).toBe(coordinate.y + 1);              
    });

    it('Should move down if facing SOUTH.', () => {
        const coordinate = { x: 1, y: 1 };
        const direction = 'SOUTH';        
        const result = action.move(coordinate, direction, board,5,0);         
        expect(result.nCoordinate.x).toBe(coordinate.x);
        expect(result.nCoordinate.y).toBe(coordinate.y - 1);    
    });

    it('Should move left if facing WEST.', () => {
        const coordinate = { x: 1, y: 1 };
        const direction = 'WEST';
        const result = action.move(coordinate, direction, board,5,0);         
        expect(result.nCoordinate.x).toBe(coordinate.x - 1);
        expect(result.nCoordinate.y).toBe(coordinate.y);    
    });

    it('Should move right if facing EAST.', () => {
        const coordinate = { x: 1, y: 1 };
        const direction = 'EAST';
        const result = action.move(coordinate, direction, board,5,0);         
        expect(result.nCoordinate.x).toBe(coordinate.x + 1);
        expect(result.nCoordinate.y).toBe(coordinate.y);    
    });

    it('Should throw an error if no coordinates are given', () => {
        const coordinate = undefined;
        const direction = 'EAST';
        try {
            action.move(coordinate, direction, board);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('INVALID_COORDINATE');
        }
    });

    it('Should throw an error if no board is given', () => {
        const coordinate = { x: 1, y: 1 };
        const direction = 'EAST';
        try {
            action.move(coordinate, direction);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('INVALID_BOARD');
        }
    });
});

describe('Validate', () => {

    const board = { _width: 5, _height: 5 };

    it('Should pass if coordinate is within board boundary.', () => {
        const coordinate = { x: 1, y: 1 };

        try {
            action.validate(coordinate, board);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    it('Should fail if coordinate is outside board boundary.', () => {
        const coordinate = { x: 6, y: 6 };

        try {
            action.validate(coordinate, board);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('OUTSIDE_BOARD');
        }
    });

    it('Should fail if coordinate is not an object.', () => {
        const coordinate = 1;

        try {
            action.validate(coordinate, board);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('INVALID_COORDINATE');
        }
    });

    it('Should fail if board is not an object.', () => {
        const coordinate = { x: 1, y: 1 };
        const fakeBoard = 1;

        try {
            action.validate(coordinate, fakeBoard);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('INVALID_BOARD');
        }
    });

    it('Should throw gamer over error if player current health is less than 1.', () => {
        const coordinate = { x: 1, y: 1 };        
        const board = { _width: 5, _height: 5 };

        try {
            action.validate(coordinate, board,-1,5);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('Boom! GAME OVER! Your score is 5');
        }
    });
});

describe('pass', () => {
    it('Should return a request object', () => {
        const coordinate = { x: 1, y: 1 };
        const result = action.pass(coordinate,5,0);        
        expect(typeof result).toBe('object');               
    });
});

describe('Report', () => {
    it('Should report coordinate.', () => {
        const coordinate = action.report({ x: 2, y: 2 });

        expect(coordinate).toEqual({ x: 2, y: 2 });
    });

    it('Should report error if invalid coordinate is given.', () => {
        try {
            action.report(1);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('I haven\'t been placed yet :)');
        }
    });
});

