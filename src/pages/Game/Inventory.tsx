import { IItem, Items } from "../../classes/Items"
import { Item } from "./Item"
import searchIcon from "../../assets/imgs/icons/search_icon.png"
import { useState } from "react"

interface InventoryProps {
    itemsCollection: IItem[]
    items: Items
}

export function Inventory(props: InventoryProps) {
    const [search, setSearch] = useState("")

    return <div id="inventory">
        <header id="inventoryHeader">
            <h1 id="inventoryTitle">Inventory:</h1>
            <nav className="searchBar">
                <img className="searchIcon" src={searchIcon} alt="Search Icon" />
                <input type="text" id="inventorySearch" className="search" placeholder="Search..." onInput={(e) => { setSearch(e.currentTarget.value) }} />
            </nav>
        </header>
        <div id="inventoryContainer">
            <div id="inventoryContent">
                {
                    props.itemsCollection.map(item => {
                        const itemElement = props.items.getItem(item.id)
                        if (item && item.name.toLowerCase().includes(search.toLowerCase())) {
                            return <div key={item.id} className="inventorySlot slot">
                                <Item item={itemElement} className="item" />
                            </div>
                        }
                    })
                }
            </div>
        </div>
    </div>
}