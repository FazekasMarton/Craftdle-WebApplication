import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";
import { setNewGame } from "../../features/game/gameSlice";
import { IGamemode } from "../../interfaces/IGamemode";

/**
 * Props for the GamemodesFooter component.
 */
interface GamemodesFooterProps {
    gamemode: IGamemode | null
}

/**
 * GamemodesFooter component to display the footer with action buttons.
 * @param props - The properties for the GamemodesFooter component.
 * @returns The GamemodesFooter component.
 */
export function GamemodesFooter(props: GamemodesFooterProps) {
    return <footer id="gamemodesFooter">
        <div>
            <StoneButton disabled={!props.gamemode} href={`/play?gamemode=${props.gamemode?.id}`} onClick={() => {
                store.dispatch(setNewGame(true))
            }}>New Game</StoneButton>
            <StoneButton disabled={!(props.gamemode && props.gamemode.continueGame)} href={`/play?gamemode=${props.gamemode?.id}`} onClick={() => {
                store.dispatch(setNewGame(false))
            }}>Load Game</StoneButton>
            <StoneButton href="/">Back to Menu</StoneButton>
        </div>
    </footer>
}