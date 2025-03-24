import fullHeart from "../../assets/imgs/icons/hardcore_full.png"
import halfHeart from "../../assets/imgs/icons/hardcore_half.png"
import emptyHeart from "../../assets/imgs/icons/hardcore_empty.png"

/**
 * Props for the Hearts component.
 */
interface HeartsProps {
    turn: number,
    maxHearts: number
}

/**
 * Generate an array of heart images representing the player's health.
 * Full hearts, half hearts, and empty hearts are determined based on the turn and max hearts.
 * 
 * @param turn - The current turn, representing the player's progress or damage taken.
 * @param maxHearts - The maximum number of hearts the player can have.
 * @returns An array of heart image paths.
 */
function getHearts(turn: number, maxHearts: number) {
    const turnLeft = maxHearts * 2 - turn
    const hearts = []
    for (let i = 0; i < maxHearts; i++) {
        if (i * 2 + 1 == turnLeft) {
            hearts.push(halfHeart)
        } else if (i * 2 < turnLeft) {
            hearts.push(fullHeart)
        } else {
            hearts.push(emptyHeart)
        }
    }
    return hearts
}

/**
 * A React component that displays the player's health as a series of hearts.
 * 
 * @param props - The properties for the Hearts component, including the current turn and max hearts.
 * @returns A JSX element displaying the hearts.
 */
export function Hearts(props: HeartsProps) {
    return <div id="hearts">
        <h1 id="heartsTitle">HP:</h1>
        <div id="heartsContainer">
            {
                getHearts(props.turn, props.maxHearts).map((src, index) => {
                    return <img key={index} src={src} alt="Heart" draggable={false}/>
                })
            }
        </div>
    </div>
}