import { CountDown } from "../../components/CountDown"

interface MaintenanceNoticeProps{
    time: number
}

export function MaintenanceNotice(props: MaintenanceNoticeProps){
    return <div id="maintenanceNotice">
        <h1 id="maintenanceTitle">Start of Estimated Maintenance:</h1>
        <p id="maintenanceCountDown">
            <CountDown time={props.time} />
        </p>
    </div>
}