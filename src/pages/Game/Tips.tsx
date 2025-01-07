import { Items } from "../../classes/Items"
import { ITips } from "../../interfaces/ITips"
import { Item } from "./Item"
import arrow from "../../assets/imgs/icons/arrow.png"

interface TipsProps {
    tips: ITips,
    craftingTableSize: number,
    itemsCollection: Items
}

export function Tips(props: TipsProps) {
    return <div id="tips">
        <h1 id="tipsTitle">Tips:</h1>
        <div id="tipsContainer">
            <div id="tipsContent">
                {
                    props.tips.map((tip) => {
                        props.itemsCollection.addItem(tip.item)
                        return <div className="tipContent">
                            <table className="tipCraftingTable">
                                {
                                    Array.from({ length: props.craftingTableSize }).map((_, i) => {
                                        return <tr>
                                            {
                                                Array.from({ length: props.craftingTableSize }).map((_, j) => {
                                                    const slot = tip.table[i * props.craftingTableSize + j]
                                                    if (slot !== null) {
                                                        const item = props.itemsCollection.getItem(slot.item)
                                                        return <td className={`tipSlot ${slot.status}`}>
                                                            <Item item={item} />
                                                        </td>
                                                    } else {
                                                        return <td className="tipSlot"></td>
                                                    }
                                                })
                                            }
                                        </tr>
                                    })
                                }
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