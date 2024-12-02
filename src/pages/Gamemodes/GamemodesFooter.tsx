import { StoneButton } from "../../components/StoneButton";
import { IGamemode } from "../../interfaces/IGamemode";

interface GamemodesFooterProps{
    gamemode: IGamemode | null
}

export function GamemodesFooter(props: GamemodesFooterProps) {
    return <footer id="gamemodesFooter">
        <div>
            <StoneButton disabled={!props.gamemode} href={`/play?gamemode=${props.gamemode?.id}&newGame=true`}>New Game</StoneButton>
            <StoneButton disabled={!(props.gamemode && props.gamemode.continueGame)} href={`/play?gamemode=${props.gamemode?.id}&newGame=false`}>Load Game</StoneButton>
            <StoneButton href="/">Back to Menu</StoneButton>
        </div>
    </footer>
}