import "../style.css"
import { CraftingTable } from "../pages/Game/CraftingTable";
import { useState } from "react";
import { Items } from "../classes/Items";
import { handlers } from "./handlers";

export default {
    title: "Components/CraftingTable",
    component: CraftingTable,
    parameters: {
        msw: {
            handlers: handlers,
        },
    },
};

let items = new Items([
    {
        "name": "Oak Planks",
        "id": "oak_planks",
        "src": "Oak_Planks.png"
    },
    {
        "name": "Stick",
        "id": "stick",
        "src": "Stick.png"
    }
])

export const Default = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks")],
        [null, items.getItem("stick")]
    ])
    return <CraftingTable craftingTable={tableContent} size={3} />;
}