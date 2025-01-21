import "../style.css";
import { Items } from "../classes/Items";
import { handlers } from "./handlers";
import { Tips } from "../pages/Game/Tips";
import { ITips } from "../interfaces/ITips";

export default {
    title: "Components/Tips",
    component: Tips,
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

/**
 * Default story for the Tips component.
 * @returns The Default story.
 */
export const Default = () => {
    return <Tips tips={tips} craftingTableSize={3} itemsCollection={items} />;
};