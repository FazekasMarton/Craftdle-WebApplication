import { store } from "../../app/store";
import { deleteInfo, setInfo } from "../../features/info/infoSlice";

interface ItemProps {
    item: HTMLImageElement,
    className?: string | "",
    info?: {
        title?: string,
        titleColor?: string,
        text: string
    }
}

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