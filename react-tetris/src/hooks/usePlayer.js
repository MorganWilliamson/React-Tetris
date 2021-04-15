import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }));
    };

    // Piece rotation functionality. (Reminder: tetrominos are matrices.)
    const rotate = (matrix, dir) => {
        // 1) Convert rows into columns:
        const rotatedTetro = matrix.map((_, index) =>
         matrix.map(col => col[index]),
        );
        // 2) Reverse each rox to get a rotated matrix (tetromino):
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    // Check collision when rotating piece. 
    const playerRotate = (stage, dir) => {
        // We don't want to mutate our state, so we create a clone...
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        // ... and implement the rotation on that instead. 
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        // Utilize an offset to ensure one piece doesn't rotate INTO another.
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                // Set the position back to the original position (pos).
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            };
        };

        setPlayer(clonedPlayer);
    };

    // Only runs once, clean slate.
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
};