import { store } from "../app/store";
import { DefaultSettings } from "../classes/DefaultSettings";
import { isUserPlayingOnPC } from "./isUserPlayingOnPC";

/**
 * Interface representing a tutorial step.
 */
interface IStep {
    guess: string | null, // The expected guess for the step.
    requiredControl: string[], // Controls required to complete the step.
    text: string, // Instructional text for the step.
    help: string | null // Optional help text for the step.
}

/**
 * Helper function to create a tutorial step.
 * 
 * @param guess - The expected guess for the step.
 * @param requiredControl - Controls required to complete the step.
 * @param text - Instructional text for the step.
 * @param help - Optional help text for the step.
 * @returns {IStep} A tutorial step object.
 */
function createStep(guess: string | null, requiredControl: string[], text: string, help: string | null): IStep {
    return { guess, requiredControl, text, help };
}

/**
 * Function to get the tutorial script based on the user's device and settings.
 * 
 * This function determines whether the user is playing on a PC or a mobile device
 * and returns the appropriate tutorial script. The script is customized based on
 * the user's control settings.
 * 
 * @returns {IStep[]} The tutorial script for the user's device.
 */
export function getTutorialScript() {
    const settings = store.getState().user.settings?.find(s => s.isSet) || DefaultSettings.getDefaultSettings();

    if (!isUserPlayingOnPC() || settings?.controls.isTapMode) {
        // Mobile tutorial script
        return [
            createStep(
                "planks0",
                [],
                `Welcome to the tutorial! Let's start by crafting {{planks}}, like in Minecraft. {{Select}} any type of {{log}} and {{place it}} on the {{crafting table}}. If you put too many materials on the crafting table, you can {{remove them}} by tapping on them.`,
                `You have to {{select}} a {{log}} and {{place it}} on the {{crafting table}}, to craft {{planks}}.`
            ),
            createStep(
                "armorStand0",
                [],
                `Great! As you can see, there is no {{wood}} or {{log}} in the {{riddle}}. Let's craft an {{armor stand}}. Select the {{stick}} and {{place it}} on the {{crafting table}}. If you don't know how to craft an item, you can look it up in the {{recipe book}}.`,
                `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft an {{armor stand}}.`
            ),
            createStep(
                "rail0",
                [],
                `Good job! Now we know there are two {{sticks}} in the {{riddle}} and we know one of its places. Let's craft a {{rail}} to see if there are any {{iron ingots}} in the {{riddle}}. {{Place}} the materials on the crafting table.`,
                `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft a {{rail}}.`
            ),
            createStep(
                "piston0",
                [],
                `You're doing great! Now we know there are {{iron ingots}} in the {{riddle}}. Let's craft an item that contains lots of different materials... a {{piston}}! {{Piston}} is one of the best guesses in the game.`,
                `You have to craft a {{piston}}.`
            ),
            createStep(
                "axe0",
                [],
                `So now you might be confused. How can a {{riddle}} contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "{{recipe group}}". For example {{swords}}. {{Wooden sword}} and {{iron sword}} have the same recipe, but with different materials, so they belong to a {{recipe group}}. So the {{riddle}} can be some kind of tool. Let's try to craft an {{axe}}.`,
                `You have to craft an {{axe}}.`
            ),
            createStep(
                null,
                [],
                "Congratulations! You have completed the tutorial. Now you have learned the basics of the game. See you next time!",
                null
            )
        ];
    } else {
        // PC tutorial script
        return [
            createStep(
                "planks0",
                ["PickUp"],
                `Welcome to the tutorial! Let's start by crafting {{planks}}, like in Minecraft. {{Pick up}} any type of {{log}} and {{drop it}} on the {{crafting table}} with the {{${settings?.controls.copy} key}}. If you put too many materials on the crafting table, you can {{remove them}} with the {{${settings?.controls.remove} key}}.`,
                `You have to {{pick up}} a {{log}} and {{drop it}} on the {{crafting table}}, to craft {{planks}}.`
            ),
            createStep(
                "armorStand0",
                ["Copy"],
                `Great! As you can see, there is no {{wood}} or {{log}} in the {{riddle}}. Let's craft an {{armor stand}}. Pick up the {{stick}} and {{copy it}} to the {{crafting table}} by {{holding}} the {{${settings?.controls.copy} key}}. If you don't know how to craft an item, you can look it up in the {{Knowledge Book}}.`,
                `You have to {{copy}} the {{stick}} on the {{crafting table}}, to craft an {{armor stand}}.`
            ),
            createStep(
                "rail0",
                ["Place"],
                `Good job! Now we know there are two {{sticks}} in the {{riddle}} and we know one of its places. Let's craft a {{rail}} to see if there are any {{iron ingots}} in the {{riddle}}. {{Place}} the materials on the crafting table by hovering them and pressing the {{${settings?.controls.tableMapping.slice(0, 8).join(", ")}}} and {{${settings?.controls.tableMapping[8]} keys}}.`,
                `You have to {{place}} the {{materials}} on the {{crafting table}}, to craft a {{rail}}.`
            ),
            createStep(
                "piston0",
                [],
                `You're doing great! Now we know there are {{iron ingots}} in the {{riddle}}. Let's craft an item that contains lots of different materials... a {{piston}}! {{Piston}} is one of the best guesses in the game.`,
                `You have to craft a {{piston}}.`
            ),
            createStep(
                "axe0",
                [],
                `So now you might be confused. How can a {{riddle}} contain and not contain the same material at the same time? The answer is simple: in the game some recipes are in a "{{recipe group}}". For example {{swords}}. {{Wooden sword}} and {{iron sword}} have the same recipe, but with different materials, so they belong to a {{recipe group}}. So the {{riddle}} might be a type of tool. Let's try to craft an {{axe}}.`,
                `You have to craft an {{axe}}.`
            ),
            createStep(
                null,
                [],
                "Congratulations! You have completed the tutorial. Now you have learned the basics of the game. See you next time!",
                null
            )
        ];
    }
}