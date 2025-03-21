import { useEffect, useState } from "react"
import { store } from "../app/store";
import { setMaintenance } from "../features/maintenance/maintenanceSlice";

interface CountdownProps{
    time: number
}

/**
 * Get the countdown text from the given seconds.
 * @param seconds - The number of seconds.
 * @returns The formatted countdown text.
 */
function getCountdownText(seconds: number){
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = [];
    if (days > 0) result.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (remainingSeconds > 0 || result.length === 0) 
        result.push(`${Math.round(remainingSeconds)} second${remainingSeconds > 1 ? 's' : ''}`);

    return result.length > 1 
        ? result.slice(0, -1).join(', ') + ' and ' + result[result.length - 1] 
        : result[0];
}

/**
 * Countdown component to render a countdown timer.
 * 
 * This component displays a countdown timer and updates the text every second.
 * When the timer reaches zero, it dispatches a maintenance state update.
 * 
 * @param props - The props for the component.
 * @param props.time - The initial countdown time in seconds.
 * @returns The Countdown component.
 */
export function Countdown(props: CountdownProps){
    const [time, setTime] = useState(props.time)
    const [countdownText, setCountdownText] = useState(getCountdownText(time))

    useEffect(() => {
        const countdown = setTimeout(() => {
            setCountdownText(getCountdownText(time - 1))
            setTime(prevValue => prevValue - 1)
            if(time <= 0){
                store.dispatch(setMaintenance({
                    started: !store.getState().maintenance.started,
                    countdown: null
                }))
            }
        }, 1000)

        return () => clearTimeout(countdown)
    }, [time])

    return <>{countdownText}</>
}