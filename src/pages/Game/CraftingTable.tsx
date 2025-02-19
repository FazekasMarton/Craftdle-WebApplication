import { useEffect, useState } from "react"
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
 * CraftingTable component to display the crafting table and handle crafting logic.
 * @param props - The properties for the CraftingTable component.
 * @returns The CraftingTable component.
 */
export function CraftingTable(props: CraftingTableProps) {
    const [craftedItemGroup, setCraftedItemGroup] = useState<string | null>(null)
    const [craftedItem, setCraftedItem] = useState<IItem | null>(null)

    async function saveCraftedItem(craftingTable: Array<Array<HTMLImageElement | null>>, recipes: IRecipeCollection) {
        let craftedItem = craft(craftingTable, recipes)
        setCraftedItemGroup(craftedItem?.group ?? null)
        setCraftedItem(craftedItem?.id ?? null)
    }

    useEffect(() => {
        saveCraftedItem(props.craftingTable, props.recipes)
    }, [props.craftingTable])

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
            let requiredItemByTutorial = getTutorialScript()[props.turn]?.guess
            let requiredControlByTutorial = store.getState().game.requiredControl
            if (craftedItemGroup && craftedItem && (((requiredItemByTutorial === craftedItemGroup || !requiredItemByTutorial) && requiredControlByTutorial?.length === 0) || props.gamemode != 1)) {
                let guess = {
                    item: {
                        group: craftedItemGroup,
                        id: craftedItem.id
                    },
                    table: props.craftingTable.flat(2).map(slot => {
                        let item = slot?.cloneNode() as HTMLImageElement
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