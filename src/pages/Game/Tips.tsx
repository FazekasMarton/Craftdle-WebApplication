import { Items } from "../../classes/Items"
import { ITips } from "../../interfaces/ITips"
import { Item } from "./Item"
import arrow from "../../assets/imgs/icons/arrow.png"
import { focus } from "../../classes/Focus"

/**
 * Props for the Tips component.
 */
interface TipsProps {
    tips: ITips,
    craftingTableSize: number,
    itemsCollection: Items
}

/**
 * Tips component to display crafting tips.
 * 
 * This component renders a list of crafting tips, where each tip includes a crafting table
 * and the resulting item. It dynamically generates the crafting table based on the provided
 * `craftingTableSize` and highlights the slots with items.
 * 
 * @param props - The properties for the Tips component.
 * @param props.tips - An array of tips, each containing a crafting table and the resulting item.
 * @param props.craftingTableSize - The size of the crafting table (e.g., 3x3).
 * @param props.itemsCollection - The collection of items used to retrieve item details.
 * @returns The Tips component.
 */
export function Tips(props: TipsProps) {
    return <div id="tips">
        <h1 id="tipsTitle">Tips:</h1>
        <div id="tipsContainer">
            <div id="tipsContent">
                {
                    props.tips.map((tip, tipIndex) => {
                        // Add the resulting item to the items collection
                        props.itemsCollection.addItem(tip.item)
                        return <div key={tipIndex} className="tipContent">
                            <table className="tipCraftingTable">
                                <tbody>
                                    {
                                        // Generate rows and columns for the crafting table
                                        Array.from({ length: 3 }).map((_, i) => {
                                            return i < props.craftingTableSize ? (
                                                <tr key={i}>
                                                    {
                                                        Array.from({ length: 3 }).map((_, j) => {
                                                            if (j < props.craftingTableSize) {
                                                                const index = i * 3 + j
                                                                const slot = tip.table[index]
                                                                if (slot) {
                                                                    return <td
                                                                        key={index}
                                                                        className={`tipSlot ${slot.status} copySlot`}
                                                                        onMouseEnter={(e) => focus.saveFocus(e.currentTarget)}
                                                                        onMouseLeave={() => focus.saveFocus(null)}>
                                                                        <Item item={props.itemsCollection.getItem(slot.item)} className="item" />
                                                                    </td>
                                                                } else {
                                                                    return <td key={index} className="tipSlot"></td>
                                                                }
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    }
                                                </tr>
                                            ) : null
                                        })
                                    }
                                </tbody>
                            </table>
                            <img className="tipCraftingArrow" src={arrow} alt="arrow" draggable={false} />
                            <div className="tipSlot">
                                <Item item={props.itemsCollection.getItem(tip.item.id)} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}