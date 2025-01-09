import { useState } from "react"
import title from "../../assets/imgs/title/craftdle_title-react_edition.png"

const texts = [
    "Try it!",
    "Play on TV!",
    "Awesome!",
    "May contain nuts!",
    "It's here!",
    "Excitement!",
    "Check it out!",
    "Holy cow, man!",
    "It's a game!",
    "Made in Hungary!",
    "Made by Guideian Angel!",
    "Minecraft!",
    "Yaaay!",
    "Singleplayer!",
    "Wow!",
    "Oh man!",
    "90% bug free!",
    "Pretty!",
    "Fat free!",
    "Ask your doctor!",
    "Technically good!",
    "Indie!",
    "Yes, sir!",
    "Call your mother!",
    "Whoa, dude!",
    "Water proof!",
    "Tell your friends!",
    "Kiss the sky!",
    "Peter Griffin!",
    "Home-made!",
    'Made by "real" people!',
    "Nooooooooooooo!",
    "Sniff sniff...",
    "SUS!",
    "Delete all copper!"
]

function getRandomText(){
    return texts[Math.floor(Math.random() * texts.length)]
}

export function Title() {
    const [text] = useState(getRandomText())
    return <header id="craftleTitle">
        <img id="craftdleLogo" src={title} alt="Craftdle Logo" />
        <span id="yellowText">{text}</span>
    </header>
}