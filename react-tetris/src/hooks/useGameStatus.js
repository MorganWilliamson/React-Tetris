import { useState, useEffect, useCallback } from "react";
// import { rowsCleared } from "./useStage";


export const useGameStatus = (rowsCleared) => {
    // Game State (all three necessary?)
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const calcScore = useCallback(() => {
        // Points from original scoring system, based on number of rows cleared.
        const linePoints = [40, 100, 300, 1200];

        // 1) Did we clear any rows?
        if (rowsCleared > 0) {
            // 2) How many points did we earn? (Remember: Arrays are zero-indexed; levels start at 0.)
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            // 3) How many rows did we clear? 
            setRows(prev => prev + rowsCleared); 
        }
    }, [level, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
};