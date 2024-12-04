import arrow from "../../assets/imgs/icons/arrow.png"
import craftingBook from "../../assets/imgs/icons/recipe_book.png"

interface CraftingTableProps {
    size: 2 | 3
}

export function CraftingTable(props: CraftingTableProps) {
    return <div id="craftingTable">
        <h1 id="craftingTitle">Crafting</h1>
        <table>
            <tbody>
                {Array.from({ length: props.size }).map((_, index) => {
                    return <tr key={index}>
                        {Array.from({ length: props.size }).map((_, index) => {
                            return <td key={index} className="slot"></td>
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