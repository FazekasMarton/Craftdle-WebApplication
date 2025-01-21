import { StoneButton } from "../../components/StoneButton"
import allay from "../../assets/imgs/others/allay.png"
import { useEffect, useState } from "react"
import { store } from "../../app/store"
import { SoundEffect } from "../../classes/Audio"

interface IStep {
    guess: string | null,
    requiredControl: string[],
    text: string,
}

interface TutorialProps {
    turn: number,
}

function getText(index: number) {
    const settings = store.getState().user.settings?.find(s => s.isSet)

    const script: Array<IStep> = [
        {
            guess: "woodenPlanks0",
            requiredControl: ["PickUp"],
            text: `Welcome to the tutorial! Let's start by crafting a wooden planks, like in Minecraft. Pick up any type of log and drop it on the crafting table with the ${settings?.controls.copy} key. If you put too much materialson the crafting table, you can remove it with the ${settings?.controls.remove} key.`
        },
        {
            guess: "armorStand0",
            requiredControl: ["Copy"],
            text: `Great! How you can see, there is no wood and log in the riddle. Let's craft an armor stand. Pick up the stick and copy it along the crafting table with the ${settings?.controls.copy} key. If you don't know how to craft an item, you can look it up in the recipe book.`
        },
        {
            guess: "rail0",
            requiredControl: ["Place"],
            text: `Good job! Now we know there are two sticks in the riddle and we know one of it's place. Let's craft a rail to see if there are any iron ingonts in the riddle. Place the materials on the crafting table with the ${settings?.controls.tableMapping.slice(0, 8).join(", ")} and ${settings?.controls.tableMapping[8]} keys.`
        },
        {
            guess: "piston0",
            requiredControl: [],
            text: `You are doing great! Now we know there are iron ingots in the riddle. Let's craft a item that contains lots of different materials... a piston! Piston is one of the best guess in the game.`
        },
        {
            guess: "axe0",
            requiredControl: [],
            text: `So now you might be confused. How can a riddle contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "recipe group". For example swords. Wooden sword and iron swords has the same recipe, but with different materials, so they are in a recipe group. So the riddle can be some kind of tool. Let's try to craft an axe.`
        },
        {
            guess: null,
            requiredControl: [],
            text: "Congratulations! You have completed the tutorial. Now you learned the basics of the game. See you next time!"
        }
    ]

    return script[index]
}

export function Tutorial(props: TutorialProps) {
    const [showTutorial, setShowTutorial] = useState(true)
    const currentStep = getText(props.turn)

    useEffect(() => {
        setShowTutorial(true)
        if(currentStep) {
            setTimeout(() => {
                SoundEffect.play("allay")
                for (let i = 0; i < currentStep.text.length; i++) {
                    if(i % 30 == 0) {
                        setTimeout(() => {
                            SoundEffect.play("write")
                        }, i * 20);
                    }
                }
            }, 1000);
        }
    }, [props.turn])

    return currentStep && <div id="tutorial" className={showTutorial ? "showTutorial" : "hideTutorial"}>
        <div id="tutorialContent">
            <p className="tutorialText">
                {currentStep.text.split(" ").map((word, wordIndex) => (
                    <span
                        key={wordIndex}
                        className="tutorialWord"
                        style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    >
                        {word.split("").map((letter, letterIndex) => {
                            const globalIndex = currentStep.text
                                .split(" ")
                                .slice(0, wordIndex)
                                .reduce((acc, curr) => acc + curr.length + 1, 0) + letterIndex;

                            return (
                                <span
                                    key={letterIndex}
                                    style={{ animationDelay: `${globalIndex * 0.02 + 1}s` }}
                                >
                                    {letter}
                                </span>
                            );
                        })}
                        <span>&nbsp;</span>
                    </span>
                ))}
            </p>
            <div id="tryIt" style={{ animationDelay: `${currentStep.text.length * 0.02 + 1}s` }}>
                <StoneButton onClick={() => { setShowTutorial(false) }}>Try It!</StoneButton>
            </div>
        </div>
        <img key={props.turn} id="allay" src={allay} alt="Allay" />
    </div>
}