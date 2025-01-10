import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { CountDown } from "../../components/CountDown"

interface MaintenanceProps {
    time: number
}

export function Maintenance(props: MaintenanceProps) {
    return <div id="maintenance">
        <div id="maintenanceMessage">
            <img id="craftdleMaintenanceTitle" src={craftdleTitle} alt="craftdle title" />
            <h1 id="maintenanceTitle">Maintenance</h1>
            <p>Craftdle is currently undergoing scheduled maintenance. We apologize for any inconvenience and appreciate your patience.</p>
            <p>Thank you,<br />The Guideian Angel Team</p>
            <p>Estimated End of Maintenance:<span id="maintenanceCountdown">
                <CountDown time={props.time}/>
            </span></p>
        </div>
    </div>
}