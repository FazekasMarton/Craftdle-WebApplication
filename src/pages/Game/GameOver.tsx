import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";

/**
 * Props for the GameOver component.
 */
interface IGameOverProps {
    startGame: () => void
}

/**
 * GameOver component to display the game over screen.
 * @param props - The properties for the GameOver component.
 * @returns The GameOver component.
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