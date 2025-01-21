import { Button } from "../components/Button";
import "../style.css";

export default {
    title: "Components/Button",
    component: Button,
};

/**
 * Green button story.
 * @returns The Green button story.
 */
export const Green = () => <Button color="green">Green Button</Button>;

/**
 * Gray button story.
 * @returns The Gray button story.
 */
export const Gray = () => <Button color="gray">Gray Button</Button>;