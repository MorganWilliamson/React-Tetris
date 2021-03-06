import React, { useState } from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Helpers
import { createStage, checkCollision } from "../gameHelpers";

// Hooks
import { useGameStatus } from "../hooks/useGameStatus";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Styles
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

const Tetris = () => {
    // State
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // Hooks
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    // logic
    const movePlayer = (dir) => {
        // If we're NOT colliding with anything... 
        if (!checkCollision(player, stage, { x: dir, y: 0})) {
            // ... then we move the piece. 
            updatePlayerPos({ x: dir, y: 0 });
        };
    };

    const startGame = () => {
        // Reset everything!
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    const drop = () => {
        // Increase level when player clears 10 rows. 
        if (rows > (level + 1) * 10) {
            // Increase the level by one:
            setLevel(prev => prev + 1);
            // Increase the game speed: 
            setDropTime(1000 / (level + 1) + 200); // 1000 = 1 sec
        };

        if (!checkCollision(player, stage, { x: 0, y: 1})) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("Game over!")
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        };
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1); 
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) { // Rotate clockwise with up arrow
                playerRotate(stage, 1);
            };
        };
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        // Wrapper allows entire app to recognize key press, instead of just grid.
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => move(e)} 
            onKeyUp={keyUp}
            >
            
            <StyledTetris>
                <Stage stage={stage} />

                <aside>
                    {/* "If not gameOver, show everything." */}
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over! :(" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>

        </StyledTetrisWrapper>
    );
};

export default Tetris;