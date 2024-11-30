import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export function Info(){
    const info = useSelector((state: RootState) => state.info)
    const text = info.position && info.position.x && info.position.y ? info.text : null

    return <div id="infoWindow" style={{
        display : text ? "block" : "none",
        top: info.position?.y,
        left: info.position?.x
    }}>{text}</div>
}