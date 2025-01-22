import { StoneButton } from "../../components/StoneButton"
import allay from "../../assets/imgs/others/allay.png"
import { useEffect } from "react"
import { SoundEffect } from "../../classes/Audio"
import { useSelector } from "react-redux"
import { RootState, store } from "../../app/store";
import { getScript, setAllay } from "../../features/game/gameSlice"

interface TutorialProps {
    turn: number,
}

export function Tutorial(props: TutorialProps) {
    const game = useSelector((state: RootState) => state.game)
    const currentStep = getScript()[props.turn]

    useEffect(() => {
        store.dispatch(setAllay(true))
        if (currentStep) {
            setTimeout(() => {
                SoundEffect.play("allay")
                for (let i = 0; i < currentStep.text.length; i++) {
                    if (i % 30 == 0) {
                        setTimeout(() => {
                            SoundEffect.play("write")
                        }, i * 20);
                    }
                }
            }, 1000);
        }
    }, [props.turn])

    let isHighlighted = false

    return currentStep && <div id="tutorial" className={game.allay ? "showTutorial" : "hideTutorial"}>
        <div id="tutorialContent">
            <p className="tutorialText">
                {currentStep.text.split(" ").map((word, wordIndex) => {
                    const isHighlightedEnd = word.includes("}}")
                    if (word.slice(0, 2) === "{{") {
                        isHighlighted = true
                    }
                    word = word.replace("{{", "").replace("}}", "")

                    const content = <span
                        key={wordIndex}
                        className="tutorialWord"
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            color: isHighlighted ? "#FFAA00" : "white"
                        }}
                    >
                        {word.split("").map((letter, letterIndex) => {
                            const globalIndex = currentStep.text
                                .split(" ")
                                .slice(0, wordIndex)
                                .reduce((acc, curr) => acc + curr.length + 1, 0) + letterIndex;

                            return (
                                <span
                                    key={letterIndex}
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

                    if (isHighlightedEnd) {
                        isHighlighted = false
                    }

                    return content
                })}
            </p>
            <div id="tryIt" style={{ animationDelay: `${currentStep.text.length * 0.02 + 1}s` }}>
                <StoneButton onClick={() => { store.dispatch(setAllay(false)) }}>Got It!</StoneButton>
            </div>
        </div>
        <img key={props.turn} id="allay" src={allay} alt="Allay" />
    </div>
}