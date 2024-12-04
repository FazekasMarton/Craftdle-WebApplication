import "../style.css"
import { CraftingTable } from "../pages/Game/CraftingTable";

export default {
    title: "Components/CraftingTable",
    component: CraftingTable,
};

export const Default = () => <CraftingTable size={3} />;

export const Pocket = () => <CraftingTable size={2} />;