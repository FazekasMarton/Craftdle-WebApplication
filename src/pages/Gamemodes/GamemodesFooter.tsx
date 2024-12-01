import { StoneButton } from "../../components/StoneButton";

export function GamemodesFooter() {
    return <footer id="gamemodesFooter">
        <div>
            <StoneButton>New Game</StoneButton>
            <StoneButton>Load Game</StoneButton>
            <StoneButton href="/">Back to Menu</StoneButton>
        </div>
    </footer>
}