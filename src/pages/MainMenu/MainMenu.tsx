import { StoneButton } from "../../components/StoneButton"
import { Background } from "./Background"
import { Title } from "./Title"
import news from "../../assets/imgs/icons/news.png"
import lock from "../../assets/imgs/icons/lock.png"
import stats from "../../assets/imgs/icons/stats.png"
import download from "../../assets/imgs/icons/install.png"
import { Profile } from "./Profile"
import { useEffect, useState } from "react"
import { UserAuth } from "./UserAuth"
import { useSelector } from "react-redux"
import { RootState, store } from "../../app/store"
import { MaintenanceNotice } from "./MaintenanceNotice"
import { BeforeInstallPromptEvent } from "../../interfaces/IBeforeInstallPromptEvent"
import { setInstalled } from "../../features/user/userSlice"
import { isTestSubdomain } from "../../functions/isTestSubdomain"
import { version, snapshot } from "../../../package.json"

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

/**
 * Interface for backend version information.
 */
interface VersionInfo {
    version: string;
    snapshot: string;
    minecraftVersion: string;
    minecraftVersionName: string;
}

/**
 * MainMenu component to display the main menu of the application.
 * @returns The MainMenu component.
 */
export function MainMenu() {
    const [authForm, setUserForm] = useState(false)
    const [backendVersionInfo, setBackendVersionInfo] = useState<VersionInfo | null>(null)
    const user = useSelector((state: RootState) => state.user);
    const maintenance = useSelector((state: RootState) => state.maintenance);
    const install = useSelector((state: RootState) => state.user.installed);

    const handleInstallClick = () => {
        if (install) {
            install.prompt();
            install.userChoice.then(() => {
                store.dispatch(setInstalled(null));
            });
        }
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/version`)
            .then(response => response.json())
            .then(data => setBackendVersionInfo(data))
    }, []);

    return <main id="mainMenu">
        <Background />
        <section id="menu">
            {maintenance.countdown != null ? <MaintenanceNotice key={maintenance.countdown} /> : null}
            <Profile openAuth={setUserForm} />
            <Title />
            <nav id="mainButtons" aria-label="Main Menu">
                <StoneButton href="/singleplayer">Singleplayer</StoneButton>
                <StoneButton href="/multiplayer" disabled info={{ text: "Coming soon" }}>Multiplayer</StoneButton>
                <StoneButton href="/collection" >Collection</StoneButton>
            </nav>
            <nav id="additionalButtons" aria-label="Additional Menu">
                <StoneButton href="/guide">How to Play</StoneButton>
                <StoneButton href="/settings" disabled={user.isGuest} info={user.isGuest ? { text: "You're not logged in" } : undefined}>Settings</StoneButton>
                <StoneButton href="/credits">Credits</StoneButton>
                <StoneButton href="https://patreon.com/Craftdle" newTab>Support Us</StoneButton>
            </nav>
            <nav id="leftSideButtons" className="sideButtons" aria-label="Settings and Statistics">
                <StoneButton href="/stats" disabled={user.isGuest} info={user.isGuest ? { text: "You're not logged in" } : undefined}><img src={stats} alt="Statistics" draggable={false} /></StoneButton>
                {install && <StoneButton onClick={handleInstallClick}><img src={download} alt="Install App" /></StoneButton>}
            </nav>
            <nav id="rightSideButtons" className="sideButtons" aria-label="News and Privacy Policy">
                <StoneButton href="/patchNotes"><img src={news} alt="Patch Notes" draggable={false} /></StoneButton>
                <StoneButton href="/docs"><img src={lock} alt="Privacy Policy and Terms of Use" draggable={false} /></StoneButton>
            </nav>
            <footer>
                <aside id="footerInfo" style={{
                    display: backendVersionInfo ? "flex" : "none"
                }}>
                    <span>by Guideian Angel</span>
                    <span>FE: {isTestSubdomain() ? (
                        `(v${version}) - Snapshot ${snapshot}`
                    ) : (
                        `v${version}`
                    )}</span>
                    <span>BE: {isTestSubdomain() ? (
                        `(v${backendVersionInfo?.version}) - Snapshot ${backendVersionInfo?.snapshot}`
                    ) : (
                        `v${backendVersionInfo?.version}`
                    )}</span>
                    <span>for Minecraft: {[backendVersionInfo?.minecraftVersion, backendVersionInfo?.minecraftVersionName].filter(Boolean).join(" - ")}</span>
                </aside>
                <small id="disclaimer">
                    NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
                </small>
            </footer>
        </section>
        {authForm ? <UserAuth openAuth={setUserForm} /> : null}
    </main>
}