import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

// You might want to read up on multi-dimensional arrays.

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            // 1) Flush the stage:
            const newStage = prevStage.map(row => 
                    row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                );
            
            // 2) Draw the tetromino:
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            // Setting each cell value to a shape, and...
                            value, 
                            // ... checking to make sure it's not collided.
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    };
                });
            });
            // Run collision detection function:
            if (player.collided) {
                resetPlayer();
            }
            
            return newStage;
        };


        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])

    return [stage, setStage];
};