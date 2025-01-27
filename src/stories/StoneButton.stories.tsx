import { BrowserRouter } from "react-router-dom";
import { StoneButton } from "../components/StoneButton";
import "../style.css";

export default {
    title: "Components/StoneButton",
    component: StoneButton,
};

/**
 * Default story for the StoneButton component.
 * @returns The Default story.
 */
export const Default = () => <StoneButton>Default Button</StoneButton>;

/**
 * WithLink story for the StoneButton component.
 * @returns The WithLink story.
 */
export const WithLink = () => (
    <BrowserRouter>
        <StoneButton href="/test-link">Button with Link</StoneButton>
    </BrowserRouter>
);

/**
 * Disabled story for the StoneButton component.
 * @returns The Disabled story.
 */
export const Disabled = () => (
    <StoneButton disabled={true}>Disabled Button</StoneButton>
);