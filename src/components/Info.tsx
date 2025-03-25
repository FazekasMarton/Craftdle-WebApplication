import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteInfo } from "../features/info/infoSlice";

/**
 * Info component to display information based on the Redux state.
 * 
 * This component shows a tooltip-like window with dynamic positioning
 * based on the user's cursor location. It updates its position on window resize.
 * 
 * @returns The Info component.
 */
export function Info() {
    const dispatch = useDispatch();
    const location = useLocation();
    const info = useSelector((state: RootState) => state.info);
    const [calculatedPosition, setCalculatedPosition] = useState<{
        left?: number;
        right?: number;
        top?: number;
    }>({});

    /**
     * Effect to update the position of the info window based on the info state.
     */
    useEffect(() => {
        const updatePosition = () => {
            if (!info.position?.x || !info.position?.y) return;

            const windowWidth = window.innerWidth;
            const elementWidth = 400;
            const x = info.position.x;
            const y = info.position.y;

            // Calculate the position of the info window
            if (x + elementWidth > windowWidth) {
                setCalculatedPosition({ right: windowWidth - x, top: y });
            } else {
                setCalculatedPosition({ left: x, top: y });
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, [info.position]);

    /**
     * Effect to reset the info state when the route changes.
     */
    useEffect(() => {
        dispatch(deleteInfo());
    }, [location, dispatch]);

    return (
        <div
            id="infoWindow"
            style={{
                display: info.position?.x && info.position?.y ? "block" : "none",
                ...calculatedPosition,
            }}
        >
            <div id="infoTitle" style={{ color: info.titlecolor }}>
                {info.title}
            </div>
            <div id="infoText">{info.text}</div>
        </div>
    );
}
