import fullHeart from "../../assets/imgs/icons/hardcore_full.png"
import halfHeart from "../../assets/imgs/icons/hardcore_half.png"
import emptyHeart from "../../assets/imgs/icons/hardcore_empty.png"

interface HeartsProps {
    turn: number
}

function getHearts(turn: number) {
    const turnLeft = 20 - turn
    let hearts = []
    for (let i = 0; i < 10; i++) {
        if(i * 2 + 1 == turnLeft){
            hearts.push(halfHeart)
        }else if(i * 2 < turnLeft){
            hearts.push(fullHeart)
        } else{
            hearts.push(emptyHeart)
        }
    }
    return hearts
}

export function Hearts(props: HeartsProps) {
    return <div id="hearts">
        {
            getHearts(props.turn).map((src) => {
                return <img src={src} alt="Heart" />
            })
        }
    </div>
}