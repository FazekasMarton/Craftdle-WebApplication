import "../style.css"
import { CraftingTable } from "../pages/Game/CraftingTable";
import { useState } from "react";
import { IItem, Items } from "../classes/Items";
import { handlers } from "./handlers";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Cursor } from "../pages/Game/Cursor";
import { IRecipeCollection } from "../interfaces/IRecipe";
import { Game } from "../pages/Game/Game";
import { Hints } from "../pages/Game/Hints";
import { Tips } from "../pages/Game/Tips";
import { ITips } from "../interfaces/ITips";
import { Inventory } from "../pages/Game/Inventory";
import { StoneButton } from "../components/StoneButton";
import { BrowserRouter } from "react-router-dom";
import { KnowledgeBook } from "../pages/Game/KnowledgeBook";
import { Hearts } from "../pages/Game/Hearts";

export default {
    title: "Pages/Game",
    component: Game,
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

items.addItems(Object.values(recipes).flat().map(recipe => ({
    name: recipe.name,
    id: recipe.id,
    src: recipe.src
})));

const hints = [
    "This recipe requires (min) 2 of the slots",
    "Material(s) in this recipe are also found in: Moss Carpet",
    "Random material: Cobblestone",
    "The item you need to think about is: Mossy Cobblestone"
];

const tips: ITips = [
    {
        item: {
            id: "firework_star",
            name: "Firework Star",
            src: "Firework_Star.png"
        },
        table: [
            {
                item: "gunpowder",
                status: "correct"
            },
            {
                item: "paper",
                status: "wrong"
            },
            {
                item: "firework_star",
                status: "wrong"
            },
            null,
            null,
            {
                item: "firework_star",
                status: "semi-correct"
            },
            null,
            null,
            {
                item: "firework_star",
                status: "correct"
            }
        ]
    },
    {
        item: {
            id: "firework_rocket",
            name: "Firework Rocket",
            src: "Firework_Rocket.png"
        },
        table: [
            {
                item: "oak_planks",
                status: "correct"
            },
            {
                item: "spruce_planks",
                status: "wrong"
            },
            {
                item: "firework_star",
                status: "correct"
            },
            null,
            null,
            {
                item: "stick",
                status: "semi-correct"
            },
            null,
            null,
            {
                item: "firework_star",
                status: "correct"
            }
        ]
    }
]

export const DefaultWithTestData = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    const [isKnowledgeBookOpen, setIsKnowledgeBookOpen] = useState(false);

    const craftingTableSize = 3;

    console.log(tableContent);

    return <BrowserRouter>
        <div id="game">
            <StoneButton href="/">Quit Game</StoneButton>
            <CraftingTable craftingTable={tableContent} size={craftingTableSize} items={items} recipes={recipes} isKnowledgeBookOpen={isKnowledgeBookOpen} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen}/>
            <Hints hints={hints} turn={18} />
            <Tips tips={tips} craftingTableSize={craftingTableSize} itemsCollection={items} />
            {
                isKnowledgeBookOpen ? <KnowledgeBook setCraftingTable={setTableContent} recipes={recipes} items={items} craftingTableSize={craftingTableSize} /> : <Inventory items={items} itemsCollection={itemsCollection} />
            }
            <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
        </div>
    </BrowserRouter>
};

export const PocketWithTestData = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    const [isKnowledgeBookOpen, setIsKnowledgeBookOpen] = useState(false);

    const craftingTableSize = 2;

    return <BrowserRouter>
        <div id="game">
            <StoneButton href="/">Quit Game</StoneButton>
            <CraftingTable craftingTable={tableContent} size={craftingTableSize} items={items} recipes={recipes} isKnowledgeBookOpen={isKnowledgeBookOpen} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen}/>
            <Hints hints={hints} turn={18} />
            <Tips tips={tips} craftingTableSize={craftingTableSize} itemsCollection={items} />
            {
                isKnowledgeBookOpen ? <KnowledgeBook setCraftingTable={setTableContent} recipes={recipes} items={items} craftingTableSize={craftingTableSize} /> : <Inventory items={items} itemsCollection={itemsCollection} />
            }
            <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
        </div>
    </BrowserRouter>
};

export const HardcoreWithTestData = () => {
    const [tableContent, setTableContent] = useState([
        [items.getItem("oak_planks"), null, null],
        [items.getItem("iron_ingot"), items.getItem("stick"), null],
        [null, null, null]
    ]);

    const [isKnowledgeBookOpen, setIsKnowledgeBookOpen] = useState(false);

    const craftingTableSize = 3;

    console.log(tableContent);

    return <BrowserRouter>
        <div id="game">
            <StoneButton href="/">Quit Game</StoneButton>
            <CraftingTable craftingTable={tableContent} size={craftingTableSize} items={items} recipes={recipes} isKnowledgeBookOpen={isKnowledgeBookOpen} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen}/>
            <Hearts turn={11} maxHearts={10} />
            <Tips tips={tips} craftingTableSize={craftingTableSize} itemsCollection={items} />
            {
                isKnowledgeBookOpen ? <KnowledgeBook setCraftingTable={setTableContent} recipes={recipes} items={items} craftingTableSize={craftingTableSize} /> : <Inventory items={items} itemsCollection={itemsCollection} />
            }
            <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
        </div>
    </BrowserRouter>
};