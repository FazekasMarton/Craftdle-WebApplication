import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useEffect, useState } from "react";

export function Info() {
    const info = useSelector((state: RootState) => state.info)
    const [calculatedPosition, setCalculatedPosition] = useState<{
        left?: number,
        right?: number,
        top?: number
    }>({});

    useEffect(() => {
        const updatePosition = () => {
            if (!info.position?.x || !info.position?.y) return;

            const windowWidth = window.innerWidth;
            const elementWidth = 400;
            const x = info.position.x;
            const y = info.position.y;

            if (x + elementWidth > windowWidth) {
                setCalculatedPosition({ right: windowWidth - x, top: y });
            } else {
                setCalculatedPosition({ left: x, top: y });
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, [info.position]);

    return (
        <div
            id="infoWindow"
            style={{
                display: info.position?.x && info.position?.y ? "block" : "none",
                ...calculatedPosition
            }}
        >
            <div id="infoTitle" style={{ color: info.titlecolor }}>
                {info.title}
            </div>
            <div id="infoText">{info.text}</div>
        </div>
    )
}