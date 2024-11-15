import { StoneButton } from "../../components/StoneButton"
import { Background } from "./Background"
import { Title } from "./Title"
import news from "../../assets/imgs/icons/news.png"
import lock from "../../assets/imgs/icons/lock.png"
import stats from "../../assets/imgs/icons/stats.png"
import settings from "../../assets/imgs/icons/settings.png"

export function MainMenu(){
    return <main id="mainMenu">
        <Background />
        <section id="menu">
            <Title />
            <nav id="mainButtons">
                <StoneButton href="/singleplayer">Singleplayer</StoneButton>
                <StoneButton href="/multiplayer" disabled>Multiplayer</StoneButton>
                <StoneButton href="/collection" disabled={true} >Collection</StoneButton>
            </nav>
            <nav id="additionalButtons">
                <StoneButton href="/howtoplay">How to Play</StoneButton>
                <StoneButton href="https://patreon.com/Craftdle">Support Us</StoneButton>
                <StoneButton href="/credits">Credits</StoneButton>
                <StoneButton>Install App</StoneButton>
            </nav>
            <nav id="leftSideButtons" className="sideButtons">
                <StoneButton href="/stats" disabled><img src={stats} alt="Statistics" /></StoneButton>
                <StoneButton href="/settings" disabled><img src={settings} alt="Settings" /></StoneButton>
            </nav>
            <nav id="rightSideButtons" className="sideButtons">
                <StoneButton href="/patchNotes"><img src={news} alt="Patch Notes" /></StoneButton>
                <StoneButton href="/docs"><img src={lock} alt="Privacy Policy and Terms of Use" /></StoneButton>
            </nav>
        </section>
    </main>
}