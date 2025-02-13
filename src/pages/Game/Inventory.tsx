import { IItem, Items } from "../../classes/Items"
import { Item } from "./Item"
import searchIcon from "../../assets/imgs/icons/search_icon.png"
import { useState } from "react"
import { DefaultSettings } from "../../classes/DefaultSettings"
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"

/**
 * Props for the Inventory component.
 */
interface InventoryProps {
    itemsCollection: IItem[]
    items: Items,
    isOpen: boolean
}

/**
 * Inventory component to display the player's inventory.
 * @param props - The properties for the Inventory component.
 * @returns The Inventory component.
 */
export function Inventory(props: InventoryProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet === true));
    const currentSettings = customSettings || DefaultSettings.getDefaultSettings();
    const [search, setSearch] = useState("")
    const size = `${currentSettings.imagesSize / 10 + 2.5}vmin`

    return <div id="inventory" style={{ display: props.isOpen ? "grid" : "none" }}>
        <header id="inventoryHeader">
            <h1 id="inventoryTitle">Inventory:</h1>
            <nav className="searchBar">
                <img className="searchIcon" src={searchIcon} alt="Search Icon" draggable={false}/>
                <input type="text" id="inventorySearch" className="search" placeholder="Search..." onInput={(e) => { setSearch(e.currentTarget.value) }} />
            </nav>
        </header>
        <div id="inventoryContainer">
            <div id="inventoryContent">
                {
                    props.itemsCollection.map(item => {
                        if (item && item.name.toLowerCase().includes(search.toLowerCase())) {
                            return <div key={item.id} className="inventorySlot slot" style={{
                                width: size,
                                height: size
                            }}>
                                <Item itemId={item.id} items={props.items} className="item" info={{text: item.name}} />
                            </div>
                        }
                    })
                }
            </div>
        </div>
    </div>
}