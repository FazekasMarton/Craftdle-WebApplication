import "../style.css"
import { Items } from "../classes/Items";
import { handlers } from "./handlers";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { IRecipeCollection } from "../interfaces/IRecipe";
import { KnowledgeBook } from "../pages/Game/KnowledgeBook";

export default {
    title: "Components/KnowledgeBook",
    component: KnowledgeBook,
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
    "sword0": [
        {
            "id": "ironSword",
            "name": "Iron Sword",
            "recipe": [
                [null, ["iron_ingot"], null],
                [null, ["iron_ingot"], null],
                [null, ["stick"], null]
            ],
            "shapeless": false,
            "src": "Tripwire_Hook.png"
        },
        {
            "id": "woodenSword",
            "name": "Wooden Sword",
            "recipe": [
                [null, ["oak_planks", "spruce_planks", "birch_planks", "jungle_planks", "acacia_planks", "dark_oak_planks", "mangrove_planks", "cherry_planks", "pale_oak_planks", "bamboo_planks", "crimson_planks", "warped_planks"], null],
                [null, ["oak_planks", "spruce_planks", "birch_planks", "jungle_planks", "acacia_planks", "dark_oak_planks", "mangrove_planks", "cherry_planks", "pale_oak_planks", "bamboo_planks", "crimson_planks", "warped_planks"], null],
                [null, ["stick"], null]
            ],
            "shapeless": false,
            "src": "Firework_Star.png"
        }
    ],
};

items.addItems(Object.values(recipes).flat().map(recipe => ({
    name: recipe.name,
    id: recipe.id,
    src: recipe.src
})));

/**
 * Function to handle changes in the crafting table.
 * @param value - The new content of the crafting table.
 */
function setCraftingTable(value: (HTMLImageElement | null)[][]){
    console.log("Crafting Table's content changed: ", value)
}

/**
 * Default story for the KnowledgeBook component.
 * @returns The Default story.
 */
export const Default = () => {
    return <KnowledgeBook setCraftingTable={setCraftingTable} recipes={recipes} items={items} craftingTableSize={3}/>
};

/**
 * Pocket story for the KnowledgeBook component.
 * @returns The Pocket story.
 */
export const Pocket = () => {
    return <KnowledgeBook setCraftingTable={setCraftingTable} recipes={recipes} items={items} craftingTableSize={2}/>
};