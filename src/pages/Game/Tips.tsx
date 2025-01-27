import { Items } from "../../classes/Items"
import { ITips } from "../../interfaces/ITips"
import { Item } from "./Item"
import arrow from "../../assets/imgs/icons/arrow.png"

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
 * @param props - The properties for the Tips component.
 * @returns The Tips component.
 */
export function Tips(props: TipsProps) {
    return <div id="tips">
        <h1 id="tipsTitle">Tips:</h1>
        <div id="tipsContainer">
            <div id="tipsContent">
                {
                    props.tips.map((tip, tipIndex) => {
                        props.itemsCollection.addItem(tip.item)
                        return <div key={tipIndex} className="tipContent">
                            <table className="tipCraftingTable">
                                <tbody>
                                    {
                                        Array.from({ length: 3 }).map((_, i) => {
                                            return i < props.craftingTableSize ? (
                                                <tr key={i}>
                                                    {
                                                        Array.from({ length: 3 }).map((_, j) => {
                                                            if(j < props.craftingTableSize) {
                                                                const index = i * 3 + j
                                                                const slot = tip.table[index]
                                                                console.log(slot)
                                                                if (slot) {
                                                                    const item = props.itemsCollection.getItem(slot.item)
                                                                    return <td key={index} className={`tipSlot ${slot.status}`}>
                                                                        <Item item={item} className="item" />
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
                            <img className="tipCraftingArrow" src={arrow} alt="arrow" />
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