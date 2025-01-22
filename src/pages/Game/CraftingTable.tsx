import { useEffect, useState } from "react"
import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"
import { Item } from "./Item"
import { craft } from "../../functions/craft"
import { IRecipeCollection } from "../../interfaces/IRecipe"
import { Items } from "../../classes/Items"
import { SoundEffect } from "../../classes/Audio"
import { Socket } from "socket.io-client"
import { getScript } from "../../features/game/gameSlice"

/**
 * Props for the CraftingTable component.
 */
interface CraftingTableProps {
    size: 2 | 3,
    craftingTable: Array<Array<HTMLImageElement | null>>,
    recipes: IRecipeCollection,
    items: Items,
    isKnowledgeBookOpen: boolean,
    setIsKnowledgeBookOpen: (isOpen: boolean) => void,
    socket: Socket | null,
    isHardcore: boolean,
    turn: number,
}

/**
 * CraftingTable component to display the crafting table and handle crafting logic.
 * @param props - The properties for the CraftingTable component.
 * @returns The CraftingTable component.
 */
export function CraftingTable(props: CraftingTableProps) {
    const [craftedItemGroup, setCraftedItemGroup] = useState<string | null>(null)
    const [craftedItemId, setCraftedItemId] = useState<HTMLImageElement | null>(null)

    useEffect(() => {
        let craftedItem = craft(props.craftingTable, props.recipes)
        setCraftedItemGroup(craftedItem?.group ?? null)
        setCraftedItemId(craftedItem?.id ? props.items.getItem(craftedItem.id) : null)
    }, [props.craftingTable])

    return <div id="craftingTable">
        <h1 id="craftingTitle">Crafting</h1>
        <table>
            <tbody>
                {Array.from({ length: props.size }).map((_, rowIndex) => {
                    return <tr key={rowIndex}>
                        {Array.from({ length: props.size }).map((_, slotIndex) => {
                            const item = props.craftingTable[rowIndex]?.[slotIndex]
                            if (!item?.parentElement?.classList.contains("inventorySlot")) {
                                item?.classList.remove("item")
                            }
                            return <td key={slotIndex} id={`slot${rowIndex * 3 + slotIndex}`} className="slot craftingTableSlot">
                                {item ? <Item item={item} className="item" /> : null}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
        <img id="craftingArrow" src={arrow} alt="arrow" />
        <div id="craftedItem" className="slot" onClick={() => {
            let requiredItemByTutorial = getScript()[props.turn]?.guess
            if (craftedItemGroup && craftedItemId && (requiredItemByTutorial === craftedItemGroup || !requiredItemByTutorial)) {
                let guess = {
                    item: {
                        group: craftedItemGroup,
                        id: craftedItemId.className
                    },
                    table: props.craftingTable.flat(2).map(slot => {
                        let item = slot?.cloneNode() as HTMLImageElement
                        item?.classList.remove("item")
                        return item?.className ? [item?.className] : null
                    })
                }
                props.socket?.emit("guess", guess)
            }
        }}>
            {craftedItemId ? <Item item={craftedItemId} /> : null}
        </div>
        {props.isHardcore ? (
            <div id="craftingBook" className="slotButton" onClick={() => {
                props.setIsKnowledgeBookOpen(!props.isKnowledgeBookOpen)
                SoundEffect.play("click")
            }}>
                <img src={craftingBook} alt="Crafting Book" />
            </div>
        ) : null
        }
    </div>
}