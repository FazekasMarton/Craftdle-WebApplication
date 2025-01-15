import { useEffect, useState, useRef } from "react";
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
            if (index !== -1) return `${key}${index}`;
        } else if (currentValue === value) {
            return key;
        }
    }
    return undefined;
}

interface CursorProps {
    craftingTableSlots: Array<Array<HTMLImageElement | null>>;
    setCraftingTableSlots: (value: Array<Array<HTMLImageElement | null>>) => void;
}

export function Cursor(props: CursorProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet === true));
    const currentSettings = customSettings || DefaultSettings.getDefaultSettings();

    const focusedItemRef = useRef<HTMLImageElement | null>(null);
    const focusedSlotRef = useRef<HTMLElement | null>(null);
    const isHoldingCopy = useRef<boolean>(false);
    const [pickedUpItem, setPickedUpItem] = useState<HTMLImageElement | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number, y: number }>();

    useEffect(() => { loadSettings() }, []);

    useEffect(() => {
        function handleControl(key: string) {
            const control = getKeyAndIndexByValue(currentSettings.controls, key);
            switch (control) {
                case "copy":
                    setPickedUpItem(focusedItemRef.current);
                    if(!focusedSlotRef.current?.classList.contains("inventorySlot")) placeItem();
                    break;
                case "remove":
                    removeItem()
                    break;
            }
        }

        function getSlotIndex() {
            const slotNumber = Number(focusedSlotRef.current?.id.replace("slot", ""));
            return slotNumber || slotNumber === 0 ? slotNumber : undefined
        }

        function addToSlot(slots: Array<Array<HTMLImageElement | null>>, slotNumber: number, itemToPlace: HTMLImageElement | null) {
            const currentSlotItem = slots[Math.floor(slotNumber / 3)][slotNumber % 3];
            slots[Math.floor(slotNumber / 3)][slotNumber % 3] = itemToPlace || null;
            props.setCraftingTableSlots([...slots]);
            return currentSlotItem
        }

        function removeItem() {
            let slots = props.craftingTableSlots;
            const slotNumber = getSlotIndex()
            if (slotNumber || slotNumber === 0) {
                addToSlot(slots, slotNumber, null)
            }
        }

        function placeItem() {
            let slots = props.craftingTableSlots;
            const slotNumber = getSlotIndex()
            if (slotNumber || slotNumber === 0) {
                const currentSlotItem = addToSlot(slots, slotNumber, pickedUpItem)
                setPickedUpItem(currentSlotItem || null);
            }
        }

        function saveFocus(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (target.classList.contains("item")) {
                focusedItemRef.current = target as HTMLImageElement;
            } else if (target.classList.contains("slot")) {
                focusedSlotRef.current = target;
                focusedItemRef.current = null;
            } else {
                focusedSlotRef.current = null;
                focusedItemRef.current = null;
            }
        }

        function updateLocation(e: MouseEvent) {
            setCursorPos({ x: e.clientX, y: e.clientY });
            if (isHoldingCopy.current && pickedUpItem && focusedSlotRef.current?.childNodes.length === 0) {
                let slots = props.craftingTableSlots;
                const slotNumber = getSlotIndex()
                if (slotNumber || slotNumber === 0) {
                    addToSlot(slots, slotNumber, pickedUpItem)
                }
            }
        }

        function handleMouseButtonPressed(e: MouseEvent) {
            const control = getKeyAndIndexByValue(currentSettings.controls, getMouseButton(e));
            if (control === "copy") {
                isHoldingCopy.current = true
            }
        }

        function getMouseButton(e: MouseEvent){
            let key = undefined
            if (e.button >= 0 && e.button <= 2) {
                switch (e.button) {
                    case 0:
                        key = "LMB";
                        break;
                    case 1:
                        key = "MMB";
                        break;
                    case 2:
                        key = "RMB";
                        break;
                }
            }
            return key
        }

        function handleMouseButtonRelease(e: MouseEvent) {
            const button = getMouseButton(e)
            if(button) handleControl(button)
            if(button) stopHolding(button)
        }

        function stopHolding(key: string) {
            const control = getKeyAndIndexByValue(currentSettings.controls, key);
            if (control === "copy") {
                isHoldingCopy.current = false
            }
        }

        document.addEventListener("mousemove", updateLocation);
        document.addEventListener("mouseover", saveFocus);
        document.addEventListener("mousedown", handleMouseButtonPressed);
        document.addEventListener("mouseup", handleMouseButtonRelease)

        return () => {
            document.removeEventListener("mousemove", updateLocation);
            document.removeEventListener("mouseover", saveFocus);
            document.removeEventListener("mousedown", handleMouseButtonPressed);
            document.removeEventListener("mouseup", handleMouseButtonRelease)
        };
    }, [pickedUpItem, currentSettings.controls, props.craftingTableSlots]);

    return pickedUpItem ? (
        <div id="pickedUpItem" style={{ top: cursorPos?.y, left: cursorPos?.x }}>
            <Item item={pickedUpItem} className="cursorItem" />
        </div>
    ) : null;
}
