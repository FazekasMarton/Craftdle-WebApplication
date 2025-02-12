import { store } from "../app/store";
import { DefaultSettings } from "../classes/DefaultSettings";
import { isUserPlayingOnPC } from "./isUserPlayingOnPC";

interface IStep {
    guess: string | null,
    requiredControl: string[],
    text: string,
    help: string | null
}

export function getTutorialScript() {
    const settings = store.getState().user.settings?.find(s => s.isSet) || DefaultSettings.getDefaultSettings()

    const tutorialScriptForPC: IStep[] = [
        {
            guess: "planks0",
            requiredControl: ["PickUp"],
            text: `Welcome to the tutorial! Let's start by crafting {{planks}}, like in Minecraft. {{Pick up}} any type of {{log}} and {{drop it}} on the {{crafting table}} with the {{${settings?.controls.copy} key}}. If you put too many materials on the crafting table, you can {{remove them}} with the {{${settings?.controls.remove} key}}.`,
            help: `You have to {{pick up}} a {{log}} and {{drop it}} on the {{crafting table}}, to craft {{planks}}.`
        },
        {
            guess: "armorStand0",
            requiredControl: ["Copy"],
            text: `Great! As you can see, there is no {{wood}} or {{log}} in the {{riddle}}. Let's craft an {{armor stand}}. Pick up the {{stick}} and {{copy it}} to the {{crafting table}} with the {{${settings?.controls.copy} key}}. If you don't know how to craft an item, you can look it up in the {{recipe book}}.`,
            help: `You have to {{copy}} the {{stick}} on the {{crafting table}}, to craft an {{armor stand}}.`
        },
        {
            guess: "rail0",
            requiredControl: ["Place"],
            text: `Good job! Now we know there are two {{sticks}} in the {{riddle}} and we know one of its places. Let's craft a {{rail}} to see if there are any {{iron ingots}} in the {{riddle}}. {{Place}} the materials on the crafting table with the {{${settings?.controls.tableMapping.slice(0, 8).join(", ")}}} and {{${settings?.controls.tableMapping[8]} keys}}.`,
            help: `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft a {{rail}}.`
        },
        {
            guess: "piston0",
            requiredControl: [],
            text: `You're doing great! Now we know there are {{iron ingots}} in the {{riddle}}. Let's craft an item that contains lots of different materials... a {{piston}}! {{Piston}} is one of the best guesses in the game.`,
            help: `You have to craft a {{piston}}.`
        },
        {
            guess: "axe0",
            requiredControl: [],
            text: `So now you might be confused. How can a {{riddle}} contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "{{recipe group}}". For example {{swords}}. {{Wooden sword}} and {{iron sword}} have the same recipe, but with different materials, so they belong to a {{recipe group}}. So the {{riddle}} might be a type of tool. Let's try to craft an {{axe}}.`,
            help: `You have to craft an {{axe}}.`
        },
        {
            guess: null,
            requiredControl: [],
            text: "Congratulations! You have completed the tutorial. Now you have learned the basics of the game. See you next time!",
            help: null,
        }
    ]

    const tutorialScriptForMobile: IStep[] = [
        {
            guess: "planks0",
            requiredControl: [],
            text: `Welcome to the tutorial! Let's start by crafting {{planks}}, like in Minecraft. {{Select}} any type of {{log}} and {{place it}} on the {{crafting table}}. If you put too many materials on the crafting table, you can {{remove them}} by tapping on them.`,
            help: `You have to {{select}} a {{log}} and {{place it}} on the {{crafting table}}, to craft {{planks}}.`
        },
        {
            guess: "armorStand0",
            requiredControl: [],
            text: `Great! As you can see, there is no {{wood}} or {{log}} in the {{riddle}}. Let's craft an {{armor stand}}. Select the {{stick}} and {{place it}} on the {{crafting table}}. If you don't know how to craft an item, you can look it up in the {{recipe book}}.`,
            help: `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft an {{armor stand}}.`
        },
        {
            guess: "rail0",
            requiredControl: [],
            text: `Good job! Now we know there are two {{sticks}} in the {{riddle}} and we know one of its places. Let's craft a {{rail}} to see if there are any {{iron ingots}} in the {{riddle}}. {{Place}} the materials on the crafting table.`,
            help: `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft a {{rail}}.`
        },
        {
            guess: "piston0",
            requiredControl: [],
            text: `You're doing great! Now we know there are {{iron ingots}} in the {{riddle}}. Let's craft an item that contains lots of different materials... a {{piston}}! {{Piston}} is one of the best guesses in the game.`,
            help: `You have to craft a {{piston}}.`
        },
        {
            guess: "axe0",
            requiredControl: [],
            text: `So now you might be confused. How can a {{riddle}} contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "{{recipe group}}". For example {{swords}}. {{Wooden sword}} and {{iron sword}} have the same recipe, but with different materials, so they belong to a {{recipe group}}. So the {{riddle}} can be some kind of tool. Let's try to craft an {{axe}}.`,
            help: `You have to craft an {{axe}}.`
        },
        {
            guess: null,
            requiredControl: [],
            text: "Congratulations! You have completed the tutorial. Now you have learned the basics of the game. See you next time!",
            help: null,
        }
    ]

    return !isUserPlayingOnPC() || settings?.controls.isTapMode ? tutorialScriptForMobile : tutorialScriptForPC;
}