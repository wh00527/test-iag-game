const Player = require('../src/player');

describe('Constructor', () => {
    const player = new Player();

    it('Should construct a player and have empty coordinate and direction', () => {
        expect(player).toBeDefined();
        expect(typeof player).toBe('object');
        expect(Object.keys(player._coordinate).length).toBe(2);
        expect(player._direction).toBe('NORTH');
    });
});

describe('Listen', () => {
    const player = new Player();
    describe('START', () => {
        it('Should have coordinate and direction.', () => {
            player.listen('START,WEST');
            expect(player._coordinate).toEqual({ x: 0, y: 0 });
            expect(player._direction).toBe('WEST');
        });
    });

    describe('MOVE', () => {
        it('Should move two steps if player is facing EAST.', () => {
            player.listen('START,EAST');
            player.listen('MOVE');
            player.listen('MOVE');

            expect(player._coordinate).toEqual({ x: 2, y: 0 });
            expect(player._direction).toBe('EAST');
        });

        it('Should move up if only input MOVE.', () => {           
            player.listen('START,NORTH');
            player.listen('MOVE');
            expect(player._coordinate).toEqual({ x: 0, y: 1 });
            expect(player._direction).toBe('NORTH');
        });

        it('Should move down if player is facing SOUTH.', () => {
            player.listen('START,NORTH');
            player.listen('MOVE');
            player.listen('MOVE');
            player.listen('SOUTH');
            player.listen('MOVE');
            expect(player._coordinate).toEqual({ x: 0, y: 1 });
            expect(player._direction).toBe('SOUTH');
        });
    });

    describe('EAST', () => {
        it('The direction shoule change direction to EAST.', () => {
            player.listen('EAST');
            expect(player._direction).toBe('EAST');
        });
    });

    describe('SOUTH', () => {
        it('The direction shoule change direction to SOUTH.', () => {
            player.listen('SOUTH');
            expect(player._direction).toBe('SOUTH');
        });
    });

    describe('NORTH', () => {
        it('The direction shoule change direction to NORTH.', () => {
            player.listen('NORTH');
            expect(player._direction).toBe('NORTH');
        });
    });

    describe('WEST', () => {
        it('The direction shoule change direction to WEST.', () => {
            player.listen('WEST');
            expect(player._direction).toBe('WEST');
        });
    });

    describe('HELP', () => {
        it('Should print out valid commands without any error.', () => {
            try {
                player.listen('HELP');
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });
    });

    describe('default', () => {
        it('Should do nothing if no command is matched.', () => {
            try {
                player.listen('BLABLA');
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });
    });
});