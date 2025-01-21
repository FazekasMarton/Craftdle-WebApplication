import "../style.css";
import { CraftingTable } from "../pages/Game/CraftingTable";
import { useState } from "react";
import { Items } from "../classes/Items";
import { handlers } from "./handlers";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Cursor } from "../pages/Game/Cursor";
import { IRecipeCollection } from "../interfaces/IRecipe";

export default {
    title: "Components/CraftingTable",
    component: CraftingTable,
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

// Initialize items
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
]);

// Define recipes
const recipes: IRecipeCollection = {
    "fireworkRocket0": [
        {
            "id": "firework_rocket",
            "name": "Firework Rocket",
            "recipe": {
                "optional": [
                    "gunpowder",
                    "gunpowder",
                    "firework_star",
                    "firework_star",
                    "firework_star",
                    "firework_star",
                    "firework_star",
                    "firework_star",
                    "firework_star"
                ],
                "required": [
                    "gunpowder",
                    "paper"
                ]
            },
            "shapeless": true,
            "src": "Firework_Rocket.png"
        }
    ],
    "tripwireHook0": [
        {
            "id": "tripwire_hook",
            "name": "Tripwire Hook",
            "recipe": [
                [null, ["iron_ingot"], null],
                [null, ["stick"], null],
                [null, [
                    "oak_planks",
                    "spruce_planks",
                    "birch_planks",
                    "jungle_planks",
                    "acacia_planks",
                    "dark_oak_planks",
                    "mangrove_planks",
                    "cherry_planks",
                    "pale_oak_planks",
                    "bamboo_planks",
                    "crimson_planks",
                    "warped_planks"
                ], null]
            ],
            "shapeless": false,
            "src": "Tripwire_Hook.png"
        }
    ],
};

// Add items to the Items instance
items.addItems(Object.values(recipes).flat().map(recipe => ({
    name: recipe.name,
    id: recipe.id,
    src: recipe.src
})));

/**
 * Function to handle opening the Knowledge Book.
 * @param value - Boolean indicating if the Knowledge Book is open.
 */
function setIsKnowledgeBookOpen(value: boolean) {
    console.log("Knowledge Book opened: " + value);
}

/**
 * Default non-shapeless story.
 * @returns The DefaultNonShapeless component.
 */
export const DefaultNonShapeless = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    return <>
        <CraftingTable isHardcore={false} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} isKnowledgeBookOpen recipes={recipes} craftingTable={tableContent} size={3} items={items} socket={null} />
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </>;
};

/**
 * Default shapeless story.
 * @returns The DefaultShapeless component.
 */
export const DefaultShapeless = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("paper"), null, null],
        [null, items.getItem("gunpowder"), null],
        [null, null, null]
    ]);

    return <>
        <CraftingTable isHardcore={false} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} isKnowledgeBookOpen recipes={recipes} craftingTable={tableContent} size={3} items={items} socket={null} />
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </>;
};

/**
 * Pocket non-shapeless story.
 * @returns The PocketNonShapeless component.
 */
export const PocketNonShapeless = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    return <>
        <CraftingTable isHardcore={false} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} isKnowledgeBookOpen recipes={recipes} craftingTable={tableContent} size={2} items={items} socket={null} />
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </>;
};

/**
 * Pocket shapeless story.
 * @returns The PocketShapeless component.
 */
export const PocketShapeless = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("paper"), null, null],
        [null, items.getItem("gunpowder"), null],
        [null, null, null]
    ]);

    return <>
        <CraftingTable isHardcore={false} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} isKnowledgeBookOpen recipes={recipes} craftingTable={tableContent} size={2} items={items} socket={null} />
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </>;
};