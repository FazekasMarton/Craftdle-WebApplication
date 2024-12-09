import "../style.css"
import { CraftingTable } from "../pages/Game/CraftingTable";
import { useState } from "react";
import { Items } from "../classes/Items";
import { handlers } from "./handlers";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Cursor } from "../pages/Game/Cursor";

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
        [items.getItem("oak_planks"), null, null],
        [null, items.getItem("stick"), null],
        [null, null, null]
    ])

    return <>
        <CraftingTable craftingTable={tableContent} size={3} />
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent}/>
    </>
}