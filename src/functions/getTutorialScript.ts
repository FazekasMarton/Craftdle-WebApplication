import { store } from "../app/store";

interface IStep {
    guess: string | null,
    requiredControl: string[],
    text: string,
    help: string | null
}

export function getTutorialScript() {
    const settings = store.getState().user.settings?.find(s => s.isSet)

    const tutorialScript: IStep[] = [
        {
            guess: "planks0",
            requiredControl: ["PickUp"],
            text: `Welcome to the tutorial! Let's start by crafting a {{planks}}, like in Minecraft. {{Pick up}} any type of {{log}} and {{drop it}} on the {{crafting table}} with the {{${settings?.controls.copy} key}}. If you put too much materials on the crafting table, you can {{remove it}} with the {{${settings?.controls.remove} key}}.`,
            help: `You have to {{pick up}} a {{log}} and {{drop it}} on the {{crafting table}}, to craft a {{planks}}.`
        },
        {
            guess: "armorStand0",
            requiredControl: ["Copy"],
            text: `Great! How you can see, there is no {{wood}} and {{log}} in the {{riddle}}. Let's craft an {{armor stand}}. Pick up the {{stick}} and {{copy it}} along the {{crafting table}} with the {{${settings?.controls.copy} key}}. If you don't know how to craft an item, you can look it up in the {{recipe book}}.`,
            help: `You have to {{copy}} a {{stick}} on the {{crafting table}}, to craft an {{armor stand}}.`
        },
        {
            guess: "rail0",
            requiredControl: ["Place"],
            text: `Good job! Now we know there are two {{sticks}} in the {{riddle}} and we know one of it's place. Let's craft a {{rail}} to see if there are any {{iron ingonts}} in the {{riddle}}. {{Place}} the materials on the crafting table with the {{${settings?.controls.tableMapping.slice(0, 8).join(", ")}}} and {{${settings?.controls.tableMapping[8]} keys}}.`,
            help: `You have to {{place}} the {{sticks}} on the {{crafting table}}, to craft a {{rail}}.`
        },
        {
            guess: "piston0",
            requiredControl: [],
            text: `You are doing great! Now we know there are {{iron ingots}} in the {{riddle}}. Let's craft a item that contains lots of different materials... a {{piston}}! {{Piston}} is one of the best guess in the game.`,
            help: `You have craft a {{piston}}.`
        },
        {
            guess: "axe0",
            requiredControl: [],
            text: `So now you might be confused. How can a {{riddle}} contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "{{recipe group}}". For example {{swords}}. {{Wooden sword}} and {{iron swords}} has the same recipe, but with different materials, so they are in a {{recipe group}}. So the {{riddle}} can be some kind of tool. Let's try to craft an {{axe}}.`,
            help: `You have to craft an {{axe}}.`
        },
        {
            guess: null,
            requiredControl: [],
            text: "Congratulations! You have completed the tutorial. Now you learned the basics of the game. See you next time!",
            help: null,
        }
    ]

    return tutorialScript;
}