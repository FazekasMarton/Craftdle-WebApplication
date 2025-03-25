import React, { useEffect, useState } from "react"
import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"
import { craft } from "../../functions/craft"
import { IRecipeCollection } from "../../interfaces/IRecipe"
import { IItem, Items } from "../../classes/Items"
import { SoundEffect } from "../../classes/Audio"
import { Socket } from "socket.io-client"
import { setHelp } from "../../features/game/gameSlice"
import { store } from "../../app/store"
import { getTutorialScript } from "../../functions/getTutorialScript"
import { Item } from "./Item"
import { focus } from "../../classes/Focus"

/**
 * Props for the CraftingTable component.
 */
interface CraftingTableProps {
    size: 2 | 3,
    craftingTable: Array<Array<HTMLImageElement | null>>,
    recipes: IRecipeCollection,
    isKnowledgeBookOpen: boolean,
    setIsKnowledgeBookOpen: (isOpen: boolean) => void,
    socket: Socket | null,
    isHardcore: boolean,
    turn: number,
    gamemode: number,
    items: Items
}

/**
 * A React component that displays the crafting table and handles crafting logic.
 * 
 * @param props - The properties for the CraftingTable component, including size, recipes, and state handlers.
 * @returns A JSX element representing the crafting table interface.
 */
function CraftingTableRaw(props: CraftingTableProps) {
    const [craftedItemGroup, setCraftedItemGroup] = useState<string | null>(null)
    const [craftedItem, setCraftedItem] = useState<IItem | null>(null)

    /**
     * Determine the crafted item based on the current crafting table state and recipes.
     * Updates the crafted item and its group in the component's state.
     * 
     * @param craftingTable - The current state of the crafting table slots.
     * @param recipes - The collection of available recipes.
     */
    async function saveCraftedItem(craftingTable: Array<Array<HTMLImageElement | null>>, recipes: IRecipeCollection) {
        const craftedItem = craft(craftingTable, recipes)
        setCraftedItemGroup(craftedItem?.group ?? null)
        setCraftedItem(craftedItem?.id ?? null)
    }

    useEffect(() => {
        saveCraftedItem(props.craftingTable, props.recipes)
    }, [props.craftingTable, props.recipes])

    return <div id="craftingTable">
        <h1 id="craftingTitle">Crafting</h1>
        <table>
            <tbody>
                {props.craftingTable.map((row, rowIndex) => {
                    return rowIndex < props.size ? (
                        <tr key={rowIndex}>
                            {row.map((slot, slotIndex) => {
                                return slotIndex < props.size ? (
                                    <td
                                        key={slotIndex}
                                        id={`slot${rowIndex * 3 + slotIndex}`}
                                        className="slot craftingTableSlot"
                                        onMouseEnter={(e) => focus.saveFocus(e.currentTarget)}
                                        onMouseLeave={() => focus.saveFocus(null)}>
                                        {slot ? <Item item={slot} className="item" /> : null}
                                    </td>
                                ) : null
                            })}
                        </tr>
                    ) : null
                })}
            </tbody>
        </table>
        <img id="craftingArrow" src={arrow} alt="arrow" draggable={false} />
        <div id="craftedItem" className="slot" onClick={() => {
            const requiredItemByTutorial = getTutorialScript()[props.turn]?.guess
            const requiredControlByTutorial = store.getState().game.requiredControl
            if (craftedItemGroup && craftedItem && (((requiredItemByTutorial === craftedItemGroup || !requiredItemByTutorial) && requiredControlByTutorial?.length === 0) || props.gamemode != 1)) {
                const guess = {
                    item: {
                        group: craftedItemGroup,
                        id: craftedItem.id
                    },
                    table: props.craftingTable.flat(2).map(slot => {
                        const item = slot?.cloneNode() as HTMLImageElement
                        item?.classList.remove("item")
                        return item?.className ? [item?.className] : null
                    })
                }
                props.socket?.emit("guess", guess)
            } else {
                store.dispatch(setHelp(true))
            }
        }}>
            {craftedItem ? <Item item={props.items.getItem(craftedItem.id)} /> : null}
        </div>
        {props.isHardcore ? (
            <div id="craftingBook" className="slotButton" onClick={() => {
                props.setIsKnowledgeBookOpen(!props.isKnowledgeBookOpen)
                SoundEffect.play("click")
            }}>
                <img src={craftingBook} alt="Crafting Book" draggable={false} />
            </div>
        ) : null
        }
    </div>
}

export const CraftingTable = React.memo(CraftingTableRaw)