export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array (STAGE_WIDTH).fill([0, 'clear'])
    )

/* Ultimately, the `checkCollision` function is looping through every cell of 
    each tetromino and checking to making sure that they're not colliding with 
    the walls of the stage or cells of another tetromino. 
    */
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1) Check that we're on a tetromino cell: 
            if (player.tetromino[y][x] !== 0) {
                if (
                // 2) Check that move is within stage height (y): 
                // We shouldn't go through the bottom of the stage.
                !stage[y + player.pos.y + moveY] || 

                // 3) Check that move is within stage width (x):
                // We shouldn't go through the left or right of the stage.
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

                // 4) Check that the cell we're moving to isn't set to clear (empty):
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'

                ) {
                    return true;
                };
            };
        };
    };
};
