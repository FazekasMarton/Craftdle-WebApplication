import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"
import { Item } from "./Item"

interface CraftingTableProps {
    size: 2 | 3,
    craftingTable: Array<Array<HTMLImageElement | null>>
}

export function CraftingTable(props: CraftingTableProps) {
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
                                {item ? <Item item={item} className="item"/> : null}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
        <img id="craftingArrow" src={arrow} alt="arrow" />
        <div id="craftedItem" className="slot"></div>
        <div id="craftingBook" className="slotButton">
            <img src={craftingBook} alt="Crafting Book" />
        </div>
    </div>
}