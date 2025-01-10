import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export function Info(){
    const info = useSelector((state: RootState) => state.info)
    const isOutOfScreen = window.innerWidth <= (info.position?.x ? info.position?.x : 0) + 300

    return <div id="infoWindow" style={{
        display : info.position && info.position.x && info.position.y ? "block" : "none",
        top: info.position?.y,
        left: info.position?.x,
        translate: `${isOutOfScreen ? "calc(-5vmin + -100%)" : "5vmin"} -50%`
    }}>
        <div id="infoTitle" style={{color: info.titlecolor}}>{info.title}</div>
        <div id="infoText">{info.text}</div>
    </div>
}