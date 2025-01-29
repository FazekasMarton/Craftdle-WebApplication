import { StoneButton } from "../../components/StoneButton"
import { Background } from "./Background"
import { Title } from "./Title"
import news from "../../assets/imgs/icons/news.png"
import lock from "../../assets/imgs/icons/lock.png"
import stats from "../../assets/imgs/icons/stats.png"
import settings from "../../assets/imgs/icons/settings.png"
import { Profile } from "./Profile"
import { useEffect, useState } from "react"
import { UserAuth } from "./UserAuth"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { MaintenanceNotice } from "./MaintenanceNotice"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

/**
 * MainMenu component to display the main menu of the application.
 * @returns The MainMenu component.
 */
export function MainMenu() {
    const [authForm, setUserForm] = useState(false)
    const user = useSelector((state: RootState) => state.user);
    const maintenance = useSelector((state: RootState) => state.maintenance);
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/serviceWorker.ts')
                    .then((registration) => {
                        console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch((error) => {
                        console.error('Service Worker registration failed:', error);
                    });
            });
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then(() => {
                setInstallPrompt(null);
            });
        }
    };

    return <main id="mainMenu">
        <Background />
        <section id="menu">
            {maintenance.countdown != null ? <MaintenanceNotice key={maintenance.countdown} /> : null}
            <Profile openAuth={setUserForm} />
            <Title />
            <nav id="mainButtons" aria-label="Main Menu">
                <StoneButton href="/singleplayer">Singleplayer</StoneButton>
                <StoneButton href="/multiplayer" disabled info={{ text: "Coming soon" }}>Multiplayer</StoneButton>
                <StoneButton href="/collection" disabled={user.isGuest} info={user.isGuest ? { text: "You're not logged in" } : undefined}>Collection</StoneButton>
            </nav>
            <nav id="additionalButtons" aria-label="Additional Menu">
                <StoneButton href="/guide">How to Play</StoneButton>
                <StoneButton href="https://patreon.com/Craftdle">Support Us</StoneButton>
                <StoneButton href="/credits">Credits</StoneButton>
                {installPrompt ? <StoneButton onClick={handleInstallClick}>Install App</StoneButton> : <StoneButton href="/patchNotes">Patch Notes</StoneButton>}
            </nav>
            <nav id="leftSideButtons" className="sideButtons" aria-label="Settings and Statistics">
                <StoneButton href="/stats" disabled={user.isGuest} info={user.isGuest ? { text: "You're not logged in" } : undefined}><img src={stats} alt="Statistics" /></StoneButton>
                <StoneButton href="/settings" disabled={user.isGuest} info={user.isGuest ? { text: "You're not logged in" } : undefined}><img src={settings} alt="Settings" /></StoneButton>
            </nav>
            <nav id="rightSideButtons" className="sideButtons" aria-label="News and Privacy Policy">
                {installPrompt && <StoneButton href="/patchNotes"><img src={news} alt="Patch Notes" /></StoneButton>}
                <StoneButton href="/docs"><img src={lock} alt="Privacy Policy and Terms of Use" /></StoneButton>
            </nav>
            <footer>
                <aside id="footerInfo">
                    <span>by Guideian Angel</span>
                    <span>v1.2</span>
                    <span>for Minecraft 1.21.50</span>
                </aside>
                <small id="disclaimer">
                    NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
                </small>
            </footer>
        </section>
        {authForm ? <UserAuth openAuth={setUserForm} /> : null}
    </main>
}