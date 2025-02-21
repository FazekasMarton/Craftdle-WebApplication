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
 * @param props - The properties for the Item component.
 * @returns The Item component.
 */
export const Item = memo(function Item(props: ItemProps) {
    const commonProps: React.HTMLAttributes<HTMLElement> = {
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: props.info?.title, titleColor: props.info?.titleColor, text: props.info?.text }))
        } : undefined,
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