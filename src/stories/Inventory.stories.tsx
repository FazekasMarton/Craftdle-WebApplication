import { useState } from "react";
import { IItem, Items } from "../classes/Items";
import { Cursor } from "../pages/Game/Cursor";
import { Inventory } from "../pages/Game/Inventory";
import "../style.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { handlers } from "./handlers";

export default {
    title: "Components/Inventory",
    component: Inventory,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
    parameters: {
        msw: {
            handlers: handlers,
        },
    },
};

const itemsCollection: IItem[] = [
    {
        "name": "Oak Planks",
        "id": "oak_planks",
        "src": "Oak_Planks.png"
    },
    {
        "name": "Stick",
        "id": "stick",
        "src": "Stick.png"
    },
    {
        "name": "Iron Ingot",
        "id": "iron_ingot",
        "src": "Iron_Ingot.png"
    },
    {
        "name": "Spruce Planks",
        "id": "spruce_planks",
        "src": "Spruce_Planks.png"
    },
    {
        "name": "Birch Planks",
        "id": "birch_planks",
        "src": "Birch_Planks.png"
    },
    {
        "name": "Jungle Planks",
        "id": "jungle_planks",
        "src": "Jungle_Planks.png"
    },
    {
        "name": "Acacia Planks",
        "id": "acacia_planks",
        "src": "Acacia_Planks.png"
    },
    {
        "name": "Dark Oak Planks",
        "id": "dark_oak_planks",
        "src": "Dark_Oak_Planks.png"
    },
    {
        "name": "Mangrove Planks",
        "id": "mangrove_planks",
        "src": "Mangrove_Planks.png"
    },
    {
        "name": "Cherry Planks",
        "id": "cherry_planks",
        "src": "Cherry_Planks.png"
    },
    {
        "name": "Pale Oak Planks",
        "id": "pale_oak_planks",
        "src": "Pale_Oak_Planks.png"
    },
    {
        "name": "Bamboo Planks",
        "id": "bamboo_planks",
        "src": "Bamboo_Planks.png"
    },
    {
        "name": "Crimson Planks",
        "id": "crimson_planks",
        "src": "Crimson_Planks.png"
    },
    {
        "name": "Warped Planks",
        "id": "warped_planks",
        "src": "Warped_Planks.png"
    },
    {
        "name": "Gunpowder",
        "id": "gunpowder",
        "src": "Gunpowder.png"
    },
    {
        "name": "Paper",
        "id": "paper",
        "src": "Paper.png"
    },
    {
        "name": "Firework Star",
        "id": "firework_star",
        "src": "Firework_Star.png"
    }
]

let items = new Items(itemsCollection);

/**
 * Default story for the Inventory component.
 * @returns The Default story.
 */
export const Default = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    return <>
        <Inventory itemsCollection={itemsCollection} items={items}/>
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </>;
};