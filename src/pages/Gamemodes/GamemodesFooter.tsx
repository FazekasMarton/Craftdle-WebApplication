import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";
import { setNewGame } from "../../features/game/gameSlice";
import { IGamemode } from "../../interfaces/IGamemode";

interface GamemodesFooterProps{
    gamemode: IGamemode | null
}

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