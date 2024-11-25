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
import { RootState, store } from "../../app/store"
import { loadUser, saveUser } from "../../features/user/userSlice"
import { guestLogin, tokenLogin } from "../../features/user/dataRequestSlice"

async function autoLogin(token: string | null){
    let error = true
    await store.dispatch(loadUser())
    if (token) {
        let response = await store.dispatch(tokenLogin())
        let res = (response.payload as any)
        if (res.response == 200) {
            store.dispatch(saveUser(res.data.data))
            error = false
        }
    }
    if(error){
        let response = await store.dispatch(guestLogin())
        let res = (response.payload as any)
        store.dispatch(saveUser(res.data.data))
    }
}

export function MainMenu() {
    const [authForm, setUserForm] = useState(false)
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        autoLogin(user.loginToken)
    }, [])
    return <main id="mainMenu">
        <Background />
        <section id="menu">
            <Profile openAuth={setUserForm} />
            <Title />
            <nav id="mainButtons">
                <StoneButton href="/singleplayer">Singleplayer</StoneButton>
                <StoneButton href="/multiplayer" disabled>Multiplayer</StoneButton>
                <StoneButton href="/collection" disabled={user.isGuest} >Collection</StoneButton>
            </nav>
            <nav id="additionalButtons">
                <StoneButton href="/howtoplay">How to Play</StoneButton>
                <StoneButton href="https://patreon.com/Craftdle">Support Us</StoneButton>
                <StoneButton href="/credits">Credits</StoneButton>
                <StoneButton>Install App</StoneButton>
            </nav>
            <nav id="leftSideButtons" className="sideButtons">
                <StoneButton href="/stats" disabled={user.isGuest}><img src={stats} alt="Statistics" /></StoneButton>
                <StoneButton href="/settings" disabled={user.isGuest}><img src={settings} alt="Settings" /></StoneButton>
            </nav>
            <nav id="rightSideButtons" className="sideButtons">
                <StoneButton href="/patchNotes"><img src={news} alt="Patch Notes" /></StoneButton>
                <StoneButton href="/docs"><img src={lock} alt="Privacy Policy and Terms of Use" /></StoneButton>
            </nav>
            <footer>
                <aside id="footerInfo">
                    <span>by Guideian Angel</span>
                    <span>v1.2</span>
                    <span>for Minecraft 1.21.50</span>
                </aside>
                <p id="disclaimer">
                    NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
                </p>
            </footer>
        </section>
        {authForm ? <UserAuth openAuth={setUserForm} /> : null}
    </main>
}