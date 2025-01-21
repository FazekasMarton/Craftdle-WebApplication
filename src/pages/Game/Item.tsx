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
export function Item(props: ItemProps) {
    const item = props.item
    const commonProps: React.HTMLAttributes<HTMLElement> = {
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: props.info?.title, titleColor: props.info?.titleColor, text: props.info?.text }))
        } : undefined,
        onMouseLeave: props.info ? () => {
            store.dispatch(deleteInfo())
        } : undefined,
    };
    return item ? (
        <img
            className={`${props.className} ${item.className}`}
            src={item.src}
            alt={item.alt}
            draggable={false} 
            {...commonProps}/>
    ) : null
}