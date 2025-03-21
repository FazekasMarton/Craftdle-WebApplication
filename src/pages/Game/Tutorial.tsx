import { StoneButton } from "../../components/StoneButton";
import allay from "../../assets/imgs/others/Allay.png";
import { useEffect } from "react";
import { SoundEffect } from "../../classes/Audio";
import { useSelector } from "react-redux";
import { RootState, store } from "../../app/store";
import { setAllay, setRequiredControl } from "../../features/game/gameSlice";
import { getTutorialScript } from "../../functions/getTutorialScript";

/**
 * Props for the Tutorial component.
 */
interface TutorialProps {
    turn: number;
}

/**
 * Tutorial component to display tutorial steps and handle interactions.
 * @param props - The properties for the Tutorial component.
 * @returns The Tutorial component.
 */
export function Tutorial(props: TutorialProps) {
    const game = useSelector((state: RootState) => state.game);
    const currentStep = getTutorialScript()[props.turn];
    const text = game.help ? currentStep.help : currentStep.text;

    useEffect(() => {
        store.dispatch(setAllay(true));
        store.dispatch(setRequiredControl(currentStep.requiredControl));
    }, [props.turn]);

    useEffect(() => {
        if (text && game.allay) {
            setTimeout(() => {
                SoundEffect.play("allay");
                for (let i = 0; i < text.length; i++) {
                    if (i % 30 === 0) {
                        setTimeout(() => {
                            SoundEffect.play("write");
                        }, i * 20);
                    }
                }
            }, 1000);
        }
    }, [game, text]);

    /**
     * Flag to determine if the current word in the tutorial text should be highlighted.
     */
    let isHighlighted = false;

    return currentStep && (
        <div id="tutorial" className={game.allay ? "showTutorial" : "hideTutorial"}>
            <div id="tutorialContent">
                <p className="tutorialText">
                    {text?.split(" ").map((word, wordIndex) => {
                        const isHighlightedEnd = word.includes("}}");
                        if (word.slice(0, 2) === "{{") {
                            isHighlighted = true;
                        }
                        word = word.replace("{{", "").replace("}}", "");

                        const content = (
                            <span
                                key={wordIndex}
                                className="tutorialWord"
                                style={{
                                    display: "inline-block",
                                    whiteSpace: "nowrap",
                                    color: isHighlighted ? "#FFAA00" : "white"
                                }}
                            >
                                {word.split("").map((letter, letterIndex) => {
                                    const globalIndex = text
                                        .split(" ")
                                        .slice(0, wordIndex)
                                        .reduce((acc, curr) => acc + curr.length + 1, 0) + letterIndex;

                                    return (
                                        <span
                                            key={globalIndex}
                                            style={{
                                                animationDelay: `${globalIndex * 0.02 + 1}s`,
                                                color: /[.,!?]$/.test(letter) ? "#FFFFFF" : "inherit"
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    );
                                })}
                                <span>&nbsp;</span>
                            </span>
                        );

                        if (isHighlightedEnd) {
                            isHighlighted = false;
                        }

                        return content;
                    })}
                </p>
                <div id="tryIt" style={{ animationDelay: `${(text?.length || 0) * 0.02 + 1}s` }}>
                    <StoneButton onClick={() => { store.dispatch(setAllay(false)); }}>Got It!</StoneButton>
                </div>
            </div>
            <img key={`${props.turn}-${game.help}`} id="allay" src={allay} alt="Allay" draggable={false}/>
        </div>
    );
}