import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export function Info(){
    const info = useSelector((state: RootState) => state.info)

    return <div id="infoWindow" style={{
        display : info.position && info.position.x && info.position.y ? "block" : "none",
        top: info.position?.y,
        left: info.position?.x
    }}>
        <div style={{color: info.titlecolor}}>{info.title}</div>
        <div>{info.text}</div>
    </div>
}