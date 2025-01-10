import { useState } from "react";
import { Button } from "../../components/Button";

interface HintsProps {
    turn: number;
    hints: Array<string | null>;
}

function HintButton(hint: string | null, index: number, turn: number) {
    const [showHint, setShowHint] = useState(false);
    let countDown = (index + 1) * 5 - turn;
    let countDownText = countDown > 0 ? (
        `Hint after ${countDown} turn${countDown == 1 ? "" : "s"}!`
    ) : "Revail hint!";

    return showHint ? (
        <div className="hintContainer">
            <div className="hintContent">{hint}</div>
        </div>
    ) : (
        <Button color="green" onClick={() => { if (countDown <= 0) setShowHint(true) }}>{countDownText}</Button>
    )
}

export function Hints(props: HintsProps) {
    return <div id="hints">
        <h1 id="hintsTitle">Hints:</h1>
        <div id="hintsContainer">
            {
                props.hints.map((hint, index) => {
                    return <div key={index} className="hintSlot">
                        {HintButton(hint, index, props.turn)}
                    </div>
                })
            }
        </div>
    </div>
}