import { BrowserRouter } from "react-router-dom";
import { StoneButton } from "../components/StoneButton";
import "../style.css"

export default {
    title: "Components/StoneButton",
    component: StoneButton,
};

export const Default = () => <StoneButton>Default Button</StoneButton>;

export const WithLink = () => (
    <BrowserRouter>
        <StoneButton href="/test-link">Button with Link</StoneButton>
    </BrowserRouter>
);

export const Disabled = () => (
    <StoneButton disabled={true}>Disabled Button</StoneButton>
);