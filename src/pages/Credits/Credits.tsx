import { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { SoundEffect } from "../../classes/Audio";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

/**
 * Simulate a click event on the credits link.
 */
function simulateClick() {
    document.getElementById("credits")?.click()
}

/**
 * Props for the Credit component.
 */
interface CreditProps {
    children: ReactNode
    credit?: string
}

/**
 * Credit component to display individual credits.
 * @param props - The properties for the Credit component.
 * @returns The Credit component.
 */
function Credit(props: CreditProps) {
    return <p className={props.credit ? "creditTextContainer" : "creditMessageContainer"}>
        {props.credit ? <strong className="creditTitle">{props.credit}</strong> : null}
        <span className="creditText">{props.children}</span>
    </p>
}

/**
 * Credits component to display the credits page.
 * @returns The Credits component.
 */
export function Credits() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const socket = useSelector((state: RootState) => state.socket.socket);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            socket?.emit("credits");
            simulateClick();
        }, 60000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [socket]);

    return <Link to="/" id="credits" onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}>
        <div id="creditsContainer">
            <header>
                <h1>
                    <img id="creditsCraftdleTitle" src={craftdleTitle} alt="Craftdle Title" draggable={false}/>
                </h1>
            </header>
            <main>
                <section>
                    <h2>Creators</h2>
                    <Credit credit="Creator team">Guideian Angel</Credit>
                    <Credit credit="Idea">Horvath Mate</Credit>
                    <Credit credit="Backend">Horvath Mate, <br /> Fazekas Marton</Credit>
                    <Credit credit="Database">Horvath Mate, <br /> Fazekas Marton</Credit>
                    <Credit credit="Design">Fazekas Marton</Credit>
                    <Credit credit="Animations">Fazekas Marton</Credit>
                </section>

                <section>
                    <h2>Guideian Angel team</h2>
                    <Credit credit="CEO">Fazekas Marton</Credit>
                    <Credit credit="CTO">Horvath Mate</Credit>
                    <Credit credit="Pentester">Papp-Lukacsi Benjamin Illes</Credit>
                </section>

                <section>
                    <h2>Source</h2>
                    <Credit credit="Images">Minecraft</Credit>
                    <Credit credit="Sound effects">Minecraft</Credit>
                    <Credit credit="Font family">Minecraft</Credit>
                    <Credit credit="Crafting recipes">Minecraft</Credit>
                    <Credit credit="Inspiration">Minecraft</Credit>
                    <Credit credit="Logo">blockbench.net</Credit>
                    <Credit credit="Background images">minecraft.fandom.com</Credit>
                </section>

                <section>
                    <h2>Special thanks</h2>
                    <article>
                        <h3>Beta testers</h3>
                        <Credit>Simon Mate</Credit>
                        <Credit>Simon Mate's younger brother</Credit>
                        <Credit>Haasz Bence</Credit>
                        <Credit>Fazekas Kristof</Credit>
                        <Credit>Palocz-Medla Andras</Credit>
                        <Credit><span onMouseOver={() => { window.open('https://www.instagram.com/kendiii.2', '_blank') }}>Kendiii</span></Credit>
                    </article>

                    <article>
                        <h3>Others</h3>
                        <Credit credit="Mojang">for not suing us yet</Credit>
                        <Credit>Our moms</Credit>
                        <Credit>That one web development teacher</Credit>
                    </article>
                </section>

                <section>
                    <h2>Fun facts</h2>
                    <Credit>No <span onMouseOver={() => { SoundEffect.play("creeper") }}>creepers</span> were harmed during the making of this project</Credit>
                    <Credit>It was originally a school project</Credit>
                    <Credit>Four of the first six hints were super useless</Credit>
                    <Credit>The beta version used a highly flawed, outdated, and incomplete database</Credit>
                    <Credit>The first gamemode was the All in One</Credit>
                    <Credit>When our team plays Minecraft, Mate speedruns the game throughout</Credit>
                    <Credit>Best commit names in Craftdle's GitHub repo: "got to continue on laptop bc of ipban or idk" and "bugfixes after git fucked up my code"</Credit>
                    <Credit>The most hated blocks in our team are the Copper Blocks</Credit>
                </section>
            </main>
            <footer>
                <h2>Contact</h2>
                <Credit credit="Guideian Angel team">guideianangel@gmail.com</Credit>
                <Credit credit="Craftdle project">guideianangelcraftdle@gmail.com</Credit>
            </footer>
        </div>
    </Link>
}