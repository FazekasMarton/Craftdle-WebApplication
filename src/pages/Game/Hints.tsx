import { useState } from "react";
import { Button } from "../../components/Button";

interface HintsProps {
    turn: number;
    hints: Array<string | null>;
}

function HintButton(hint: string | null, index: number, turn: number) {
    const [showHint, setShowHint] = useState(false);
    let countdown = (index + 1) * 5 - turn;
    let countdownText = countdown > 0 ? (
        `Hint after ${countdown} turn${countdown == 1 ? "" : "s"}!`
    ) : "Revail hint!";

    return showHint ? (
        <div className="hintContainer">
            <div className="hintContent">{hint}</div>
        </div>
    ) : (
        <Button color="green" onClick={() => { if (countdown <= 0) setShowHint(true) }}>{countdownText}</Button>
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