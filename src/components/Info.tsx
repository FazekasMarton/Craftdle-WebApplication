import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export function Info() {
    const info = useSelector((state: RootState) => state.info)
    const isOutOfScreen = window.innerWidth <= (info.position?.x ?? 0) + 400
    
    return (
        <div
            id="infoWindow"
            style={{
                display: info.position?.x && info.position?.y ? "block" : "none",
                top: info.position?.y,
                ...(isOutOfScreen
                    ? { right: window.innerWidth - (info.position?.x ?? 0) }
                    : { left: info.position?.x }
                )
            }}
        >
            <div id="infoTitle" style={{ color: info.titlecolor }}>
                {info.title}
            </div>
            <div id="infoText">{info.text}</div>
        </div>
    )
}
