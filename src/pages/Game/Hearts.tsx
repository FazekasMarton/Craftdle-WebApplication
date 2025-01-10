import fullHeart from "../../assets/imgs/icons/hardcore_full.png"
import halfHeart from "../../assets/imgs/icons/hardcore_half.png"
import emptyHeart from "../../assets/imgs/icons/hardcore_empty.png"

interface HeartsProps {
    turn: number,
    maxHearts: number
}

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