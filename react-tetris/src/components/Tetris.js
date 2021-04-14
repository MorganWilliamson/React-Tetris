import React, { useState } from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Helpers
import { createStage } from "../gameHelpers";

// Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Styles
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log("Re-render.")

    // logic
    const movePlayer = (dir) => {
        updatePlayerPos({ x: dir, y: 0 });
    };

    const startGame = () => {
        // Reset everything.
        setStage(createStage());
        resetPlayer();
    };

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false })
    };

    const dropPlayer = () => {
        // Add special case later.
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
            }
        }
    };

    return (
        // Wrapper allows entire app to recognize key press, instead of just grid.
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            
            <StyledTetris>
                <Stage stage={stage} />

                <aside>
                    {/* "If not gameOver, show everything." */}
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over! :(" />
                    ) : (
                        <div>
                            <Display text="Score!" />
                            <Display text="Rows!" />
                            <Display text="Level!" />
                        </div>
                    )}
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>

        </StyledTetrisWrapper>
    );
};

export default Tetris;