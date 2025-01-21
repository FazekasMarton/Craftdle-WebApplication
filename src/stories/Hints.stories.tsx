import { Hints } from "../pages/Game/Hints";
import "../style.css";

export default {
    title: "Components/Hints",
    component: Hints,
};

const hints = [
    "This recipe requires (min) 2 of the slots",
    "Material(s) in this recipe are also found in: Moss Carpet",
    "Random material: Cobblestone",
    "The item you need to think about is: Mossy Cobblestone"
];

/**
 * Turn0 story for the Hints component.
 * @returns The Turn0 story.
 */
export const Turn0 = () => <Hints turn={0} hints={hints} />;

/**
 * Turn4 story for the Hints component.
 * @returns The Turn4 story.
 */
export const Turn4 = () => <Hints turn={4} hints={hints} />;

/**
 * Turn5 story for the Hints component.
 * @returns The Turn5 story.
 */
export const Turn5 = () => <Hints turn={5} hints={hints} />;

/**
 * Turn10 story for the Hints component.
 * @returns The Turn10 story.
 */
export const Turn10 = () => <Hints turn={10} hints={hints} />;

/**
 * Turn15 story for the Hints component.
 * @returns The Turn15 story.
 */
export const Turn15 = () => <Hints turn={15} hints={hints} />;

/**
 * Turn20 story for the Hints component.
 * @returns The Turn20 story.
 */
export const Turn20 = () => <Hints turn={20} hints={hints} />;