import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DefaultSettings } from "../../classes/DefaultSettings";
import { loadSettings } from "../../functions/loadSettings";
import { IControls } from "../../interfaces/ISettings";
import { Item } from "./Item";

function getKeyAndIndexByValue(obj: IControls, value: any): string | undefined {
    for (const key of Object.keys(obj)) {
        const currentValue = obj[key as keyof IControls];
        if (Array.isArray(currentValue)) {
            const index = currentValue.indexOf(value);
            if (index !== -1) {
                return `${key}${index}`;
            }
        } else if (currentValue === value) {
            return key;
        }
    }
    return undefined;
}

interface CursorProps {
    craftingTableSlots: Array<Array<HTMLImageElement | null>>
    setCraftingTableSlots: (value: Array<Array<HTMLImageElement | null>>) => void
}

export function Cursor(props: CursorProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet == true));
    const currentSettings = customSettings ? customSettings : DefaultSettings.getDefaultSettings()
    const [focusedItem, setFocusedItem] = useState<HTMLImageElement>()
    const [focusedSlot, setFocusedSlot] = useState<HTMLElement>()
    const [pickedUpItem, setPickedUpItem] = useState<HTMLImageElement>()
    const [isCopyOn, setIsCopyOn] = useState(false)
    const [cursorPos, setCursorPos] = useState<{
        x: number,
        y: number
    }>()

    useEffect(() => {
        loadSettings()
    }, [])

    useEffect(() => {
        function handleControl(key: string) {
            const control = getKeyAndIndexByValue(currentSettings.controls, key)
            switch (control) {
                case "copy":
                    setPickedUpItem(focusedItem)
                    placeItem()
                    break;
            }
        }

        function placeItem() {
            let slots = props.craftingTableSlots;
            const slotNumber = Number(focusedSlot?.id.replace("slot", ""));
            if (typeof slotNumber === "number") {
                const currentSlotItem = slots[Math.floor(slotNumber / 3)][slotNumber % 3];
                slots[Math.floor(slotNumber / 3)][slotNumber % 3] = pickedUpItem || null;
                setPickedUpItem(currentSlotItem || undefined);
                props.setCraftingTableSlots([...slots]);
            }
        }
        

        const saveFocus = (e: MouseEvent) => {
            let target = e.target as HTMLElement
            console.log(target)
            if (target.classList.contains("item") && focusedItem?.className != target.className) {
                setFocusedItem(target as HTMLImageElement)
            } else if (target.classList.contains("slot") && focusedSlot?.id != target.id) {
                setFocusedSlot(target)
                setFocusedItem(undefined)
            }
        };

        const updateLocation = (e: MouseEvent) => {
            setCursorPos({
                x: e.clientX,
                y: e.clientY
            })
        }

        const handleMouseButtonPressed = (e: MouseEvent) => {
            if (e.button >= 0 && e.button <= 2) {
                switch (e.button) {
                    case 0:
                        handleControl("Left Mouse Button");
                        break;
                    case 1:
                        handleControl("Middle Mouse Button");
                        break;
                    case 2:
                        handleControl("Right Mouse Button");
                        break;
                }
            }
        }

        document.addEventListener("mousemove", updateLocation);
        document.addEventListener("mouseover", saveFocus);
        document.addEventListener("mousedown", handleMouseButtonPressed)
        return () => {
            document.removeEventListener("mousemove", updateLocation);
            document.removeEventListener("mouseover", saveFocus);
            document.removeEventListener("mousedown", handleMouseButtonPressed)

        };
    }, [focusedItem, focusedSlot]);

    return pickedUpItem ?
        <div id="pickedUpItem" style={{
            top: cursorPos?.y,
            left: cursorPos?.x
        }} >
            <Item item={pickedUpItem} className="cursorItem" />
        </div > : null
}