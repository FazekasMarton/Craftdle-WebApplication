import { Button } from "../components/Button";
import "../style.css"

export default {
    title: "Components/Button",
    component: Button,
};

export const Green = () => <Button color="green">Green Button</Button>;

export const Gray = () => <Button color="gray">Gray Button</Button>;