import { useState } from "react";
import { Button } from "../../components/Button";

interface HintsProps {
    turn: number;
    hints: Array<string | null>;
}

interface HintButtonProps {
    hint: string | null;
    index: number;
    turn: number;
}

/**
 * Component to render a hint button with countdown.
 * @param hint - The hint text.
 * @param index - The index of the hint.
 * @param turn - The current turn number.
 * @returns The HintButton component.
 */
function HintButton(props: HintButtonProps) {
    const [showHint, setShowHint] = useState(false);

    let countdown = (props.index + 1) * 5 - props.turn;
    let countdownText = countdown > 0 ? (
        `Hint after ${countdown} turn${countdown == 1 ? "" : "s"}!`
    ) : "Reveal hint!";

    return showHint ? (
        <div className="hintContainer">
            <div className="hintContent">{props.hint}</div>
        </div>
    ) : (
        <Button color="green" onClick={() => { if (countdown <= 0) setShowHint(true) }}>{countdownText}</Button>
    );
}

/**
 * Hints component to display a list of hints with countdowns.
 * @param props - The props for the component.
 * @returns The Hints component.
 */
export function Hints(props: HintsProps) {
    return (
        <div id="hints">
            <h1 id="hintsTitle">Hints:</h1>
            <div id="hintsContainer">
                {props.hints.map((hint, index) => (
                    <div key={index} className="hintSlot">
                        <HintButton hint={hint} index={index} turn={props.turn} />
                    </div>
                ))}
            </div>
        </div>
    );
}