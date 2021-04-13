export const TETROMINOS = {
    // "Clean Cell", what we're showing when there's no tetromino
    0: { shape: [[0]], color: '0, 0, 0' }, 
    
    // 0 will be invisible. Color represented by RGB value.
    I: {
        shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
            ],
        color: '80, 227, 230'
    },

    J: {
        shape: [
                [0, 'J', 0],
                [0, 'J', 0],
                ['J', 'J', 0],
            ],
        color: '36, 95, 223'
    },
    
    L: {
        shape: [
                [0, 'L', 0],
                [0, 'L', 0],
                [0, 'L', 'L'],
            ],
        color: '223, 173, 36'
    },

    O: {
        shape: [
                ['O', 'O'],
                ['O', 'O'],
            ],
        color: '223, 217, 36'
    },

    // Row of 0's on the bottom because it has to be 3x3. 
    // We NEED a width of 3, so we have to have a height of 3.
    S: {
        shape: [
                [0, 'S', 'S'],
                ['S', 'S', 0],
                [0, 0, 0],
            ],
        color: '48, 201, 56'
    },

    T: {
        shape: [
                [0, 0, 0],
                [0, 'T', 0],
                ['T', 'T', 'T'],
            ],
        color: '132, 61, 198'
    },

    Z: {
        shape: [
                ['Z', 'Z', 0],
                [0, 'Z', 'Z'],
                [0, 0, 0],
            ],
        color: '227, 78, 78'
    },
};

export const randomTetromino = () => {
    // String containing all possible tetrominos.
    const tetrominos = 'IJLOSTZ';

    // Grabbing one at random.
    const randTetromino = 
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino]
}