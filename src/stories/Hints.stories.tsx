import { Hints } from "../pages/Game/Hints";
import "../style.css"

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

export const Turn0 = () => <Hints turn={0} hints={hints} />;

export const Turn4 = () => <Hints turn={4} hints={hints} />;

export const Turn5 = () => <Hints turn={5} hints={hints} />;

export const Turn10 = () => <Hints turn={10} hints={hints} />;

export const Turn15 = () => <Hints turn={15} hints={hints} />;

export const Turn20 = () => <Hints turn={20} hints={hints} />;