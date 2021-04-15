import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

// You might want to read up on multi-dimensional arrays.

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        // Line clear functionality.  
        const sweepRows = newStage => 
            newStage.reduce((acc, row) => {
                // Check if the current row is full. 
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    // Update the lines cleared tracker.
                    setRowsCleared(prev => prev + 1);
                    // Empty out the cleared line. 
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;
                }
                acc.push(row);
                return acc;
            }, [])

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
                return sweepRows(newStage);
            }
            
            return newStage;
        };


        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])

    return [stage, setStage, rowsCleared];
};