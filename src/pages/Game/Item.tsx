interface ItemProps {
    item: HTMLImageElement,
    className?: string | ""
}

export function Item(props: ItemProps) {
    const item = props.item
    return item ? (
        <img
            className={`${props.className} ${item.className}`}
            src={item.src}
            alt={item.alt}
            draggable={false} />
    ) : null
}