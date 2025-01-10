import { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { SoundEffect } from "../../classes/Audio";

function simulateClick() {
    document.getElementById("credits")?.click()
}

interface CreditProps {
    children: ReactNode
    credit?: string
}

function Credit(props: CreditProps) {
    return <p className={props.credit ? "creditTextContainer" : "creditMessageContainer"}>
        {props.credit ? <span className="creditTitle">{props.credit}</span> : null}
        <span className="creditText">{props.children}</span>
    </p>
}

export function Credits() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            simulateClick();
        }, 60000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return <Link to="/" id="credits" onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}>
        <div id="creditsContainer">
            <img id="creditsCraftdleTitle" src={craftdleTitle} alt="craftdle title" />
            <article>
                <h1>Creators</h1>
                <Credit credit="Creator team">Guideian Angel</Credit>
                <Credit credit="Idea">Horvath Mate</Credit>
                <Credit credit="Backend">Horvath Mate, <br/> Fazekas Marton</Credit>
                <Credit credit="Database">Horvath Mate, <br/> Fazekas Marton</Credit>
                <Credit credit="Design">Fazekas Marton</Credit>
                <Credit credit="Animations">Fazekas Marton</Credit>
            </article>

            <article>
                <h1>Guideian Angel team</h1>
                <Credit credit="CEO">Fazekas Marton</Credit>
                <Credit credit="CTO">Horvath Mate</Credit>
                <Credit credit="Pentester">Papp-Lukacsi Benjamin Illes</Credit>
            </article>

            <article>
                <h1>Source</h1>
                <Credit credit="Images">Minecraft</Credit>
                <Credit credit="Sound effects">Minecraft</Credit>
                <Credit credit="Font family">Minecraft</Credit>
                <Credit credit="Crafting recipes">Minecraft</Credit>
                <Credit credit="Inspiration">Minecraft</Credit>
                <Credit credit="Logo">blockbench.net</Credit>
                <Credit credit="Background images">minecraft.fandom.com</Credit>
            </article>

            <article>
                <h1>Special thanks</h1>
                <article>
                    <h2>Beta testers</h2>
                    <Credit>Simon Mate</Credit>
                    <Credit>Simon Mate's younger brother</Credit>
                    <Credit>Haasz Bence</Credit>
                    <Credit>Fazekas Kristof</Credit>
                    <Credit>Palocz-Medla Andras</Credit>
                    <Credit><span onMouseOver={() => { window.open('https://www.instagram.com/kendiii.2', '_blank') }}>Kendiii</span></Credit>
                </article>

                <article>
                    <h2>Others</h2>
                    <Credit credit="Mojang">for not suing us yet</Credit>
                    <Credit credit="Heroku">for supporting our project</Credit>
                    <Credit>Our moms</Credit>
                    <Credit>That one web development teacher</Credit>
                </article>
            </article>

            <article>
                <h1>Fun facts</h1>
                <Credit>No <span onMouseOver={() => { SoundEffect.play("creeper") }}>creepers</span> were harmed during the making of this project</Credit>
                <Credit>It was originally a school project</Credit>
                <Credit>Four of the first six hints were super useless</Credit>
                <Credit>The beta version used a highly flawed, outdated, and incomplete database</Credit>
                <Credit>The first gamemode was the All in One</Credit>
                <Credit>When our team plays Minecraft, Mate speedruns the game throughout</Credit>
                <Credit>Best commit names in Craftdle's GitHub repo: "got to continue on laptop bc of ipban or idk" and "bugfixes after git fucked up my code"</Credit>
                <Credit>The most hated blocks in our team are the Copper Blocks</Credit>
            </article>

            <article>
                <h1>Contact</h1>
                <Credit credit="Guideian Angel team">guideianangel@gmail.com</Credit>
                <Credit credit="Craftdle project">guideianangelcraftdle@gmail.com</Credit>
            </article>
        </div>
    </Link>
}