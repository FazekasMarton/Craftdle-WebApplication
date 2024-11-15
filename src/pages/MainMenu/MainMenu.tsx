import { StoneButton } from "../../components/stoneButton"
import { Background } from "./Background"
import { Title } from "./Title"

export function MainMenu(){
    return <main id="mainMenu">
        <Background />
        <section id="menu">
            <Title />
            <article id="mainButtons">
                <StoneButton href="/singleplayer">Singleplayer</StoneButton>
                <StoneButton href="/multiplayer" disabled>Multiplayer</StoneButton>
                <StoneButton href="/collection" disabled={true} >Collection</StoneButton>
            </article>
        </section>
    </main>
}