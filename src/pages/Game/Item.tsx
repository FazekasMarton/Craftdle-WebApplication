import { memo } from "react";
import { store } from "../../app/store";
import { deleteInfo, setInfo } from "../../features/info/infoSlice";

/**
 * Props for the Item component.
 */
interface ItemProps {
    item: HTMLImageElement,
    className?: string | "",
    info?: {
        title?: string,
        titleColor?: string,
        text: string
    }
}

/**
 * Item component to display an item with optional info tooltip.
 * 
 * This component renders an image representing an item. If `info` is provided, it displays
 * a tooltip with additional information when the user hovers over the item.
 * 
 * @param props - The properties for the Item component.
 * @param props.item - The image element representing the item.
 * @param props.className - Additional CSS classes for styling the item.
 * @param props.info - Optional tooltip information, including title, title color, and text.
 * @returns The Item component.
 */
export const Item = memo(function Item(props: ItemProps) {
    const commonProps: React.HTMLAttributes<HTMLElement> = {
        // Dispatch tooltip info on mouse move
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: props.info?.title, titleColor: props.info?.titleColor, text: props.info?.text }))
        } : undefined,
        // Clear tooltip info on mouse leave
        onMouseLeave: props.info ? () => {
            store.dispatch(deleteInfo())
        } : undefined,
    };

    const className = [props.item?.className]
    props.className && className.push(props.className)
    return props.item ? (
        <img
            className={className.join(" ")}
            src={props.item.src}
            alt={props.item.alt}
            draggable={false}
            loading="lazy"
            {...commonProps}/>
    ) : null
});