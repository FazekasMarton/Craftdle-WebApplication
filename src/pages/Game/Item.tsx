import { useEffect, useState } from "react";
import { store } from "../../app/store";
import { Items } from "../../classes/Items";
import { deleteInfo, setInfo } from "../../features/info/infoSlice";

/**
 * Props for the Item component.
 */
interface ItemProps {
    itemId: string,
    className?: string | "",
    info?: {
        title?: string,
        titleColor?: string,
        text: string
    }
    items: Items
}

export async function getItem(itemId: string, items: Items, setItem?: (item: HTMLImageElement | undefined) => void) {
    const id = itemId.split(" ").find(i => i !== "item")
    const item = id ? await items.getItem(id) : undefined
    setItem && setItem(item)
    return item
}

/**
 * Item component to display an item with optional info tooltip.
 * @param props - The properties for the Item component.
 * @returns The Item component.
 */
export function Item(props: ItemProps) {
    const [item, setItem] = useState<HTMLImageElement | undefined>()

    useEffect(() => {
        getItem(props.itemId, props.items, setItem)
    }, [props.itemId])

    const commonProps: React.HTMLAttributes<HTMLElement> = {
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: props.info?.title, titleColor: props.info?.titleColor, text: props.info?.text }))
        } : undefined,
        onMouseLeave: props.info ? () => {
            store.dispatch(deleteInfo())
        } : undefined,
    };

    const className = [item?.className]
    props.className && className.push(props.className)
    return item ? (
        <img
            className={className.join(" ")}
            src={item.src}
            alt={item.alt}
            draggable={false} 
            {...commonProps}/>
    ) : null
}