import { useState } from "react"
import title from "../../assets/imgs/title/craftdle_title-react_edition.png"

/**
 * Array of random texts to display below the title.
 */
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

/**
 * Get a random text from the texts array.
 * @returns A random text.
 */
function getRandomText(){
    return texts[Math.floor(Math.random() * texts.length)]
}

/**
 * Title component to display the game title and a random text.
 * @returns The Title component.
 */
export function Title() {
    const [text] = useState(getRandomText())
    return <header id="craftdleTitle">
        <img id="craftdleLogo" src={title} alt="Craftdle Logo" draggable={false}/>
        <span id="yellowText">{text}</span>
    </header>
}