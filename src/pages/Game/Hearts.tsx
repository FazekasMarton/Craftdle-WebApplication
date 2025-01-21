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
 * Get the hearts images based on the current turn and max hearts.
 * @param turn - The current turn.
 * @param maxHearts - The maximum number of hearts.
 * @returns An array of heart images.
 */
function getHearts(turn: number, maxHearts: number) {
    const turnLeft = maxHearts * 2 - turn
    let hearts = []
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
 * Hearts component to display the player's health.
 * @param props - The properties for the Hearts component.
 * @returns The Hearts component.
 */
export function Hearts(props: HeartsProps) {
    return <div id="hearts">
        <h1 id="heartsTitle">HP:</h1>
        <div id="heartsContainer">
            {
                getHearts(props.turn, props.maxHearts).map((src, index) => {
                    return <img key={index} src={src} alt="Heart" />
                })
            }
        </div>
    </div>
}