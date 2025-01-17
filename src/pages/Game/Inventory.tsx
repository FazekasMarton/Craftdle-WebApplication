import { IItem, Items } from "../../classes/Items"
import { Item } from "./Item"
import searchIcon from "../../assets/imgs/icons/search_icon.png"
import { useState } from "react"
import { DefaultSettings } from "../../classes/DefaultSettings"
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"

interface InventoryProps {
    itemsCollection: IItem[]
    items: Items
}

export function Inventory(props: InventoryProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet === true));
    const currentSettings = customSettings || DefaultSettings.getDefaultSettings();
    const [search, setSearch] = useState("")
    const size = `${currentSettings.imagesSize / 10 + 2.5}vmin`

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
                            return <div key={item.id} className="inventorySlot slot" style={{
                                width: size,
                                height: size
                            }}>
                                <Item item={itemElement} className="item" info={{text: item.name}} />
                            </div>
                        }
                    })
                }
            </div>
        </div>
    </div>
}