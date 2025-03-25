import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";

/**
 * Props for the GameOver component.
 */
interface IGameOverProps {
    startGame: () => void
}

/**
 * A React component that displays the "Game Over" screen.
 * It shows the player's username and provides options to quit or start a new game.
 * 
 * @param props - The properties for the GameOver component, including a function to start a new game.
 * @returns A JSX element representing the game over screen.
 */
export function GameOver(props: IGameOverProps) {
    return (
        <div id="gameOver">
            <div id="gameOverContent">
                <h1>Game Over!</h1>
                <p>{`${store.getState().user.username} died`}</p>
                <StoneButton href="/singleplayer">Quit Game</StoneButton>
                <StoneButton onClick={() => {
                    props.startGame()
                }}>New Game</StoneButton>
            </div>
        </div>
    );
}