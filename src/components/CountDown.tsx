import { useEffect, useState } from "react"

interface CountDownProps{
    time: number
}

function getCountDownText(seconds: number){
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = [];
    if (days > 0) result.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (remainingSeconds > 0 || result.length === 0) 
        result.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`);

    return result.length > 1 
        ? result.slice(0, -1).join(', ') + ' and ' + result[result.length - 1] 
        : result[0];
}

export function CountDown(props: CountDownProps){
    const [time, setTime] = useState(props.time)
    const [countDownText, setCountDownText] = useState(getCountDownText(time))

    useEffect(() => {
        const countDown = setTimeout(() => {
            setCountDownText(getCountDownText(time - 1))
            setTime(prevValue => prevValue - 1)
        }, 1000)

        return () => clearTimeout(countDown)
    }, [time])

    return <>{countDownText}</>
}