import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"

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
                            return <td key={slotIndex} className="slot">
                                { item ? <img className={`item ${item.className}`} src={item.src} alt={item.alt}/> : null }
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