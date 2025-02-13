import { useEffect, useState } from "react"
import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"
import { getItem, Item } from "./Item"
import { craft } from "../../functions/craft"
import { IRecipeCollection } from "../../interfaces/IRecipe"
import { Items } from "../../classes/Items"
import { SoundEffect } from "../../classes/Audio"
import { Socket } from "socket.io-client"
import { setHelp } from "../../features/game/gameSlice"
import { store } from "../../app/store"
import { getTutorialScript } from "../../functions/getTutorialScript"

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
    gamemode: number
}

/**
 * CraftingTable component to display the crafting table and handle crafting logic.
 * @param props - The properties for the CraftingTable component.
 * @returns The CraftingTable component.
 */
export function CraftingTable(props: CraftingTableProps) {
    const [craftedItemGroup, setCraftedItemGroup] = useState<string | null>(null)
    const [craftedItem, setCraftedItem] = useState<HTMLImageElement | null>(null)

    async function saveCraftedItem(craftingTable: Array<Array<HTMLImageElement | null>>, recipes: IRecipeCollection, items: Items) {
        let craftedItem = craft(craftingTable, recipes)
        setCraftedItemGroup(craftedItem?.group ?? null)
        if(craftedItem?.id) {
            let itemElement = await getItem(craftedItem.id, items)
            itemElement && setCraftedItem(itemElement)
        } else {
            setCraftedItem(null)
        }
    }

    useEffect(() => {
        saveCraftedItem(props.craftingTable, props.recipes, props.items)
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
                                    <td key={slotIndex} id={`slot${rowIndex * 3 + slotIndex}`} className="slot craftingTableSlot">
                                        {slot ? <Item itemId={slot.className} items={props.items} className="item" /> : null}
                                    </td>
                                ) : null
                            })}
                        </tr>
                    ) : null
                })}
            </tbody>
        </table>
        <img id="craftingArrow" src={arrow} alt="arrow" draggable={false}/>
        <div id="craftedItem" className="slot" onClick={() => {
            let requiredItemByTutorial = getTutorialScript()[props.turn]?.guess
            let requiredControlByTutorial = store.getState().game.requiredControl
            if (craftedItemGroup && craftedItem && (((requiredItemByTutorial === craftedItemGroup || !requiredItemByTutorial) && requiredControlByTutorial?.length === 0) || props.gamemode != 1)) {
                let guess = {
                    item: {
                        group: craftedItemGroup,
                        id: craftedItem.className
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
            {craftedItem ? <Item itemId={craftedItem.className} items={props.items}/> : null}
        </div>
        {props.isHardcore ? (
            <div id="craftingBook" className="slotButton" onClick={() => {
                props.setIsKnowledgeBookOpen(!props.isKnowledgeBookOpen)
                SoundEffect.play("click")
            }}>
                <img src={craftingBook} alt="Crafting Book" draggable={false}/>
            </div>
        ) : null
        }
    </div>
}