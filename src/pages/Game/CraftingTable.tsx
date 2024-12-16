import { useEffect, useState } from "react"
import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"
import { Item } from "./Item"
import { craft } from "../../functions/craft"
import { IRecipeCollection } from "../../interfaces/IRecipe"

interface CraftingTableProps {
    size: 2 | 3,
    craftingTable: Array<Array<HTMLImageElement | null>>,
    recipes: IRecipeCollection
}

export function CraftingTable(props: CraftingTableProps) {
    const [craftedItem, setCraftedItem] = useState<HTMLImageElement | null>(null)

    useEffect(() => {
        setCraftedItem(craft(props.craftingTable))
    }, [props.craftingTable])

    return <div id="craftingTable">
        <h1 id="craftingTitle">Crafting</h1>
        <table>
            <tbody>
                {Array.from({ length: props.size }).map((_, rowIndex) => {
                    return <tr key={rowIndex}>
                        {Array.from({ length: props.size }).map((_, slotIndex) => {
                            const item = props.craftingTable[rowIndex]?.[slotIndex]
                            item?.classList.remove("item")
                            return <td key={slotIndex} id={`slot${rowIndex * 3 + slotIndex}`} className="slot">
                                {item ? <Item item={item} className="item" /> : null}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
        <img id="craftingArrow" src={arrow} alt="arrow" />
        <div id="craftedItem" className="slot">
            {craftedItem ? <Item item={craftedItem}/> : null}
        </div>
        <div id="craftingBook" className="slotButton">
            <img src={craftingBook} alt="Crafting Book" />
        </div>
    </div>
}